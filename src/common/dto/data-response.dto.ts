export class DataResponseDto<T = unknown> {
  message: string;
  data: T;
}
export const dataResponse = <T>(
  data: T,
  message = 'Request executed successfully',
): DataResponseDto<T> => ({
  message,
  data,
});
