import { BrowserRouter as Router, Route } from 'react-router-dom'
//import { FC } from 'react'

import { Header, ArticleListPage, FullArticle } from '../router'

import 'antd/dist/antd.min.css'
import styles from './App.module.scss'

const App = () => {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <Route path="/" exact component={ArticleListPage} />
        <Route path="/articles" exact component={ArticleListPage} />
        <Route path="/articles/:id" component={FullArticle} />
      </div>
    </Router>
  )
}

export default App
