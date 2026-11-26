# Đối chiếu với ba video

| ID | Video chính | Bản lời nói đã đối chiếu |
|---|---|---|
| A | [Lauren Tan trên X, 21/09/2026 UTC](https://x.com/poteto/status/2102050467505430555) | [Bản phát lại YouTube](https://www.youtube.com/watch?v=NjoZoUm85x0) · [Transcript có timestamp](https://www.textpurr.com/transcript/how-i-shipped-2000-prs-last-month-trusting-ai-agentsgrok-botlauren-tan) |
| B | [Matt Pocock, 02/10/2026](https://www.youtube.com/watch?v=MN9dGgmLyso) | [Transcript Anh–Trung](https://aipodcast.jasonlin.tech/e/laurentan-mattpoco-2026/) · [Đối chiếu speaker và mốc bản gốc](https://mwolf.dev/library/live-poteto-creator-of-pstack-on-shipping-1-000-s-of-pr-s-a-month-at-spacex/analysis) · [Transcript bản đăng lại](https://sozai.app/transcript/lauren-tan-30-ai-agents-ship-prs/) |
| C | [YC Lightcone, 14/11/2026](https://www.youtube.com/watch?v=y1-9yeYLJUo) | [Trang tập của YC](https://www.ycombinator.com/library/n0-the-rise-of-ai-coworkers) · [Transcript có người nói và timestamp](https://ulisten.ai/channels/y-combinator/the-rise-of-ai-coworkers_y1-9yeYLJUo/transcript) |

Mốc A theo bản phát lại. Mốc B theo bản gốc, đối chiếu bản lời nói và chỉ mục người nói. Bản đăng lại B cắt khoảng nửa phút ở đầu. Mốc C theo video YC. Transcript bên thứ ba có thể nhận dạng sai tên riêng và gán nhầm lượt nói trong hội thoại chồng tiếng. Tên công cụ đối chiếu với [pstack của Lauren](https://github.com/cursor/plugins/blob/main/pstack/README.md). Ngày đối chiếu 26/11/2026. Các ghi chú diễn giải ý, và cột cuối chỉ vị trí áp dụng trong plugin.

## Trust

| Mốc | Ý Lauren trình bày | Áp dụng |
|---|---|---|
| [A · 00:09](https://www.youtube.com/watch?v=NjoZoUm85x0&t=9s), [A · 04:14](https://www.youtube.com/watch?v=NjoZoUm85x0&t=254s); [B · 01:58](https://www.youtube.com/watch?v=MN9dGgmLyso&t=118s) | Số PR là hệ quả cô kể lại. Công việc bắt đầu từ việc trực tiếp bóc những chỗ cô phải trông agent và phải cầm DevTools. | Work Skill |
| [A · 00:56](https://www.youtube.com/watch?v=NjoZoUm85x0&t=56s), [B · 11:18–14:17](https://www.youtube.com/watch?v=MN9dGgmLyso&t=678s) | Michelin kitchen đặt trọng tâm vào chất lượng thành phẩm và người chịu trách nhiệm. Vai trò đổi khi công cụ, đào tạo và phân việc được cải thiện. | Work Skill, coordinate-agent-loops |
| [A · 05:59–06:44](https://www.youtube.com/watch?v=NjoZoUm85x0&t=359s), [A · 35:15–37:09](https://www.youtube.com/watch?v=NjoZoUm85x0&t=2115s) | Tăng từ vài agent chỉ sau khi môi trường tạo đủ tin cậy. Lỗi buộc người dùng can thiệp là đầu mối để cải tiến hệ thống. | Work Skill |

## Verification

| Mốc | Ý Lauren trình bày | Áp dụng |
|---|---|---|
| [A · 02:57–03:52](https://www.youtube.com/watch?v=NjoZoUm85x0&t=177s), [A · 07:11–08:37](https://www.youtube.com/watch?v=NjoZoUm85x0&t=431s) | Cô từng trực tiếp chạy Chrome DevTools, lấy trace và heap snapshot. ControlGlass cho agent tự điều khiển ứng dụng bằng CDP. | verification-harness |
| [A · 09:01–10:15](https://www.youtube.com/watch?v=NjoZoUm85x0&t=541s), [B · 20:32–22:47](https://www.youtube.com/watch?v=MN9dGgmLyso&t=1232s) | Giữ CLI dùng chung để khởi chạy, điều khiển và thu bằng chứng. B nêu Playwright và CDP, giảm việc mỗi phiên dựng lại script. | verification-harness |
| [A · 10:15–12:02](https://www.youtube.com/watch?v=NjoZoUm85x0&t=615s), [B · 18:53](https://www.youtube.com/watch?v=MN9dGgmLyso&t=1133s) | Dùng feature map như bộ nhớ có thể đọc. Nó nối tên tính năng, shortcut và control với screenshot mơ hồ. Đặt trong repo/skill và bảo trì tự động. | verification-harness |
| [A · 12:33–14:18](https://www.youtube.com/watch?v=NjoZoUm85x0&t=753s), [C · 40:23–42:00](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2423s) | Vòng viết → chạy → nhìn kết quả → sửa là vòng tối thiểu. Đúng hành vi, nhanh và code tốt cần bằng chứng khác nhau. | verification-harness, Work Skill |

Đối chiếu công cụ công khai với [tạo verification skill](https://github.com/cursor/plugins/blob/main/pstack/skills/create-verification-skill/SKILL.md).

## Performance

| Mốc | Ý Lauren trình bày | Áp dụng |
|---|---|---|
| [A · 03:24–04:14](https://www.youtube.com/watch?v=NjoZoUm85x0&t=204s), [A · 14:18](https://www.youtube.com/watch?v=NjoZoUm85x0&t=858s) | Trace để tìm hotspot và theo dõi số đo thực. Cô nêu khả năng lặp sửa và đo trong công việc tối ưu ở Cursor. | performance-hillclimb |
| [B · 16:14–18:53](https://www.youtube.com/watch?v=MN9dGgmLyso&t=974s) | Chấm tiến triển bằng một tín hiệu đo được, lấy cảm hứng từ AutoResearch của Karpathy. Verification đóng vòng phản hồi. | performance-hillclimb |

## Formal

| Mốc | Ý Lauren trình bày | Áp dụng |
|---|---|---|
| [A · 07:43–08:24](https://www.youtube.com/watch?v=NjoZoUm85x0&t=463s) | TLA+ và Lean là ví dụ về kiểm chứng invariant ở đầu khó hơn của phổ. Verification skill runtime đã hữu ích trong thực tế. | formal-verification |
| [B · 56:28–58:58](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3388s) | Với one-way door, khả năng kiểm chứng phụ thuộc domain. Cô nêu Bend và hướng phối hợp code với proof như khả năng tương lai. | formal-verification, verify-and-ship |

## Playbooks

| Mốc | Ý Lauren trình bày | Áp dụng |
|---|---|---|
| [A · 13:18–14:18](https://www.youtube.com/watch?v=NjoZoUm85x0&t=798s), [C · 27:05–28:35](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=1625s) | PStack/Poteto Mode chắt lọc cách engineer làm việc nghiêm túc. A kể tên debugging, feature development và prototyping. C nói repo nội bộ có Lauren Mode và cloud agent dùng cùng bộ skill. | engineering-playbooks, Work Skill |
| [B · 06:50–09:23](https://www.youtube.com/watch?v=MN9dGgmLyso&t=410s) | Domain expertise, diễn đạt intent và thuật ngữ rõ có sức nén. TDD và tautological tests xuất hiện trong thảo luận với Matt. | engineering-playbooks, recall-and-distill |
| [B · 21:20–24:33](https://www.youtube.com/watch?v=MN9dGgmLyso&t=1280s) | Chuyển phần quyết định được thành code, như CLI và codemod. Giữ phần cần phán đoán cho agent. | verification-harness, engineering-playbooks |
| [C · 43:56](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2636s) | Cô nói đã bỏ dùng plan mode trong cách làm hiện tại. Đây là mô tả thao tác riêng trên host. Plugin vẫn giữ intent và điều kiện đạt của việc đang làm. | Work Skill |

Chi tiết playbook và tên công khai đối chiếu với [pstack](https://github.com/cursor/plugins/blob/main/pstack/README.md). Việc công cụ có tên trong repo hiện tại không tự biến nó thành nội dung đã dạy trong cả ba video.

## Environment

| Mốc | Ý Lauren trình bày | Áp dụng |
|---|---|---|
| [A · 15:39–18:23](https://www.youtube.com/watch?v=NjoZoUm85x0&t=939s), [A · 36:22–37:09](https://www.youtube.com/watch?v=NjoZoUm85x0&t=2182s), [C · 45:45–47:38](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2745s) | Ưu tiên codebase và ràng buộc kiến trúc/data, rồi static analysis, sau đó rules/BugBot/skills. Style guide và review thủ công có phạm vi hẹp hơn. | agent-friendly-codebase |
| [A · 18:56–21:35](https://www.youtube.com/watch?v=NjoZoUm85x0&t=1136s), [B · 28:44–31:16](https://www.youtube.com/watch?v=MN9dGgmLyso&t=1724s) | Agent sao chép ví dụ đã thấy. Dune thiết kế đường chuẩn, convention và boundary, kể cả khi người điều khiển agent có ít context. | agent-friendly-codebase |
| [A · 23:08–25:14](https://www.youtube.com/watch?v=NjoZoUm85x0&t=1388s) | Comment hợp thức hóa workaround đã lan trong code. Dune cấm comment trong bối cảnh riêng. Lauren đề xuất gardener, một paved path và lint để chặn nợ kỹ thuật tăng thêm. | agent-friendly-codebase, codebase-gardening |
| [A · 26:42–29:47](https://www.youtube.com/watch?v=NjoZoUm85x0&t=1602s), [C · 48:40–49:47](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2920s) | Feature theo thư mục, phần chạy ở ranh giới riêng. Kiểm tra dependency graph ngăn import chéo main/renderer. C làm rõ lint kiểm tra imports, thời gian frame vẫn phải đo. | agent-friendly-codebase |
| [C · 50:37–51:51](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=3037s) | Lauren nói điều kiện token của cô khác nhiều đội. Chi phí, mức review và khả năng áp dụng cần đánh giá tại dự án. | Work Skill, verify-and-ship |

## Gardening

| Mốc | Ý Lauren trình bày | Áp dụng |
|---|---|---|
| [A · 24:28–26:13](https://www.youtube.com/watch?v=NjoZoUm85x0&t=1468s), [B · 45:51–46:43](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2751s) | Công việc gardener chủ động tìm mẫu xấu, ngăn lan và dọn nợ. Một phần PR là công việc này. | codebase-gardening |
| [B · 47:17–48:30](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2837s) | Routine tìm React footgun và ghi vào tài liệu. Đọc theo lô để nhận diện các trường hợp chung gốc. | codebase-gardening |

## Recall

| Mốc | Ý Lauren trình bày | Áp dụng |
|---|---|---|
| [B · 01:00:35–01:03:01](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3635s) | Chat cũ lưu các lần điều chỉnh agent. Chắt lọc thành skill hoặc lint. Recall giúp mang quyết định và bối cảnh sang phiên mới. | recall-and-distill |
| [B · 01:03:52–01:04:37](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3832s), [C · 27:34–28:19](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=1654s) | Skill có thể nhỏ lại khi model xử lý được các chi tiết. Lauren khuyên tự tạo bộ công cụ của mình, phối hợp với phần phù hợp của người khác. | recall-and-distill |

Đối chiếu cách tổ chức bằng [Recall công khai](https://github.com/cursor/plugins/blob/main/pstack/skills/recall/SKILL.md). Wayfinder là ví dụ công cụ của Matt.

## Orchestration

| Mốc | Ý Lauren trình bày | Áp dụng |
|---|---|---|
| [A · 32:33–34:41](https://www.youtube.com/watch?v=NjoZoUm85x0&t=1953s), [B · 35:08–38:33](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2108s) | Outer loop lấy báo cáo, alert và context. Inner loop dùng intent tại thời điểm giao việc để sửa và thử. Ví dụ gồm Slack, Sentry, Datadog, PlanetScale, Linear và X. | coordinate-agent-loops |
| [B · 40:49–44:22](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2449s), [C · 42:59–43:11](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2579s) | Lauren vận dụng cách giao context của Netflix. Grok Bot routines giao việc cho Cursor Projects. Coordinator nhận nhiều tín hiệu, nhóm theo nguyên nhân và phân cho workers. | coordinate-agent-loops |
| [C · 06:49–07:04](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=409s), [C · 12:14](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=734s), [C · 15:54–16:07](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=954s) | Thiết kế specialist hoặc team bot theo cách đội tổ chức công việc. Lauren nêu owner, manager, collaborator và các vấn đề xác thực/phân quyền cần tiếp tục xử lý. | coordinate-agent-loops |
| [C · 17:43–19:30](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=1063s), [C · 32:17–32:44](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=1937s) | Bot lead có thể chuyển phản hồi cho worker. Bot kỹ thuật hỏi bot dữ liệu về quy mô vấn đề trong Slack. Đặt bot vào chỗ cộng tác phù hợp và giữ trợ lý riêng ở ngoài kênh nhóm. | coordinate-agent-loops |
| [C · 41:45–43:11](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2505s) | Khi vòng kiểm chứng đã tin cậy, một alert vượt ngưỡng có thể khởi động agent dùng lại công cụ và tái hiện trên máy riêng. | coordinate-agent-loops |

## Release

| Mốc | Ý Lauren trình bày | Áp dụng |
|---|---|---|
| [B · 49:31–50:27](https://www.youtube.com/watch?v=MN9dGgmLyso&t=2971s), [B · 53:37–54:37](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3217s) | Lấy mẫu PR và audit commit sáng hôm sau. Điều chỉnh, revert hoặc thêm ràng buộc nếu mẫu lỗi lặp. | verify-and-ship |
| [B · 51:57–53:37](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3117s) | Full Autopilot dùng verifier chạy app, khám phá tương tác, tìm regression rồi sửa và chạy lại. Số verifier có thể giảm theo ngân sách. | verify-and-ship |
| [C · 44:34–46:10](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2674s) | Interrogate dùng các model family khác nhau. Lauren đã giảm mức dùng adversarial review vì chi phí và nguy cơ tối ưu cho feedback ngoài mục tiêu. | verify-and-ship |
| [B · 56:28](https://www.youtube.com/watch?v=MN9dGgmLyso&t=3388s), [C · 47:38](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=2858s) | Khả năng kiểm chứng ảnh hưởng mức tự chủ. Cô vẫn giữ người trong vòng với hạ tầng, database và deployment nhạy cảm. | verify-and-ship |
| [C · 53:46–54:10](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=3226s) | Roman mô tả Sandy xử lý bug nhỏ từ feedback. Lauren xác nhận ví dụ phát hành tự động lúc 3 giờ sáng. Đây là case đã kể trong đội. | verify-and-ship |

Đối chiếu công cụ và điều kiện chạy qua đêm với [Interrogate](https://github.com/cursor/plugins/blob/main/pstack/skills/interrogate/SKILL.md) và [hướng dẫn overnight](https://github.com/cursor/plugins/blob/main/pstack/docs/guide/07-overnight.md).

## Product

| Mốc | Ý Lauren trình bày | Áp dụng |
|---|---|---|
| [C · 23:18–26:48](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=1398s) | Lauren kể việc cùng đồng nghiệp/PM lặp feature trong một Slack thread. Cloud agent chạy trong VM, trả screenshot/video và được điều chỉnh qua các vòng phản hồi. | product-iteration |
| [C · 54:14–55:05](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=3254s) | Roman mô tả dogfooding trước khi phát hành thay đổi UX. Lauren nhấn mạnh phán đoán, taste và trải nghiệm được thiết kế có chủ đích. | product-iteration |
| [C · 58:24–59:37](https://www.youtube.com/watch?v=y1-9yeYLJUo&t=3504s) | Cô nói thêm về giao tiếp và kể chuyện khi chia sẻ công việc. Đây là lời khuyên nghề nghiệp, ngoài quy trình kỹ thuật trực tiếp. | Ghi nhận phạm vi |
