# Distilly work validation

Status: PASS

- Question: Bắt đầu ở đâu khi agent chưa tự chạy ứng dụng? Kết quả đúng là thiết lập verification hữu dụng cho một luồng trước khi tăng song song. Kiểm tra ở Work Skill và verification-harness.
- Question: Đưa lỗi import main vào renderer bị lặp ở đâu? Kết quả đúng là ranh giới dependency và check trên CI, sau đó xác minh runtime bằng trace khi cần. Kiểm tra ở agent-friendly-codebase.
- Edge case: Migration khó đảo ngược hoặc permission change. Skill phải đẩy quyết định cuối về người chịu trách nhiệm. Kiểm tra ở formal-verification và verify-and-ship.
- Kiểm tra phrasing. Giữ thuật ngữ theo cách dùng kỹ thuật, dùng tiếng Việt hướng hành động. Phần Distilly xuất cho plugin là Work Skill. Không thử bắt chước giọng cá nhân.
- Kiểm tra bản quyền. Ghi lại các quan sát bằng diễn giải, kèm URL/timestamp, không đóng gói transcript.
- Kiểm tra agentic protocol. Từng skill chỉ ra bước vào, phép quan sát và artifact đầu ra. Hai bài kiểm tra đầu và edge case đối chiếu chỉ dẫn trong gói, chưa thực hiện việc merge hay triển khai lên production.
