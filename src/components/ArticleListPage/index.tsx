import { Pagination, Spin, Alert } from 'antd'
import { useHistory, useParams } from 'react-router-dom'

import { useGetArticlesQuery } from '../../services/service'
import { ArticleItem } from '../router'

import styles from './ArticleListPage.module.scss'

const ArticleList = () => {
  const token = localStorage.getItem('token') || ''
  const history = useHistory()
  const { page } = useParams<{ page?: string }>()
  const { data, isLoading, isError } = useGetArticlesQuery({ page: Number(page) || 1, token })
  const handlerPage = (current: number) => {
    history.push(location.pathname.replace(/[^/]*$/, String(current)))
  }

  return (
    <>
      <main>
        <section className={styles.section_List}>
          {isError && (
            <Alert
              className={styles.message_error}
              message="Error"
              type="error"
              showIcon
              description="Что-то пошло не так :("
            />
          )}
          <ul className={styles.list}>
            {isLoading && <Spin size="large" />}
            {!isLoading &&
              data?.articles.map((item) => {
                return (
                  <li key={item.slug}>
                    <ArticleItem data={item} />
                  </li>
                )
              })}
          </ul>
        </section>
      </main>
      <footer className={styles.footer}>
        {!isLoading && !isError && (
          <Pagination
            className={styles.pagination_custom}
            current={Number(page) || 1}
            total={data?.articlesCount}
            onChange={(current) => handlerPage(current)}
            showSizeChanger={false}
          />
        )}
      </footer>
    </>
  )
}

export default ArticleList
