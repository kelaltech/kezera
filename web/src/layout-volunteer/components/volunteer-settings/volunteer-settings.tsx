import React, { useState } from 'react'
import './volunteer-setting.scss'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { Anchor, Block, Button, Content, Flex, FlexSpacer, Input, Warning } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  FormControl,
  Input as MatInput,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'




function VolunteerSettings() {
  const { loading, t } = useLocale([
    /* todo: use some namespace */
  ])

  const [gender, setGender] = useState()
  const [country, setCountry] = useState()
  const [location, setLocation] = useState()
  const [birthdate, setBirthdate] = useState()
  const [username,setUsername] =  useState()
  const [userInfo,setUserInfo] = useState()

  const [editGender, setEditGender] = useState(false),
        [editCountry, setEditCountry] = useState(false),
        [editLocation, setEditLocation] = useState(false),
        [editBirthdate, setEditBirthdate]= useState(false),
        [editUsername, setEditUsername] = useState(false);


  const handleUsernameChange = (e:any)=>{
    e.preventDefault()
    if(!username) return

    //send data to back-end and update the volunteer-setting
    //then fetch the new userInfo
  }

  const handleGenderChange = ()=>{

  }

  const handleBirthdate = ()=>{

  }

  const handleCountryChange = () =>{

  }
  const handleLocationChange = () =>{

  }
  return (
    loading || (
      <Block last>
        <Content style={{overflow: 'visible'}}>
          <Block first>
            <Flex>
            <h3>{`User Setting`}</h3>
            <FlexSpacer/>
            </Flex>
          </Block>

          <hr/>
          <form method={'POST'} onSubmit={handleUsernameChange}>
            <Block
              className={`${
                editUsername? 'setting-general-field-editing':''
                } setting-general-field`}
            >
              <FontAwesomeIcon className={'margin-right-big'} icon={'envelope'} />
              {editUsername?(
                <Input
                  className={'full-width'}
                  type={'text'}
                  label={`Username`}
                  name={'username'}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              ):(
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{`username`}</span>
                  <span>{'username'}</span>
                </div>
              )}

              <Button
                type={!editUsername ? 'submit' : 'button'}
                className={'small-circle-button margin-left-big'}
                onClick={()=> setEditUsername(!editUsername)}
              >
                <FontAwesomeIcon icon={editUsername ? 'check':'pencil-alt'}/>
              </Button>
            </Block>
          </form>
          <div className={'padding-horizontal-very-big padding-vertical-normal'}>
            <hr style={{ opacity: 0.5 }} />
          </div>

          <form method={'POST'} onSubmit={handleGenderChange}>
            <Block
              className={`${
                editGender? 'setting-general-field-editing':''
                } setting-general-field`}
            >
              <FontAwesomeIcon className={'margin-right-big'} icon={'envelope'} />
              {editGender?(
                <Input
                  className={'full-width'}
                  type={'text'}
                  label={`Username`}
                  name={'username'}
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                />
              ):(
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{`Gender`}</span>
                  <span>{'Gender'}</span>
                </div>
              )}

              <Button
                type={!editGender ? 'submit' : 'button'}
                className={'small-circle-button margin-left-big'}
                onClick={()=> setEditGender(!editGender)}
              >
                <FontAwesomeIcon icon={editGender ? 'check':'pencil-alt'}/>
              </Button>
            </Block>
          </form>
          <div className={'padding-horizontal-very-big padding-vertical-normal'}>
            <hr style={{ opacity: 0.5 }} />
          </div>

          <form method={'POST'} onSubmit={handleCountryChange}>
            <Block
              className={`${
                editCountry? 'setting-general-field-editing':''
                } setting-general-field`}
            >
              <FontAwesomeIcon className={'margin-right-big'} icon={'envelope'} />
              {editCountry?(
                <Input
                  className={'full-width'}
                  type={'text'}
                  label={`Username`}
                  name={'username'}
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                />
              ):(
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{`Country`}</span>
                  <span>{'Country'}</span>
                </div>
              )}

              <Button
                type={!editCountry ? 'submit' : 'button'}
                className={'small-circle-button margin-left-big'}
                onClick={()=> setEditCountry(!editCountry)}
              >
                <FontAwesomeIcon icon={editCountry ? 'check':'pencil-alt'}/>
              </Button>
            </Block>
          </form>
          <div className={'padding-horizontal-very-big padding-vertical-normal'}>
            <hr style={{ opacity: 0.5 }} />
          </div>


          <form method={'POST'} onSubmit={handleLocationChange}>
            <Block
              className={`${
                editLocation? 'setting-general-field-editing':''
                } setting-general-field`}
            >
              <FontAwesomeIcon className={'margin-right-big'} icon={'envelope'} />
              {editLocation?(
                <Input
                  className={'full-width'}
                  type={'text'}
                  label={`Location`}
                  name={'location'}
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              ):(
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{`Location`}</span>
                  <span>{'Location'}</span>
                </div>
              )}

              <Button
                type={!editLocation ? 'submit' : 'button'}
                className={'small-circle-button margin-left-big'}
                onClick={()=> setEditLocation(!editLocation)}
              >
                <FontAwesomeIcon icon={editLocation ? 'check':'pencil-alt'}/>
              </Button>
            </Block>
          </form>
          <div className={'padding-horizontal-very-big padding-vertical-normal'}>
            <hr style={{ opacity: 0.5 }} />
          </div>


          <form method={'POST'} onSubmit={handleBirthdate}>
            <Block
              className={`${
                editBirthdate? 'setting-general-field-editing':''
                } setting-general-field`}
            >
              <FontAwesomeIcon className={'margin-right-big'} icon={'envelope'} />
              {editBirthdate?(
                <Input
                  className={'full-width'}
                  type={'text'}
                  label={`Birthdate`}
                  name={'birthdate'}
                  value={birthdate}
                  onChange={e => setBirthdate(e.target.value)}
                />
              ):(
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{`Birthdate`}</span>
                  <span>{'Birthdate'}</span>
                </div>
              )}

              <Button
                type={!editBirthdate ? 'submit' : 'button'}
                className={'small-circle-button margin-left-big'}
                onClick={()=> setEditBirthdate(!editBirthdate)}
              >
                <FontAwesomeIcon icon={editBirthdate ? 'check':'pencil-alt'}/>
              </Button>
            </Block>
          </form>
          <div className={'padding-horizontal-very-big padding-vertical-normal'}>
            <hr style={{ opacity: 0.5 }} />
          </div>
        </Content>
      </Block>
    )
  )
}

export default VolunteerSettings
