import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Anchor, Button, Loading, Yoga } from 'gerami'
import { TextField } from '@material-ui/core'
import Axios from 'axios'

import {
  IOrganizationHelpSeekRequest,
  IOrganizationResponse
} from '../../../apiv/organization.apiv'
import useLocale from '../../hooks/use-locale/use-locale'
import RichPage from '../../components/rich-page/rich-page'
import useField from '../../hooks/use-field/use-field'

function SeekHelp({ match, history }: RouteComponentProps<{ organization_id: string }>) {
  const { loading, t } = useLocale([])

  const [error, setError] = useState()
  const [organization, setOrganization] = useState<IOrganizationResponse>()

  useEffect(() => {
    Axios.get<IOrganizationResponse>(
      `/api/organization/get/${match.params.organization_id}`
    )
      .then(response => {
        setOrganization(response.data)
      })
      .catch(setError)
  }, [])

  const contact = useField({ maxLength: 500 })
  const message = useField({ maxLength: 1000 })

  const [submitting, setSubmitting] = useState(false)
  const handleSubmit = (): void => {
    setSubmitting(true)

    const data: IOrganizationHelpSeekRequest = {
      contact: contact.value,
      message: message.value
    }
    Axios.post<void>(`/api/organization/seek-help/${organization!._id}`, data)
      .then(() => history.push(`/o/${organization!._id}`))
      .catch(e => {
        setError(e)
        setSubmitting(false)
      })
  }

  return (
    loading ||
    (!organization ? (
      <Loading />
    ) : (
      <RichPage
        error={error}
        onErrorClose={setError}
        ready={!!organization}
        covers={
          organization.account.photoUri
            ? [`${organization.account.photoUri}?size=1080`]
            : undefined
        }
        title={
          <h1>
            Seek Help from{' '}
            <Anchor to={`/o/${organization._id}`} target={'_blank'} rel={'noopener'}>
              {organization.account.displayName}
            </Anchor>
          </h1>
        }
        description={
          'This form may be used by you to submit a help request to this request. The help seeker may be yourself or someone else in need (including those who do not have access to such technology to make a help request). Please provide an appropriate and detailed contact information and description message of the problem. The organization may or may not respond to your request (using the contact information provided here), after reviewing the problem description.'
        }
      >
        <Yoga maxCol={2} className={'yoga-in-rich-page'}>
          <>
            <label
              htmlFor={'contact-input'}
              className={'font-S fg-primary margin-vertical-normal'}
            >
              Contact Information
            </label>
            <TextField
              id={'contact-input'}
              {...contact.textAreaProps}
              multiline
              rows={5}
              placeholder={'Email, phone, location...'}
              className={'full-width'}
            />
          </>
          <>
            <label
              htmlFor={'message-input'}
              className={'font-S fg-primary margin-vertical-normal'}
            >
              Description Message
            </label>
            <TextField
              id={'message-input'}
              {...message.textAreaProps}
              multiline
              rows={10}
              placeholder={`Detailed description of the help seeker's problem...`}
              className={'full-width'}
            />
          </>
        </Yoga>

        <hr />

        <div className={'margin-top-big right'}>
          <Button
            onClick={handleSubmit}
            primary
            disabled={!contact.value || !message.value || submitting}
          >
            Submit Help Request
          </Button>
        </div>
      </RichPage>
    ))
  )
}

export default withRouter(SeekHelp)
