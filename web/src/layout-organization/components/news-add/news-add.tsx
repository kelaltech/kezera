import React from 'react'
import ReactDOM from 'react-dom'
import { Editor, createEditorState } from 'medium-draft'
import axios from 'axios'
import { convertToRaw, convertFromRaw } from 'draft-js'

import './news-add.scss'
import { Button } from 'gerami'

interface INewsAddState {
  title: any
  description: any
  article: any
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
      article: createEditorState()
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
    /*    console.log('Before JSON\n')
    console.log(convertToRaw(this.state.description.getCurrentContent()))
    console.log('\nAfter JSON\n')
    console.log(JSON.stringify(convertToRaw(this.state.description.getCurrentContent())))*/
    this.addNews()
  }

  addNews = () => {
    const { title, description, article } = this.state
    const publication = {
      title: JSON.stringify(convertToRaw(this.state.title.getCurrentContent())),
      description: JSON.stringify(
        convertToRaw(this.state.description.getCurrentContent())
      ),
      article: JSON.stringify(convertToRaw(this.state.article.getCurrentContent()))
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

  render() {
    const { description, title, article } = this.state

    return (
      <div className={'news-card-add-top-container'}>
        <div>
          <img
            src={`${
              convertToRaw(description.getCurrentContent()).blocks[0].data.src
                ? convertToRaw(description.getCurrentContent()).blocks[0].data.src
                : ''
            }`}
            alt="img"
            width={'100%'}
            height={'200px'}
          />
          <Button onClick={this.publishClicked}>Publish</Button>
        </div>
        <div className={'news-card-add-container'}>
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
