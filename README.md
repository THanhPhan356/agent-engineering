# Agent Engineering

Plugin Codex độc lập bằng tiếng Việt, dựa trên ba video của Lauren Tan. Dùng nó để xây vòng tự kiểm chứng, đặt ràng buộc trong codebase và quyết định khi nào có đủ bằng chứng để mở rộng quyền tự chủ. Đây là bản triển khai phương pháp cho Codex của người tổng hợp. [pstack chính thức](https://github.com/cursor/plugins/tree/main/pstack)

## Chọn skill

| Skill | Dùng khi |
|---|---|
| [engineering-workflow](skills/engineering-workflow/SKILL.md) | Cần tìm vòng làm việc nhỏ nhất hoặc quyết định nên đầu tư vào đâu trước |
| [verification-harness](skills/verification-harness/SKILL.md) | Cần cho agent tự chạy ứng dụng và thu bằng chứng lặp lại được |
| [performance-hillclimb](skills/performance-hillclimb/SKILL.md) | Cần cải thiện một metric từ baseline bằng trace và thí nghiệm nối tiếp |
| [formal-verification](skills/formal-verification/SKILL.md) | Cần kiểm chứng invariant mà ví dụ runtime khó bao phủ |
| [engineering-playbooks](skills/engineering-playbooks/SKILL.md) | Cần chọn cách debug, làm feature, prototype hoặc refactor theo tinh thần Poteto Mode |
| [agent-friendly-codebase](skills/agent-friendly-codebase/SKILL.md) | Cần biến quy ước hoặc lỗi tái diễn thành đường chuẩn, type, lint hay CI |
| [codebase-gardening](skills/codebase-gardening/SKILL.md) | Cần gom anti-pattern, ngăn lan rộng và dọn các mẫu xấu |
| [recall-and-distill](skills/recall-and-distill/SKILL.md) | Cần lấy lại bối cảnh hoặc biến các lần sửa agent thành workflow dùng lại |
| [coordinate-agent-loops](skills/coordinate-agent-loops/SKILL.md) | Cần nối tín hiệu từ bên ngoài với coordinator và coding agent |
| [verify-and-ship](skills/verify-and-ship/SKILL.md) | Cần review, kiểm chứng độc lập, chuẩn bị merge hoặc kiểm tra sau merge |
| [product-iteration](skills/product-iteration/SKILL.md) | Cần lặp thiết kế cùng nhóm trong một thread và quyết định dựa trên sản phẩm chạy được |

Ví dụ gọi trực tiếp `$verification-harness Tái hiện luồng checkout và lưu trace trước/sau`.

## CLI cho agent

- `list` và `verify` đọc feature map, chạy luồng thật bằng Playwright và lưu kết quả, screenshot, trace. Có thể thu CPU profile, heap snapshot và video.
- `compare` đối chiếu timing baseline và candidate của cùng kịch bản.
- `boundaries` kiểm tra import runtime trực tiếp và qua các module trung gian trong dự án TypeScript.

[Cách chạy và cấu hình mẫu](scripts/README.md)

## Nguồn và cách áp dụng

[Ma trận bằng chứng](research/evidence.md) dẫn từng ý về video và timestamp. [Nhận định và giới hạn](research/appraisal.md) ghi chỗ các nguồn hội tụ, khác nhau và những tình huống đã dùng để kiểm tra skill. [Ghi chú nghiên cứu Distilly](research/merged/summary.md) tổng hợp sáu nhóm quan sát. Các bước trong skill là hướng dẫn vận hành cho Codex. Kết nối Slack, runtime ứng dụng, CI, môi trường cloud và quyền merge lấy từ dự án đang dùng.
