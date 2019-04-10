import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Editor, createEditorState, ImageSideButton } from 'medium-draft'
import axios from 'axios'
import { convertToRaw, convertFromRaw, EditorState, addNewBlock, Block } from 'draft-js'
import './news-add.scss'
import 'medium-draft/lib/index.css'
import { Button, ImageInput } from 'gerami'
import { withRouter } from 'react-router'
// import 'https://unpkg.com/medium-draft@0.3.10/dist/medium-draft.js'

interface INewsAddState {
  title: any
  description: any
  article: any
  error: any
}

interface INewsAddProps {
  edit: boolean
}

const toolbarConfig = {
  block: ['unordered-list-item', 'header-one', 'header-three'],
  inline: ['BOLD', 'UNDERLINE', 'hyperlink']
}

function NewsAdd({
  match,
  edit,
  ...rest
}: INewsAddProps & RouteComponentProps<{ _id: string }>) {
  const [title, setTitle] = useState(createEditorState())
  const [description, setDescription] = useState(createEditorState())
  const [article, setArticle] = useState(createEditorState())
  const [error, setError] = useState('')

  useEffect(() => {
    if (edit) {
      getNews()
    }
  }, [])

  const sideButtons = [
    {
      title: 'Add Your Cover Image',
      component: CustomImageSideButton
    }
  ]

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

  const addNews = () => {
    const publication = {
      title: JSON.stringify(convertToRaw(title.getCurrentContent())),
      description: JSON.stringify(convertToRaw(description.getCurrentContent())),
      article: JSON.stringify(convertToRaw(article.getCurrentContent()))
    }

    axios
      .post('/api/news/new', publication)
      .then(data => {
        console.log('successfully added')
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const getNews = () => {
    axios
      .get(`/api/news/${match.params._id}`)
      .then((data: any) => {
        console.log('successfully fetched!!')
        setTitle(
          EditorState.createWithContent(convertFromRaw(JSON.parse(data.data.title)))
        )
        setDescription(
          EditorState.createWithContent(convertFromRaw(JSON.parse(data.data.description)))
        )
        setArticle(
          EditorState.createWithContent(convertFromRaw(JSON.parse(data.data.article)))
        )
      })
      .catch(e => console.log(e))
  }

  const updateNews = () => {
    const publication = {
      title: JSON.stringify(convertToRaw(title.getCurrentContent())),
      description: JSON.stringify(convertToRaw(description.getCurrentContent())),
      article: JSON.stringify(convertToRaw(article.getCurrentContent()))
    }
    axios
      .put(`/api/news/${match.params._id}`, publication)
      .then(data => {
        console.log('successfully edited')
      })
      .catch(e => {
        console.log(e)
      })
  }

  const myBlockStyle = () => {
    return 'myOwnClass'
  }
  return (
    <div className={'news-card-add-top-container'}>
      <div>
        {edit ? (
          <Button onClick={updateNews}>Save changes</Button>
        ) : (
          <Button onClick={publishClicked}>Publish</Button>
        )}
      </div>
      <div className={'news-card-add-container'}>
        <ImageInput />
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
          onChange={descriptionOnChange}
          sideButtons={sideButtons}
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
  )
}

export default withRouter(NewsAdd)

class CustomImageSideButton extends ImageSideButton<any, any> {
  onChange(e: any) {
    const newsid = window.location.pathname.split('/')[3]

    const file = e.target.files[0]
    if (file.type.indexOf('image/') === 0) {
      // This is a post request to server endpoint with image as `image`
      const formData = new FormData()
      formData.append('file', file)

      axios
        .post(`/api/news/${newsid}/addpic`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        })
        .then((data: any) => {
          console.log(data)
          if (data.url) {
            this.props.setEditorState(
              addNewBlock(this.props.getEditorState(), Block.IMAGE, {
                src: data.url
              })
            )
          }
        })
        .catch(() => {})
    }
    this.props.close()
  }
}
