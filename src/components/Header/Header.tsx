import React, { FC, useState } from 'react'
import { Button } from '@material-ui/core'

type Props = {
  buttonText: string
}

const Header: FC<Props> = ({ buttonText }: Props) => {
  const [isButtonShown, setIsButtonShown] = useState<boolean>(true)

  if (!isButtonShown) return null

  return <Button onClick={() => setIsButtonShown(!isButtonShown)}>{buttonText}</Button>
}

export default Header
