<p align="center">
  <a href="README.md">English</a> · <strong>Tiếng Việt</strong>
</p>

<h1 align="center">Agent Engineering</h1>

Bộ 11 skill và CLI để xây vòng tự kiểm chứng, đặt ràng buộc trong codebase và quyết định khi nào có đủ bằng chứng để mở rộng quyền tự chủ. Các quy trình được chắt lọc từ ba video công khai của Lauren Tan. [pstack của Lauren](https://github.com/cursor/plugins/tree/main/pstack)

## Cài đặt

| Host | Cách cài | Cách gọi |
|---|---|---|
| Codex | `codex plugin marketplace add THanhPhan356/agent-engineering`, rồi `codex plugin add agent-engineering@agent-engineering-marketplace` | `$engineering-workflow` |
| Claude Code | `claude plugin marketplace add THanhPhan356/agent-engineering`, rồi `claude plugin install agent-engineering@agent-engineering-marketplace` | `/agent-engineering:engineering-workflow` |
| Google Antigravity | `agy plugin install https://github.com/THanhPhan356/agent-engineering` | `/engineering-workflow` |
| Gemini CLI | `gemini extensions install https://github.com/THanhPhan356/agent-engineering` | Yêu cầu Gemini dùng `engineering-workflow` |

Các host dùng chung bộ skill và CLI. Khi yêu cầu bằng tiếng Việt, agent đọc hướng dẫn tiếng Việt của skill. Với bản clone trên máy, truyền đường dẫn thư mục cho lệnh cài.

Nếu Antigravity trên Windows báo `Access is denied` khi cài từ bản clone Git, xuất plugin bằng `git archive --format=zip -o <đường-dẫn-zip> HEAD`, giải nén vào thư mục mới rồi truyền thư mục đó cho `agy plugin install`.

## Chọn skill

| Skill | Dùng khi |
|---|---|
| [engineering-workflow](skills/engineering-workflow/SKILL.vi.md) | Cần tìm vòng làm việc nhỏ nhất hoặc quyết định nên đầu tư vào đâu trước |
| [verification-harness](skills/verification-harness/SKILL.vi.md) | Cần cho agent tự chạy ứng dụng và thu bằng chứng lặp lại được |
| [performance-hillclimb](skills/performance-hillclimb/SKILL.vi.md) | Cần cải thiện một metric từ baseline bằng trace và thí nghiệm nối tiếp |
| [formal-verification](skills/formal-verification/SKILL.vi.md) | Cần kiểm chứng invariant mà ví dụ runtime khó bao phủ |
| [engineering-playbooks](skills/engineering-playbooks/SKILL.vi.md) | Cần chọn cách debug, làm feature, prototype hoặc refactor theo tinh thần Poteto Mode |
| [agent-friendly-codebase](skills/agent-friendly-codebase/SKILL.vi.md) | Cần biến quy ước hoặc lỗi tái diễn thành đường chuẩn, type, lint hay CI |
| [codebase-gardening](skills/codebase-gardening/SKILL.vi.md) | Cần gom anti-pattern, ngăn lan rộng và dọn các mẫu xấu |
| [recall-and-distill](skills/recall-and-distill/SKILL.vi.md) | Cần lấy lại bối cảnh hoặc biến các lần sửa agent thành workflow dùng lại |
| [coordinate-agent-loops](skills/coordinate-agent-loops/SKILL.vi.md) | Cần nối tín hiệu từ bên ngoài với coordinator và coding agent |
| [verify-and-ship](skills/verify-and-ship/SKILL.vi.md) | Cần review, kiểm chứng độc lập, chuẩn bị merge hoặc kiểm tra sau merge |
| [product-iteration](skills/product-iteration/SKILL.vi.md) | Cần lặp thiết kế cùng nhóm trong một thread và quyết định dựa trên sản phẩm chạy được |

Ví dụ gọi trực tiếp `$verification-harness Tái hiện luồng checkout và lưu trace trước/sau`.

## CLI cho agent

- `list` và `verify` đọc feature map, chạy luồng thật bằng Playwright và lưu kết quả, screenshot, trace. Có thể thu CPU profile, heap snapshot và video.
- `compare` đối chiếu timing baseline và candidate của cùng kịch bản.
- `boundaries` kiểm tra import runtime trực tiếp và qua các module trung gian trong dự án TypeScript.

[Cách chạy và cấu hình mẫu](scripts/README.vi.md)

[Smoke test của repo](scripts/README.vi.md#chạy-smoke-test-và-lấy-bằng-chứng) lưu ảnh, trace và JSON cho cả checkout lỗi lẫn checkout đã sửa. Workflow **Verification evidence** dẫn tới gói đó từ phần tóm tắt trên GitHub Actions.

## Nguồn và cách áp dụng

[Ma trận bằng chứng](research/evidence.md) dẫn từng ý về video và timestamp. [Nhận định và giới hạn](research/appraisal.md) ghi chỗ các nguồn hội tụ, khác nhau và những tình huống đã dùng để kiểm tra skill. [Ghi chú nghiên cứu Distilly](research/merged/summary.md) tổng hợp sáu nhóm quan sát. Các bước trong skill là hướng dẫn vận hành trên các host đã nêu. Kết nối Slack, runtime ứng dụng, CI, môi trường cloud và quyền merge lấy từ dự án đang dùng.

[Nghiên cứu bổ sung](research/follow-up.md) đối chiếu các nguồn về bằng chứng cho PR, bảo trì feature map, nhật ký quyết định và statechart.
