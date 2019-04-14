import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Yoga } from 'gerami'
import VolunteerCard from '../../../../components/volunteer-card/volunteer-card'
interface IVolunteerResult {
  term?: string
}
function VolSearchResult(props: IVolunteerResult) {
  const [volunteer, setVolunteer] = useState([])

  useEffect(() => {
    axios
      .get("/api/volunteer/search?term=' + term")
      .then(vol => {
        setVolunteer(vol.data)
      })
      .catch(e => console.log(e))
  })
  return (
    <div>
      <h1>Volunteer Search result</h1>
      <Yoga maxCol={2}>
        {/*   {
          volunteer.map((v)=>(
            <div>
              <VolunteerCard {...v}/>
            </div>
          ))
        }*/}
        {volunteerData.map(v => (
          <VolunteerCard
            country={v.country}
            email={v.email}
            name={v.name}
            phone_number={v.phone_number}
            gender={v.Gender}
            img={v.img}
          />
        ))}
      </Yoga>
    </div>
  )
}

export default VolSearchResult

const volunteerData = [
  {
    name: 'Biruk Tesfaye',
    country: 'Ethiopia',
    Gender: 'Male',
    phone_number: '+251 923637040',
    email: 'biruktesfayeve@gmail.com',
    img: 'https://source.unsplash.com/random'
  },
  {
    name: 'Biruk Tesfaye',
    country: 'Ethiopia',
    Gender: 'Male',
    phone_number: '+251 923637040',
    email: 'biruktesfayeve@gmail.com',
    img: 'https://source.unsplash.com/random'
  },
  {
    name: 'Biruk Tesfaye',
    country: 'Ethiopia',
    Gender: 'Male',
    phone_number: '+251 923637040',
    email: 'biruktesfayeve@gmail.com',
    img: 'https://source.unsplash.com/random'
  },
  {
    name: 'Biruk Tesfaye',
    country: 'Ethiopia',
    Gender: 'Male',
    phone_number: '+251 923637040',
    email: 'biruktesfayeve@gmail.com',
    img: 'https://source.unsplash.com/random'
  }
]
