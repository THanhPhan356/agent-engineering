# Nghiên cứu bổ sung cho Agent Engineering

Tiếng Việt · [English](en/follow-up.md)

## Bốn hướng nâng cấp

| Ưu tiên | Phát hiện từ nguồn | Thay đổi trong repo và tiêu chí kiểm tra |
|---|---|---|
| 1. Bằng chứng cùng PR | Lauren mô tả review dựa vào đầu ra chạy thật, gồm ảnh, video, sơ đồ và kết quả kiểm chứng. Playwright trace chứa trạng thái UI, hành động và request để xem lại. | Bản cập nhật thêm smoke test lưu ảnh và trace khi checkout lỗi và khi hoạt động. Workflow upload gói bằng chứng vào lần chạy GitHub Actions và ghi commit đã test vào tóm tắt. [AI Engineer, 09:40](https://www.youtube.com/watch?v=O_zcc6Xl12g&t=580s) · [Trace Viewer](https://playwright.dev/docs/trace-viewer) · [GitHub Actions artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data) |
| 2. Bảo trì feature map | pstack đối chiếu map với code rồi chạy từng feature, kiểm tra sức khỏe app sau lỗi và bảo toàn bằng chứng. | Bước tiếp theo là check môi trường và audit một nhóm feature. Báo riêng map lỗi thời, harness lỗi, môi trường chưa sẵn sàng và regression của sản phẩm. Kiểm tra bằng selector đã cũ và HTTP 503 giả lập, lưu lần thất bại. Bản này đã thêm tùy chọn timeout cho trang chậm. [Maintain verification skill](https://github.com/cursor/plugins/blob/main/pstack/skills/maintain-verification-skill/SKILL.md) |
| 3. Nhật ký quyết định | pstack ghi từng quyết định có lý do, đường dẫn bằng chứng và kết quả. Với hill climb, cả thử nghiệm bị loại cũng có giá trị khi người khác review tiến trình. | Thêm nhật ký append-only cho các lần giữ, bỏ hoặc quay lui thay đổi. Một lượt kiểm tra phải chỉ ra được record nào dẫn tới đúng report hoặc trace, và ghi trường hợp kết quả chưa phân biệt được với nhiễu. [Show me your work](https://github.com/cursor/plugins/blob/main/pstack/skills/show-me-your-work/SKILL.md) |
| 4. Statechart có phản ví dụ | Lauren dùng statechart để xem các trạng thái và chuyển tiếp người dùng có thể gặp. Mô hình chỉ kiểm các thuộc tính đã viết. | Thử một ví dụ đơn hàng bị ghi hai lần khi retry sau timeout. Mô hình lỗi phải xuất đường đi tới trạng thái sai. Khi sửa invariant, chạy lại checker và kiểm tra một tình huống tương ứng qua CLI thật. [AI Engineer, 10:50](https://www.youtube.com/watch?v=O_zcc6Xl12g&t=650s) · [Statechart](https://github.com/cursor/plugins/blob/main/pstack/skills/statechart/SKILL.md) |

## Cách đánh giá

SWT-Bench đo chất lượng test tái hiện lỗi bằng khả năng **fail trước, pass sau** trên cùng điều kiện kiểm tra. Smoke test dùng một assertion checkout cho hai trạng thái fixture và xác nhận đường import cấm bằng một trường hợp hợp lệ đi kèm. Đây là phép kiểm cho những hành vi cụ thể của repo. [SWT-Bench, NeurIPS 2024](https://proceedings.neurips.cc/paper_files/paper/2024/hash/94f093b41fc2666376fb1f667fe282f3-Abstract-Conference.html)

Lauren báo cáo khoảng 11.000 PR của đội trong một tháng và tỷ lệ revert tương đối khoảng 0,5%. Bài nói không cung cấp phép so sánh có đối chứng cho từng kỹ thuật. Repo này nên báo cáo số kịch bản chạy được, các trường hợp fail trước/pass sau, trace còn mở được và ranh giới import đã kiểm. [AI Engineer, 13:32](https://www.youtube.com/watch?v=O_zcc6Xl12g&t=812s)

[Chạy smoke test](../scripts/README.vi.md#chạy-smoke-test-và-lấy-bằng-chứng)
