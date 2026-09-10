/**
 * @test common/exceptions.test
 * @description Test suite cho Custom Exception classes — common/exceptions.
 *
 * Phạm vi test:
 *  - Kiểm tra mỗi Exception class có đúng statusCode
 *  - Kiểm tra message được truyền vào constructor
 *  - Kiểm tra kế thừa đúng từ base HttpException
 *  - Kiểm tra instanceof hoạt động đúng (để errorHandler phân loại)
 *
 * Test cases sẽ viết:
 *  - new BadRequestException('msg')      → statusCode === 400
 *  - new UnauthorizedException('msg')    → statusCode === 401
 *  - new ForbiddenException('msg')       → statusCode === 403
 *  - new NotFoundException('msg')        → statusCode === 404
 *  - new ConflictException('msg')        → statusCode === 409
 *  - new InternalServerException('msg')  → statusCode === 500
 *  - Tất cả đều instanceof HttpException → true
 *
 * Tool: Vitest
 *
 * TODO: Implement sau khi exceptions được implement
 */
import { describe } from 'vitest';

describe.todo('common/exceptions — HttpException subclasses (400, 401, 403, 404, 409, 500) statusCode tests');
