[English](SKILL.md) · Tiếng Việt

# Vòng tự kiểm chứng kiểu ControlGlass

## Xây vòng nhỏ nhất

1. Chọn một hành vi người dùng thật hay một lỗi có thể tái hiện. Ghi đầu vào, trạng thái ban đầu, hành động, tín hiệu quan sát được và điều kiện đạt. Với báo cáo mơ hồ, tìm các đường đi khả dĩ trong feature map và kiểm tra trong app.
2. Tìm cách dự án hiện chạy ứng dụng, test và thu artifact. Dùng CLI có sẵn. Khi mỗi agent phải tự dựng lại thao tác, đưa phần ổn định vào CLI/script trong repo, kiểm tra nó trên một lượt chạy sạch và ghi lệnh chính xác trong skill.
3. Để agent chạy luồng như người dùng. Chọn công cụ theo app, ví dụ Playwright hoặc CDP cho trình duyệt/Electron, CLI test cho backend. Chuẩn hóa khởi chạy, dấu hiệu sẵn sàng, reset fixture, chọn cửa sổ/route, điều khiển, quan sát, xuất artifact và dọn tiến trình. Nếu có nhiều phiên đồng thời, tách port, profile và dữ liệu test. Logic đặt giả thuyết, đọc trace và quyết định sửa giao cho agent.
4. Chạy trước khi sửa để thấy lỗi. Chạy lại cùng kịch bản sau khi sửa, đối chiếu tín hiệu, kiểm tra một hành vi lân cận có thể bị ảnh hưởng. Nếu môi trường hoặc dữ liệu không tái hiện được, ghi rõ phần thiếu và dùng phép kiểm tra thay thế có giới hạn.
5. Phân biệt ba kết quả. Hành vi đúng dựa vào assert hoặc trạng thái quan sát được. Hiệu năng cần phép đo và baseline. Chất lượng triển khai cần cấu trúc và ràng buộc của repo, cùng review khi thích hợp. Một video thành công chỉ chứng minh luồng quan sát được.

## Feature map

Giữ bản đồ cạnh CLI/skill, ưu tiên mục mà user thật có thể mô tả bằng hình cắt hoặc từ ngữ mơ hồ. Với mỗi mục, ghi tên thường gọi, route hoặc shortcut, điều kiện bật, fixture, control/selector bền vững nếu có, hành động, tín hiệu thành công và đường dẫn code. Ghi ngày hoặc commit xác nhận. Chốt nguồn sự thật bằng code hiện tại và một lượt chạy thật. Cập nhật khi luồng hoặc tên đổi, bỏ các bước cũ. Nếu repo đã có automation bảo trì, dùng nó để phát hiện drift.

## Chạy CLI của plugin

Nếu repo chưa có harness và có thể chạy ứng dụng qua HTTP, dùng [CLI](../../scripts/agent-engineering.mjs) theo [hướng dẫn](../../scripts/README.vi.md). Lấy [feature map mẫu](../../scripts/examples/feature-map.json), thay route và selectors bằng luồng thật, rồi chạy `list` để kiểm tra bản đồ và `verify` để chạy trong browser sạch. Giữ `report.json` cùng trace và screenshot. Bật `--cpu`, `--heap` hoặc `--video` khi cần artifact tương ứng. Khi có đường kiểm chứng sẵn trong repo, dùng đường đó.

## Bằng chứng

| Cần xác nhận | Bằng chứng |
|---|---|
| Hành vi, thao tác, chuyển trạng thái | Lệnh, assertion, screenshot hoặc video thể hiện trước/sau |
| Giật, treo, CPU cao | Trace/CPU profile có kịch bản, mốc hành động và commit |
| Nghi rò bộ nhớ | Heap snapshot tại các mốc tương ứng và vòng lặp tái hiện |
| Backend hoặc API | Request/fixture, đáp ứng và trạng thái quan sát qua entry point được hỗ trợ |

Trả về lệnh tái chạy, môi trường, kết quả trước/sau, artifact path, trạng thái đạt và phạm vi còn chưa thử. Nếu đang thiết kế harness, bàn giao thêm bố trí feature map và lượt chạy xác nhận CLI.

[Nguồn và timestamp](../../research/evidence.md#verification).
