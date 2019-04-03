import React, { useState } from 'react'
// import { Input } from 'gerami'
import {Input} from '@material-ui/core'
import './search.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import { RouteComponentProps, withRouter } from 'react-router'

interface ISearchProps {
  to ?: string
}

function Search ({history, to}: RouteComponentProps & ISearchProps) {

  const [term, setTerm] = useState()

  const handleSearch = (e:any)=>{
    e.preventDefault();
    setTerm(e.target.value)
    history.push({
      pathname: to,
      search:`?term=${term}`
    })
  }
  const handleSearchChange = (e:any)=>{
   setTerm(e.target.value)
  }

  return(
    <div className={'search-bar-container'}>
      <div className={'search-bar-input'}>
        <span className={'input-search-icon'}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <form onSubmit={handleSearch}>
          <Input
            onChange={handleSearchChange}
            className={'input-search'}
            placeholder={"search"}
            disableUnderline={true}
          />
        </form>
      </div>
    </div>
  )
}

export default withRouter(Search)