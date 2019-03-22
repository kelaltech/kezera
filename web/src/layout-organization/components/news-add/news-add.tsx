import React from 'react'
import ReactDOM from 'react-dom'
import { Editor, createEditorState } from 'medium-draft'

import { convertToRaw } from 'draft-js'

import './news-add.scss'

interface INewsAddState {
  title: any
  description: any
  article: any
}

const toolbarConfig = {
  block: ['unordered-list-item', 'header-one', 'header-three'],
  inline: ['BOLD', 'UNDERLINE', 'hyperlink']
}
export default class NewsAdd extends React.Component<{}, INewsAddState> {
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

  render() {
    const { description, title, article } = this.state

    return (
      <div className={'news-card-add-top-container'}>
        <div className={'news-card-add-container'}>
          <Editor
            placeholder={'Title'}
            className={'news-card-add-title'}
            toolbarConfig={toolbarConfig}
            editorState={title}
            onChange={this.titleOnChange}
            sideButtons={[]}
          />
          <Editor
            placeholder={'Description'}
            className={'news-card-add-title'}
            toolbarConfig={toolbarConfig}
            editorState={description}
            onChange={this.descriptionOnChange}
          />
          <Editor
            placeholder={'Article'}
            className={'news-card-add-title'}
            toolbarConfig={toolbarConfig}
            editorState={article}
            sideButtons={[]}
            onChange={this.articleOnChange}
          />
        </div>
      </div>
    )
  }
}
