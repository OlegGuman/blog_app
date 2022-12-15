import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import classes from 'classnames'

import { setUser } from '../../store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { useEditUserMutation } from '../../services/service'

import styles from './EditProfilePage.module.scss'

type Inputs = {
  username: string
  email: string
  password: string
  imageUrl: string
}

const EditProfilePage = () => {
  const [editUser] = useEditUserMutation()
  const history = useHistory()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.user.user?.token || '')
  const user = useAppSelector((state) => state.user.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: user?.email,
      username: user?.username,
    },
  })

  async function asyncEditUser({ username, email, password, imageUrl }: Inputs) {
    try {
      const res = await editUser({ username, email, password, image: imageUrl, token }).unwrap()
      dispatch(setUser(res.user))
      history.push('/articles')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <section>
        <div className={styles.form_wrapper}>
          <h2 className={styles.form_title}>Edit Profile</h2>
          <form
            className={styles.form_block}
            onSubmit={handleSubmit((data) => {
              asyncEditUser(data)
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
                placeholder="Username"
              />
              {errors.username && <p className={styles.message_error}>{errors.username.message}</p>}
            </label>
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
              <span>New password</span>
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
                placeholder="New password"
              />
              {errors.password && <p className={styles.message_error}>{errors.password.message}</p>}
            </label>
            <label className={styles.form_label}>
              <span>Avatar image (url)</span>
              <input
                className={classes(styles.form_input, errors.imageUrl && styles.error)}
                {...register('imageUrl', {
                  // required: 'Обязательно для заполнения!',
                  pattern: {
                    // eslint-disable-next-line no-useless-escape
                    value: /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.\/\_\?\=\%\&]+(jpg|png|gif|bmp|jpeg)$/,
                    message: 'ссылка не корректная',
                  },
                })}
                placeholder="Avatar image"
              />
              {errors.imageUrl && <p className={styles.message_error}>{errors.imageUrl.message}</p>}
            </label>
            <button className={styles.form_btn} type="submit">
              Save
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
export default EditProfilePage
