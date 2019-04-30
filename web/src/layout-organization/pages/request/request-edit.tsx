import {
  Anchor,
  Block,
  Image,
  Content,
  Flex,
  FlexSpacer,
  Page,
  Title,
  Toggle,
  Yoga,
  Button,
  Input,
  ImageInput
} from 'gerami'
import { TextField } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { RouteComponentProps, withRouter } from 'react-router'
import { Switch } from '@material-ui/core'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { useMyOrganizationState } from '../../../layout-organization/stores/my-organization/my-organization-provider'
import RichPage from '../../../shared/components/rich-page/rich-page'
import RequestFundDetail from '../../../shared/pages/request-detail/request-fund/request-fund-detail'
import RequestDetail from '../../../shared/pages/request-detail/request-information'
import { editRequest } from '../../../../../api/modules/request/request.controller'

function RequestEdit({ match }: RouteComponentProps<{ _id: string }>) {
  const [request, setRequest] = useState<any>()
  const [edit, setEdit] = useState<any>()
  let [toggle, setToggle] = useState(false)

  let { myOrganization } = useMyOrganizationState()

  useEffect(() => {
    axios
      .put(`/api/request/${match.params._id}`)
      .then(res => {
        setEdit(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  const editRequest = (form: any) => {
    const data = new FormData()
    data.append('name', form.target.name.value)
    data.append('description', form.target.description.value)
    data.append('startDate', form.target.startDate.value)
    data.append('endDate', form.target.endDate.value)

    if (uploadRef.current && uploadRef.current.files && uploadRef.current.files.length)
      data.append('picture', uploadRef.current.files[0])

    axios
      .get(`/api/request/${match.params._id}`)
      .then(res => {
        setRequest(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }
  const { account } = useAccountState()
  const uploadRef = useRef<HTMLInputElement>(null)

  return !request ? null : (
    <form onSubmit={e => editRequest(e)} method={'POST'}>
      <RichPage
        ready={true}
        documentTitle={request.name}
        title={<Input className={'bold'} name={'name'} defaultValue={request.name} />}
        actions={
          (account &&
            ((account.role === 'VOLUNTEER' && [{}]) ||
              (account.role === 'ORGANIZATION' &&
                myOrganization &&
                myOrganization._id === request._by._id && [
                  {
                    type: 'submit',
                    children: <>save</>
                  }
                ]))) ||
          []
        }
      >
        <div className={'fg-blackish padding-bottom-big'}>
          <Flex>
            {request.type} | Posted on {new Date(request._at).toDateString().substr(3)}
            <FlexSpacer />
            <Anchor to={`/organization/${request._by._id}`}>
              {request._by.account.displayName}
            </Anchor>
          </Flex>
        </div>
        <ImageInput name={'picture'} defaultValue={request.picture} />
        <div className={'full-width'}>
          <TextField
            name={'description'}
            multiline={true}
            fullWidth={true}
            defaultValue={request.description}
          />
        </div>
        <Block className={'center'}>
          <label className="flex padding-small">
            <FontAwesomeIcon className={'margin-right-big'} icon={'calendar'} />
            <Flex className={'padding-horizontal-none'}>
              <Input name={'startDate'} type={'date'} defaultValue={request.startDate} />
              <FlexSpacer />
              <Input name={'endDate'} type={'date'} defaultValue={request.endDate} />
            </Flex>
          </label>
        </Block>
        <hr />
        <Block last className={'padding-horizontal-none'} />
      </RichPage>
    </form>
  )
}
export default withRouter(RequestEdit)
