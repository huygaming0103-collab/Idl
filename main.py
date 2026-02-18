import discord
from discord.ext import commands
import os
import random
import asyncio
import glob
import config
import json
# --- BƯỚC 1: KHAI BÁO BOT ĐÚNG THỨ TỰ (Sửa lỗi NameError) ---
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

@bot.event
async def on_ready():
    if not os.path.exists('downloads'):
        os.makedirs('downloads')
    print(f'✅ V I P DRAGON Online | Prefix: D')

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return
    # Add random 1 trong 50 emoji khi bị ping
    if bot.user.mentioned_in(message):
        try:
            await message.add_reaction(random.choice(VIP_EMOJIS))
        except:
            pass
    await bot.process_commands(message)

# --- BƯỚC 2: LỆNH TẢI NHẠC (Sửa lỗi Indent & Xóa message cũ) ---
@bot.command(name="mp3")
async def dmp3(ctx, *, url: str):
    # Gửi thông báo đang xử lý ban đầu
    embed = discord.Embed(
        title="🔥 V I P DRAGON - DOWNLOADER",
        description="> **Hệ thống đang trích xuất dữ liệu, vui lòng đợi...**",
        color=0xFF0000 
    )
    embed.add_field(name="🛰️ Trạng thái", value="`⏳ Đang xử lý...`", inline=True)
    msg = await ctx.send(embed=embed)

    # Lệnh tải nhạc ép về định dạng MP3
    os.system(f'yt-dlp -x --audio-format mp3 -o "downloads/%(title)s.%(ext)s" "{url}"')

    # Await quan trọng: Đợi file hoàn tất (20-30s)
    await asyncio.sleep(25) 

    try:
        # Tìm file trong thư mục downloads
        files = glob.glob("downloads/*.mp3")
        if files:
            latest_file = max(files, key=os.path.getctime)
            file_name = os.path.basename(latest_file)

            # XOÁ MESSAGE TRƯỚC ĐÓ (Sửa lỗi lặp tin nhắn hiển thị)
            await msg.delete()

            # UPLOAD FILE KÈM DÒNG CHỮ THÔNG BÁO VÀ EMOJI PHÙ HỢP
            await ctx.send(
                content=f"✅ **Đã tải xong file của bạn!** 🐲🔥🎧\n> 📂 **Tên file:** `{file_name}`",
                file=discord.File(latest_file)
            )
        else:
            # Nếu lỗi không tìm thấy file
            embed.description = "❌ **Lỗi: Không tìm thấy file trong thư mục downloads!**"
            await msg.edit(embed=embed)
    except Exception as e:
        print(f"Lỗi: {e}")

from datetime import datetime, timedelta

# --- HỆ THỐNG DỮ LIỆU ---
DATA_FILE = "users.json"

def load_data():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)

# --- LỆNH ĐIỂM DANH MỖI NGÀY (Ddaily) ---
@bot.command(name="daily")
async def daily(ctx):
    user_id = str(ctx.author.id)
    data = load_data()
    
    if user_id not in data:
        data[user_id] = {"balance": 0, "last_daily": "2000-01-01 00:00:00", "streak": 0}
    
    now = datetime.now()
    reset_time = now.replace(hour=7, minute=0, second=0, microsecond=0)
    
    if now < reset_time:
        reset_time -= timedelta(days=1)
    
    last_daily = datetime.strptime(data[user_id]["last_daily"], "%Y-%m-%d %H:%M:%S")
    
    if last_daily < reset_time:
        # Kiểm tra chuỗi điểm danh 🔥
        if last_daily < (reset_time - timedelta(days=1)):
            data[user_id]["streak"] = 1
        else:
            data[user_id]["streak"] += 1
            
        amount = random.randint(100, 999) # Random từ 100-999 xu
        streak_bonus = data[user_id]["streak"] * 10 
        total_get = amount + streak_bonus
        
        data[user_id]["balance"] += total_get
        data[user_id]["last_daily"] = now.strftime("%Y-%m-%d %H:%M:%S")
        save_data(data)
        
        streak_count = data[user_id]["streak"]
        streak_display = "🔥" * min(streak_count, 5)
        
        embed = discord.Embed(
            title="🎁 QUÀ TẶNG MỖI NGÀY",
            description=f"✅ Bạn đã nhận được **{amount}** xu! (+{streak_bonus} bonus)\n> Tổng nhận: **{total_get}** xu 🐲🔥",
            color=0x00FF00
        )
        embed.add_field(name="📈 Chuỗi điểm danh", value=f"{streak_display} **{streak_count} ngày**", inline=True)
        embed.add_field(name="💰 Số dư hiện tại", value=f"`{data[user_id]['balance']:,}` xu", inline=True)
        embed.set_footer(text="Mốc reset: 07:00 AM hàng ngày")
        await ctx.send(embed=embed)
    else:
        next_reset = reset_time + timedelta(days=1)
        remaining = next_reset - now
        hours, remainder = divmod(int(remaining.total_seconds()), 3600)
        minutes, _ = divmod(remainder, 60)
        await ctx.send(f"❌ Bạn đã nhận quà hôm nay rồi! Hãy quay lại sau **{hours} giờ {minutes} phút** nữa.")

