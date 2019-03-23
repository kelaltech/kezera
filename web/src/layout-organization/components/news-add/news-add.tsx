import React from 'react'
import { Editor, createEditorState } from 'medium-draft'
import axios from 'axios'
import { convertToRaw, convertFromRaw, EditorState, AtomicBlockUtils } from 'draft-js'
import './news-add.scss'
import { Button, ImageInput } from 'gerami'

interface INewsAddState {
  title: any
  description: any
  article: any
  error: any
}

const toolbarConfig = {
  block: ['unordered-list-item', 'header-one', 'header-three'],
  inline: ['BOLD', 'UNDERLINE', 'hyperlink']
}

export class NewsAdd extends React.Component<{}, INewsAddState> {
  constructor(props: any) {
    super(props)
    this.state = {
      title: createEditorState(),
      description: createEditorState(),
      article: createEditorState(),
      error: ''
    }
  }

  titleOnChange = (title: any) => {
    this.setState({
      title: title
    })
  }
  descriptionOnChange = (description: any) => {
    this.setState({
      description: description
    })
  }

  articleOnChange = (article: any) => {
    this.setState({
      article: article
    })
  }

  myBlockStyle = () => {
    return 'myOwnClass'
  }
  publishClicked = () => {
    this.addNews()
  }

  addNews = () => {
    const { title, description, article } = this.state
    const publication = {
      title: JSON.stringify(convertToRaw(title.getCurrentContent())),
      description: JSON.stringify(convertToRaw(description.getCurrentContent())),
      article: JSON.stringify(convertToRaw(article.getCurrentContent()))
    }

    axios
      .post('/api/news/new', publication)
      .then(data => {
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  getNews = () => {
    axios
      .get('/api/news/5c9611a41d48953f50c9356c')
      .then((data: any) => {
        this.setState({
          title: EditorState.createWithContent(
            convertFromRaw(JSON.parse(data.data.title))
          ),
          description: EditorState.createWithContent(
            convertFromRaw(JSON.parse(data.data.description))
          ),
          article: EditorState.createWithContent(
            convertFromRaw(JSON.parse(data.data.article))
          )
        })
      })
      .catch(e => console.log(e))
  }

  render() {
    const { description, title, article, error } = this.state

    return (
      <div className={'news-card-add-top-container'}>
        {error !== '' ? (
          <div>
            <h1>{error}</h1>
          </div>
        ) : (
          ''
        )}
        <div>
          <Button onClick={this.publishClicked}>Publish</Button>
        </div>
        <div className={'news-card-add-container'}>
          <ImageInput />
          <Editor
            placeholder={'Title'}
            className={'news-card-add-title'}
            editorState={title}
            onChange={this.titleOnChange}
            sideButtons={[]}
          />
          <Editor
            placeholder={'Description'}
            className={'news-card-add-title'}
            editorState={description}
            onChange={this.descriptionOnChange}
          />
          <Editor
            placeholder={'Article'}
            className={'news-card-add-title'}
            editorState={article}
            sideButtons={[]}
            onChange={this.articleOnChange}
            blockStyleFn={this.myBlockStyle}
          />
        </div>
      </div>
    )
  }
}
