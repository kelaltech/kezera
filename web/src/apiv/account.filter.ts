import { IAccountRequest, IAccountResponse } from './account.apiv'

export async function accountResponseToRequest(
  response: IAccountResponse,
  password?: string,
  currentPassword?: string,
  newPassword?: string
): Promise<IAccountRequest> {
  return {
    email: response.email,
    password,

    currentPassword,
    newPassword,

    displayName: response.displayName,
    phoneNumber: response.phoneNumber || null
  }
}
