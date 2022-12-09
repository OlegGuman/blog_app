import { Button } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { AuthorInfo } from '../router'
import { IArticle } from '../../interface'
import { generateId, correctTag, correctText } from '../../utility/utility'
import likeIcon from '../../images/like_icon.svg'

import styles from './ArticleItem.module.scss'
interface IArticleItemProps {
  data: IArticle
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
        {correctTag(tag)}
      </li>
    )
  })
  return (
    <div className={styles.item}>
      <div className={styles.item_header}>
        <div className={styles.left}>
          <Link className={styles.link_title} to={`/articles/${slug}`}>
            {correctText(title, 5)}
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
      <p className={styles.description}>{correctText(description, 52)}</p>
    </div>
  )
}

export default ArticleItem
