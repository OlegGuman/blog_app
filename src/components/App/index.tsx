import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import {
  Header,
  ArticleListPage,
  FullArticle,
  SignUpPage,
  SignInPage,
  EditProfilePage,
  CreateArticlePage,
  PrivateRoute,
  EditArticlePage,
} from '../router'

import 'antd/dist/antd.min.css'
import styles from './App.module.scss'

const App = () => {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route path="/articles" exact component={ArticleListPage} />
          <Route path="/articles/:id" exact component={FullArticle} />
          <Route path="/articles/:id/edit" exact component={EditArticlePage} />
          <Route path="/sign-in" exact component={SignInPage} />
          <Route path="/sign-up" exact component={SignUpPage} />
          <Route path="/profile" exact component={EditProfilePage} />
          <PrivateRoute path="/new-article" redirectTo="/sign-in" component={CreateArticlePage} />
          <Route path="/new-article" exact component={CreateArticlePage} />
          <Route path="/:page" exact component={ArticleListPage} />
        </Switch>

        {/* <Route path="/articles/:id/edit" exact component={EditArticlePage} /> */}
      </div>
    </Router>
  )
}

export default App
