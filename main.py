import discord
from discord.ext import commands
import os
import random
import asyncio
import glob
import config
import json
from datetime import datetime, timedelta

# --- KHAI BÁO BOT ---
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix='D', intents=intents)

# Danh sách 50 emoji ngẫu nhiên
VIP_EMOJIS = [
    "🐲", "🐉", "🔥", "✨", "👑", "⚡", "💎", "🔱", "🧿", "⚔️",
    "🛡️", "🦾", "👺", "☄️", "🔴", "🟡", "🌀", "💠", "☣️", "☢️",
    "🌌", "🎆", "🚀", "🛸", "🚨", "🌋", "💨", "🌊", "💀", "👻",
    "👽", "🤖", "🎃", "👹", "🧨", "🧧", "🔮", "🎭", "🎨", "🎰",
    "🕹️", "💣", "💥", "💢", "💹", "🎯", "🚩", "🏮", "🧊", "🧬"
]

# --- HỆ THỐNG DỮ LIỆU ---
DATA_FILE = "users.json"


def load_data():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


def get_user(data, user_id):
    """Trả về dữ liệu người dùng, tạo mới nếu chưa tồn tại (bao gồm is_banned)."""
    if user_id not in data:
        data[user_id] = {
            "balance": 0,
            "last_daily": "2000-01-01 00:00:00",
            "streak": 0,
            "is_banned": False
        }
    # Đảm bảo field is_banned luôn tồn tại cho user cũ
    if "is_banned" not in data[user_id]:
        data[user_id]["is_banned"] = False
    return data[user_id]


# --- SỰ KIỆN BOT ONLINE ---
@bot.event
async def on_ready():
    if not os.path.exists('downloads'):
        os.makedirs('downloads')
    print(f'✅ V I P DRAGON Online | Prefix: D')


@bot.event
async def on_message(message):
    if message.author == bot.user:
        return
    # Thả emoji ngẫu nhiên khi bị ping
    if bot.user.mentioned_in(message):
        try:
            await message.add_reaction(random.choice(VIP_EMOJIS))
        except Exception:
            pass
    await bot.process_commands(message)


# --- KIỂM TRA TRẠNG THÁI BAN (GLOBAL CHECK) ---
@bot.check
async def globally_check_banned(ctx):
    user_id = str(ctx.author.id)
    data = load_data()
    if user_id in data and data[user_id].get("is_banned", False):
        await ctx.send(
            f"❌ **{ctx.author.name}**, bạn đã bị ban khỏi hệ thống do vi phạm điều khoản! 🚫"
        )
        return False
    return True


# --- LỆNH TẢI NHẠC (Dmp3) ---
@bot.command(name="mp3")
async def dmp3(ctx, *, url: str):
    embed = discord.Embed(
        title="🔥 V I P DRAGON - DOWNLOADER",
        description="> **Hệ thống đang trích xuất dữ liệu, vui lòng đợi...**",
        color=0xFF0000
    )
    embed.add_field(name="🛰️ Trạng thái", value="`⏳ Đang xử lý...`", inline=True)
    msg = await ctx.send(embed=embed)

    # Tải nhạc về định dạng MP3 (blocking - chạy trong thread riêng)
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(
        None,
        lambda: os.system(
            f'yt-dlp -x --audio-format mp3 -o "downloads/%(title)s.%(ext)s" "{url}"'
        )
    )

    # Đợi file hoàn tất
    await asyncio.sleep(5)

    try:
        files = glob.glob("downloads/*.mp3")
        if files:
            latest_file = max(files, key=os.path.getctime)
            file_name = os.path.basename(latest_file)

            await msg.delete()
            await ctx.send(
                content=f"✅ **Đã tải xong file của bạn!** 🐲🔥🎧\n> 📂 **Tên file:** `{file_name}`",
                file=discord.File(latest_file)
            )
        else:
            embed.description = "❌ **Lỗi: Không tìm thấy file trong thư mục downloads!**"
            embed.color = 0xFF0000
            await msg.edit(embed=embed)
    except Exception as e:
        print(f"Lỗi mp3: {e}")
        try:
            embed.description = f"❌ **Đã xảy ra lỗi:** `{str(e)}`"
            await msg.edit(embed=embed)
        except Exception:
            pass


