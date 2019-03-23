import * as Route from 'koa-router'

export const commentRouter = new Route({
  prefix: '/api/comment'
})

//GET /api/comment/:_id
//GET /api/comment
//PUT /api/comment/:_id
//DELETE /api/comment/:_id

//GET /api/comment/:_id/replies
//PUT /api/comment/:_id/reply
