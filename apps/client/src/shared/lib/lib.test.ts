/**
 * @test shared/lib.test
 * @description Test suite cho utility functions — shared/lib.
 *
 * Phạm vi test (pure unit test — không có side effects):
 *  - formatDate()      → format Date object sang chuỗi DD/MM/YYYY tiếng Việt
 *  - formatDate()      → xử lý đúng các edge case (invalid date, null...)
 *  - formatCurrency()  → format số sang chuỗi "1.000.000 ₫" (VND locale)
 *  - cn()              → merge classNames đúng, bỏ qua falsy values
 *  - cn()              → resolve conflict Tailwind classes đúng thứ tự (nếu dùng)
 *  - debounce()        → chỉ gọi callback sau khi delay kết thúc
 *  - debounce()        → reset timer khi gọi lại trong khoảng delay
 *  - paginate()        → tính đúng offset, totalPages theo page + size
 *
 * Tool: Vitest + @testing-library/react (nếu cần test hooks)
 *
 * TODO: Implement sau khi từng utility function được implement trong shared/lib
 */
export {};
