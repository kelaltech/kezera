import * as Router from 'koa-router'
import * as sharp from 'sharp'
import * as fs from 'fs'

export const certificateRouter = new Router({ prefix: '/api/certificate' })

certificateRouter.get('/test-print', async ctx => {
  let svg = fs
    .readFileSync('api/modules/certificate/templates/default/default.svg')
    .toString('utf8')

  svg = svg.replace('{PURPOSE}', 'AWESOMENESS')
  svg = svg.replace('{DATE}', new Date().toDateString().substr(3))
  svg = svg.replace('{DISPLAY_NAME}', 'Kaleab S. Melkie')
  svg = svg.replace('{ORGANIZATION_NAME}', 'kelal tech.')

  const svgBuffer = Buffer.from(svg, 'utf8')

  ctx.body = sharp(svgBuffer).png()
  ctx.type = 'png'
})
