import { describe, it, expect } from "vitest";
import { AxiosError, AxiosHeaders } from "axios";
import {
  parseApiError,
  isApiErrorResponse,
  mapValidationErrors,
  getErrorMessage,
} from "./errorHandler";
import { ERROR_CODES, ApiErrorResponse } from "@repo/shared";

describe("Client Error Handler Unit Tests", () => {
  // TEST 1: isApiErrorResponse validation
  it("should accurately identify valid ApiErrorResponse objects", () => {
    const validErrorResponse: ApiErrorResponse = {
      success: false,
      error: {
        code: ERROR_CODES.VALIDATION,
        message: "Dữ liệu không hợp lệ",
        details: [{ field: "email", message: "Email không đúng" }],
      },
    };

    expect(isApiErrorResponse(validErrorResponse)).toBe(true);
    expect(isApiErrorResponse({ success: true, data: {} })).toBe(false);
    expect(isApiErrorResponse(null)).toBe(false);
    expect(isApiErrorResponse("error string")).toBe(false);
  });

  // TEST 2: Parse standard server error envelope from AxiosError
  it("should extract standardized server error envelope from AxiosError", () => {
    const serverErrorData: ApiErrorResponse = {
      success: false,
      error: {
        code: ERROR_CODES.DUPLICATE,
        message: "A record with the provided value already exists",
        details: [{ field: "email" }],
      },
    };

    const axiosError = new AxiosError(
      "Request failed with status code 409",
      "ERR_BAD_REQUEST",
      { headers: new AxiosHeaders() },
      {},
      {
        status: 409,
        statusText: "Conflict",
        headers: {},
        config: { headers: new AxiosHeaders() },
        data: serverErrorData,
      }
    );

    const parsed = parseApiError(axiosError);
    expect(parsed.code).toBe(ERROR_CODES.DUPLICATE);
    expect(parsed.message).toBe("A record with the provided value already exists");
    expect(parsed.details).toEqual([{ field: "email" }]);
  });

  // TEST 3: Parse Network Error (no server response)
  it("should handle network connection failure gracefully", () => {
    const networkError = new AxiosError(
      "Network Error",
      "ERR_NETWORK",
      { headers: new AxiosHeaders() },
      {
        /* mock request without response */
      }
    );

    const parsed = parseApiError(networkError);
    expect(parsed.code).toBe("ERR_NETWORK");
    expect(parsed.message).toContain("kết nối");
  });

  // TEST 4: Parse Timeout Error
  it("should handle request timeout gracefully", () => {
    const timeoutError = new AxiosError(
      "timeout of 15000ms exceeded",
      "ECONNABORTED",
      { headers: new AxiosHeaders() }
    );

    const parsed = parseApiError(timeoutError);
    expect(parsed.code).toBe("ERR_TIMEOUT");
    expect(parsed.message).toContain("Timeout");
  });

  // TEST 5: mapValidationErrors for React forms
  it("should map array of validation details into a form error dictionary", () => {
    const details = [
      { field: "email", message: "Email không đúng định dạng" },
      { field: "profile.age", message: "Tuổi phải từ 18 trở lên" },
    ];

    const formErrors = mapValidationErrors(details);
    expect(formErrors).toEqual({
      email: "Email không đúng định dạng",
      "profile.age": "Tuổi phải từ 18 trở lên",
    });
  });

  // TEST 6: getErrorMessage fallback
  it("should extract error message or provide fallback", () => {
    expect(getErrorMessage(new Error("Lỗi tùy biến"))).toBe("Lỗi tùy biến");
    expect(getErrorMessage(null, "Lỗi mặc định")).toBe("Đã xảy ra lỗi hệ thống không xác định");
  });
});
