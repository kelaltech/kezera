import React, { CSSProperties } from 'react'
import './volunteer-card.scss'
import withStyles from '@material-ui/core/styles/withStyles'
import createStyles from '@material-ui/core/styles/createStyles'
import {
  CardActionArea,
  Card,
  CardContent,
  // CardMedia,
  Typography,
  Button,
  CardActions
} from '@material-ui/core'
import CardMedia from '@material-ui/core/CardMedia'
const styles = createStyles({
  card: {
    maxWidth: 345
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
    height: 140
  }
})
interface IVolunteerCardProps {
  classes: any
  name: string
  country: string
  gender: string
  phone_number: string
  email: string
  img: string
  _id?: string
}
function VolunteerCard({
  classes,
  country,
  email,
  gender,
  img,
  name,
  phone_number,
  _id
}: IVolunteerCardProps) {
  return (
    <Card raised className={classes.card}>
      <CardActionArea>
        <CardMedia component="img" className={classes.media} image={img} />
        <CardContent>
          <Typography gutterBottom component={'h2'} variant={'h5'}>
            {name}
          </Typography>
          <Typography component={'label'}>From: {country}</Typography>
          <Typography component={'label'}>{email}</Typography>
          <Typography component={'label'}>{phone_number}</Typography>
          <Typography component={'label'}>{gender}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button href={`/volunteer/portfolio/${_id}`} size="small" color="primary">
          goto profile
        </Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(VolunteerCard)
