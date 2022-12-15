import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import classes from 'classnames'

import { setUser } from '../../store/slices/userSlice'
import { useLoginUserMutation } from '../../services/service'
import { useAppDispatch } from '../../hooks/hook'
import { isWrongDataError } from '../../utility/utility'

import styles from './SignInPage.module.scss'

type Inputs = {
  email: string
  password: string
}

const SignInPage = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [loginUser] = useLoginUserMutation()
  const dispatch = useAppDispatch()
  const history = useHistory()

  const getDataUser = async (user: Inputs) => {
    try {
      const res = await loginUser(user).unwrap()
      dispatch(setUser(res.user))
      localStorage.setItem('token', res.user.token)
      history.push('/articles')
    } catch (error) {
      if (isWrongDataError(error)) {
        setError('email', {
          type: 'manual',
          message: 'email or password' + ' ' + error.data.errors['email or password'],
        })
        setError('password', {
          type: 'manual',
          message: 'email or password' + ' ' + error.data.errors['email or password'],
        })
      }
    }
  }

  return (
    <main>
      <section>
        <div className={styles.form_wrapper}>
          <h2 className={styles.form_title}>Sign in</h2>
          <form
            className={styles.form_block}
            onSubmit={handleSubmit((userData) => {
              getDataUser(userData)
            })}
          >
            <label className={styles.form_label}>
              <span>Email address</span>
              <input
                className={classes(styles.form_input, errors.email && styles.error)}
                {...register('email', {
                  required: 'Обязательно для заполнения!',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9-]+.+.[a-z]{2,4}$/,
                    message: '@ все символы латинские, нижнего регистра, без пробелов',
                  },
                })}
                placeholder="Email address"
              />
              {errors.email && <p className={styles.message_error}>{errors.email.message}</p>}
            </label>
            <label className={styles.form_label}>
              <span>Password</span>
              <input
                className={classes(styles.form_input, errors.password && styles.error)}
                {...register('password', {
                  required: 'Обязательно для заполнения!',
                  minLength: {
                    value: 6,
                    message: 'Не менее 6 символов',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Не более 40 символов',
                  },
                })}
                type="password"
                autoComplete="off"
                placeholder="Password"
              />
              {errors.password && <p className={styles.message_error}>{errors.password.message}</p>}
            </label>
            <button className={styles.form_btn} type="submit">
              Login
            </button>
          </form>
          <div className={styles.form_footer}>
            <span>
              Don’t have an account? <Link to="/sign-in">Sign In.</Link>
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignInPage
