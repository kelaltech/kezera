import React, { useEffect, useState } from 'react'

import axios from 'axios'
import RequestCard from '../../../../../shared/components/request/request-card'

interface ITaskResult {
  term?: string
}
function TaskSearchResult(props: ITaskResult) {
  const { term } = props
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios
      .get('/api/task/search?term=' + term)
      .then((tasks: any) => {
        setTasks([])
        // setTasks(tasks.data) todo uncomment when the api is completed #Dagmawi
      })
      .catch((e: any) => console.log(e))
  }, [term])

  return tasks.length === 0 ? (
    <div className={'fg-blackish'}>can't find tasks with the term {term}</div>
  ) : (
    <div>
      <div>
        {tasks.map((t: any) => (
          <RequestCard request={t} />
        ))}
      </div>
    </div>
  )
}

export default TaskSearchResult
