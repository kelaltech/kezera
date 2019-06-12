import React, { useState } from 'react'
import './volunteer-setting.scss'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { Block, Button, Content, Flex, FlexSpacer, Input } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCertificate,
  faCalendarCheck,
  faToolbox,
  faHandHoldingUsd,
  faTasks,
  faUserTag,
  faVenusMars,
  faFlag,
  faBirthdayCake,
  faSearchLocation
} from '@fortawesome/free-solid-svg-icons'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import {
  useVolunteerDispatch,
  useVolunteerState
} from '../../stores/volunteer/volunteer-provider'
import { updateSetting } from '../../stores/volunteer/volunteer-actions'
import { MenuItem, TextField } from '@material-ui/core'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { Timeline } from '../../../shared/components/timeline/timeline'
interface Props {
  /**
   * @default false
   */
  readonly?: boolean
}

const genderTypes = [
  {
    value: 'MALE',
    label: 'M'
  },
  {
    value: 'FEMALE',
    label: 'F'
  }
]
function VolunteerSettings({ readonly }: Props) {
  const { loading, t } = useLocale(['volunteer-setting'])


  const { account } = useAccountState()

  const volunteerDispatch = useVolunteerDispatch()
  const { volunteer } = useVolunteerState()
  const [gender, setGender] = useState(volunteer ? volunteer.gender : '')
  const [country, setCountry] = useState(volunteer ? volunteer.country : '')
  const [birthdate, setBirthdate] = useState<any>(volunteer ? volunteer.birthdate : '')
  const [username, setUsername] = useState(volunteer ? volunteer.username : '')

  const [editGender, setEditGender] = useState(false),
    [editCountry, setEditCountry] = useState(false),
    [editBirthdate, setEditBirthdate] = useState(false),
    [editUsername, setEditUsername] = useState(false)

  const [visibility, setVisibility] = useState({
    task: volunteer!.privacy.task,
    money: volunteer!.privacy.money,
    material: volunteer!.privacy.material,
    event: volunteer!.privacy.event,
    certificate: volunteer!.privacy.certificate
  })

  const handleVisibility = (name: string) => (e: any) => {
    const data = { ...visibility, [name]: e.target.checked }
    setVisibility({ ...data })
    emitChange({ privacy: data })
  }

  const emitChange = (volunteerChanges: any): void => {
    if (readonly) return
    const data = { ...volunteer, ...volunteerChanges }
    updateSetting(volunteerDispatch, data, 0)
  }

  const handleUsernameChange = (e: any) => {
    e.preventDefault()
    console.log('username =', username)
    emitChange({ username })
    setEditUsername(false)
  }
  const handleGenderChange = (e: any) => {
    e.preventDefault()
    emitChange({ gender })
    setEditGender(false)
  }
  const handleBirthdate = (e: any) => {
    e.preventDefault()
    emitChange({ birthdate })
    setEditBirthdate(false)
  }
  const handleCountryChange = (e: any) => {
    e.preventDefault()
    emitChange({ country })
    setEditCountry(false)
  }

  return (
    loading || (
      <Block last>
        <Content style={{ overflow: 'visible' }}>
          <Block first>
            <Flex>
              <h3>{t`volunteer-setting:user-setting`}</h3>
              <FlexSpacer />
            </Flex>
          </Block>

          <hr />
          <form method={'POST'} onSubmit={handleUsernameChange}>
            <Block
              className={`${
                editUsername ? 'setting-general-field-editing' : ''
              } setting-general-field`}
            >
              <FontAwesomeIcon className={'margin-right-big'} icon={faUserTag} />
              {editUsername ? (
                <Input
                  className={'full-width'}
                  type={'text'}
                  label={`Username`}
                  name={'username'}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              ) : (
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{t`volunteer-setting:username`}:</span>
                  <span>{username}</span>
                </div>
              )}

              <Button
                type={!editUsername ? 'submit' : 'button'}
                className={'small-circle-button margin-left-big'}
                onClick={() => setEditUsername(!editUsername)}
              >
                <FontAwesomeIcon icon={editUsername ? 'check' : 'pencil-alt'} />
              </Button>
            </Block>
          </form>
          <div className={'padding-horizontal-very-big padding-vertical-normal'}>
            <hr style={{ opacity: 0.5 }} />
          </div>

          <form method={'POST'} onSubmit={handleGenderChange}>
            <Block
              className={`${
                editGender ? 'setting-general-field-editing' : ''
              } setting-general-field`}
            >
              <FontAwesomeIcon className={'margin-right-big'} icon={faVenusMars} />
              {editGender ? (
                <TextField
                  id="standard-select-gender"
                  select
                  label="Select"
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  helperText="Please select your gender"
                  margin="normal"
                  className={'full-width'}
                >
                  {genderTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{t`volunteer-setting:gender`}:</span>
                  <span>{gender}</span>
                </div>
              )}

              <Button
                type={!editGender ? 'submit' : 'button'}
                className={'small-circle-button margin-left-big'}
                onClick={() => setEditGender(!editGender)}
              >
                <FontAwesomeIcon icon={editGender ? 'check' : 'pencil-alt'} />
              </Button>
            </Block>
          </form>
          <div className={'padding-horizontal-very-big padding-vertical-normal'}>
            <hr style={{ opacity: 0.5 }} />
          </div>

          <form method={'POST'} onSubmit={handleCountryChange}>
            <Block
              className={`${
                editCountry ? 'setting-general-field-editing' : ''
              } setting-general-field`}
            >
              <FontAwesomeIcon className={'margin-right-big'} icon={faFlag} />
              {editCountry ? (
                <Input
                  className={'full-width'}
                  type={'text'}
                  label={`Country`}
                  name={'country'}
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                />
              ) : (
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{t`volunteer-setting:country`}:</span>
                  <span>{country}</span>
                </div>
              )}

              <Button
                type={!editCountry ? 'submit' : 'button'}
                className={'small-circle-button margin-left-big'}
                onClick={() => setEditCountry(!editCountry)}
              >
                <FontAwesomeIcon icon={editCountry ? 'check' : 'pencil-alt'} />
              </Button>
            </Block>
          </form>
          <div className={'padding-horizontal-very-big padding-vertical-normal'}>
            <hr style={{ opacity: 0.5 }} />
          </div>
          <form method={'POST'} onSubmit={handleBirthdate}>
            <Block
              className={`${
                editBirthdate ? 'setting-general-field-editing' : ''
              } setting-general-field`}
            >
              <FontAwesomeIcon className={'margin-right-big'} icon={faBirthdayCake} />
              {editBirthdate ? (
                <Input
                  className={'full-width'}
                  type={'date'}
                  label={`Birthdate`}
                  name={'birthdate'}
                  // @ts-ignore
                  value={birthdate}
                  onChange={e => setBirthdate(e.target.value)}
                />
              ) : (
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{t`volunteer-setting:birthdate`}:</span>
                  <span>{birthdate}</span>
                </div>
              )}

              <Button
                type={!editBirthdate ? 'submit' : 'button'}
                className={'small-circle-button margin-left-big'}
                onClick={() => setEditBirthdate(!editBirthdate)}
              >
                <FontAwesomeIcon icon={editBirthdate ? 'check' : 'pencil-alt'} />
              </Button>
            </Block>
          </form>
          <div className={'padding-horizontal-very-big padding-vertical-normal'}>
            <hr style={{ opacity: 0.5 }} />
          </div>
        </Content>

        {/*portfolio visibility control*/}
        <Content style={{ overflow: 'visible' }}>
          <Block first>
            <Flex>
              <h3>{t`volunteer-setting:privacy-setting`}</h3>
              <FlexSpacer />
            </Flex>
          </Block>

          <hr />

          <Block className={'setting-general-field visibility-general-field'}>
            <div>
              <FontAwesomeIcon className={'margin-right-big'} icon={faCertificate} />
              <FormControlLabel
                control={
                  <Switch
                    checked={visibility.certificate}
                    onChange={handleVisibility('certificate')}
                    value={'certificate'}
                  />
                }
                label={t`volunteer-setting:certificate`}
              />
            </div>

            <FlexSpacer />

            <div>
              <FontAwesomeIcon className={'margin-right-big'} icon={faCalendarCheck} />
              <FormControlLabel
                control={
                  <Switch
                    checked={visibility.event}
                    onChange={handleVisibility('event')}
                    value={'event'}
                  />
                }
                label={t`volunteer-setting:event`}
              />
            </div>

            <FlexSpacer />

            <div>
              <FontAwesomeIcon className={'margin-right-big'} icon={faToolbox} />
              <FormControlLabel
                control={
                  <Switch
                    checked={visibility.material}
                    onChange={handleVisibility('material')}
                    value={'material'}
                  />
                }
                label={t`volunteer-setting:material`}
              />
            </div>
          </Block>

          <div className={'padding-horizontal-very-big padding-vertical-normal'}>
            <hr style={{ opacity: 0.5 }} />
          </div>

          <Block className={'setting-general-field visibility-general-field'}>
            <div>
              <FontAwesomeIcon className={'margin-right-big'} icon={faTasks} />
              <FormControlLabel
                control={
                  <Switch
                    checked={visibility.task}
                    onChange={handleVisibility('task')}
                    value={'task'}
                  />
                }
                label={t`volunteer-setting:task`}
              />
            </div>
            <FlexSpacer />

            <div>
              <FontAwesomeIcon className={'margin-right-big'} icon={faHandHoldingUsd} />
              <FormControlLabel
                control={
                  <Switch
                    checked={visibility.money}
                    onChange={handleVisibility('money')}
                    value={'money'}
                  />
                }
                label={t`volunteer-setting:money`}
              />
            </div>
          </Block>

          <div className={'padding-horizontal-very-big padding-vertical-normal'}>
            <hr style={{ opacity: 0.5 }} />
          </div>
        </Content>

        <Content style={{ overflow: 'visible' }}>
          <Block first/>
          <Timeline title={t`volunteer-setting:activity-setting`} _id={account!._id} />
        </Content>

      </Block>
    )
  )
}

export default VolunteerSettings
