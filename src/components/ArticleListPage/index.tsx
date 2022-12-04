import { Pagination, Spin, Alert } from 'antd'
import { useState } from 'react'

import { useGetArticlesQuery } from '../../services/service'
import { ArticleItem } from '../router'

import styles from './ArticleListPage.module.scss'

const ArticleList = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useGetArticlesQuery({ page: page })

  const handlerPage = (current: number) => {
    setPage(current)
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
            defaultCurrent={1}
            total={50}
            onChange={(current) => handlerPage(current)}
          />
        )}
      </footer>
    </>
  )
}

export default ArticleList
