import { format } from 'date-fns'
import { Image } from 'antd'
import { FC } from 'react'

import { IAuthor } from '../../../interface'
import fallbackImg from '../../../images/User_icon.svg'

import styles from './AuthorInfo.module.scss'

interface IAuthorInfoProps {
  author: IAuthor
  createdAt: string
}

const AuthorInfo: FC<IAuthorInfoProps> = ({ author, createdAt }) => {
  return (
    <div className={styles.user_info}>
      <div className={styles.info}>
        <span className={styles.name_user}>{author.username}</span>
        <span className={styles.date}>{format(new Date(createdAt), 'MMMM d, y')}</span>
      </div>
      <Image className={styles.avatar} alt={author.username} src={author.image} fallback={fallbackImg} />
    </div>
  )
}

export default AuthorInfo
