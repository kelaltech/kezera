import { Action } from './volunteer-reducer'
import { IVolunteerResponse } from '../../../../../api/modules/volunteer/volunteer.apiv'
import axios, { CancelTokenSource } from 'axios'
export function reloadVolunteer (
  volunteerDispatch: (action: Action) => void,
  silentFail = false,
  volunteer?: IVolunteerResponse
):void {
  const reload = (volunteer?: IVolunteerResponse): void => {
    if(!volunteer) throw Error('Volunteer Not Found')
    if(!volunteer.account) throw Error('Volunteer Information is Incorrect')

    window.localStorage.setItem('volunteer',
      JSON.stringify(volunteer)
      )
    volunteerDispatch({type:'setting', volunteer})
  }

  if(volunteer){
    reload(volunteer)
  } else {
    axios
      .get('/api/volunteer/me',{withCredentials: true})
      .then(res => res.data)
      .then(reload)
      .catch(e=>{
        if(!silentFail) throw e
        volunteerDispatch({type: 'removeSetting'})
      })
  }
}

let updateTimeout: NodeJS.Timeout | null = null
let updateCancellation: CancelTokenSource | null = null
export function updateSetting (
  volunteerDispatch: (action: Action) => void,
  volunteer: IVolunteerResponse,
  timeout = 0
):void {
  if(updateTimeout !== null) clearTimeout(updateTimeout)
  if(updateCancellation !== null) updateCancellation.cancel()


  updateTimeout = setTimeout( async ()=>{
    updateCancellation = axios.CancelToken.source()

    axios
      .put('/api/volunteer/edit',
        volunteer
        )
      .then(res => res.data)
      .then(data => reloadVolunteer(volunteerDispatch, false, data))
      .catch(err => {
        if(!axios.isCancel(err)){
          reloadVolunteer(volunteerDispatch)
        }
      })

    updateTimeout = null
  },timeout)
  volunteerDispatch({type: 'setting', volunteer})
}