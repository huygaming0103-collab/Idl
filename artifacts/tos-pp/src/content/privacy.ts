export const privacyData = {
  vi: {
    title: "Chính Sách Bảo Mật",
    lastUpdated: "09/07/2026",
    summary: "Bảo vệ dữ liệu cá nhân của bạn là ưu tiên hàng đầu của chúng tôi. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn khi bạn sử dụng IDL Bot.",
    sections: [
      {
        id: "data_collected",
        title: "01. Dữ Liệu Chúng Tôi Thu Thập",
        icon: "Database",
        content: "Chúng tôi chỉ thu thập những dữ liệu cần thiết để Bot hoạt động ổn định.",
        subsections: [
          { title: "Dữ liệu định danh", content: "Discord User ID: Mã định danh duy nhất của tài khoản Discord của bạn, được dùng để lưu trữ dữ liệu kinh tế và cài đặt. Discord Username và Display Name: Hiển thị trong bảng xếp hạng và các lệnh liên quan." },
          { title: "Dữ liệu hệ thống", content: "Server ID (Guild ID): Để phân tách dữ liệu theo từng server Discord." },
          { title: "Dữ liệu hoạt động", content: "Lịch sử giao dịch: Các giao dịch trong hệ thống kinh tế ảo (mua bán, cá cược, chuyển tiền). Số liệu thống kê: Số lần sử dụng lệnh, điểm số, cấp độ, thành tích. Timestamp: Thời gian của các hoạt động để phục vụ tính năng cooldown và phân tích." },
          { title: "Dữ liệu KHÔNG thu thập", content: "Chúng tôi KHÔNG thu thập: Địa chỉ email, số điện thoại, địa chỉ thực tế, thông tin thanh toán, hoặc bất kỳ thông tin nhận dạng cá nhân nào khác ngoài những gì Discord cung cấp." }
        ]
      },
      {
        id: "data_usage",
        title: "02. Cách Chúng Tôi Sử Dụng Dữ Liệu",
        icon: "Activity",
        content: "Dữ liệu được thu thập chỉ để phục vụ cho các tính năng của Bot.",
        subsections: [
          { title: "Vận hành dịch vụ", content: "Cung cấp và vận hành các tính năng của Bot (hệ thống kinh tế, mini-game, bảng xếp hạng)." },
          { title: "Bảo mật & Cải thiện", content: "Phát hiện và ngăn chặn hành vi gian lận, lạm dụng hoặc vi phạm điều khoản. Cải thiện và phát triển các tính năng mới của Bot." },
          { title: "Phân tích & Liên lạc", content: "Phân tích thống kê để tối ưu hóa trải nghiệm người dùng (dữ liệu ẩn danh). Liên hệ với người dùng khi cần thiết liên quan đến tài khoản hoặc vi phạm." }
        ]
      },
      {
        id: "data_storage",
        title: "03. Lưu Trữ Và Bảo Mật Dữ Liệu",
        icon: "Server",
        content: "Chúng tôi áp dụng các biện pháp an toàn để bảo vệ dữ liệu của bạn.",
        subsections: [
          { title: "Bảo vệ hệ thống", content: "Dữ liệu được lưu trữ trên máy chủ an toàn với quyền truy cập bị hạn chế. Chỉ các thành viên cốt lõi của nhóm phát triển mới có quyền truy cập dữ liệu người dùng." },
          { title: "Giới hạn bảo mật", content: "Chúng tôi áp dụng các biện pháp bảo mật hợp lý nhưng không thể đảm bảo bảo mật tuyệt đối." },
          { title: "Thời gian lưu trữ", content: "Dữ liệu được giữ lại miễn là Bot còn hoạt động hoặc cho đến khi người dùng yêu cầu xóa. Trong trường hợp xảy ra vi phạm bảo mật nghiêm trọng, chúng tôi sẽ thông báo đến người dùng bị ảnh hưởng trong thời gian sớm nhất có thể." }
        ]
      },
      {
        id: "data_sharing",
        title: "04. Chia Sẻ Dữ Liệu",
        icon: "Share2",
        content: "Chúng tôi cam kết không bán dữ liệu của bạn cho bất kỳ bên thứ ba nào.",
        subsections: [
          { title: "Cam kết không bán", content: "Chúng tôi KHÔNG bán, cho thuê hoặc trao đổi thông tin cá nhân của bạn với bên thứ ba vì mục đích thương mại." },
          { title: "Trường hợp ngoại lệ", content: "Dữ liệu có thể được chia sẻ với bên thứ ba chỉ trong các trường hợp: yêu cầu pháp lý từ cơ quan có thẩm quyền, ngăn chặn các hành vi bất hợp pháp nghiêm trọng." },
          { title: "Dữ liệu công khai", content: "Bảng xếp hạng công khai hiển thị Username và số liệu thống kê — đây là tính năng của Bot và người dùng đồng ý khi sử dụng." }
        ]
      },
      {
        id: "user_rights",
        title: "05. Quyền Của Người Dùng",
        icon: "UserCog",
        content: "Bạn có quyền kiểm soát hoàn toàn đối với dữ liệu cá nhân của mình trên hệ thống.",
        subsections: [
          { title: "Truy cập & Xóa", content: "Quyền truy cập: Bạn có thể yêu cầu xem dữ liệu chúng tôi đang lưu trữ về bạn. Quyền xóa dữ liệu: Bạn có thể yêu cầu xóa toàn bộ dữ liệu của mình. Lưu ý: việc xóa dữ liệu đồng nghĩa với mất toàn bộ tài sản ảo và lịch sử." },
          { title: "Chỉnh sửa & Phản đối", content: "Quyền chỉnh sửa: Trong một số trường hợp giới hạn, bạn có thể yêu cầu chỉnh sửa dữ liệu không chính xác. Quyền phản đối: Bạn có quyền phản đối việc xử lý dữ liệu trong một số trường hợp nhất định." },
          { title: "Thực hiện quyền", content: "Để thực hiện các quyền này, vui lòng liên hệ qua GitHub Issues." }
        ]
      },
      {
        id: "children_data",
        title: "06. Dữ Liệu Của Trẻ Em",
        icon: "Baby",
        content: "Chúng tôi tuân thủ các quy định về độ tuổi tối thiểu.",
        subsections: [
          { title: "Giới hạn độ tuổi", content: "IDL Bot không được thiết kế để thu thập dữ liệu của trẻ em dưới 13 tuổi. Theo Điều khoản Dịch vụ của Discord, người dùng phải từ 13 tuổi trở lên." },
          { title: "Báo cáo vi phạm", content: "Nếu bạn phát hiện trẻ em dưới 13 tuổi đang sử dụng Bot, vui lòng báo cáo ngay." }
        ]
      },
      {
        id: "cookies",
        title: "07. Cookie và Tracking",
        icon: "Cookie",
        content: "Chúng tôi tôn trọng quyền riêng tư khi bạn duyệt web.",
        subsections: [
          { title: "Chính sách Cookie", content: "IDL Bot là ứng dụng Discord và không sử dụng cookie. Website này (trang điều khoản/chính sách) không thu thập dữ liệu cá nhân qua tracking." }
        ]
      },
      {
        id: "changes",
        title: "08. Thay Đổi Chính Sách",
        icon: "RefreshCcw",
        content: "Chính sách bảo mật có thể được cập nhật theo thời gian.",
        subsections: [
          { title: "Thông báo cập nhật", content: "Chúng tôi có thể cập nhật chính sách này theo thời gian. Các thay đổi sẽ được thông báo trên server Discord chính thức và trên trang này. Ngày \"Cập nhật lần cuối\" ở đầu trang sẽ phản ánh thay đổi mới nhất." }
        ]
      },
      {
        id: "contact",
        title: "09. Liên Hệ",
        icon: "PhoneCall",
        content: "Bạn có thể liên hệ với chúng tôi để được giải đáp thắc mắc về quyền riêng tư.",
        subsections: [
          { title: "Kênh liên lạc", content: "GitHub: https://github.com/huygaming0103-collab/Idl\nSử dụng GitHub Issues để báo cáo lỗi hoặc có các yêu cầu về dữ liệu." }
        ]
      }
    ]
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "July 09, 2026",
    summary: "Protecting your personal data is our top priority. This policy explains how we collect, use, and safeguard your information when you use IDL Bot.",
    sections: [
      {
        id: "data_collected",
        title: "01. Data We Collect",
        icon: "Database",
        content: "We only collect data necessary for the Bot to operate stably.",
        subsections: [
          { title: "Identification Data", content: "Discord User ID: The unique identifier of your Discord account, used to store economy data and settings. Discord Username and Display Name: Displayed on leaderboards and related commands." },
          { title: "System Data", content: "Server ID (Guild ID): To separate data by Discord server." },
          { title: "Activity Data", content: "Transaction history: Transactions in the virtual economy system (trading, betting, transferring). Statistics: Command usage count, scores, levels, achievements. Timestamps: Time of activities for cooldown features and analytics." },
          { title: "Data NOT Collected", content: "We DO NOT collect: Email addresses, phone numbers, physical addresses, payment information, or any other personally identifiable information beyond what Discord provides." }
        ]
      },
      {
        id: "data_usage",
        title: "02. How We Use Data",
        icon: "Activity",
        content: "Collected data is used solely to serve the Bot's features.",
        subsections: [
          { title: "Service Operation", content: "To provide and operate the Bot's features (economy system, mini-games, leaderboards)." },
          { title: "Security & Improvement", content: "To detect and prevent fraud, abuse, or term violations. To improve and develop new features for the Bot." },
          { title: "Analytics & Communication", content: "Statistical analysis to optimize user experience (anonymous data). To contact users when necessary regarding accounts or violations." }
        ]
      },
      {
        id: "data_storage",
        title: "03. Data Storage and Security",
        icon: "Server",
        content: "We implement safety measures to protect your data.",
        subsections: [
          { title: "System Protection", content: "Data is stored on secure servers with restricted access. Only core members of the development team have access to user data." },
          { title: "Security Limitations", content: "We apply reasonable security measures but cannot guarantee absolute security." },
          { title: "Retention Period", content: "Data is retained as long as the Bot is active or until the user requests deletion. In the event of a severe security breach, we will notify affected users as soon as possible." }
        ]
      },
      {
        id: "data_sharing",
        title: "04. Data Sharing",
        icon: "Share2",
        content: "We are committed not to sell your data to any third party.",
        subsections: [
          { title: "No-Sell Commitment", content: "We DO NOT sell, rent, or trade your personal information with third parties for commercial purposes." },
          { title: "Exceptions", content: "Data may be shared with third parties only in cases of: legal requests from competent authorities, preventing severe illegal activities." },
          { title: "Public Data", content: "Public leaderboards display Usernames and statistics — this is a feature of the Bot and users agree to it when using." }
        ]
      },
      {
        id: "user_rights",
        title: "05. User Rights",
        icon: "UserCog",
        content: "You have full control over your personal data on the system.",
        subsections: [
          { title: "Access & Deletion", content: "Right to access: You can request to see the data we hold about you. Right to deletion: You can request the deletion of all your data. Note: deleting data means losing all virtual assets and history." },
          { title: "Correction & Objection", content: "Right to correction: In limited cases, you can request to correct inaccurate data. Right to object: You have the right to object to data processing in certain situations." },
          { title: "Exercising Rights", content: "To exercise these rights, please contact via GitHub Issues." }
        ]
      },
      {
        id: "children_data",
        title: "06. Children's Data",
        icon: "Baby",
        content: "We comply with minimum age requirements.",
        subsections: [
          { title: "Age Limit", content: "IDL Bot is not designed to collect data from children under 13. According to Discord's Terms of Service, users must be 13 years or older." },
          { title: "Reporting Violations", content: "If you find a child under 13 using the Bot, please report it immediately." }
        ]
      },
      {
        id: "cookies",
        title: "07. Cookies and Tracking",
        icon: "Cookie",
        content: "We respect your privacy while browsing.",
        subsections: [
          { title: "Cookie Policy", content: "IDL Bot is a Discord application and does not use cookies. This website (terms/policy page) does not collect personal data via tracking." }
        ]
      },
      {
        id: "changes",
        title: "08. Changes to Policy",
        icon: "RefreshCcw",
        content: "The privacy policy may be updated from time to time.",
        subsections: [
          { title: "Update Notifications", content: "We may update this policy over time. Changes will be announced on the official Discord server and on this page. The \"Last updated\" date at the top of the page will reflect the newest changes." }
        ]
      },
      {
        id: "contact",
        title: "09. Contact",
        icon: "PhoneCall",
        content: "You can contact us for any privacy-related inquiries.",
        subsections: [
          { title: "Communication Channels", content: "GitHub: https://github.com/huygaming0103-collab/Idl\nUse GitHub Issues to report bugs or make data requests." }
        ]
      }
    ]
  }
};
