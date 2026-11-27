[English](layout.md) · **Tiếng Việt**

# Cấu trúc repo

Mỗi skill theo [đặc tả Agent Skills](https://agentskills.io/specification). Bốn nền tảng dùng chung một bộ skill và có manifest riêng ở thư mục gốc, theo cách [Superpowers](https://github.com/obra/superpowers) tổ chức plugin đa nền tảng. Tài liệu cấu trúc nằm trong `docs/` như [pstack](https://github.com/cursor/plugins/tree/main/pstack). Cấu hình marketplace của Claude theo [kho plugin chính thức của Claude](https://github.com/anthropics/claude-plugins-official).

```text
.
├── README.md / README.vi.md     # Cài đặt và danh mục skill
├── CONTRIBUTING.md             # Cách đóng góp và kiểm tra
├── docs/                       # Tài liệu về repo
├── skills/
│   └── <tên-skill>/
│       ├── SKILL.md            # Điểm vào để nền tảng nhận diện skill
│       └── references/
│           └── vi.md           # Hướng dẫn đọc khi có yêu cầu tiếng Việt
├── scripts/                    # CLI dùng chung, ví dụ và bài kiểm tra
├── research/                   # Nguồn và mốc thời gian trong video
├── .agents/plugins/            # Marketplace của Codex
├── .codex-plugin/              # Manifest của Codex
├── .claude-plugin/             # Manifest và marketplace của Claude Code
├── .antigravity-plugin/        # Manifest của Antigravity
├── gemini-extension.json       # Manifest của Gemini CLI
├── plugin.json                 # Manifest dùng chung
└── .github/workflows/          # Kiểm tra gói và lưu bằng chứng
```

Đặt tên thư mục trùng với trường `name` của skill. Trong `SKILL.md` tiếng Anh, viết rõ khi nào nên gọi skill trong trường `description`. Dẫn thẳng tới `references/vi.md` cho yêu cầu tiếng Việt. Khi thêm skill, cập nhật danh mục ở cả hai README.

Bài kiểm tra gói đọc thông tin đầu tệp skill, kiểm tra liên kết bản dịch, rồi đối chiếu manifest và mục cài đặt của cùng gói. Xem lệnh chạy trong [hướng dẫn đóng góp](../CONTRIBUTING.md).
