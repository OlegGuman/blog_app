import { Button } from 'antd'
import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import classes from 'classnames'

import { useAppSelector } from '../../hooks/hook'
import { useAddToFavoriteMutation, useDeleteFromFavoriteMutation, useGetArticlesQuery } from '../../services/service'
import { AuthorInfo } from '../router'
import { IArticle } from '../../interface'
import { generateId, correctTag, correctText } from '../../utility/utility'

import styles from './ArticleItem.module.scss'
interface IArticleItemProps {
  data: IArticle
}

const ArticleItem: FC<IArticleItemProps> = ({
  data: { slug, title, author, createdAt, favorited, favoritesCount, tagList, description },
}) => {
  const user = useAppSelector((state) => state.user.user)
  const token = localStorage.getItem('token') || ''
  const [deleteFromFavorite] = useDeleteFromFavoriteMutation()
  const [addToFavorite] = useAddToFavoriteMutation()
  const { page } = useParams<{ page?: string }>()
  const { refetch } = useGetArticlesQuery({ page: Number(page) || 1, token })

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
  const favoritesHandler = async (token: string, slug: string) => {
    if (favorited) {
      await deleteFromFavorite({ token, slug })
      refetch()
    }
    if (!favorited) {
      await addToFavorite({ token, slug })
      refetch()
    }
  }

  return (
    <div className={styles.item}>
      <div className={styles.item_header}>
        <div className={styles.left}>
          <Link className={styles.link_title} to={`/articles/${slug}`}>
            {correctText(title, 10)}
          </Link>
          <div className={styles.like_info}>
            <Button
              onClick={() => favoritesHandler(token, slug)}
              className={classes(styles.like_btn, !user ? styles.disabled : null)}
              type="text"
            >
              {/* <img src={likeIcon} alt="like icon" /> */}
              <span className={classes(styles.hardIcon && favorited ? styles.likeIcon : styles.hardIcon)}></span>
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
