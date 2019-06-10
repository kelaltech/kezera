import React, { useState } from 'react'
import { Input } from '@material-ui/core'
import { RouteComponentProps, withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import './search.scss'

interface ISearchProps {
  to?: string
}

function Search({ history, to }: RouteComponentProps & ISearchProps) {
  const [term, setTerm] = useState()

  const handleSearch = (e: any) => {
    e.preventDefault()
    setTerm(e.target.value)
    history.push({
      pathname: to,
      search: `?term=${term}`
    })
  }
  const handleSearchChange = (e: any) => {
    setTerm(e.target.value)
  }

  return (
    <div className={'search-bar-container'}>
      <div className={'search-bar-input'}>
        <span className={'input-search-icon'}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <div className={'input-search'}>
          <form onSubmit={handleSearch}>
            <Input
              onChange={handleSearchChange}
              className={'input-search'}
              placeholder={'Search'}
              disableUnderline={true}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Search)
