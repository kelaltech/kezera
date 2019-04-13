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
interface Props {
  /**
   * @default false
   */
  readonly?: boolean
}

function VolunteerSettings({ readonly }: Props) {
  const { loading, t } = useLocale([
    /* todo: use some namespace */
  ])

  const volunteerDispatch = useVolunteerDispatch()
  const { volunteer } = useVolunteerState()
  const [gender, setGender] = useState(volunteer ? volunteer.gender : '')
  const [country, setCountry] = useState(volunteer ? volunteer.country : '')
  const [location, setLocation] = useState(volunteer ? volunteer.location : '')
  const [birthdate, setBirthdate] = useState(volunteer ? volunteer.birthdate : '')
  const [username, setUsername] = useState(volunteer ? volunteer.username : '')

  const [editGender, setEditGender] = useState(false),
    [editCountry, setEditCountry] = useState(false),
    [editLocation, setEditLocation] = useState(false),
    [editBirthdate, setEditBirthdate] = useState(false),
    [editUsername, setEditUsername] = useState(false)

  const [visibility, setVisibility] = useState({
    task: true,
    money: true,
    material: true,
    event: true,
    certificate: true
  })

  const handleVisibility = (name: string) => (e: any) => {
    setVisibility({ ...visibility, [name]: e.target.checked })
    emitChange({ visibility })
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
  const handleLocationChange = (e: any) => {
    e.preventDefault()
    emitChange({ location })
    setEditLocation(false)
  }

  return (
    loading || (
      <Block last>
        <Content style={{ overflow: 'visible' }}>
          <Block first>
            <Flex>
              <h3>{`User Setting`}</h3>
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
                  <span className={'fg-blackish'}>{`username`}</span>
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
                <Input
                  className={'full-width'}
                  type={'text'}
                  label={`Username`}
                  name={'username'}
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                />
              ) : (
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{`Gender`}</span>
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
                  label={`Username`}
                  name={'username'}
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                />
              ) : (
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{`Country`}</span>
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

          <form method={'POST'} onSubmit={handleLocationChange}>
            <Block
              className={`${
                editLocation ? 'setting-general-field-editing' : ''
              } setting-general-field`}
            >
              <FontAwesomeIcon className={'margin-right-big'} icon={faSearchLocation} />
              {editLocation ? (
                <Input
                  className={'full-width'}
                  type={'text'}
                  label={`Location`}
                  name={'location'}
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              ) : (
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{`Location`}</span>
                  <span>{location}</span>
                </div>
              )}

              <Button
                type={!editLocation ? 'submit' : 'button'}
                className={'small-circle-button margin-left-big'}
                onClick={() => setEditLocation(!editLocation)}
              >
                <FontAwesomeIcon icon={editLocation ? 'check' : 'pencil-alt'} />
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
                  type={'text'}
                  label={`Birthdate`}
                  name={'birthdate'}
                  // @ts-ignore
                  value={birthdate}
                  onChange={e => setBirthdate(new Date(e.target.value))}
                />
              ) : (
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{`Birthdate`}</span>
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
              <h3>{`Privacy Setting`}</h3>
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
                label={'Certificate'}
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
                label={'Event'}
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
                label={'material'}
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
                label={'Task'}
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
                label={'Money'}
              />
            </div>
          </Block>

          <div className={'padding-horizontal-very-big padding-vertical-normal'}>
            <hr style={{ opacity: 0.5 }} />
          </div>
        </Content>
      </Block>
    )
  )
}

export default VolunteerSettings
