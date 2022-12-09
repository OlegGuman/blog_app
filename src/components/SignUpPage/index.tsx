import { useForm } from 'react-hook-form'
import { Link, Redirect, useHistory } from 'react-router-dom'
import classes from 'classnames'
import { useState } from 'react'

import { setUser } from '../../store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { useRegisterUserMutation } from '../../services/service'
import { isWrongDataError } from '../../utility/utility'

import styles from './SignUpPage.module.scss'

type Inputs = {
  username: string
  email: string
  password: string
  repeat_Password: string
  checkbox: boolean
  token?: string
}

const SignUpPage = () => {
  const [registerUser] = useRegisterUserMutation()

  const [checked, setChecked] = useState(true)

  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()
  const history = useHistory()
  const {
    setError,
    getValues,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>()

  async function createNewUser(userData: Inputs) {
    const user = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    }
    try {
      const res = await registerUser(user).unwrap()
      dispatch(setUser(res.user))
      localStorage.setItem('token', res.user.token)

      history.push('/')
    } catch (error) {
      if (isWrongDataError(error)) {
        if (error.data.errors.username) {
          setError('username', {
            type: 'manual',
            message: error.data.errors.username,
          })
        }
        if (error.data.errors.email) {
          setError('email', {
            type: 'manual',
            message: error.data.errors.email,
          })
        }
      }
    }
  }

  if (user) {
    return <Redirect to="/" />
  }

  return (
    <main>
      <section>
        <div className={styles.form_wrapper}>
          <h2 className={styles.form_title}>Create new account</h2>

          <form
            className={styles.form_block}
            onSubmit={handleSubmit((data) => {
              createNewUser(data)
            })}
          >
            <label className={styles.form_label}>
              <span>Username</span>
              <input
                className={classes(styles.form_input, errors.username && styles.error)}
                {...register('username', {
                  required: 'Обязательно для заполнения!',
                  minLength: {
                    value: 3,
                    message: 'Не менее 3 символов',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Не более 20 символов',
                  },
                })}
                placeholder="Username*"
              />
              {errors.username && <p className={styles.message_error}>{errors.username.message}</p>}
            </label>
            <label className={styles.form_label}>
              <span>Email</span>
              <input
                className={classes(styles.form_input, errors.email && styles.error)}
                {...register('email', {
                  required: 'Обязательно для заполнения!',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9-]+.+.[a-z]{2,4}$/,
                    message: '@ все символы латинские, нижнего регистра, без пробелов',
                  },
                })}
                placeholder="Email address*"
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
                placeholder="Password*"
              />
              {errors.password && <p className={styles.message_error}>{errors.password.message}</p>}
            </label>
            <label className={styles.form_label}>
              <span>Repeat Password</span>
              <input
                className={classes(styles.form_input, errors.repeat_Password && styles.error)}
                {...register('repeat_Password', {
                  required: 'Обязательно для заполнения!',
                  validate: (value) => value === getValues().password || 'Не верный пароль',
                })}
                type="password"
                autoComplete="off"
                placeholder="Password*"
              />
              {errors.repeat_Password && <p className={styles.message_error}>{errors.repeat_Password.message}</p>}
            </label>
            <div className={styles.separator_line}></div>
            <label className={styles.label_checkbox}>
              <input
                checked={checked}
                onClick={() => setChecked(!checked)}
                className={styles.form_checkbox}
                {...register('checkbox', {
                  required: 'Должно быть отмечено!',
                })}
                type="checkbox"
              />
              <p>I agree to the processing of my personal information</p>
              {errors.checkbox && <span className={styles.messageCheckbox_error}>{errors.checkbox.message}</span>}
            </label>
            <button className={styles.form_btn} type="submit">
              Create
            </button>
          </form>
          <div className={styles.form_footer}>
            <span>
              Already have an account? <Link to="/sign-in">Sign In.</Link>
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignUpPage
