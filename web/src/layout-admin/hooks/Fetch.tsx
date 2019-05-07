import { useState, useEffect } from 'react'
import Axios from 'axios'

export function useFetch(url: string) {
  let [data, setData] = useState([])
  useEffect(() => {
    Axios.get(url)
      .then(resp => setData(resp.data))
      .catch(console.error)
  }, [])

  return data
}
