import { Context } from 'koa'
// todo: import { IUser } from '../models/user/user.model'
type IUser = any // until it gets defined

export class KoaController {
  constructor(protected readonly ctx?: Context) {}

  protected getParams<Type extends { [param: string]: string }>(): Type {
    return (this.ctx && this.ctx.params) || {}
  }

  protected getParam(key: string): string {
    return this.getParams() && this.getParams()[key]
  }

  protected getQueries<Type extends { [param: string]: string }>(): Type {
    return (this.ctx && this.ctx.query) || {}
  }

  protected getQuery(key: string): string {
    return this.getQueries() && this.getQueries()[key]
  }

  protected getRequestBody<Type>(): Type {
    return this.ctx && this.ctx.request.body
  }

  protected getUser(): IUser | null {
    return this.ctx && this.ctx.state.user
  }
}
