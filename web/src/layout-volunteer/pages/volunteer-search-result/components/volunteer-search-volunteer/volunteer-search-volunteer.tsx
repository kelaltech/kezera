import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Yoga } from 'gerami'
import VolunteerCard from '../../../../components/volunteer-card/volunteer-card'
interface IVolunteerResult {
  term?: string
}
function VolSearchResult(props: IVolunteerResult) {
  const [volunteer, setVolunteer] = useState([])
  const { term } = props
  useEffect(() => {
    axios
      .get(`/api/volunteer/search?term=${term}`)
      .then(vol => {
        setVolunteer(vol.data)
      })
      .catch(e => console.log(e))
  }, [term])
  return volunteer.length === 0 ? (
    <div className={'fg-blackish'}>can't find volunteers with the term {term}</div>
  ) : (
    <Yoga maxCol={2}>
      {volunteer.map((v: any) => (
        <VolunteerCard
          country={v.country}
          email={v.email}
          name={v.name}
          phone_number={v.phone_number}
          gender={v.Gender}
          _id={v.account._id}
          img={`/api/account/get-photo/${v.account._id}`}
        />
      ))}
    </Yoga>
  )
}

export default VolSearchResult
