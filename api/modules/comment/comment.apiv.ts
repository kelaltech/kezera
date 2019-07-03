export interface ICommentResponse {
  _id: string
  _by: string
  body: string
  replies: string[]
}

export interface ICommentRequest {
  _id: string
  _at: Date
  _by: string
  body: string
  displayName: String
  replies: string[]
}
