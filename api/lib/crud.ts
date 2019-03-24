import { ClientSession, Document, DocumentQuery, Model, Schema } from 'mongoose'
import { KoaError } from './koa-error'

type ObjectId = Schema.Types.ObjectId | string

export async function add<T extends Document>(
  model: Model<T>,
  data: any,
  {
    session,
    preSave,
    postSave
  }: {
    session?: ClientSession
    preSave?: (doc: T, session: ClientSession | null) => Promise<T>
    postSave?: (doc: T, session: ClientSession | null) => Promise<T>
  } = {}
): Promise<T> {
  if (!model) throw new KoaError('"model" parameter not found.', 500, 'NO_MODEL')

  let doc = data instanceof model ? data : new model(data)

  if (preSave) doc = await preSave(doc, session || null)
  doc = await doc.save({ session, validateBeforeSave: true })
  if (postSave) doc = await postSave(doc, session || null)

  return doc
}

export async function get<T extends Document>(
  model: Model<T>,
  _id: ObjectId,
  {
    session,
    preQuery,
    postQuery
  }: {
    session?: ClientSession
    preQuery?: (model: Model<T>, session: ClientSession | null) => DocumentQuery<T[], T>
    postQuery?: (
      query: DocumentQuery<T | null, T>,
      session: ClientSession | null
    ) => DocumentQuery<T | null, T>
  } = {}
): Promise<T> {
  if (!model) throw new KoaError('"model" parameter not found.', 500, 'NO_MODEL')
  if (!_id) throw new KoaError('"_id" parameter not found.', 400, 'NO_ID')

  let query: DocumentQuery<T | null, T>

  if (preQuery)
    query = preQuery(model, session || null)
      .findOne({ _id })
      .session(session || null)
  else query = model.findById(_id).session(session || null)

  if (postQuery) query = postQuery(query, session || null)

  const doc = await query
  if (!doc)
    throw new KoaError(
      `No document by ${preQuery ? 'the provided pre-query and ' : ''}_id '${_id}'${
        postQuery ? ' and the provided post-query' : ''
      }.`,
      404,
      'DOCUMENT_NOT_FOUND'
    )

  return doc
}

export async function list<T extends Document>(
  model: Model<T>,
  {
    since,
    count,
    session,
    preQuery,
    postQuery
  }: {
    since?: Date | number | string
    count?: number
    session?: ClientSession
    preQuery?: (model: Model<T>, session: ClientSession | null) => DocumentQuery<T[], T>
    postQuery?: (
      query: DocumentQuery<T[], T>,
      session: ClientSession | null
    ) => DocumentQuery<T[], T>
  } = {}
): Promise<T[]> {
  if (!model) throw new KoaError('"model" parameter not found.', 500, 'NO_MODEL')

  let query: DocumentQuery<T[], T>

  if (preQuery)
    query = preQuery(model, session || null)
      .find({})
      .session(session || null)
  else query = model.find({}).session(session || null)

  if (model.schema.path('_at'))
    query = query
      .sort({ _at: -1 })
      .where('_at')
      .lt(new Date(since || Date.now()).getTime())
      .limit(count || Number.MAX_SAFE_INTEGER)
      .session(session || null)

  if (postQuery) query = postQuery(query, session || null)
  return await query
}

export async function search<T extends Document>(
  model: Model<T>,
  term: string,
  {
    since,
    count,
    session,
    preQuery,
    postQuery
  }: {
    since?: Date | number | string
    count?: number
    session?: ClientSession
    preQuery?: (model: Model<T>, session: ClientSession | null) => DocumentQuery<T[], T>
    postQuery?: (
      query: DocumentQuery<T[], T>,
      session: ClientSession | null
    ) => DocumentQuery<T[], T>
  } = {}
): Promise<T[]> {
  if (!model) throw new KoaError('"model" parameter not found.', 500, 'NO_MODEL')
  if (!term) throw new KoaError('"term" parameter not found.', 400, 'NO_TERM')

  let query: DocumentQuery<T[], T>

  // NOTE: if preQuery is used, search text score will have to be done manually
  if (preQuery)
    query = preQuery(model, session || null)
      .find({ $text: { $search: term } })
      .session(session || null)
  else
    query = model
      .find({ $text: { $search: term } }, { _score: { $meta: 'textScore' } })
      .sort({ _score: { $meta: 'textScore' } })
      .session(session || null)

  if (model.schema.path('_at'))
    query = query
      .sort({ _at: -1 })
      .where('_at')
      .lt(new Date(since || Date.now()).getTime())
      .limit(count || Number.MAX_SAFE_INTEGER)
      .session(session || null)

  if (postQuery) query = postQuery(query, session || null)

  return await query
}

export async function edit<T extends Document>(
  model: Model<T>,
  _id: ObjectId,
  data: any,
  {
    session,
    preUpdate,
    postUpdate
  }: {
    session?: ClientSession
    preUpdate?: (doc: T, session: ClientSession | null) => Promise<T>
    postUpdate?: (raw: any, session: ClientSession | null) => Promise<any>
  } = {}
): Promise<T> {
  if (!model) throw new KoaError('"model" parameter not found.', 500, 'NO_MODEL')
  if (!_id) throw new KoaError('"_id" parameter not found.', 400, 'NO_ID')
  if (!data) throw new KoaError('"data" parameter not found.', 400, 'NO_DATA')

  let doc = await model.findById(_id).session(session || null)
  if (!doc) throw new KoaError(`No document by _id '${_id}'.`, 404, 'DOCUMENT_NOT_FOUND')

  if (preUpdate) {
    doc = await preUpdate(doc, session || null)
    if (!doc)
      throw new KoaError(
        `No document by _id '${_id}' and the provided pre-update-query.`,
        404,
        'DOCUMENT_NOT_FOUND'
      )
  }
  let ret = await doc.update(data, { session, runValidators: true, strict: true })
  if (postUpdate) ret = await postUpdate(ret, session || null)

  return ret
}

export async function remove<T extends Document>(
  model: Model<T>,
  _id: ObjectId,
  {
    check,
    session,
    preRemove,
    postRemove
  }: {
    check?: boolean | undefined
    session?: ClientSession
    preRemove?: (doc: T, session: ClientSession | null) => Promise<T>
    postRemove?: (doc: T, session: ClientSession | null) => Promise<T>
  } = {}
): Promise<T | null> {
  if (!model) throw new KoaError('"model" parameter not found.', 500, 'NO_MODEL')
  if (!_id) throw new KoaError('"_id" parameter not found.', 400, 'NO_ID')

  if (check === false) return await model.findByIdAndRemove(_id).session(session || null)

  let doc = await model.findById(_id).session(session || null)
  if (!doc) throw new KoaError(`No document by _id '${_id}'.`, 404, 'DOCUMENT_NOT_FOUND')

  if (preRemove) {
    doc = await preRemove(doc, session || null)
    if (!doc)
      throw new KoaError(
        `No document by _id '${_id}' and the provided pre-remove-query.`,
        404,
        'DOCUMENT_NOT_FOUND'
      )
  }
  doc.$session(session)
  doc = await doc.remove()
  if (postRemove) doc = await postRemove(doc, session || null)

  return doc
}
