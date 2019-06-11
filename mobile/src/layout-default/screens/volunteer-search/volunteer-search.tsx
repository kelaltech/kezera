import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import Axios from 'axios'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import Header from '../../../shared/components/header/header'
import searchStyle from './search-style'
import NewsToday from '../../../shared/components/news-today/news-today'
import { INewsResponse } from '../../../../../api/modules/news/news.apiv'
import { richTextToDisplayText } from '../../../lib/richTextConverter'
import { EventCardSecond } from '../../../shared/components/event-card/event-card'
import { SearchBar } from 'react-native-elements'
import classes from '../../../assets/styles/classes'
import { baseUrl } from '../../../app/configs/setup-axios'
function VolunteerSearch({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['volunteer'])
  const [placeholder, setPlaceholder] = useState<boolean>(true)
  const [news, setNews] = useState([])
  const [event, setEvent] = useState([])
  const [request, setRequest] = useState([])
  const [organization, setOrganization] = useState([])
  const [term, setTerm] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    if (!placeholder) {
      newsSearch()
      eventSearch()
      orgniazationSearch()
    }
  }, [term])

  const newsSearch = () => {
    Axios.get(`/api/news/search?term=${term}`)
      .then(data => data.data)
      .then(news => {
        setNews(richTextToDisplayText(news))
      })
      .catch(e => {
        setError(e)
      })
  }
  const eventSearch = () => {
    Axios.get(`/api/event/search?term=${term}`)
      .then(data => data.data)
      .then(events => {
        setEvent(events)
      })
      .catch(e => {
        setError(e)
      })
  }

  const orgniazationSearch = () => {
    Axios.get(`/api/organization/search?term=${term}`)
      .then(data => data.data)
      .then(organization => {
        setOrganization(organization)
      })
      .catch(e => {
        setError(e)
      })
  }
  const handleChange = (term: string) => {
    setTerm(term)
    setPlaceholder(false)
  }

  // todo: a special type of header with the search bar embedded inside
  return (
    loading || (
      <>
        <Header title={'Search'} />
        <View>
          <View style={searchStyle.searchContainer}>
            <SearchBar
              inputStyle={searchStyle.searchInput}
              placeholder={'search'}
              onChangeText={handleChange}
              value={term}
            />
          </View>
          {placeholder ? (
            <View>
              <Text>Explorer the world of SPVA!</Text>
            </View>
          ) : (
            <ScrollView>
              <View>
                <View style={searchStyle.displayHeader}>
                  <Text style={classes.head1}>News</Text>
                  <Text style={classes.link}>see more</Text>
                </View>
                <ScrollView horizontal>
                  {news.map((n: INewsResponse, k) => (
                    <NewsToday
                      share={n.share.length}
                      comment={n.comments.length}
                      likes={n.likes.length}
                      description={n.description}
                      title={n.title}
                      img={{
                        uri: `${baseUrl}/api/news/${n._id}/pic?size=250&quality=80`
                      }}
                      key={k}
                      _id={n._id}
                    />
                  ))}
                </ScrollView>
              </View>
              <View>
                <View style={searchStyle.displayHeader}>
                  <Text style={classes.head1}>Event</Text>
                  <Text style={classes.link}>see more</Text>
                </View>
                <ScrollView horizontal>
                  {event.map((e, k) => (
                    <EventCardSecond event={e} key={k} />
                  ))}
                </ScrollView>
              </View>
            </ScrollView>
          )}
        </View>
      </>
    )
  )
}

export default withNavigation(VolunteerSearch)
