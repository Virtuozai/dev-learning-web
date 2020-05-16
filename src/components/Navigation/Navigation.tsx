import React, { FC, MouseEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Menu, MenuItem, IconButton, Badge } from '@material-ui/core'
import { Menu as MenuIcon, AccountCircle, LocalLibrary, Event } from '@material-ui/icons'

import { logout } from 'data/api/users'

import * as routes from 'constants/routes'

import { useStyles } from './styles'

type Props = {
  checkIfLoggedOn: () => void
}

const Navigation: FC<Props> = ({ checkIfLoggedOn }: Props) => {
  const classes = useStyles()

  const history = useHistory()

  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<Element | null>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: MouseEvent<HTMLLIElement | HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleLogout = async () => {
    await logout()
    await checkIfLoggedOn()

    history.push(routes.LOGIN_PAGE)
  }

  const handleMobileMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  function renderDropdownMenu() {
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Link to={routes.PROFILE}>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        </Link>

        <Link to={routes.SETTINGS}>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        </Link>

        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    )
  }

  function renderDropdownMobileMenu() {
    return (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <Link to={routes.CALENDAR}>
          <MenuItem>
            <IconButton>
              <Event />
            </IconButton>
            <p>Calendar</p>
          </MenuItem>
        </Link>

        <Link to={routes.LEARNING}>
          <MenuItem>
            <IconButton>
              <Badge color="secondary">
                <LocalLibrary />
              </Badge>
            </IconButton>
            <p>Learning</p>
          </MenuItem>
        </Link>

        <Link to={routes.PROFILE}>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton>
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </Link>
      </Menu>
    )
  }

  function renderMenu() {
    return (
      <>
        <div className={classes.sectionDesktop}>
          <Link to={routes.CALENDAR}>
            <IconButton className={classes.iconButton}>
              <Event />
            </IconButton>
          </Link>

          <Link to={routes.LEARNING}>
            <IconButton className={classes.iconButton}>
              <Badge color="secondary">
                <LocalLibrary />
              </Badge>
            </IconButton>
          </Link>

          <IconButton edge="end" onClick={handleProfileMenuOpen} className={classes.iconButton}>
            <AccountCircle />
          </IconButton>
        </div>

        <div className={classes.sectionMobile}>
          <IconButton onClick={handleMobileMenuOpen} className={classes.iconButton}>
            <MenuIcon />
          </IconButton>
        </div>
      </>
    )
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Dev learning
          </Typography>
          {renderMenu()}
        </Toolbar>
      </AppBar>
      {renderDropdownMobileMenu()}
      {renderDropdownMenu()}
    </div>
  )
}

export default Navigation
