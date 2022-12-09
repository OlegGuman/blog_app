import { Alert, Button, Spin } from 'antd'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'

import { AuthorInfo } from '../router'
import { useGetFullArticleQuery } from '../../services/service'
import likeIcon from '../../images/like_icon.svg'

import styles from './FullArticle.module.scss'

type IParamId = {
  id: string
}

function generateId() {
  return Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
}

const FullArticle = () => {
  const { id }: IParamId = useParams()

  const { data, isError, isLoading } = useGetFullArticleQuery({ idPage: id })

  const tagListItem = data?.article.tagList.map((tag) => {
    if (tag === '' || tag === null) {
      return
    }
    return (
      <li key={generateId()} className={styles.tagItem}>
        {tag}
      </li>
    )
  })

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
                <div className={styles.like_info}>
                  <Button className={styles.link_title} type="link">
                    {data?.article.title}
                  </Button>
                  <Button className={styles.like_btn} type="text">
                    <img src={likeIcon} alt="like icon" />
                  </Button>
                  <span className={styles.like_count}>{data?.article.favoritesCount}</span>
                </div>
              </div>
              {authorData}
            </div>
            <ul className={styles.list_tags}>{tagListItem}</ul>
            <p>{data?.article.description}</p>
            {markdownData}
          </div>
        </article>
      </section>
    </main>
  )
}

export default FullArticle
