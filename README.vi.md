<p align="center">
  <a href="README.md">English</a> · <strong>Tiếng Việt</strong>
</p>

<h1 align="center">Agent Engineering</h1>

Bộ 11 skill và CLI để xây vòng tự kiểm chứng, đặt ràng buộc trong codebase và quyết định khi nào có đủ bằng chứng để mở rộng quyền tự chủ. Các quy trình được chắt lọc từ ba video công khai của Lauren Tan. [pstack của Lauren](https://github.com/cursor/plugins/tree/main/pstack)

[Cài đặt](#cài-đặt) · [Chọn skill](#chọn-skill) · [CLI](#cli-cho-agent) · [CI và bằng chứng](#ci-và-bằng-chứng) · [Cấu trúc repo](docs/layout.vi.md) · [Đóng góp](CONTRIBUTING.md)

## Cài đặt

| Host | Cách cài | Cách gọi |
|---|---|---|
| Codex | `codex plugin marketplace add THanhPhan356/agent-engineering`, rồi `codex plugin add agent-engineering@agent-engineering-marketplace` | `$engineering-workflow` |
| Claude Code | `claude plugin marketplace add THanhPhan356/agent-engineering`, rồi `claude plugin install agent-engineering@agent-engineering-marketplace` | `/agent-engineering:engineering-workflow` |
| Google Antigravity | `agy plugin install https://github.com/THanhPhan356/agent-engineering` | `/engineering-workflow` |
| Gemini CLI | `gemini extensions install https://github.com/THanhPhan356/agent-engineering` | Yêu cầu Gemini dùng `engineering-workflow` |

Các host dùng chung bộ skill và CLI. Khi yêu cầu bằng tiếng Việt, agent đọc hướng dẫn tiếng Việt của skill. Với bản clone trên máy, truyền đường dẫn thư mục cho lệnh cài.

Nếu Antigravity trên Windows báo `Access is denied` khi cài từ bản clone Git, xuất plugin bằng `git archive --format=zip -o <đường-dẫn-zip> HEAD`, giải nén vào thư mục mới rồi truyền thư mục đó cho `agy plugin install`.

Thử gọi `verification-harness` theo cú pháp trong bảng với yêu cầu “Tái hiện luồng checkout và lưu trace trước/sau”.

## Chọn skill

| Skill | Dùng khi |
|---|---|
| [engineering-workflow](skills/engineering-workflow/references/vi.md) | Cần tìm vòng làm việc nhỏ nhất hoặc quyết định nên đầu tư vào đâu trước |
| [verification-harness](skills/verification-harness/references/vi.md) | Cần cho agent tự chạy ứng dụng và thu bằng chứng lặp lại được |
| [performance-hillclimb](skills/performance-hillclimb/references/vi.md) | Cần cải thiện một metric từ baseline bằng trace và thí nghiệm nối tiếp |
| [formal-verification](skills/formal-verification/references/vi.md) | Cần kiểm chứng invariant mà ví dụ runtime khó bao phủ |
| [engineering-playbooks](skills/engineering-playbooks/references/vi.md) | Cần chọn cách debug, làm feature, prototype hoặc refactor theo tinh thần Poteto Mode |
| [agent-friendly-codebase](skills/agent-friendly-codebase/references/vi.md) | Cần biến quy ước hoặc lỗi tái diễn thành đường chuẩn, type, lint hay CI |
| [codebase-gardening](skills/codebase-gardening/references/vi.md) | Cần gom anti-pattern, ngăn lan rộng và dọn các mẫu xấu |
| [recall-and-distill](skills/recall-and-distill/references/vi.md) | Cần lấy lại bối cảnh hoặc biến các lần sửa agent thành workflow dùng lại |
| [coordinate-agent-loops](skills/coordinate-agent-loops/references/vi.md) | Cần nối tín hiệu từ bên ngoài với coordinator và coding agent |
| [verify-and-ship](skills/verify-and-ship/references/vi.md) | Cần review, kiểm chứng độc lập, chuẩn bị merge hoặc kiểm tra sau merge |
| [product-iteration](skills/product-iteration/references/vi.md) | Cần lặp thiết kế cùng nhóm trong một thread và quyết định dựa trên sản phẩm chạy được |

## CLI cho agent

- `list` kiểm tra feature map và liệt kê các kịch bản.
- `verify` chạy luồng thật bằng Playwright và lưu báo cáo, ảnh chụp và trace. Có thể thu thêm CPU profile, heap snapshot và video.
- `compare` đối chiếu timing baseline và candidate của cùng kịch bản.
- `boundaries` phát hiện import runtime vi phạm ranh giới TypeScript, kể cả qua module trung gian. [Mã kiểm tra](scripts/boundaries.mjs) · [Cấu hình mẫu](scripts/examples/boundaries.json)

Với Node.js 20 trở lên, chạy từ thư mục gốc để xem các kịch bản trong feature map mẫu.

```sh
node scripts/agent-engineering.mjs list scripts/examples/feature-map.json
```

Cài các dependency theo hướng dẫn trước khi chạy kiểm chứng bằng trình duyệt hoặc kiểm tra TypeScript. [Cách chạy CLI và cấu hình mẫu](scripts/README.vi.md)

## CI và bằng chứng

Workflow **Verification evidence** chạy khi mở hoặc cập nhật PR và khi push vào `main`. Smoke test trên Chromium tái hiện lỗi checkout, kiểm chứng bản sửa và thử quy tắc import TypeScript. Mở lần chạy thành công, vào **Artifacts** và tải **agent-engineering-evidence** để xem ảnh chụp, Playwright trace, báo cáo JSON và commit đã thử. [Các lần chạy](https://github.com/THanhPhan356/agent-engineering/actions/workflows/evidence.yml) · [Lần chạy mẫu trên main](https://github.com/THanhPhan356/agent-engineering/actions/runs/45978860947)

Để chạy kiểm tra cấu trúc plugin và lint trên máy, dùng Node.js từ 22.13 trong dòng 22.x hoặc Node.js 24 trở lên.

```sh
npm ci --prefix scripts
npm --prefix scripts run check:package
npm --prefix scripts run lint
```

`check:package` kiểm tra metadata của skill, manifest, mục cài đặt trong marketplace và link Markdown nội bộ. ESLint kiểm tra JavaScript của repo. [Mã kiểm tra gói](scripts/test/check-package.mjs) · [Cấu hình ESLint](scripts/eslint.config.mjs) · [Chạy smoke test trên máy](scripts/README.vi.md#chạy-smoke-test-và-lấy-bằng-chứng)

## Nguồn và cách áp dụng

[Ma trận bằng chứng](research/evidence.md) dẫn từng ý về video và timestamp. [Nhận định và giới hạn](research/appraisal.md) ghi chỗ các nguồn hội tụ, khác nhau và những tình huống đã dùng để kiểm tra skill. [Ghi chú nghiên cứu Distilly](research/merged/summary.md) tổng hợp sáu nhóm quan sát. Các bước trong skill là hướng dẫn vận hành trên các host đã nêu. Kết nối Slack, runtime ứng dụng, CI, môi trường cloud và quyền merge lấy từ dự án đang dùng.

[Nghiên cứu bổ sung](research/follow-up.md) đối chiếu các nguồn về bằng chứng cho PR, bảo trì feature map, nhật ký quyết định và statechart.
