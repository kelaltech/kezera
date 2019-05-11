import React from 'react'
import './news-view.scss'
import NewsTabs from './components/news-view-tab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { match, withRouter } from 'react-router'
import { Editor, createEditorState } from 'medium-draft'
import { convertToRaw, convertFromRaw, EditorState, AtomicBlockUtils } from 'draft-js'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Anchor, Button, Flex } from 'gerami'
import SpamReportDrop from '../../../shared/components/spam-report-drop/spam-report-drop'
import { Modal } from '@material-ui/core'

interface INewsAddState {
  title: any
  description: any
  article: any
  error: any
  likeCount: number
  liked: boolean
  isSpamReportDropOpen: boolean
}

class NewsView extends React.Component<any, INewsAddState> {
  constructor(props: any) {
    super(props)

    this.state = {
      title: EditorState.createEmpty(),
      description: EditorState.createEmpty(),
      article: EditorState.createEmpty(),
      error: '',
      likeCount: 0,
      liked: false,
      isSpamReportDropOpen: false
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

  handleDeleteNews = () => {
    const { match } = this.props
    let check = confirm('are you sure you want to delete the news')

    if (check) {
      axios
        .delete(`/api/news/${match.params._id}`)
        .then(() => {
          alert('successfully removed')
        })
        .catch(e => console.log(e))
    } else {
      alert('canceled')
    }
  }
  handleLike = () => {
    const { match } = this.props
    //send request to the back
    axios
      .put(`/api/news/${match.params._id}/like`)
      .then(data => {
        this.setState({
          likeCount: data.data.likes,
          liked: !this.state.liked
        })
      })
      .catch(e => {
        console.log(e)
      })
  }
  fetchLikes = () => {
    //render the like component
  }

  render() {
    const { match, role } = this.props
    const { description, title, article, liked, likeCount } = this.state
    return (
      <div className={'news-view-container'}>
        <div className={'news-view'} id={'news-view-cont'}>
          <div
            className={'news-view-img'}
            style={{
              backgroundImage: `url(/api/news/${match.params._id}/pic`
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
                {liked ? (
                  <span className={'name-view-like-icon'} onClick={this.handleLike}>
                    <FontAwesomeIcon className={'ico'} icon={['fas', 'heart']} />
                  </span>
                ) : (
                  <span className={'name-view-like-icon'} onClick={this.handleLike}>
                    <FontAwesomeIcon icon={['far', 'heart']} />
                  </span>
                )}
                <span onClick={this.fetchLikes} className={'name-view-like-list'}>
                  &nbsp; Likes&nbsp; <span>{likeCount == 0 ? '' : likeCount}</span>
                </span>
              </span>
              <span className={'news-view-share-icon'}>
                <FontAwesomeIcon icon={['fas', 'share-alt']} />
                &nbsp; Share
              </span>
              {role == 'ORGANIZATION' && (
                <span>
                  <a
                    className={'news-view-edit-icon'}
                    href={`/news/${match.params._id}/edit`}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    &nbsp; Edit
                  </a>
                </span>
              )}
              {role == 'ORGANIZATION' && (
                <span>
                  <a
                    className={'news-view-edit-icon'}
                    href={'#like'}
                    onClick={this.handleDeleteNews}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                    &nbsp; Delete
                  </a>
                </span>
              )}
              {role == 'VOLUNTEER' && (
                <span>
                  <Anchor
                    onClick={() =>
                      this.setState({
                        isSpamReportDropOpen: !this.state.isSpamReportDropOpen
                      })
                    }
                    title={`Report News as Spam`}
                  >
                    <FontAwesomeIcon icon={'user-slash'} />
                  </Anchor>
                  <SpamReportDrop
                    type={'NEWS'}
                    ids={[match.params._id]}
                    open={this.state.isSpamReportDropOpen}
                    onClose={() =>
                      this.setState({
                        isSpamReportDropOpen: !this.state.isSpamReportDropOpen
                      })
                    }
                    align={'right'}
                    anchorOffset={2}
                  />
                </span>
              )}
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
          <NewsTabs _id={match.params._id} />
        </div>
      </div>
    )
  }
}

export default withRouter(NewsView)
