export class OkResponse {
  success: boolean;
  message: string;
}

export const okResponse = (
  message = 'Request executed successfully',
): OkResponse => ({
  success: true,
  message,
});
// TODO: come up with the paginated data dto
