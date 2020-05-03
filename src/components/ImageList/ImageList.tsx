import React, { FC, useState } from 'react'

import axios from 'axios'
import { Grid } from '@material-ui/core'

const ImageList: FC = () => {
  const client = 'bf_dUh7a9eYsK5tN1l7aIl3jQ_GPz8B0kXN5WhA6muA'
  const url = `https://api.unsplash.com/photos/?client_id=${client}`
  const [result, setResult] = useState<any>([])

  async function callApi() {
    try {
      const response = await axios.get(url)

      return setResult(response.data)
    } catch (exception) {
      return exception
    }
  }

  callApi()

  return (
    <Grid container>
      {result.map(
        (picture: {
          urls: { small: string | undefined }
          id: string | number | undefined
          alt_description: string | undefined
        }) => (
          <Grid item xs={12} md={4} key={picture.id}>
            <img src={picture.urls.small} alt={picture.alt_description} />
          </Grid>
        ),
      )}
    </Grid>
  )
}

export default ImageList
