[English](../SKILL.md) · Tiếng Việt

# Gardening cho codebase

## Quét và gom

1. Chọn một kiểu footgun có thể nhận biết từ code hoặc PR. Ví dụ một cách dùng React khiến state bị lệch. Chỉ định khu vực cần quét và chỉ ra một mẫu đúng để so.
2. Lượt quét đầu thêm phát hiện vào buffer. Mỗi hàng có file hoặc commit, dấu hiệu, hành vi/rủi ro, giả thuyết nguyên nhân và mức chắc chắn. Gộp trùng theo pattern, giữ các đường dẫn gốc đủ để kiểm tra lại. Tách sự cố cần xử lý ngay theo quy trình sẵn có của dự án.
3. Đọc buffer sau một lô quét hoặc theo nhịp đội đã chọn. Nhóm theo nguyên nhân và theo convention mới cần có. Kiểm tra cụm bằng runtime khi có liên hệ hành vi. Đề xuất một thay đổi hệ thống cho cả cụm thay vì phân công một lần sửa cho mỗi dòng.

## Chặn và dọn

- Chặn lỗi mới bằng đường chuẩn, type, lint hay CI theo `agent-friendly-codebase`. Nếu có nhiều vi phạm cũ, giới hạn rule vào lỗi mới khi repo hỗ trợ.
- Dọn mẫu xấu có sức lan truyền trước. Dùng codemod đã kiểm thử cho thay đổi lặp, và kiểm tra đường hành vi cũ. Sửa ví dụ, test fixture hay comment đang hướng agent tới workaround nếu chúng góp phần vào lỗi.
- Ghi lại rule nào bảo vệ pattern, còn bao nhiêu nơi cũ và trường hợp cần phán đoán. Cập nhật buffer theo thay đổi đã kiểm chứng. Chỉ thiết lập routine tự động khi người dùng yêu cầu và host có quyền.

Bàn giao danh sách cụm, một ví dụ thật và hướng xử lý cụ thể ở cấp môi trường cho từng cụm ưu tiên. [Nguồn và timestamp](../../../research/evidence.md#gardening).
