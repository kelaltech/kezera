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

import ShareListDialog from '../../../shared/components/share-list-dialog/share-list-dialog'

interface INewsAddState {
  title: any
  description: any
  article: any
  error: any
  likeCount: number
  shareCount: number
  liked: boolean
  isSpamReportDropOpen: boolean
  shareListPicker: boolean
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
      shareCount: 0,
      liked: false,
      isSpamReportDropOpen: false,
      shareListPicker: false
    }
  }
  componentDidMount(): void {
    //load message here
    this.loadNews()
  }
  handleShareClick = () => {
    const { match } = this.props
    axios
      .put(`/api/news/${match.params._id}/share`)
      .then(news => news.data)
      .then(data => {
        this.setState({
          shareCount: data.share
        })
      })
      .catch(e => {
        console.log(e) //todo handle error properly
      })
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
          likeCount: data.data.likes.length,
          shareCount: data.data.share.length
        })
      })
      .catch(e => {
        this.setState({
          error: e
        })
      })
  }

  handleDeleteNews = () => {
    const { match, history } = this.props
    let check = confirm('are you sure you want to delete the news')

    if (check) {
      axios
        .delete(`/api/news/${match.params._id}`)
        .then(() => {
          history.push({
            pathname: `/news`
          })
        })
        .catch(e => {
          alert('something went wrong try again!')
        })
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
    const {
      description,
      title,
      article,
      liked,
      likeCount,
      shareListPicker,
      shareCount
    } = this.state
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
                  <span className={' name-view-like-icon'} onClick={this.handleLike}>
                    <FontAwesomeIcon icon={['far', 'heart']} />
                  </span>
                )}
                <span onClick={this.fetchLikes} className={' name-view-like-list'}>
                  &nbsp; Likes&nbsp; <span>{likeCount == 0 ? '' : likeCount}</span>
                </span>
              </span>
              <span
                className={'news-view-share-icon'}
                onClick={() =>
                  this.setState({ shareListPicker: !this.state.shareListPicker })
                }
              >
                <FontAwesomeIcon icon={['fas', 'share-alt']} />
                &nbsp; Share&nbsp; <span>{shareCount == 0 ? '' : shareCount}</span>
              </span>
              <ShareListDialog
                open={shareListPicker}
                onClose={() =>
                  this.setState({ shareListPicker: !this.state.shareListPicker })
                }
                title={title}
                _id={match.params._id}
                handleShare={this.handleShareClick}
                shareUrl={`https://spva-app.herokuapp.com`} //todo change share url to actual url
              />
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
