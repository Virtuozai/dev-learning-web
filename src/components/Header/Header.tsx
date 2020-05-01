import React, { FC, useState } from 'react'
import { Button } from '@material-ui/core'

type Props = {
  buttonText: string
}

// Example of api call
// import axios from 'axios'

// async function callApi() {
//   try {
//     const response = await axios.post('/api/endpoint', { data })

//     return response.data
//   } catch (exception) {
//     return exception
//   }
// }

const Header: FC<Props> = ({ buttonText }: Props) => {
  const [isButtonShown, setIsButtonShown] = useState<boolean>(true)

  if (!isButtonShown) return null

  return <Button onClick={() => setIsButtonShown(!isButtonShown)}>{buttonText}</Button>
}

export default Header
