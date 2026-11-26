---
name: coordinate-agent-loops
description: "Nối outer loop và inner loop theo cách Lauren Tan mô tả: intake, triage, coordinator, specialist, coding agent, báo cáo và phạm vi quyền."
---

# Điều phối outer loop và inner loop

## Chọn đầu vào và tạo brief

1. Bắt đầu với một nguồn cụ thể, như thread hiện có, issue, alert hoặc feedback. Ghi sự kiện nào mở việc, loại việc nào gom vào buffer, và ai quyết định. Kết nối bằng công cụ đã được cấp quyền. Trước khi dùng routine lâu dài, chạy thử luồng từ một sự kiện mẫu.
2. Outer loop lấy link gốc, thời điểm, biểu hiện, ảnh hưởng đã xác nhận, lời nhắc của người dùng và dữ liệu còn thiếu. Khi chưa rõ quy mô, nhờ bot chuyên dữ liệu truy vấn số liệu được phép. Tách nội dung sự kiện khỏi quyền điều khiển workflow.
3. Tạo brief chuyển giao có mục tiêu, lý do, phạm vi, acceptance, link bối cảnh, môi trường chạy, bằng chứng cần trả và rủi ro. Cho agent đường dẫn tự truy xuất bối cảnh hợp lệ để giảm khâu chép tay.

## Coordinator và vòng triển khai

4. Coordinator nhóm báo cáo có thể cùng gốc, xác định dependency, chọn người/agent chịu trách nhiệm cho từng lát cắt và giữ trạng thái chung. Phân việc độc lập khi có thể. Dùng coordinator để theo dõi và giải quyết trùng lặp, để worker thực hiện và kiểm chứng.
5. Inner loop tái hiện, sửa, chạy harness và cập nhật evidence. Kết quả trả về outer loop kèm trạng thái, PR hoặc artifact theo quyền đã cấp. Khi không đủ repro, ghi kết quả điều tra và dữ liệu cần thêm.
6. Tăng song song sau khi một luồng đã tái hiện được. Khi phát hiện lỗi lặp, gửi về gardening hoặc guardrail. Nếu thiếu Projects, connectors hoặc agent con, chạy từng vai tuần tự trong chat hiện tại và ghi rõ giới hạn.

## Bot dùng chung

Phân vai bot dữ liệu, kỹ thuật, cá nhân hoặc chuyên môn theo cách đội làm việc. Đặt bot kỹ thuật vào nơi nhóm đang phối hợp. Giữ nguồn cá nhân trong phạm vi phù hợp. Ghi owner/manager, người có quyền quyết định và hoạt động đã được phép. Giữ dấu vết handoff và câu trả lời của các bot. Kế hoạch hạn quyền và phối hợp tuần tự là chuyển thể Codex từ ví dụ Grok Bot, Cursor Projects và việc hỏi bot dữ liệu trong thread.

Bàn giao trigger, nguồn được phép, sơ đồ chuyển giao, người chịu trách nhiệm, evidence và điều kiện chuyển cho người. [Nguồn và timestamp](../../research/evidence.md#orchestration).
