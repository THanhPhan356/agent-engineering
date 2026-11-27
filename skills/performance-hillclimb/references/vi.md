[English](../SKILL.md) · Tiếng Việt

# Hill climb theo bằng chứng

1. Đóng băng kịch bản người dùng, fixture, môi trường, chế độ build và cách thu trace. Chọn một metric dẫn đường, chiều tốt hơn và endpoint người dùng quan tâm. Ghi ràng buộc correctness và các metric không được suy giảm.
2. Chạy baseline đủ để thấy độ dao động. Ghi commit, thiết lập, các lượt chạy và thước đo tổng hợp phù hợp. Nếu tín hiệu chìm trong nhiễu, sửa harness hoặc kịch bản trước.
3. Từ trace, CPU profile, heap snapshot hoặc instrumentation, nêu một hotspot, giả thuyết có thể bác bỏ và thay đổi nhỏ nhất để kiểm tra. Ghi kết quả dự kiến.
4. Áp dụng một thay đổi, chạy lại đúng kịch bản cũ, kiểm tra hành vi và so với baseline đã ghi. Giữ thay đổi khi lợi ích tái hiện, vượt phần nhiễu có liên quan và nằm trong ràng buộc. Hoàn tác riêng thay đổi thử nghiệm nếu nó thua hoặc làm hỏng guardrail. Đưa thay đổi đã chấp nhận thành baseline tiếp theo.
5. Dừng khi đạt mục tiêu, hết ngân sách thực thi, không còn giả thuyết đáng thử hoặc harness hết khả năng phân biệt. Chỉ báo cáo mức cải thiện dựa trên so sánh cùng điều kiện.

Bàn giao metric, câu hỏi người dùng, baseline và kết quả cuối, độ dao động hoặc giới hạn số lần đo, trace trước/sau và sổ từng thử nghiệm. Phân biệt cải thiện microbenchmark với trải nghiệm end-to-end. Giữ một thay đổi có thể quy kết cho mỗi lượt đo.

Với một feature map web, chạy [CLI](../../../scripts/README.vi.md) `verify --runs 5` trên baseline và candidate cùng cấu hình. Ưu tiên `performance.measure` có tên nếu app đã ghi metric. `compare` đọc hai `report.json`, đối chiếu kịch bản và runtime đã ghi, rồi trả median, độ lệch tuyệt đối trung vị và verdict. Đọc trace và các guardrail correctness trước khi giữ thay đổi.

Cách ghi baseline và ngân sách là triển khai Codex của nguyên lý loop có điểm số. Trong nguồn, Lauren nói cô lấy cảm hứng từ AutoResearch của Andrej Karpathy cho vòng hill climb. [Nguồn và timestamp](../../../research/evidence.md#performance).
