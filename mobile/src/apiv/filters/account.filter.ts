import {
  IAccountPublicResponse,
  IAccountRequest,
  IAccountResponse
} from '../account.apiv'

export async function accountResponseToRequest(
  response: IAccountResponse | IAccountPublicResponse,
  password?: string,
  currentPassword?: string,
  newPassword?: string
): Promise<IAccountRequest> {
  return {
    status: response.status,

    email: response.email,
    password,

    currentPassword,
    newPassword,

    displayName: response.displayName,
    phoneNumber: response.phoneNumber
  }
}
