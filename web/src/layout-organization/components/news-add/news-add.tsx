import React from 'react'
import ReactDOM from 'react-dom'
import { Editor, createEditorState } from 'medium-draft'
import axios from 'axios'
import { convertToRaw, convertFromRaw, EditorState, AtomicBlockUtils } from 'draft-js'

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
    const base64 = 'aValidBase64String'
    this.setState({ description: this.insertImage(description, base64) })
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
    // this.getNews()
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
  insertImage = (editorState: any, base64: any) => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', {
      src: base64
    })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    })
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
  }

  getNews = () => {
    axios
      .get('/api/news/5c95ec21a953423a90da0348')
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
    const { description, title, article } = this.state

    return (
      <div className={'news-card-add-top-container'}>
        <div>
          {/*   <img
            src={`${
              convertToRaw(description.getCurrentContent()).blocks[0].data.src
                ? convertToRaw(description.getCurrentContent()).blocks[0].data.src
                : ''
            }`}
            alt="img"
            width={'100%'}
            height={'200px'}
          />*/}
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
