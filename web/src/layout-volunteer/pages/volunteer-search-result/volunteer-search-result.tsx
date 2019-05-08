import React from 'react'
import VolunteerSearchResult from '../../components/volunteer-search-result/volunteer-search-result'
import RichPage from '../../../shared/components/rich-page/rich-page'
function SearchResult() {
  return (
    <RichPage title={'search result'}>
      <VolunteerSearchResult />
    </RichPage>
  )
}

export default SearchResult