# --- LỆNH ĐIỂM DANH (Ddaily) ---
@bot.command(name="daily")
async def daily(ctx):
    user_id = str(ctx.author.id)
    data = load_data()
    user = get_user(data, user_id)

    now = datetime.now()
    reset_time = now.replace(hour=7, minute=0, second=0, microsecond=0)

    if now < reset_time:
        reset_time -= timedelta(days=1)

    last_daily = datetime.strptime(user["last_daily"], "%Y-%m-%d %H:%M:%S")

    if last_daily < reset_time:
        # Kiểm tra chuỗi điểm danh
        if last_daily < (reset_time - timedelta(days=1)):
            user["streak"] = 1
        else:
            user["streak"] += 1

        amount = random.randint(100, 999)
        streak_bonus = user["streak"] * 10
        total_get = amount + streak_bonus

        user["balance"] += total_get
        user["last_daily"] = now.strftime("%Y-%m-%d %H:%M:%S")
        data[user_id] = user
        save_data(data)

        streak_count = user["streak"]
        streak_display = "🔥" * min(streak_count, 5)

        embed = discord.Embed(
            title="🎁 QUÀ TẶNG MỖI NGÀY",
            description=(
                f"✅ Bạn đã nhận được **{amount}** xu! (+{streak_bonus} bonus)\n"
                f"> Tổng nhận: **{total_get}** xu 🐲🔥"
            ),
            color=0x00FF00
        )
        embed.add_field(
            name="📈 Chuỗi điểm danh",
            value=f"{streak_display} **{streak_count} ngày**",
            inline=True
        )
        embed.add_field(
            name="💰 Số dư hiện tại",
            value=f"`{user['balance']:,}` xu",
            inline=True
        )
        embed.set_footer(text="Mốc reset: 07:00 AM hàng ngày")
        await ctx.send(embed=embed)
    else:
        next_reset = reset_time + timedelta(days=1)
        remaining = next_reset - now
        hours, remainder = divmod(int(remaining.total_seconds()), 3600)
        minutes, _ = divmod(remainder, 60)
        await ctx.send(
            f"❌ Bạn đã nhận quà hôm nay rồi! Hãy quay lại sau **{hours} giờ {minutes} phút** nữa."
        )


# --- LỆNH XEM THÔNG TIN (Dme / Dcash / Dbal) ---
@bot.command(name="me", aliases=["cash", "bal"])
async def me(ctx):
    user_id = str(ctx.author.id)
    data = load_data()
    user = get_user(data, user_id)

    balance = user.get("balance", 0)
    streak = user.get("streak", 0)

    embed = discord.Embed(
        title=f"💳 THÔNG TIN CỦA {ctx.author.name.upper()}",
        color=0xFFA500
    )
    if ctx.author.avatar:
        embed.set_thumbnail(url=ctx.author.avatar.url)

    embed.add_field(name="💰 Số dư xu", value=f"`{balance:,}` xu", inline=True)
    embed.add_field(name="🔥 Chuỗi hiện tại", value=f"`{streak}` ngày", inline=True)
    embed.set_footer(text="V I P DRAGON ECONOMY • Chăm chỉ để giàu sang!")
    await ctx.send(embed=embed)


# --- LỆNH XEM ĐIỀU KHOẢN (Dtos) ---
@bot.command(name="tos")
async def tos(ctx):
    embed = discord.Embed(
        title="📜 ĐIỀU KHOẢN & BẢO MẬT - V I P DRAGON",
        description="Việc sử dụng bot đồng nghĩa với việc bạn đồng ý với các điều khoản dưới đây.",
        color=0x3498db,
        url="https://idl-tan.vercel.app/"
    )
    embed.add_field(
        name="⚖️ Quy định chính",
        value=(
            "• Cấm spam lệnh hoặc lợi dụng bug kinh tế.\n"
            "• Vi phạm sẽ bị reset xu hoặc ban tài khoản.\n"
            "• Không dùng Dmp3 tải nội dung vi phạm bản quyền."
        ),
        inline=False
    )
    embed.add_field(
        name="🛡️ Bảo mật",
        value=(
            "• Chỉ lưu trữ Discord ID, tên và dữ liệu xu/streak.\n"
            "• Không bán hoặc chia sẻ dữ liệu cho bên thứ ba.\n"
            "• Bạn có quyền yêu cầu xóa dữ liệu bất kỳ lúc nào."
        ),
        inline=False
    )
    embed.add_field(
        name="🌐 Xem đầy đủ",
        value="[📜 Điều Khoản](https://idl-tan.vercel.app/) • [🛡️ Bảo Mật](https://idl-tan.vercel.app/privacy.html)",
        inline=False
    )
    embed.set_footer(text="Cập nhật lần cuối: 09/07/2026 • Phiên bản 2.0")
    await ctx.send(embed=embed)


# --- LỆNH BAN (Chỉ Admin) ---
@bot.command(name="ban")
@commands.has_permissions(administrator=True)
async def ban(ctx, member: discord.Member):
    user_id = str(member.id)
    data = load_data()
    user = get_user(data, user_id)

    user["is_banned"] = True
    data[user_id] = user
    save_data(data)

    await ctx.send(
        f"🚫 Đã ban người dùng **{member.name}**. Họ sẽ không thể sử dụng các lệnh của bot nữa! 🐲🔥"
    )


# --- LỆNH UNBAN (Chỉ Admin) ---
@bot.command(name="unban")
@commands.has_permissions(administrator=True)
async def unban(ctx, member: discord.Member):
    user_id = str(member.id)
    data = load_data()
    user = get_user(data, user_id)

    user["is_banned"] = False
    data[user_id] = user
    save_data(data)

    await ctx.send(f"✅ Đã bỏ ban cho **{member.name}**. Chào mừng quay trở lại! ✨")


# --- XỬ LÝ LỖI THIẾU QUYỀN ---
@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send("❌ Bạn không có quyền thực hiện lệnh này!")
    elif isinstance(error, commands.MemberNotFound):
        await ctx.send("❌ Không tìm thấy người dùng này!")
    elif isinstance(error, commands.MissingRequiredArgument):
        await ctx.send(f"❌ Thiếu tham số! Cách dùng: `{ctx.prefix}{ctx.command.name} {ctx.command.signature}`")
    elif isinstance(error, commands.CommandNotFound):
        pass  # Bỏ qua lệnh không tồn tại


bot.run(config.TOKEN)
