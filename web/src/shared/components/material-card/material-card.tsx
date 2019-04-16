import React from 'react'
import './material-card.scss'
import { Block, Flex, Button } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

interface IMaterialProps {
  role?: String
}
const material = {
  imageSrc:
    'https://res-5.cloudinary.com/dwpujv6in/image/upload/c_pad,dpr_2.0,f_auto,h_930,q_auto,w_930/v1/media/catalog/product/f/d/fd1_lngchr_bh_frontlow-field-lounge-chair-tait-blush.jpg',
  name: 'Chair required',
  description: 'here goes some material description and purpose',
  startDate: '2/2/2019',
  endDate: '2/4/2019',
  type: 'Chair',
  status: 'New'
}

export default function MaterialCard(props: IMaterialProps) {
  let handleDelete = function() {
    Axios.delete('/api/material/:_id')
      .then()
      .catch(console.error)
  }
  return (
    <section className="Material">
      <div
        className="Material-Display"
        style={{ backgroundImage: `url(${material.imageSrc})` }}
      />
      <div className="Material-Description">
        <Block className={'center  MaterialDescription'}>
          <span className="MaterialTitle"> {material.name}</span>
          <p>{material.description.substr(0, 100)}...</p>
          <div>
            <FontAwesomeIcon icon={'calendar'} />
            <span className="MaterialDate">
              &emsp; <i>{material.startDate}</i> &nbsp;to &nbsp;<i>{material.endDate}</i>
            </span>
          </div>

          <Block className={'full-width flex'}>
            <span className={'full-width MaterialFields flex'}>
              <b> T </b> &nbsp; {material.type}&emsp;
            </span>
            <span className={'full-width MaterialFields flex'}>
              <FontAwesomeIcon
                className={'margin-top-small left'}
                icon="exclamation-circle"
              />{' '}
              &nbsp; {material.status}
            </span>
          </Block>
          {'ORGANIZATION' == 'ORGANIZATION' ? (
            <Block last className={'ActionContainer flex'}>
              <Flex className={'full-width '} />
              <Flex className={'full-width '} />
              <span className={'full-width flex '}>
                <Button onClick={() => alert('editing')} className={'ActionButton'}>
                  <FontAwesomeIcon icon={'pencil-alt'} className={'EditIcon'} />
                </Button>
              </span>
              &emsp;&emsp;
              <span className={'full-width flex'}>
                <Button onClick={() => alert('deleted')} className={'ActionButton '}>
                  <FontAwesomeIcon icon={'trash'} className={'TrashIcon'} />
                </Button>
              </span>
            </Block>
          ) : (
            ''
          )}
        </Block>
      </div>
    </section>
  )
}

/*
return (
<>
  <Content className={"MaterialCardContent"}>
    <div className={"MaterialImageContainer"}>
      <div className={"MaterialImage"}>
        <Image src={material.imageSrc} className={"MaterialImage"}/>
      </div>
      <div className={"Material-Display"}>

      </div>
      <Block className={"center  MaterialDescription"}>
        <Title> {material.name}</Title>
        <p>
          {material.description}
        </p>
        <Block>
          From <i>{material.startDate}</i> to <i>{material.endDate}</i>
        </Block>
        <Block>
          Type &emsp; {material.type}
        </Block>
        <Block>
          Status &emsp; {material.status}
        </Block>
      </Block>
    </div>
  </Content>
</>
)*/
