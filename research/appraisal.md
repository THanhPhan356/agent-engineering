# Nhận định và giới hạn

## Phạm vi và phương pháp

Ba video ở đầu [ma trận bằng chứng](evidence.md) là corpus chính. Chắt lọc phương pháp và quyết định công việc theo Distilly Work Skill, đưa ví dụ về môi trường và từ khóa vào skill có thể gọi riêng. Áp dụng K-Dense Scientific Critical Thinking để phân biệt lời kể, bằng chứng thực hành, suy luận và phần chưa được đo. Tài liệu pstack được dùng để kiểm tra cách gọi và chi tiết triển khai có thể đọc công khai. Các bản transcript của cùng một video là các bản biểu diễn của cùng một nguồn. [K-Dense Scientific Agent Skills](https://github.com/K-Dense-AI/scientific-agent-skills)

## Mức tin cậy theo câu hỏi

| Câu hỏi | Quan sát | Giới hạn |
|---|---|---|
| Vòng tối thiểu bắt đầu ở đâu? | A, B và C đều đặt việc agent tự chạy và thấy kết quả trước khi mở rộng tự chủ. | Một lần chạy thật chỉ bao phủ kịch bản đã chạy. Chuẩn chất lượng code và thước đo hiệu năng cần cơ chế riêng. |
| Một correction phải vào đâu? | Cả ba ưu tiên code và static analysis. B mô tả gom footgun vào một buffer. | Chi phí tái cấu trúc, ngoại lệ, rule thích hợp và kế hoạch xử lý nợ cũ phụ thuộc repo. |
| Khi nào tăng review? | B mô tả verifier và review lấy mẫu. C nói dùng Interrogate có chọn lọc và giữ người trong phần nhạy cảm. | Chưa có thiết kế đối chứng cho hiệu quả của từng lớp bảo vệ, chi phí hay tần suất lấy mẫu tối ưu. |
| “2.000 PR” nghĩa là gì? | A mở đầu với 2.000, bài đăng A viết 2.500. C có con số cao hơn trong câu hỏi của host. | Cửa sổ thời gian và cách đếm không được đối chiếu bằng dữ liệu PR. Các phát biểu này là số tự báo hoặc do host nhắc, không dùng làm benchmark. |
| Có phải ai cũng cần cùng cấu hình? | B mô tả verification có thể rất tốn token. C nói Lauren có ngân sách token khác nhiều đội. | Các dự án khác cần đo chi phí, độ tin cậy và khả năng hoàn tác trong môi trường của họ. |

## Lựa chọn triển khai

- Cơ chế gốc được gắn timestamp, thuật ngữ công khai và speaker. Hướng dẫn về mẫu đầu ra, chuẩn bị fixture, quyền, phạm vi thay đổi, lấy mẫu và rollback chuyển các nguyên tắc thành thao tác cụ thể cho Codex.
- Dune, ControlGlass và cấu hình Grok Bot/Cursor nội bộ chỉ có mô tả công khai trong các nguồn. Plugin dùng harness, connectors và quyền của repo/host hiện có. Mỗi skill có thể chạy trong chat hiện tại với vai trò tuần tự nếu thiếu hạ tầng song song.
- Cấm comment là quyết định Dune theo bối cảnh, còn no plan mode là cách dùng host cá nhân. Các skill giải thích cả hai ở nơi liên quan. Phần dogfooding chi tiết và cách cấp quyền theo độ tin cậy được ghi đúng người nói.
- Không dùng persona để suy đoán hành vi riêng tư. Kết quả chỉ xuất Work Skill, gồm các cơ chế làm việc có dấu vết nguồn.
- Đối chiếu bằng bản phát lại/caption và transcript công khai. X trả 403 cho công cụ đọc, còn provider caption của Firecrawl không trả track. Các chi tiết chỉ nhìn thấy trên slide hoặc trong demo mà lời nói không mô tả nằm ngoài mức đã kiểm tra.

## Bài kiểm tra tình huống

| Tình huống | Hành động cần có trong skill |
|---|---|
| Agent thường xuyên phải nhờ người chụp lại một bug UI | Dựng cách chạy dùng lại và feature map, rồi đo khả năng tái hiện trước khi mở rộng agent. |
| Recorder thu một số chỉ số tốt nhưng checkout vẫn sai | Chạy assertion về hành vi từ entry point được hỗ trợ. Báo phân biệt correctness và performance. |
| Agent cứ đưa việc nặng lên renderer | Chuyển cấu trúc/import boundary hoặc lint + CI, thử mẫu đúng và sai. Chạy trace để thấy ảnh hưởng runtime. |
| Verifier báo nhiều issue ngoài intent | Yêu cầu repro và ảnh hưởng thật, loại feedback ngoài mục tiêu và đưa lỗi lặp về môi trường. |
| Sắp tự merge migration khó đảo ngược | Giữ release ở trạng thái chờ người chịu trách nhiệm, trả invariant, bằng chứng, rủi ro và cách phục hồi còn khả thi. |
| PM thay đổi ưu tiên trong Slack | Chốt owner và intent trong cùng thread, đưa artifact tiếp theo và giữ quyết định phát hành cho đúng người. |
