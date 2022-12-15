export interface IArticle {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    bio: string
    image: string
    following: boolean
    slug?: string
  }
}

export interface IAuthor {
  username: string
  bio?: string
  image: string
  following?: boolean
}

export interface IUser {
  email: string
  token: string
  username: string
  bio?: string
  image?: string
}

export interface INewUser {
  email: string
  username: string
  token: string
}
