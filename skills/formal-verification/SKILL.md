---
name: formal-verification
description: "Đánh giá một invariant khó bao phủ bằng runtime test, như retry, state machine hay khả năng lặp thao tác. Chọn formal model/check phù hợp và ghi rõ phạm vi chứng minh."
---

# Khi nào cần formal verification

Thử phép đo hoặc kiểm tra runtime nếu nó bao phủ quyết định cần đưa ra. Cân nhắc mô hình hóa khi nhiều trạng thái/tương tác có thể đi sai, đặc biệt với invariant phải giữ qua nhiều bước hoặc nhiều tác nhân. Lauren đặt formal verification ở đầu khó hơn của phổ verification và để ngỏ khả năng áp dụng rộng.

1. Viết đúng một invariant ở ngôn ngữ nghiệp vụ, kèm ví dụ pass/fail, trạng thái khởi tạo và giả định môi trường. Ví dụ, cùng một khóa idempotency chỉ ghi nhận một đơn hàng dù retry sau timeout.
2. Chọn đúng phần state machine/data model hoặc chứng minh cần thiết. Dùng công cụ đội đã hỗ trợ, ví dụ TLA+ cho chuyển trạng thái hoặc Lean khi cần chứng minh tính chất phù hợp. Mô tả abstraction, event/thao tác và những gì bị bỏ ngoài mô hình.
3. Chạy checker hoặc proof. Giữ counterexample và đường đi ngắn có thể hiểu được, sau đó tìm cách tái hiện trong triển khai. Báo rõ tool, giới hạn khám phá hoặc giả định chứng minh, phiên bản mã và kết quả thực tế. Nếu không chạy được, trả mô hình dự kiến và ghi trạng thái chưa kiểm chứng.
4. Nối invariant với test runtime hoặc check của repo để phát hiện drift giữa mô hình và mã. Giữ người có quyền quyết định trong các thay đổi khó hoàn tác.

Quy trình trên là cách áp dụng cho Codex. Các nguồn đưa Lean/TLA+ như ví dụ và nói về hướng kết hợp code với proof. Chúng chưa đưa ra lời giải chung cho thay đổi hệ trọng hoặc một chứng minh production cụ thể. [Nguồn và timestamp](../../research/evidence.md#formal).
