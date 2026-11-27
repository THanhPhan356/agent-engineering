[English](../SKILL.md) · Tiếng Việt

# Chọn playbook

Xác định điều người dùng thực sự muốn, đã biết gì về codebase, dấu hiệu thành công và thông tin có thể tự tra trong repo. Chọn playbook sát nhất. Với yêu cầu mơ hồ, xác nhận một tình huống cụ thể và các giới hạn có thể làm đổi quyết định. Dùng thuật ngữ giàu nghĩa khi đã có nghĩa chung trong nhóm. Ví dụ TDD chỉ hữu ích khi nó dẫn agent tới một test thất bại có ý nghĩa, như kiểm tra đầu ra đi qua entry point người dùng.

| Loại việc | Quy trình |
|---|---|
| Điều tra | Lần entry point đến code liên quan. Đối chiếu bằng runtime hoặc lịch sử thay đổi nếu câu hỏi đòi hỏi. Trả kết luận, dấu vết và phần còn mở. |
| Bug fix | Tái hiện qua đường đi thật. Xác định nguyên nhân. Khi rẻ và ổn định, tạo regression test lỗi trước khi sửa. Sửa tại nguyên nhân và chạy lại kịch bản ban đầu. |
| Feature | Nêu hành vi và acceptance cụ thể. Chọn data shape, caller và đường hiện có của repo. Dựng lát cắt chạy được, kiểm tra bằng artifact và lấy phản hồi nếu người dùng yêu cầu. |
| Prototype | Chọn câu hỏi cần phân xử, làm thử nghiệm nhỏ nhất và chạy để lấy kết quả. Ghi giả định, chi phí chuyển sang production và phần có thể bỏ. |
| Refactor | Chụp đường hành vi hiện tại và contract của caller. Chỉnh shape hoặc boundary. Dùng codemod của repo khi thao tác quyết định được, rồi kiểm tra đường đi cũ. |
| Hiệu năng | Dùng pre/post trace và `performance-hillclimb`. |

Tách từng phần kỹ thuật ổn định thành lệnh hoặc codemod dùng lại khi hữu ích. Giữ phần cần phán đoán trong playbook. Không đưa vào skill chi tiết triển khai dễ lỗi thời khi agent có thể tìm từ code. Khi nhóm đã có một cách chuẩn, làm theo cách đó.

Bàn giao thay đổi, lệnh và bằng chứng, phần chưa xác minh, cùng quyết định còn cần người dùng. Lauren mô tả nhóm playbook trong video. Các bước chi tiết ở bảng là phần triển khai ngắn gọn đối chiếu với tài liệu pstack công khai. [Nguồn và timestamp](../../../research/evidence.md#playbooks).
