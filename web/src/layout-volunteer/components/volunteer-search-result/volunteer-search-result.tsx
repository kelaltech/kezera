import React, { useState, useEffect } from 'react'
import { Tabs, Checkbox } from '@material-ui/core'
import Tab from '@material-ui/core/Tab'
import { Block } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import './volunteer-search-result.scss'
import qs from 'qs'
import axios from 'axios'
import NewsSearchResult from '../../pages/volunteer-search-result/components/search-result-news/volunteer-search-news'
import EventsSearchResult from '../../pages/volunteer-search-result/components/volunteer-search-events/volunteer-search-events'
import DonationSearchResult from '../../pages/volunteer-search-result/components/volunteer-search-donations/volunteer-search-donations'
import OrganizationSearchResult from '../../pages/volunteer-search-result/components/volunteer-search-organizations/volunteer-search-organizations'
import TaskSearchResult from '../../pages/volunteer-search-result/components/volunteer-search-tasks/volunteer-search-tasks'
import VolSearchResult from '../../pages/volunteer-search-result/components/volunteer-search-volunteer/volunteer-search-volunteer'

function VolunteerSearchResult() {
  let [value, setValue] = useState(0)
  let [isCollapsed, setCollapse] = useState(false)
  let [searchTerm, setSearchTerm] = useState('')
  let [searchResult, setSearchResult] = useState([])
  const collapseFilter = () => {
    setCollapse(!isCollapsed)
    let filter = document.getElementById('search_filters')
    let filterBox = document.getElementById('filters')
    isCollapsed ? (filter!.style.height = '20vh') : (filter!.style.height = '0')
    isCollapsed
      ? (filterBox!.style.display = 'block')
      : (filterBox!.style.display = 'none')
  }
  const query = qs.parse(window.location.search, {
    ignoreQueryPrefix: true
  }).term

  useEffect(() => {
    setSearchTerm(query)
    fetchAllResult()
  }, [query])

  const fetchAllResult = () => {
    axios
      .get('/api/search/all')
      .then((result: any) => {
        setSearchResult(result.data)
      })
      .catch((e: any) => console.log(e))
  }

  return (
    <div className="search-result-container">
      {/* todo if we added filter api uncomment this
      <div className={'search-filter-container'}>
          <div className={'search-filter-top'}>
            <h4>Filter</h4>
            <span onClick={collapseFilter}>
              {isCollapsed ? (
                <FontAwesomeIcon icon={faPlusCircle} />
              ) : (
                <FontAwesomeIcon icon={faMinusCircle} />
              )}
            </span>
          </div>
          <div id={'search_filters'} className={'search-filters'}>
            <div className={'filters'} id={'filters'}>
              <FormControlLabel
                control={<Checkbox value={'Checked'} />}
                label={'Location'}
              />
              <FormControlLabel
                control={<Checkbox value={'Checked'} />}
                label={'profession'}
              />
              <FormControlLabel control={<Checkbox value={'Checked'} />} label={'NGo'} />
              <FormControlLabel control={<Checkbox value={'Checked'} />} label={'Govt'} />
              <FormControlLabel
                control={<Checkbox value={'Checked'} />}
                label={'Hospital'}
              />
              <FormControlLabel
                control={<Checkbox value={'Checked'} />}
                label={'from subscription'}
              />
              <FormControlLabel
                control={<Checkbox value={'Checked'} />}
                label={'Recent'}
              />
              <FormControlLabel
                control={<Checkbox value={'Checked'} />}
                label={'Recent'}
              />
            </div>
          </div>
        </div>*/}
      <div className={'tabs-container'}>
        <Tabs
          className={'tabs-cont '}
          value={value}
          onChange={(e, v) => setValue(v)}
          indicatorColor={'primary'}
          textColor={'primary'}
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab label={'Donations'} />
          <Tab label={'News'} />
          <Tab label={'Event'} />
          <Tab label={'Task'} />
          <Tab label={'Organization'} />
          <Tab label={'Volunteer'} />
        </Tabs>

        {value === 0 && (
          <Block>
            <DonationSearchResult term={searchTerm} />
          </Block>
        )}
        {value === 1 && (
          <Block>
            <NewsSearchResult term={searchTerm} />
          </Block>
        )}
        {value === 2 && (
          <Block>
            <EventsSearchResult term={searchTerm} />
          </Block>
        )}
        {value === 3 && (
          <Block>
            <TaskSearchResult term={searchTerm} />
          </Block>
        )}

        {value === 4 && (
          <Block>
            <OrganizationSearchResult term={searchTerm} />
          </Block>
        )}
        {value === 5 && (
          <Block>
            <VolSearchResult term={searchTerm} />
          </Block>
        )}
      </div>
    </div>
  )
}
export default VolunteerSearchResult
