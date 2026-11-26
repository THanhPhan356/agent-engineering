[English](SKILL.md) · Tiếng Việt

# Xác minh, review và ship

## Trước khi ship

1. Phân loại khả năng hoàn tác, phạm vi ảnh hưởng, điều kiện xác minh và độ trưởng thành harness. Với migration nguy hiểm, quyền truy cập, dữ liệu, hạ tầng hoặc quyết định khó đảo ngược, trả bằng chứng cho người có trách nhiệm. Với đổi nhỏ và đảo ngược được, dùng phạm vi hành động người dùng và repo đã cấp.
2. Kiểm tra commit/candidate đang đề xuất. Chạy check bắt buộc và đường dùng thật. Với thay đổi xứng đáng, dùng verifier độc lập hoặc các model family khác nếu host có sẵn. Giao cho verifier đường chính, edge case có căn cứ và kiểm tra hành vi lân cận. Fuzz trong môi trường test theo nghĩa Lauren mô tả là dùng app linh hoạt như user để tìm lỗi, kết hợp input variations khi phù hợp.
3. Mỗi finding cần tình huống, dấu hiệu, cách tái hiện và tác động tới mục tiêu. Bỏ yêu cầu chung chung, vấn đề ngoài intent và cảm nhận thiếu bằng chứng. Khi sửa finding, xác minh lại candidate mới. Tăng số lượt review theo hậu quả và chất lượng tín hiệu, vì nhiều reviewer có thể tạo overfitting và tốn token.
4. Giữ quyền merge, publish và deploy theo lệnh người dùng và quy tắc repo. Full Autopilot là chế độ nâng cao để mô phỏng hoặc triển khai khi đã có phạm vi rõ, checks đáng tin, khả năng phục hồi và quyền phù hợp. Trước khi đủ điều kiện, bàn giao bản sẵn sàng review.
5. Với lượt chạy được giao để làm qua đêm, ghi trước điều kiện xong có thể chạy kiểm tra, quyền đã cấp, giới hạn thời gian/chi phí, điểm dừng và cách tiếp tục. Dùng worktree hay cloud checkout tách biệt khi host có sẵn. Lưu từng quyết định, candidate, lệnh kiểm tra, kết quả và artifact để audit sau. Nếu thấy việc không còn tiến triển, lưu trạng thái và nguyên nhân.

## Sau khi ship

Lấy mẫu commit/PR qua các nhóm rủi ro và loại thay đổi, kiểm tra cả artifact lẫn code khi cần. Nếu có phát hiện, đánh giá rollback hay sửa theo cơ chế dự án. Nếu lỗi lặp qua nhiều PR, nâng lên lint, invariant, harness hoặc cập nhật skill. Mức lấy mẫu, cửa dừng và yêu cầu xác minh đúng candidate là triển khai cho Codex.

Bàn giao trạng thái kiểm tra, commit đã thử, evidence, finding còn mở, mức rủi ro và người quyết định kế tiếp. [Nguồn và timestamp](../../research/evidence.md#release).

Với thay đổi có hành vi quan sát được, lưu bằng chứng ở chỗ reviewer còn mở được sau khi kết thúc phiên hoặc CI. Dẫn tới ảnh, trace hoặc báo cáo có thật, nêu phiên bản đã thử và ghi rõ artifact còn thiếu. Khi kiểm tra CLI của repo này, dùng [smoke test và hướng dẫn lấy bằng chứng](../../scripts/README.vi.md#chạy-smoke-test-và-lấy-bằng-chứng).
