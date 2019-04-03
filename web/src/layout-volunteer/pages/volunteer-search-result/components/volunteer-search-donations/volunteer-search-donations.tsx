import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RequestCard from '../../../../../shared/components/request/request-card'
interface IDonationResult {
  term?:string
}
function DonationSearchResult(props:IDonationResult) {
  const  {term}= props
  const [donations, setDonations] = useState([])

  useEffect(()=>{
    axios
      .get('/api/request/search?term='+term)
      .then((requests:any)=>{
        setDonations(requests.data)
      })
      .catch((e:any)=>console.log(e))
  },[])

  return (
    <div>
      <h1>Donation Search result</h1>
      <div>
        {
          donations.map((d:any)=>(
            <RequestCard request={d}/>
          ))
        }
      </div>
    </div>
  )
}

export default DonationSearchResult
