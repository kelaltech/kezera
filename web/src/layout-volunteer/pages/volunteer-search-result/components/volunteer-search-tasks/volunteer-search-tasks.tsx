import React, { useEffect, useState } from 'react'

import axios from 'axios'
import RequestCard from '../../../../../shared/components/request/request-card'

interface ITaskResult {
  term?:string
}
function TaskSearchResult(props:ITaskResult) {
  const {term} = props
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    axios
      .get('/api/task/search?term='+term)
      .then((tasks:any)=>{
        setTasks(tasks.data)
      })
      .catch((e:any)=>console.log(e))
  })

  return (
    <div>
      <h1>Task Search result</h1>
      <div>
        {
          tasks.map((t:any)=>(
            <RequestCard request={t}/>
          ))
        }
      </div>
    </div>
  )
}

export default TaskSearchResult
