import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IArticle, IUser, INewUser } from './../interface'

const ARTICLES_PER_PAGE = 5

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Articles', 'Favorite'],
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
    getFullArticle: builder.query<{ article: IArticle }, { idPage: string; token: string }>({
      query: (idPage) => ({
        url: `/articles/${idPage.idPage}`,
        headers: {
          Authorization: `Bearer ${idPage.token}`,
        },
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
    addArticle: builder.mutation<
      { article: IArticle },
      { title: string; description: string; body: string; tagList: string[]; token: string }
    >({
      query: (article) => ({
        url: '/articles',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${article.token}`,
        },
        body: {
          article: article,
        },
      }),
    }),
    editArticle: builder.mutation<
      { article: IArticle },
      { slug: string; title: string; description: string; body: string; tagList: string[]; token: string }
    >({
      query: (article) => ({
        url: `/articles/${article.slug}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${article.token}`,
        },
        body: {
          article: article,
        },
      }),
    }),
    deleteArticle: builder.mutation<{ article: IArticle }, { slug: string; token: string }>({
      query: (article) => ({
        url: `/articles/${article.slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${article.token}`,
        },
      }),
    }),
    addToFavorite: builder.mutation<{ article: IArticle }, { token: string; slug: string }>({
      query: (article) => ({
        url: `/articles/${article.slug}/favorite`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${article.token}`,
        },
      }),
      invalidatesTags: ['Favorite'],
    }),
    deleteFromFavorite: builder.mutation<{ article: IArticle }, { token: string; slug: string }>({
      query: (article) => ({
        url: `/articles/${article.slug}/favorite`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${article.token}`,
        },
      }),
      invalidatesTags: ['Articles'],
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
  useAddArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useAddToFavoriteMutation,
  useDeleteFromFavoriteMutation,
  util,
} = api
