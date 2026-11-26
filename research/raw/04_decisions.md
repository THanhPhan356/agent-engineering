# Quyết định, trade-off và evidence

## Source Metadata

- primary source, YC đoạn planning/review. Source weight: 1. https://www.youtube.com/watch?v=y1-9yeYLJUo
- primary source, skill Interrogate. Source weight: 2. https://github.com/cursor/plugins/blob/main/pstack/skills/interrogate/SKILL.md
- primary source, hướng dẫn overnight. Source weight: 2. https://github.com/cursor/plugins/blob/main/pstack/docs/guide/07-overnight.md

## Evidence

- Lauren đối chiếu runtime verification với code quality. Cô đưa type, cấu trúc, lint và CI vào những chỗ quy tắc có thể máy hóa.
- Cô chuyển lỗi React vào bộ đệm trong B, thay vì chữa mỗi lần, rồi nhìn nhiều ví dụ trước khi quyết định.
- Cô dùng review đa mô hình có chọn lọc và quan tâm nhất đến finding tái hiện được, liên quan tới mục tiêu.

## Contradictions

- Import checker chặn một lớp nguy cơ ở renderer. Việc app chạy nhanh vẫn cần quan sát bằng trace.

## Inferences

- Xử lý anti-pattern ở cấp nguyên nhân có thể giảm số lần sửa cùng một lỗi. Hướng này chưa có số liệu đối chứng trong corpus.

## Gaps and Missing Information

- Chưa có dữ liệu so sánh số verifier, chi phí, review latency hoặc incident rate cho từng loại PR.
