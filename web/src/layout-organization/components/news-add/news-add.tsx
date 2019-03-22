import React from 'react'
import { Editor, EditorState } from 'draft-js'
interface INewsAddState {
  editorState: any
}

export default class NewsAdd extends React.Component<{}, INewsAddState> {
  constructor(props: any) {
    super(props)
    this.state = { editorState: EditorState.createEmpty() }
    this.onChange = editorState => this.setState({ editorState })
  }

  onChange = (editorState: any) => {
    this.setState({
      editorState
    })
  }

  render() {
    return (
      <div>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </div>
    )
  }
}
