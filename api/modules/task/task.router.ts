import * as Router from 'koa-router'
import { AddTask, ListTasks } from './task.controller'

export const taskRouter = new Router({ prefix: '/api/task' })

taskRouter.post('/add', async ctx => {
  ctx.body = await AddTask(ctx.request.body, ctx.state.user._id)
})

// /api/task/all"
taskRouter.get('/all', async ctx => {
  ctx.body = await ListTasks()
})
