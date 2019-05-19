import React, { useState, useEffect, useRef } from 'react'
import { RouteComponentProps } from 'react-router'
import { Editor, createEditorState, ImageSideButton } from 'medium-draft'
import axios from 'axios'
import { convertToRaw, convertFromRaw, EditorState, addNewBlock, Block } from 'draft-js'
import './news-add.scss'
import 'medium-draft/lib/index.css'
import { Button, ImageInput, Loading } from 'gerami'
import { withRouter } from 'react-router'
import { useMyOrganizationState } from '../../stores/my-organization/my-organization-provider'
import RichPage from '../../../shared/components/rich-page/rich-page'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface INewsAddProps {
  edit: boolean
}

const toolbarConfig = {
  block: ['unordered-list-item', 'header-one', 'header-three'],
  inline: ['BOLD', 'UNDERLINE', 'hyperlink']
}

function NewsAdd({
  match,
  history,
  edit,
  ...rest
}: INewsAddProps & RouteComponentProps<{ _id: string }>) {
  const [title, setTitle] = useState(createEditorState())
  const [description, setDescription] = useState(createEditorState())
  const [article, setArticle] = useState(createEditorState())
  const [picture, setPicture] = useState()
  const [imageSrc, setImageSrc] = useState()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { myOrganization } = useMyOrganizationState()
  useEffect(() => {
    if (edit) {
      getNews()
    }
  }, [])

  const publishClicked = () => {
    addNews()
  }

  const titleOnChange = (title: any) => {
    setTitle(title)
  }
  const descriptionOnChange = (description: any) => {
    setDescription(description)
  }

  const articleOnChange = (article: any) => {
    setArticle(article)
  }

  const addNews = async (): Promise<void> => {
    setSubmitting(true)
    const publication = {
      title: JSON.stringify(convertToRaw(title.getCurrentContent())),
      description: JSON.stringify(convertToRaw(description.getCurrentContent())),
      article: JSON.stringify(convertToRaw(article.getCurrentContent())),
      _by: myOrganization!._id
    }

    axios
      .post(`/api/news/new`, publication, {
        withCredentials: true
      })
      .then(news => news.data)
      .then(data => {
        const formData = new FormData()
        formData.append('picture', picture)
        axios
          .post(`/api/news/${data._id}/addpic`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
          })
          .then((pic: any) => {
            setSubmitting(false)
            history.push({
              pathname: `/news/${data._id}`
            })
          })
          .catch(e =>
            axios
              .delete(`/api/news/${data._id}`)
              .then(() => {
                setSubmitting(false)
              })
              .catch(e => {
                setError(
                  'something went wrong! cant add image for this news.\n Please try again!'
                )
              })
          )
      })
      .catch(e => {
        setError('something went wrong! adding new story failed...! try again  ')
      })
  }

  const getNews = () => {
    axios
      .get(`/api/news/${match.params._id}`)
      .then((data: any) => {
        setTitle(
          EditorState.createWithContent(convertFromRaw(JSON.parse(data.data.title)))
        )
        setDescription(
          EditorState.createWithContent(convertFromRaw(JSON.parse(data.data.description)))
        )
        setArticle(
          EditorState.createWithContent(convertFromRaw(JSON.parse(data.data.article)))
        )
        setImageSrc(`/api/news/${match.params._id}/pic`)
      })
      .catch(() => setError('sorry something went wrong! cant get the news.'))
  }

  const updateNews = async (): Promise<void> => {
    setSubmitting(true)
    const publication = {
      title: JSON.stringify(convertToRaw(title.getCurrentContent())),
      description: JSON.stringify(convertToRaw(description.getCurrentContent())),
      article: JSON.stringify(convertToRaw(article.getCurrentContent()))
    }

    axios
      .put(`/api/news/${match.params._id}`, publication)
      .then(data => data)
      .then(data => {
        setSubmitting(false)
        /*      const formData = new FormData()
        formData.append('picture', picture)
        axios
          .post(`/api/news/${match.params._id}/addpic`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
          })
          .then((data: any) => {
            setSubmitting(false)
            getNews()
          })
          .catch(e =>
            setError(
              'something went wrong! cant add image for this news.\n Please try again!'
            )
          )*/
      })
      .catch(e => {
        setError('something went wrong! cant update the story.\n Please try again')
      })
  }

  const myBlockStyle = () => {
    return 'myOwnClass'
  }

  const handleInputChange = async (): Promise<void> => {
    if (inputRef.current && inputRef.current.files && inputRef.current.files.length) {
      setPicture(inputRef.current.files[0])
      let reader = new FileReader()
      reader.onload = e => {
        setImageSrc((e.target as any).result)
      }
      reader.readAsDataURL(inputRef.current.files[0])
    }
  }

  return (
    <RichPage
      title={'Create a story'}
      description={'create your stories here'}
      error={error}
      actions={
        edit
          ? [
              {
                onClick: updateNews,
                primary: !submitting,
                children: (
                  <>
                    {submitting ? (
                      <Loading className={'padding-none'} />
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={'pencil-alt'}
                          className={'margin-right-normal font-S'}
                        />
                        Save changes
                      </>
                    )}
                  </>
                )
              }
            ]
          : [
              {
                onClick: publishClicked,
                primary: !submitting,
                children: (
                  <>
                    {submitting ? (
                      <Loading className={'padding-none'} />
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={'pencil-alt'}
                          className={'margin-right-normal font-S'}
                        />
                        Publish
                      </>
                    )}
                  </>
                )
              }
            ]
      }
    >
      <div className={'news-card-add-top-container'}>
        <div className={'news-card-add-container'}>
          <div
            className={'news-img-container'}
            style={{
              backgroundImage: `url(${imageSrc ? imageSrc : ''})`
            }}
            onClick={() => inputRef.current && inputRef.current.click()}
          >
            <div style={{ display: 'none' }}>
              <input type={'file'} ref={inputRef} onChange={handleInputChange} />
            </div>
            <div className={'img-add-placeholder fg-blackish'}>
              <span>click here to add a cover image for your story</span>
            </div>
          </div>
          <Editor
            placeholder={'Title'}
            editorState={title}
            onChange={titleOnChange}
            sideButtons={[]}
          />
          <Editor
            placeholder={'Description'}
            className={'news-card-add-title'}
            editorState={description}
            sideButtons={[]}
            onChange={descriptionOnChange}
          />
          <Editor
            placeholder={'Article'}
            className={'news-card-add-title'}
            editorState={article}
            sideButtons={[]}
            onChange={articleOnChange}
            blockStyleFn={myBlockStyle}
          />
        </div>
      </div>
    </RichPage>
  )
}

export default withRouter(NewsAdd)
