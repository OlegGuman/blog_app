import { Button } from 'antd'

import styles from './Header.module.scss'

const Header = () => {
  const signUp = styles.signUpBtn
  const signIn = styles.signInBtn
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <a href="/#" className={styles.title}>
          Realworld Blog
        </a>
        {/* <h2 className={styles.title}>Realworld Blog</h2> */}
        <div className={styles.header_buttonGroup}>
          <Button className={signIn} type="link">
            Sign in
          </Button>
          <Button className={signUp} type="dashed">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
