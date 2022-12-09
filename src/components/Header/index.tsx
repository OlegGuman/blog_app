//import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Image } from 'antd'

import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { useGetUserMutation } from '../../services/service'
import userAvatar from '../../images/User_icon.svg'
import { logOut, setUser } from '../../store/slices/userSlice'

import styles from './Header.module.scss'

const Header = () => {
  const [getUser, { isLoading }] = useGetUserMutation()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const loadUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const res = await getUser(token).unwrap()
      dispatch(setUser(res.user))
    } catch (error) {
      console.error(error)
    }
  }

  const handlerLogOut = () => {
    localStorage.removeItem('token')
    dispatch(logOut())
  }

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to="/articles" className={styles.title}>
          Realworld Blog
        </Link>
        {!isLoading && (
          <div className={styles.header_buttonGroup}>
            {user && (
              <Link className={styles.createArticleBtn} to="">
                Create article
              </Link>
            )}
            {!user && (
              <Link className={styles.signInBtn} to="/sign-in">
                Sign in
              </Link>
            )}

            {user && (
              <div className={styles.userPrev}>
                <Link className={styles.userName} to="/profile">
                  {user.username}
                </Link>
                <Image className={styles.userAvatar} alt="user-avatar" src={user.image || ''} fallback={userAvatar} />
              </div>
            )}
            {!user && (
              <Link className={styles.signUpBtn} to="/sign-up">
                Sign Up
              </Link>
            )}
            {user && (
              <button onClick={handlerLogOut} className={styles.logOutBtn}>
                Log Out
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
