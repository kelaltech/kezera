import { add, edit, get, list, remove, search } from '../../lib/crud'
import { Grid } from '../../lib/grid'
import { NewsModel } from '../../models/news/news.model'
import { commentModel } from '../../models/comment/comment.model'
import { IAccount } from '../../models/account/account.model'
import { Document, Schema } from 'mongoose'
import { serverApp } from '../../index'
import { getComment } from '../comment/comment.methods'
import sharp = require('sharp')
import { OrganizationModel } from '../../models/organization/organization.model'

type ObjectId = Schema.Types.ObjectId | string

export async function addNews(data: any): Promise<any> {
  return await add(NewsModel, data)
}

export async function getAllNews(since: number, count: number): Promise<any> {
  return await list(NewsModel, { since: since, count: count })
}

export async function listAllNews() {
  const docs = await list(NewsModel)

  return docs
}
export async function addNewsWithPicture(
  data: any,
  account: Document & IAccount,
  pic: any
): Promise<any> {
  data._by = await account._id
  const news = await add(NewsModel, data)
  const grid = new Grid(serverApp, NewsModel, news._id)

  const compressedPic = sharp(pic.path)
    .resize(1080, 1080, { fit: 'cover' })
    .jpeg({ quality: 100 })

  await grid.set(compressedPic, 'image/jpeg')

  return news
}

export async function addPictureForNews(pic: any, _newsId: ObjectId): Promise<any> {
  const grid = new Grid(serverApp, NewsModel, _newsId)
  const compressedPic = sharp(pic.path)
    .resize(1080, 1080, { fit: 'cover' })
    .jpeg({ quality: 100 })

  return await grid.set(compressedPic, 'image/jpeg')
}

export async function getPictureFromNews(
  _newsId: ObjectId,
  pictureID = 'default',
  size: number,
  quality: number
): Promise<any> {
  const grid = new Grid(serverApp, NewsModel, _newsId)

  const compress = sharp()
    .resize(size, size, { fit: 'cover' })
    .jpeg({ quality, chromaSubsampling: '4:4:4' })

  return (await grid.get(pictureID)).pipe(compress)
}

export async function addShare(
  news_id: ObjectId,
  account: Document & IAccount
): Promise<any> {
  const docs = await get(NewsModel, news_id)
  docs.share.push(account._id)
  await docs.save()

  return {
    share: docs.share.length
  }
}

export async function getShare(_newsId: ObjectId): Promise<any> {
  const docs = await get(NewsModel, _newsId, {
    postQuery: q => q.populate('share')
  })

  return docs.share
}
export async function getLikes(_newsId: ObjectId): Promise<any> {
  const docs = await get(NewsModel, _newsId, {
    postQuery: q => q.populate('likes')
  })

  return docs.likes
}
export async function toggleLike(
  _newsId: ObjectId,
  account: Document & IAccount
): Promise<{
  likes: number
}> {
  const doc = await get(NewsModel, _newsId)

  if (doc.likes.length == 0) {
    doc.likes.push(account._id)
    await doc.save()
    return {
      likes: doc.likes.length
    }
  }

  for (let i = 0; i < doc.likes.length; i++) {
    if (account._id.toString() === doc.likes[i].toString()) {
      await doc.likes.splice(i, 1)
    } else {
      doc.likes.push(account._id)
    }
  }
  await doc.save()

  return { likes: doc.likes.length }
}

export async function removeNews(_newsId: ObjectId, pictureID = 'default'): Promise<any> {
  const grid = new Grid(serverApp, NewsModel, _newsId)
  await grid
    .has()
    .then(async () => {
      await grid.remove(pictureID)
    })
    .catch(() => console.log('no picture found'))
  return await remove(NewsModel, _newsId)
}

export async function getNews(_newsId: ObjectId): Promise<any> {
  const docs = await get(NewsModel, _newsId)
  return docs
}

export async function editNews(data: any, _newsId: ObjectId): Promise<any> {
  return await edit(NewsModel, _newsId, data)
}

export async function searchNews(term: string): Promise<any> {
  return search(NewsModel, term)
}
export async function recentNews(count: number): Promise<any> {
  return await list(NewsModel, {
    since: Date.now(),
    count
  })
}

export async function getMyNews(account: Document & IAccount): Promise<any> {
  const organization = await get(OrganizationModel, null, {
    conditions: { account: account._id }
  })
  return await list(NewsModel, {
    conditions: {
      _by: organization._id
    }
  })
}

export async function NearByNews(
  account: Document & IAccount,
  since: any,
  count: any
): Promise<any> {
  const news = await list(NewsModel, {
    since,
    count,
    postQuery: (q, s) => {
      if (
        !account ||
        !account.lastLocation.coordinates ||
        !account.lastLocation.coordinates.length
      ) {
        return q
      }

      return q
        .find({
          'locations.go': {
            $nearSphere: {
              $geometry: {
                type: 'Point',
                coordinates: account.lastLocation.coordinates,
                $minDistance: 100,
                $maxDistance: 2000
              }
            }
          }
        })
        .session(s)
    }
  })

  return news
}
/*export async function addNewsWithPicture(
  data: any,
  orgId: Schema.Types.ObjectId,
  pic: Stream
):Promise<any>{

  data._by = await orgId
  const news = await add(NewsModel,data)
  const grid = new Grid (serverApp, NewsModel, news._id)

//TODO

}*/

export async function addComment(
  account: Document & IAccount,
  _newsId: ObjectId,
  data: any
): Promise<any> {
  data._by = await account._id
  const comment = await add(commentModel, data)
  const news = await get(NewsModel, _newsId)

  news.comments.push(comment._id)
  await news.save()
  return comment
}

export async function getComments(newsId: Schema.Types.ObjectId): Promise<any> {
  let news = await get(NewsModel, newsId)
  let comments = []
  /*  if(news.comments.length == 0 ){
    return comments;
  }*/
  for (let i = 0; i < news.comments.length; i++) {
    comments.push(await getComment(news.comments[i]))
  }
  return comments
}
