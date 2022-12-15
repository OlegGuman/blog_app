import { Alert, Button, Spin, Modal } from 'antd'
import ReactMarkdown from 'react-markdown'
import { useParams, useHistory, Link } from 'react-router-dom'
import { ExclamationCircleFilled } from '@ant-design/icons'
import classes from 'classnames'

import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { generateId, correctTag, correctText } from '../../utility/utility'
import { AuthorInfo } from '../router'
import {
  useGetFullArticleQuery,
  useDeleteArticleMutation,
  util,
  useAddToFavoriteMutation,
  useDeleteFromFavoriteMutation,
} from '../../services/service'

import styles from './FullArticle.module.scss'

type IParamId = {
  id: string
}

type ISlugParam = {
  slug: string
  token: string
}

const FullArticle = () => {
  const history = useHistory()
  const [deleteArticle] = useDeleteArticleMutation()
  const [addToFavorite] = useAddToFavoriteMutation()
  const [deleteFromFavorite] = useDeleteFromFavoriteMutation()
  const dispatch = useAppDispatch()
  const { confirm } = Modal
  const user = useAppSelector((state) => state.user.user)
  const token = localStorage.getItem('token') || ''
  const { id }: IParamId = useParams()
  const { data, isError, isLoading, refetch } = useGetFullArticleQuery({ idPage: id, token })

  const tagListItem = data?.article.tagList.map((tag) => {
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
    console.log(token)
    console.log(slug)
    console.log(data)
    if (data?.article.favorited) {
      await deleteFromFavorite({ token, slug })
      refetch()
    }
    if (!data?.article.favorited) {
      await addToFavorite({ token, slug })
      refetch()
    }
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure to delete this article?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      mask: false,
      onOk() {
        articleDelete()
      },
      onCancel() {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      },
    })
  }

  const articleDelete = async () => {
    const articleInfo: ISlugParam = {
      slug: data?.article.slug || '',
      token: token,
    }
    await deleteArticle(articleInfo).unwrap()
    dispatch(util.resetApiState())
    history.push('/articles')
  }

  const authorData = data?.article.author ? (
    <AuthorInfo author={data?.article.author} createdAt={data.article.createdAt} />
  ) : null

  const markdownData = data?.article.body ? (
    <ReactMarkdown className={styles.markdown_block}>{data?.article.body}</ReactMarkdown>
  ) : null
  return (
    <main>
      <section>
        <article>
          <div className={styles.article_wrapper}>
            {isLoading && <Spin size="large" />}
            {isError && (
              <Alert
                className={styles.message_error}
                message="Error"
                type="error"
                showIcon
                description="Что-то пошло не так :("
              />
            )}
            <div className={styles.article_header}>
              <div className={styles.header_left}>
                <h2 className={styles.title}> {correctText(data?.article.title || '', 10)}</h2>
                <div className={styles.like_info}>
                  <Button
                    onClick={() => favoritesHandler(token, id)}
                    className={classes(styles.like_btn, !user ? styles.disabled : null)}
                    type="text"
                  >
                    <span
                      className={classes(
                        styles.hardIcon && data?.article.favorited ? styles.likeIcon : styles.hardIcon
                      )}
                    ></span>
                  </Button>
                  <span className={styles.like_count}>{data?.article.favoritesCount}</span>
                </div>
              </div>
              {authorData}
            </div>
            <ul className={styles.list_tags}>{tagListItem}</ul>
            <div className={styles.descriptionWrapper}>
              <p>{correctText(data?.article.description || '', 10)}</p>
              {data?.article.author.username === user?.username && !isLoading && (
                <div className={styles.btnGroup}>
                  <Button onClick={() => showDeleteConfirm()} className={styles.delBtn}>
                    Delete
                  </Button>
                  <Link to={`/articles/${id}/edit`} className={styles.editBtn}>
                    Edit
                  </Link>
                </div>
              )}
            </div>

            {markdownData}
          </div>
        </article>
      </section>
    </main>
  )
}

export default FullArticle
