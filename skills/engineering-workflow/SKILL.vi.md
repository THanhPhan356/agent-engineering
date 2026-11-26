[English](SKILL.md) · Tiếng Việt

# Agent Engineering

Dùng Work Skill này khi cần áp dụng cách Lauren xây môi trường để coding agent có thể tự sửa và tự kiểm chứng. Đầu ra là một lựa chọn cụ thể cho repo người dùng hoặc một thay đổi đã có bằng chứng.

## Mental models

- **Vòng nhỏ nhất.** Chọn một đường người dùng, cho agent tự chạy và quan sát. Từ đó mới cho nó lặp sửa, đo và kiểm chứng.
- **Codebase là bộ nhớ.** Agent mở đâu thường sao chép mẫu ở đó. Viết lại đường chuẩn và ràng buộc data/API trước, tiếp đến lint/compiler/CI, rồi dùng rule hay skill cho phần cần ngữ cảnh.
- **Đầu tư vào trust trước khi tăng quy mô.** Khi việc phải trông giảm nhờ evidence, giao phạm vi rộng hơn theo khả năng kiểm chứng và hoàn tác. Người vận hành vẫn chịu trách nhiệm với thành phẩm.
- **Phân bổ determinism.** Chuyển thao tác lặp được sang CLI/codemod, dùng agent ở nơi cần suy luận, dùng người ở nơi cần mục tiêu, taste hoặc quyền quyết định.

## Agentic protocol

1. Xác định intent, hành vi đích, điều kiện khách quan có thể kiểm và quyền đã được cấp.
2. Tìm công cụ chạy repo và phép đo hiện có. Nếu người dùng đang phải trực tiếp chạy app hoặc cung cấp ảnh cho agent, ưu tiên đóng một vòng verification trước.
3. Định tuyến theo bottleneck. Đọc skill con trước khi làm. Chỉ phối hợp nhiều skill khi phụ thuộc thực tế cần chúng.
4. Chạy một lượt có bằng chứng. Ghi điều kiện, trạng thái, artifact và người quyết định tiếp theo. Nếu thấy lỗi được lặp lại, chuyển correction vào lớp hiệu lực cao nhất.
5. Mở rộng sang nhiều tác vụ, nguồn sự kiện và teamwork khi vòng đã có dấu hiệu lặp lại ổn định. Đối với thay đổi khó hoàn tác, giữ người duyệt và nêu giới hạn xác minh.

| Nút thắt | Skill dùng |
|---|---|
| Agent không tự điều khiển được app hoặc đọc báo cáo thiếu bối cảnh | [verification-harness](../verification-harness/SKILL.vi.md) |
| Thấy giật, chậm, leak hoặc muốn cải thiện metric | [performance-hillclimb](../performance-hillclimb/SKILL.vi.md) |
| Cần kiểm tra invariant qua nhiều trạng thái, retry hoặc tương tác | [formal-verification](../formal-verification/SKILL.vi.md) |
| Cần fix, feature, prototype hoặc refactor có bằng chứng | [engineering-playbooks](../engineering-playbooks/SKILL.vi.md) |
| Trượt cùng một quy tắc khi sửa app | [agent-friendly-codebase](../agent-friendly-codebase/SKILL.vi.md) |
| Nhiều dấu hiệu cùng họ, chưa biết có chung nguyên nhân | [codebase-gardening](../codebase-gardening/SKILL.vi.md) |
| Mất bối cảnh khi đổi phiên hoặc người dùng cứ sửa cùng một lỗi | [recall-and-distill](../recall-and-distill/SKILL.vi.md) |
| Con người còn sao chép các báo cáo giữa công cụ và coding agent | [coordinate-agent-loops](../coordinate-agent-loops/SKILL.vi.md) |
| Cần audit, dùng verifier độc lập hoặc đánh giá việc có nên tự merge | [verify-and-ship](../verify-and-ship/SKILL.vi.md) |
| PM, designer và engineer cần chốt sản phẩm dựa trên bản chạy được | [product-iteration](../product-iteration/SKILL.vi.md) |

## Evidence and limitations

- **Expression DNA.** Michelin kitchen giải thích trách nhiệm, đào tạo và công cụ. Thuật ngữ kỹ thuật nên làm rõ phải quan sát hay quyết định gì.
- **Tension.** Tăng tốc và giảm chi phí review phải cân với chất lượng thực tế. Chạy app chứng minh được hành vi đã thử. Chất lượng cấu trúc và rủi ro phát hành có lớp kiểm tra riêng.
- **Honest boundaries.** Các ví dụ ControlGlass, Dune nội bộ và quy trình Grok Bot không cho ta toàn bộ cách triển khai. Không dự báo throughput từ số PR Lauren tự báo.
- **Intellectual genealogy.** AutoResearch gợi ý hill climb. Netflix gợi ý trao context. GStack gợi ý xây bộ công cụ cá nhân. Matt Pocock đóng góp ví dụ về phrasing và các skill ghép được.

[Ma trận timestamp](../../research/evidence.md) · [Nhận định](../../research/appraisal.md)

- [Bài nói gốc của Lauren](https://x.com/poteto/status/2102050467505430555)
- [Video cùng Matt Pocock](https://www.youtube.com/watch?v=MN9dGgmLyso)
- [YC Lightcone](https://www.youtube.com/watch?v=y1-9yeYLJUo)
- [pstack của Lauren](https://github.com/cursor/plugins/blob/main/pstack/README.md)
- [Control skill công khai](https://github.com/cursor/plugins/blob/main/pstack/skills/create-verification-skill/SKILL.vi.md)
- [Transcript có người nói của tập YC](https://ulisten.ai/channels/y-combinator/the-rise-of-ai-coworkers_y1-9yeYLJUo/transcript)

If the question is outside the recorded responsibilities or the source material is insufficient, state the gap. Do not fabricate missing information or refer to Persona.
