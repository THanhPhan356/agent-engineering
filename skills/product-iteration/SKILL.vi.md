[English](SKILL.md) · Tiếng Việt

# Lặp feature trong một nơi chung

1. Từ báo cáo hay ý tưởng, ghi người dùng nào gặp vấn đề, kết quả mong muốn và câu hỏi sản phẩm cần quyết. Giữ yêu cầu và phản hồi trong thread hoặc artifact nhóm đã dùng. Khi lời góp ý mâu thuẫn, xác nhận người chịu trách nhiệm quyết định.
2. Cho agent lấy bối cảnh được phép, dựng lát cắt trong môi trường chạy cô lập và gửi screenshot/video thể hiện đường đi thật. Nếu cần xác nhận quy mô, lấy số liệu từ nguồn dữ liệu đúng quyền. Ghi rõ mỗi artifact thể hiện hành vi nào.
3. Đưa artifact cho các bên ở cùng thread. Thu một vòng phản hồi, chốt intent và những điều phải giữ, sau đó lặp trên phiên bản tiếp theo. Có thể kiểm tra code bằng quy trình phù hợp với rủi ro. Cảnh UI trong video là đầu vào thảo luận về trải nghiệm.
4. Đánh giá thay đổi theo mục tiêu và sự nhất quán của sản phẩm. Khi chạm luồng cốt lõi hoặc thói quen người dùng, có người duyệt sản phẩm và thời gian thử phù hợp trước khi ship. Tách sửa bug nhỏ đã tái hiện khỏi quyết định thay đổi UX. Không dùng việc agent hoàn thành được để quyết định phát hành.
5. Chốt bằng bản demo, acceptance đã kiểm chứng, quyết định UX, đường dẫn issue/PR nếu có và phần cần tiếp tục. Giữ quan sát phiên bản sau phản hồi để có thể so trước/sau.

Lauren minh họa bằng một feature hoàn thành trong thread Slack dài khoảng 200 tin nhắn với đồng nghiệp và PM, trong khi agent VM gửi screenshot/video. Dogfooding cụ thể của nhóm do Roman Ugarte mô tả. Lauren bổ sung vai trò của taste và việc thiết kế có chủ đích. [Nguồn và timestamp](../../research/evidence.md#product).
