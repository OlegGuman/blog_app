import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IArticle, IUser, INewUser } from './../interface'

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
    registerUser: builder.mutation<{ user: INewUser }, { username: string; email: string; password: string }>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body: {
          user: body,
        },
        headers: {
          Authorization: 'Bearer',
        },
      }),
    }),
    getUser: builder.mutation<{ user: IUser }, string>({
      query: (token) => ({
        url: '/user',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    editUser: builder.mutation<
      { user: IUser },
      { username: string; email: string; password: string; image: string; token: string }
    >({
      query: ({ token, ...data }) => ({
        url: '/user',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          user: data,
        },
      }),
    }),
    loginUser: builder.mutation<{ user: IUser }, { email: string; password: string }>({
      query: (user) => ({
        url: '/users/login',
        method: 'POST',
        headers: {
          Authorization: 'Bearer',
        },
        body: {
          user: user,
        },
      }),
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useGetFullArticleQuery,
  useRegisterUserMutation,
  useGetUserMutation,
  useEditUserMutation,
  useLoginUserMutation,
} = api
