export type INewsRequest = {
  title: string
  description: string
  article: string
}

export type INewsResponse = {
  _at: Date | Number
  title: string
  description: string
  article: string
  likes: []
  comments: []
}
