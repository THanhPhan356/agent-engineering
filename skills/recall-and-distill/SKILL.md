---
name: recall-and-distill
description: "Khôi phục bối cảnh bằng Recall và rút corrections lặp lại từ lịch sử chat, PR và code thành CLI, guardrail hoặc skill workflow nhỏ."
---

# Recall và chắt lọc corrections

## Khôi phục bối cảnh

1. Xác định chủ đề, repo, mốc thời gian và chat/PR người dùng cho phép đọc. Lấy lại đoạn liên quan bằng công cụ lịch sử được hỗ trợ hoặc từ tài liệu người dùng đưa.
2. Đối chiếu ý định và quyết định trong chat với code, commit/PR, test và trạng thái hiện tại. Phân biệt đã quyết định, đang thử, bị thay thế và còn mở. Bỏ dữ liệu riêng tư hoặc phần không liên quan trong bản bàn giao.
3. Trả brief ngắn cho agent tiếp theo gồm mục tiêu, vì sao, trạng thái hiện tại, đường dẫn nguồn, lần xác minh cuối, bước tiếp theo và quyết định đang chờ. Ghi thiếu nguồn khi log không truy cập được.

## Rút skill từ công việc thật

1. Lấy từng lần người dùng can thiệp. Ghi hành động agent đã làm, correction, điều người dùng muốn, tình huống áp dụng và ví dụ đối chứng. Nhóm theo lỗi hoặc quyết định giống nhau.
2. Chọn nơi lưu có hiệu lực cao. Quy tắc bắt buộc đưa vào code/type/lint/CI nếu khả thi. Thao tác quyết định được đưa vào CLI hoặc codemod. Phần cần phán đoán mới giữ trong skill.
3. Viết skill theo mục đích, trigger, đầu vào, các bước và bằng chứng đầu ra. Dùng từ có nghĩa cụ thể trong domain, giữ các bước thay vì nhồi cách triển khai. Dùng một tình huống cũ và một tình huống ngoài phạm vi để kiểm tra skill có cải thiện hành vi và phân tuyến đúng.
4. Xóa phần giải thích agent đã xử lý đúng nếu bằng chứng cho thấy nó dư thừa. Ghép kỹ năng từ nguồn khác khi nó phục vụ từng giai đoạn. Lauren nêu Wayfinder của Matt Pocock như một lựa chọn bổ sung cho Poteto Mode. Giữ nguồn của từng phần.

Bàn giao brief hoặc bảng correction → nguyên nhân → cách xử lý → bằng chứng kiểm tra, tùy yêu cầu. [Nguồn và timestamp](../../research/evidence.md#recall).