# --- LỆNH KIỂM TRA THÔNG TIN (Dme / Dcash / Dbal) ---
@bot.command(name="me", aliases=["cash", "bal"])
async def me(ctx):
    user_id = str(ctx.author.id)
    data = load_data()
    
    if user_id not in data:
        data[user_id] = {"balance": 0, "last_daily": "2000-01-01 00:00:00", "streak": 0}
    
    balance = data[user_id].get("balance", 0)
    streak = data[user_id].get("streak", 0)
    
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
@bot.command(name="tos")
async def tos(ctx):
    embed = discord.Embed(
        title="📜 ĐIỀU KHOẢN & BẢO MẬT - V I P DRAGON",
        description="Việc sử dụng bot đồng nghĩa với việc bạn đồng ý với các điều khoản dưới đây.",
        color=0x3498db
    )
    embed.add_field(name="🛡️ Bảo mật", value="Chỉ lưu trữ Discord ID để quản lý số dư xu và chuỗi 🔥.", inline=False)
    embed.add_field(name="⚖️ Quy định", value="Cấm hack/cheat xu hoặc spam lệnh. Vi phạm sẽ bị ban.", inline=False)
    embed.set_footer(text="Cập nhật lần cuối: 18/02/2026")
    await ctx.send(embed=embed)
# --- LỆNH BAN NGƯỜI DÙNG (Chỉ Admin mới dùng được) ---
@bot.command(name="ban")
@commands.has_permissions(administrator=True) # Chỉ người có quyền Admin mới dùng được lệnh này
async def ban(ctx, member: discord.Member):
    user_id = str(member.id)
    data = load_data()
    
    if user_id not in data:
        data[user_id] = {"balance": 0, "last_daily": "2000-01-01 00:00:00", "streak": 0, "is_banned": False}
    
    data[user_id]["is_banned"] = True
    save_data(data)
    
    await ctx.send(f"🚫 Đã ban người dùng **{member.name}**. Họ sẽ không thể sử dụng các lệnh của bot nữa! 🐲🔥")

# --- LỆNH UNBAN (Bỏ cấm) ---
@bot.command(name="unban")
@commands.has_permissions(administrator=True)
async def unban(ctx, member: discord.Member):
    user_id = str(member.id)
    data = load_data()
    
    if user_id in data:
        data[user_id]["is_banned"] = False
        save_data(data)
        await ctx.send(f"✅ Đã bỏ ban cho **{member.name}**. Chào mừng quay trở lại! ✨")

# --- QUAN TRỌNG: KIỂM TRA TRẠNG THÁI BAN TRƯỚC KHI CHẠY LỆNH ---
@bot.check
async def globally_check_banned(ctx):
    user_id = str(ctx.author.id)
    data = load_data()
    # Nếu người dùng có trong danh sách và bị ban, bot sẽ từ chối thực hiện lệnh
    if user_id in data and data[user_id].get("is_banned", False):
        await ctx.send(f"❌ **{ctx.author.name}**, bạn đã bị ban khỏi hệ thống do vi phạm điều khoản! 🚫")
        return False
    return True

bot.run(config.TOKEN)

