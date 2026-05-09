import { HttpError } from "@/types/api";
import { redirect } from "next/navigation";

export function handleApiError(
  error: unknown,
  context: string = "API Error",
): { success: false; error: string; status?: number } {

  const err = error as any;

  const errorStatus: number | undefined =
    error instanceof HttpError
      ? error.status
      : typeof err?.response?.status === "number"
        ? err.response.status
        : undefined;

  const errorMessage =
    err instanceof HttpError
      ? err.message
      : err?.response?.data?.message ||
        err?.message ||
        "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ";

  console.error(`[${context}][${errorStatus ?? "UNKNOWN"}]: ${errorMessage}`);

  // auth handling
  if (errorStatus === 401) {
    redirect("/");
  }

  return {
    success: false,
    error: errorMessage,
    status: errorStatus,
  };
}