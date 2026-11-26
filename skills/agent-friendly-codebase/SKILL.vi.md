[English](SKILL.md) · Tiếng Việt

# Làm cho đường dễ nhất là đường đúng

1. Lấy một lỗi lặp từ PR, đoạn chat hay incident. Ghi hành vi sai, ví dụ thật, invariant bị vi phạm và convention đang khiến agent tái tạo lỗi. Tìm ít nhất một đường đúng có thể bắt chước.
2. Xử lý ở lớp có sức ràng buộc tốt nhất và vừa sức với thay đổi. Trước hết làm mẫu tốt dễ thấy ở vị trí agent đọc. Dùng cấu trúc dữ liệu, API, type hoặc module boundary khiến trạng thái sai khó biểu diễn. Sau đó dùng lint, compiler, dependency graph và CI cho mẫu nhận diện được. Dùng AGENTS.md, skill, rule hoặc BugBot cho hướng dẫn theo bối cảnh. Dành phán đoán và style guide cho phần human review còn có giá trị.
3. Khi thêm check, chứng minh mẫu đúng qua và mẫu sai bị chặn. Ghi gợi ý sửa trong chẩn đoán và nối vào điểm kiểm tra thường chạy. Dùng một convention chuẩn, đặt code và ví dụ ở nơi agent tìm đầu tiên.
4. Nếu repo đã có nhiều vi phạm, chặn lỗi mới khi có cơ chế phù hợp. Gom lỗi cũ, dọn theo cụm và giữ đường chuyển đổi. Đánh giá bằng mẫu agent hay sao chép và nguy cơ tái diễn.

## Ví dụ Dune

Lauren mô tả feature co-location, route React, transcript card, host trong VM và client như các khối có ranh giới rõ. Đồ thị phụ thuộc/CI ngăn import không hợp lệ giữa Electron main và renderer, giữ phần việc nặng khỏi render path. Khung frame khoảng 16 ms ở 60 Hz và 8 ms ở 120 Hz là động cơ thiết kế. Checker import không đo thời gian chạy, nên đo giật bằng trace. Dune cấm comment vì workaround được ghi cạnh code đã bị sao chép và lan rộng. Áp dụng bài học về nguồn dẫn dắt và chỗ đặt invariant theo convention repo hiện tại.

Với repo TypeScript chưa có checker, lấy [config mẫu](../../scripts/examples/boundaries.json), đặt bản sao cạnh `tsconfig.json` hoặc điều chỉnh đường dẫn, và chạy [lệnh boundaries](../../scripts/README.vi.md). Kiểm tra một import trực tiếp, một đường qua barrel và một import hợp lệ. Đọc chuỗi phụ thuộc trả về để sửa tại đường chuẩn.

Bàn giao lỗi nguồn, lớp xử lý, đường chuẩn, lệnh kiểm tra và kết quả hai trường hợp đúng/sai. [Nguồn và timestamp](../../research/evidence.md#environment).
