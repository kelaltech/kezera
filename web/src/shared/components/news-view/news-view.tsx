import React from 'react'
import './news-view.scss'
import newsTemp from '../../../assets/images/news-temp.jpg'
import NewsTabs from './components/news-view-tab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { withRouter } from 'react-router'
import { Editor, createEditorState } from 'medium-draft'
import { convertToRaw, convertFromRaw, EditorState, AtomicBlockUtils } from 'draft-js'

interface INewsAddState {
  title: any
  description: any
  article: any
  error: any
  likeCount: number
}

class NewsView extends React.Component<any, INewsAddState> {
  constructor(props: any) {
    super(props)

    this.state = {
      title: EditorState.createEmpty(),
      description: EditorState.createEmpty(),
      article: EditorState.createEmpty(),
      error: '',
      likeCount: 0
    }
  }
  componentDidMount(): void {
    //load message here
    this.loadNews()
  }

  loadNews = () => {
    const { match } = this.props
    axios
      .get(`/api/news/${match.params._id}`)
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
          ),
          likeCount: data.data.likes.length
        })
      })
      .catch(e => {
        this.setState({
          error: e
        })
      })
  }

  handleLike = () => {
    const { match } = this.props
    //send request to the back
    axios
      .put(`/api/news/${match.params._id}/like`)
      .then(data => {
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    const { description, title, article, error, likeCount } = this.state
    return (
      <div className={'news-view-container'}>
        <div className={'news-view'}>
          <div
            className={'news-view-img'}
            style={{
              backgroundImage: `url(${newsTemp})`
            }}
          />
          <div className={'news-view-detail-container'}>
            <div className={'news-view-title'}>
              <Editor
                placeholder={'Title'}
                className={'news-card-add-title'}
                editorState={title}
                readOnly={true}
                sideButtons={[]}
              />
            </div>
            <div className={'news-view-description'}>
              <Editor
                placeholder={'Title'}
                className={'news-card-add-title'}
                editorState={description}
                readOnly={true}
                sideButtons={[]}
              />
            </div>
            <hr />
            <div className={'new-view-action-container'}>
              <span onClick={this.handleLike}>
                <FontAwesomeIcon className={'ico'} icon={['far', 'heart']} />
                &nbsp; Like&nbsp; ({likeCount == 0 ? '' : likeCount})
              </span>
              <span>
                <FontAwesomeIcon icon={['far', 'comment-alt']} />
                &nbsp; Comment
              </span>
              <span>
                <FontAwesomeIcon icon={['fas', 'share-alt']} />
                &nbsp; Share
              </span>
            </div>
            <div className={'news-view-article'}>
              <Editor
                placeholder={'Title'}
                className={'news-card-add-title'}
                editorState={article}
                readOnly={true}
                sideButtons={[]}
              />
            </div>
          </div>
        </div>
        <div className={'news-view-stat'}>
          <NewsTabs />
        </div>
      </div>
    )
  }
}

export default withRouter(NewsView)
