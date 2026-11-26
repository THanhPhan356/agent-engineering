# CLI cho Agent Engineering

[English](README.md) · Tiếng Việt

Chạy bằng Node.js 20 trở lên. Repo đang kiểm tra giữ cấu hình, fixture và lệnh khởi động app. CLI chạy kịch bản lặp lại được từ cấu hình đó.

## Cài dependency cho một bản sao mới

Từ thư mục plugin, chạy `npm ci --prefix scripts`. Dùng Chromium của Playwright sau khi chạy `node scripts/node_modules/playwright/cli.js install chromium` hoặc truyền `--channel msedge` hay `--channel chrome` cho browser đã cài. Nếu muốn quay video, chạy `node scripts/node_modules/playwright/cli.js install ffmpeg` một lần. Lệnh `list` và `compare` chạy với Node.js thuần.

## Kiểm chứng một luồng web

Tạo bản sao [feature map](examples/feature-map.json) trong repo và đổi route, selector, dữ liệu thử, assertion theo ứng dụng thật. Khởi động app test theo cách thông thường. Từ terminal, gọi CLI bằng đường dẫn tuyệt đối nếu đang đứng ngoài thư mục plugin.

```powershell
$cli = "C:/path/to/agent-engineering/scripts/agent-engineering.mjs"
node $cli list .agent-engineering/feature-map.json
node $cli verify .agent-engineering/feature-map.json checkout --base-url http://localhost:3000 --out .agent-engineering/evidence/checkout-after --channel msedge --cpu
```

Mỗi lượt dùng context mới và lưu `report.json`, ảnh cuối cùng và trace. Thêm `--heap` để lấy heap cuối lượt, hoặc `--video` để ghi WebM. Các bước hỗ trợ click, fill, press, expectVisible và expectText. `expectText` tìm đoạn văn bản phân biệt hoa thường trong phần tử hiển thị. Chỉ dùng dữ liệu thử trong kịch bản vì trace và video có thể chứa dữ liệu hiển thị.

## So hiệu năng

Chạy cùng một feature với `--runs 5` trên baseline và candidate, cùng loại browser, cấu hình build, dữ liệu và máy. Dùng thư mục kết quả mới cho mỗi lần. Thêm trường `"measure": "checkout-submit"` vào feature nếu app có `performance.measure('checkout-submit', ...)`. Nếu không có, CLI dùng thời lượng từ điều hướng tới assertion cuối trong browser.

```powershell
node $cli compare .agent-engineering/evidence/baseline/report.json .agent-engineering/evidence/candidate/report.json --min-percent 5
```

Lệnh trả median, MAD và verdict `improved`, `regressed` hoặc `inconclusive`. Ngưỡng lấy giá trị lớn nhất giữa tỷ lệ cải thiện tối thiểu và hai lần MAD của mỗi phía. Đây là ngưỡng thực hành để đọc kết quả, cùng với trace và điều kiện thực tế.

## Soát ranh giới import

Đặt bản sao [config mẫu](examples/boundaries.json) ở gốc dự án và sửa đường dẫn.

```powershell
node $cli boundaries agent-boundaries.json
```

Lệnh dùng TypeScript compiler để resolve module theo `tsconfig` và trả một chuỗi phụ thuộc cho mỗi module chạm ranh giới cấm. Nó theo import, re-export, `import()` hoặc `require()` có tên literal trong chương trình TypeScript. Import chỉ chứa type, tên module tính ở runtime và alias riêng của bundler nằm ngoài phạm vi check. Mã thoát `1` nghĩa là assertion/thu artifact thất bại hoặc có vi phạm import. Mã `2` nghĩa là lỗi cấu hình, dependency hoặc môi trường.
