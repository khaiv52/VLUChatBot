# 🎓 Chatbot Tư Vấn Tuyển Sinh – ĐH Văn Lang

Website chatbot hỗ trợ tư vấn tuyển sinh cho Trường Đại Học Văn Lang. Người dùng có thể đặt câu hỏi về ngành học, học phí, điều kiện xét tuyển,... và nhận phản hồi từ chatbot tích hợp LLM.

## 🔧 Công nghệ sử dụng:
- **Frontend**: ReactJS + Tailwind CSS – giao diện thân thiện, trực quan.
- **Backend**: Node.js + Express – xử lý API, lưu dữ liệu vào MongoDB, tích hợp với Weaviate (vector DB).
- **Chatbot**: Botpress – quản lý hội thoại, kết hợp LLM để sinh phản hồi thông minh.

## 📌 Các chức năng chính
### 👤 Người dùng (User)
- Đăng ký / Đăng nhập
- Quản lý hồ sơ cá nhân
- Chat với chatbot để được tư vấn tuyển sinh
### 🛠️ Quản trị viên (Admin)
- Xem và quản lý lịch sử cuộc trò chuyện của người dùng
- Quản lý thông tin và hồ sơ người dùng

---

## 🚀 Các chức năng dự kiến phát triển
- 📚 **FAQ**: Hệ thống trả lời các câu hỏi thường gặp về cách sử dụng website
- 📊 **Dashboard thống kê**: Hiển thị số liệu về lượng truy cập, số cuộc trò chuyện,...
- 🔍 **Tìm kiếm lịch sử chat**: Tìm kiếm theo từ khóa trong các đoạn hội thoại trước
- 💬 **Danh sách câu hỏi phổ biến**: Gợi ý các câu hỏi thường gặp ngay trong giao diện chat


## Khởi chạy dự án (gồm 2 thư mục):
# Frontend
```
cd frontend
npm install
npm run dev
``` 

# Backend
```
cd backend
npm install
npm run start
```
