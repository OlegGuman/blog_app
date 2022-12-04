import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IArticle } from './../interface'

const ARTICLES_PER_PAGE = 5

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api' }),
  endpoints: (builder) => ({
    getArticles: builder.query<{ articles: IArticle[]; articlesCount: number }, { page: number; token?: string }>({
      query: ({ page = 0, token = '' }) => ({
        url: `/articles?limit=${ARTICLES_PER_PAGE}&offset=${(page - 1) * ARTICLES_PER_PAGE}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getFullArticle: builder.query<{ article: IArticle }, { idPage: string }>({
      query: (idPage) => ({
        url: `/articles/${idPage.idPage}`,
      }),
    }),
  }),
})

export const { useGetArticlesQuery, useGetFullArticleQuery } = api
