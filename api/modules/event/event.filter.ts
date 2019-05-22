import { IEvent } from '../../models/event/event.model'
import Axios from 'axios'

export async function EventResponse(request: IEvent) {
  let event = {
    _id: request._id,
    title: request.title,
    description: request.description,
    interestedVolunteers: request.interestedVolunteers,
    attendedVolunteers: request.attendedVolunteers,
    goingVolunteers: request.goingVolunteers,
    startDate: request.startDate,
    endDate: request.endDate,
    location: await getEventLocation(request.location),
    likes: request.likes,
    comments: request.comments,
    organizationId: request.organizationId,
    amountOfPeople: request.amountOfPeople
  }
  return event
}

async function getEventLocation(location: any) {
  const log = process.env.NODE_ENV !== 'production'
  const accessToken = process.env.MAPBOX_ACCESS_TOKEN

  if (accessToken && location.geo && location.geo.coordinates) {
    const [lat, lng] = location.geo.coordinates
    const accuracy = 'place' // see: https://docs.mapbox.com/api/search/#data-types

    try {
      if (log) console.info(`Trying to geocoding ${lat},${lng} using Mapbox...`)

      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?types=${accuracy}&access_token=${accessToken}`
      const { data } = await Axios.get(url)

      if (data.features && data.features.length) {
        location.address = data.features[0].place_name
        if (log)
          console.info(`Reverse geocoding ${lat},${lng} complete: ${location.address}`)
      } else {
        console.error(
          `Reverse geocoding ${lat},${lng} failed: unknown response format from Mapbox`
        )
      }
    } catch (e) {
      console.error(`Reverse geocoding ${lat},${lng} failed: ${e.message}`)
    }
  }
  return location
}
