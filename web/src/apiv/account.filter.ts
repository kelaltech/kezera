import { IAccountRequest, IAccountResponse } from './account.apiv'

export async function accountResponseToRequest(
  response: IAccountResponse,
  password?: string
): Promise<IAccountRequest> {
  return {
    email: response.email,
    password,

    displayName: response.displayName,
    phoneNumber: response.phoneNumber
  }
}
