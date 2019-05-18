import React from 'react'
import './share-list-dialog.scss'
import { Dialog } from '@material-ui/core'
import { DialogProps } from '@material-ui/core/Dialog'
import { Block, Content, Yoga } from 'gerami'
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  FacebookShareCount,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon,
  ViberShareButton,
  ViberIcon,
  TumblrShareButton,
  TumblrIcon
} from 'react-share'

type Props = DialogProps & {
  title?: string
  shareUrl?: string
}
function ShareListDialog({ shareUrl, title, ...dialogProps }: Props) {
  return (
    <Dialog {...dialogProps} className={'share-list-container'}>
      <Content>
        <Block>
          <Yoga maxCol={3}>
            <div className={'share-btn-container'}>
              <FacebookShareButton
                url={shareUrl}
                quote={title}
                hashtags={['#kezera', '#spva', '#charity', '#social']}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>

            <div className={'share-btn-container'}>
              <TwitterShareButton
                url={shareUrl}
                title={title}
                hashtags={['#kezera', '#spva', '#charity', '#social']}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>

            <div className={'share-btn-container'}>
              <TelegramShareButton url={shareUrl} title={title}>
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </div>

            <div className={'share-btn-container'}>
              <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>

            <div className={'share-btn-container'}>
              <LinkedinShareButton url={shareUrl} windowWidth={750} windowHeight={600}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>

            <div className={'share-btn-container'}>
              <RedditShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
            </div>

            <div className={'share-btn-container'}>
              <EmailShareButton url={shareUrl} subject={title} body="body">
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
            <div className={'share-btn-container'}>
              <ViberShareButton url={shareUrl} title={title}>
                <ViberIcon size={32} round />
              </ViberShareButton>
            </div>
            <div className={'share-btn-container'}>
              <TumblrShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
              >
                <TumblrIcon size={32} round />
              </TumblrShareButton>
            </div>
          </Yoga>
        </Block>
      </Content>
    </Dialog>
  )
}

export default ShareListDialog
