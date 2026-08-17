export function getApiErrorMessage(error: unknown, fallback: string) {
  const response = error as
    | { data?: { data?: { message?: string }; message?: string } }
    | null
    | undefined;

  return response?.data?.data?.message || response?.data?.message || fallback;
}
