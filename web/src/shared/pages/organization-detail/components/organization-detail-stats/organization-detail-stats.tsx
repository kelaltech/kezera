import React, { useEffect, useState } from 'react'
import { Block, Content, Flex, FlexSpacer, Loading, Warning, Yoga } from 'gerami'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import Axios from 'axios'

import {
  IOrganizationResponse,
  IOrganizationStats
} from '../../../../../../../api/modules/organization/organization.apiv'

type Props = {
  organization: IOrganizationResponse
}

function OrganizationDetailStats({ organization }: Props) {
  const [error, setError] = useState()
  const [stats, setStats] = useState<IOrganizationStats>()

  const [requestsData, setRequestsData] = useState<
    { type: string; total: number; active: number }[]
  >([])

  const [eventsData, setEventsData] = useState<{ type: string; total: number }[]>([])

  useEffect(() => {
    Axios.get<IOrganizationStats>(`/api/organization/stats/${organization._id}`)
      .then(response => response.data)
      .then(data => {
        data.events.total = 14
        data.events.upcoming = 3
        data.events.ongoing = 1
        setStats(data)

        const newRequestsData: { type: string; total: number; active: number }[] = []
        newRequestsData.push({
          type: `Tasks`,
          total: data.requests.tasks.total,
          active: data.requests.tasks.active
        })
        newRequestsData.push({
          type: `Materials`,
          total: data.requests.materialDonation.total,
          active: data.requests.materialDonation.active
        })
        newRequestsData.push({
          type: `Fundraising`,
          total: data.requests.fundraising.total,
          active: data.requests.fundraising.active
        })
        newRequestsData.push({
          type: `Organs`,
          total: data.requests.organDonation.total,
          active: data.requests.organDonation.active
        })
        setRequestsData(newRequestsData)

        const newEventsData: { type: string; total: number }[] = []
        newEventsData.push({ type: 'Ongoing', total: data.events.ongoing })
        newEventsData.push({ type: 'Upcoming', total: data.events.upcoming })
        newEventsData.push({
          type: 'Past',
          total: data.events.total - (data.events.ongoing + data.events.upcoming)
        })
        setEventsData(newEventsData)
      })
      .catch(e =>
        setError(
          e.response && e.response.data
            ? e.response.data.prettyMessage || e.response.data.message
            : e.message
        )
      )
  }, [organization._id])

  return (
    <Content className={'margin-top-big'}>
      <Block first className={'bold'}>
        Stats
      </Block>

      <hr />

      {error ? (
        <Block last>
          <Warning problem={error} />
        </Block>
      ) : !stats ? (
        <Loading delay />
      ) : (
        <>
          <Block first last>
            <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
              <Flex>
                <div
                  className={'margin-vertical-auto padding-bottom-big'}
                  style={{ width: 120 }}
                >
                  <div className={'font-L fg-accent margin-bottom-normal'}>Requests</div>
                  <div className={'font-S fg-blackish'}>
                    <span className={'fg-primary'}>{stats.requests.total}</span> Total
                  </div>
                  <div className={'font-S fg-blackish'}>
                    <span className={'fg-primary'}>{stats.requests.active}</span> Active
                  </div>
                </div>

                <BarChart
                  data={requestsData}
                  width={700}
                  height={280}
                  className={'inline-block margin-vertical-auto'}
                >
                  <CartesianGrid />
                  <YAxis />
                  <XAxis dataKey={'type'} />
                  <Tooltip />
                  <Bar dataKey={'total'} name={`Total`} fill={'#3f51b5'} />
                  <Bar dataKey={'active'} name={`Active`} fill={'#ff5722'} />
                  <Legend
                    verticalAlign={'middle'}
                    align={'right'}
                    layout={'vertical'}
                    wrapperStyle={{ paddingLeft: 20 }}
                  />
                </BarChart>
              </Flex>
            </div>
          </Block>

          <Block first last className={'bg-whitish'}>
            <Yoga maxCol={2} className={'center yoga-in-rich-page'}>
              <Flex>
                <div
                  className={'shade-S bg-white flex margin-auto'}
                  style={{ width: 180, height: 180, borderRadius: '50%' }}
                >
                  <div className={'margin-auto center'}>
                    <div className={'font-L fg-accent margin-bottom-normal'}>Events</div>
                    <div className={'font-S fg-blackish'}>
                      <span className={'fg-primary'}>{stats.events.total}</span> Total
                    </div>
                    <div className={'font-S fg-blackish'}>
                      <span className={'fg-primary'}>{stats.events.ongoing}</span> Ongoing
                    </div>
                    <div className={'font-S fg-blackish'}>
                      <span className={'fg-primary'}>{stats.events.upcoming}</span>{' '}
                      Upcoming
                    </div>
                  </div>
                </div>
              </Flex>

              <Flex>
                <div
                  className={'shade-S bg-white flex margin-auto'}
                  style={{ width: 180, height: 180, borderRadius: '50%' }}
                >
                  <div className={'margin-auto center'}>
                    <div className={'font-L fg-accent margin-bottom-normal'}>News</div>
                    <div className={'font-S fg-blackish'}>
                      <span className={'fg-primary'}>{stats.news.total}</span> Total
                    </div>
                  </div>
                </div>
              </Flex>
            </Yoga>
          </Block>
        </>
      )}
    </Content>
  )
}

export default OrganizationDetailStats
