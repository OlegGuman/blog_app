import { Button } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { AuthorInfo } from '../router'
import { IArticle } from '../../interface'
import likeIcon from '../../images/like_icon.svg'

import styles from './ArticleItem.module.scss'
interface IArticleItemProps {
  data: IArticle
}

function generateId() {
  return Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
}

const ArticleItem: FC<IArticleItemProps> = ({
  data: { slug, title, author, createdAt, favoritesCount, tagList, description },
}) => {
  const tagListItem = tagList.map((tag) => {
    if (tag === '' || tag === null) {
      return
    }
    return (
      <li key={generateId()} className={styles.tagItem}>
        {tag}
      </li>
    )
  })
  return (
    <div className={styles.item}>
      <div className={styles.item_header}>
        <div className={styles.left}>
          <Link className={styles.link_title} to={`/articles/${slug}`}>
            {title}
          </Link>
          <div className={styles.like_info}>
            <Button className={styles.like_btn} type="text">
              <img src={likeIcon} alt="like icon" />
            </Button>
            <span className={styles.like_count}>{favoritesCount}</span>
          </div>
        </div>

        <AuthorInfo author={author} createdAt={createdAt} />
      </div>
      <ul className={styles.list_tags}>{tagListItem}</ul>
      <p>{description}</p>
    </div>
  )
}

export default ArticleItem