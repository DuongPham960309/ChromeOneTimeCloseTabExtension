# ⏳ One-Time Tab Close (Chrome Extension)
> Tiện ích mở rộng trên trình duyệt Chrome giúp đóng các tab được chỉ định khi đến giờ.

---

## 🚀 Giới thiệu tổng quan
Dự án này là một Chrome Extension giúp tự động lập lịch và đóng các tab youtube khi đến giờ. Người dùng chỉ cần thiết lập thời gian đóng qua giao diện Pop-up, hệ thống sẽ tự động lên lịch chạy ngầm để giải phóng tài nguyên một cách chính xác mà không cần giữ cửa sổ tiện ích hiển thị.

---

## 🛠️ Tính năng & Kỹ thuật triển khai

### 1. Tính năng cốt lõi
* **Hẹn giờ thông minh:** Cho phép chọn mốc thời gian cụ thể trong ngày để thực thi tác vụ đóng tab.
* **Chạy ngầm độc lập:** Sau khi đặt giờ, người dùng có thể tắt Pop-up hoặc tắt trình duyệt. Tác vụ vẫn được lập lịch chính xác nhờ cơ chế Service Worker.
* **Tự động quét & Đóng tab:** Tự động lọc toàn bộ các tab liên quan đến URL chỉ định (`youtube.com`) và thực hiện đóng bất đồng bộ.

### 2. Công nghệ & API sử dụng
* **Ngôn ngữ:** JavaScript (ES6), HTML5, CSS3.
* **Manifest V3:** Tuân thủ chuẩn bảo mật và tối ưu hiệu năng mới nhất của Google Chrome Extensions.
* **Chrome Storage API (`chrome.storage.local`):** Lưu trữ trạng thái thời gian đã cài đặt, đảm bảo dữ liệu không bị mất khi đóng Pop-up.
* **Chrome Alarms API (`chrome.alarms`):** Đăng ký sự kiện lập lịch chính xác để kích hoạt tác vụ đóng tab theo thời gian thực (Real-time Background Event).
* **Chrome Tabs API (`chrome.tabs`):** Truy vấn danh sách tab đang mở (`chrome.tabs.query`) và xử lý đóng hàng loạt bất đồng bộ thông qua `Promise.all`.

---

## 📂 Cấu trúc dự án
```
├── manifest.json       # File cấu hình quyền truy cập (Permissions: tabs, alarms, storage)
├── popup.html          # Giao diện hộp thoại cài đặt thời gian
├── popup.js            # Logic giao tiếp người dùng, gửi tín hiệu đến Background qua Message Passing
└── background.js       # Service Worker chạy ngầm, quản lý Alarms và trực tiếp xử lý vòng đời của Tab
```