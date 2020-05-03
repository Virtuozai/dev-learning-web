import React, { FC, useState } from 'react'

import axios from 'axios'
import { Grid, makeStyles } from '@material-ui/core'

const PicList: FC = () => {
  const client = 'wmacdnTieRtPXAmcqGBksH9dp76UuZ931tYpjBRE_WE'
  const url = `https://api.unsplash.com/photos/?client_id=${client}`
  const [result, setResult] = useState<any>([])

  // axios.get(url).then(response => {
  //   // eslint-disable-next-line no-console
  //   console.log(response)
  //   setResult(response.data)
  // })

  async function callApi() {
    try {
      const response = await axios.get(url)

      return setResult(response.data)
    } catch (exception) {
      return exception
    }
  }
  callApi()

  const useStyles = makeStyles(theme => ({
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '250px',
    },
  }))

  const classes = useStyles()

  return (
    <Grid container>
      {result.map(
        (picture: {
          urls: { small: string | undefined }
          id: string | number | undefined
          alt_description: string | undefined
        }) => (
          <Grid item xs={12} md={4} key={picture.id}>
            <img className={classes.img} src={picture.urls.small} alt={picture.alt_description} />
          </Grid>
        ),
      )}
    </Grid>
  )
}

export default PicList
