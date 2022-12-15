import { useForm, useFieldArray } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import classes from 'classnames'

import { useAddArticleMutation, util } from '../../services/service'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'

import styles from './CreateArticlePage.module.scss'

type Inputs = {
  title: string
  description: string
  body: string
  tags: {
    name: string
  }[]
}

const CreateArticlePage = () => {
  const [addArticle] = useAddArticleMutation()
  //const user = useAppSelector((state) => state.user.user)
  //const { refetch } = useGetArticlesQuery({ page: 1 })
  const dispatch = useAppDispatch()
  const history = useHistory()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      tags: [{ name: '' }],
    },
    mode: 'onBlur',
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const token = useAppSelector((state) => state.user.user?.token || '')
  const addNewArticle = async (data: Inputs) => {
    const tagsArr = data.tags.map((tag) => tag.name)
    const newArticleData = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: tagsArr,
      token: token,
    }

    try {
      await addArticle(newArticleData).unwrap()
      dispatch(util.resetApiState())

      history.push('/articles')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <section>
        <div className={styles.createArticleWrapper}>
          <h2 className={styles.title}>Create new article</h2>
          <form className={styles.createArticleForm} onSubmit={handleSubmit(addNewArticle)}>
            <label htmlFor="title" className={styles.articleFormLabel}>
              Title
            </label>
            <input
              {...register('title', {
                required: 'Обязательно для заполнения!',
              })}
              id="title"
              type="text"
              className={classes(styles.articleFormInput, errors.title && styles.error)}
              placeholder="Title*"
            />
            {errors.title && <p className={styles.error_message}>{errors.title.message}</p>}
            <label htmlFor="short" className={styles.articleFormLabel}>
              Short description
            </label>
            <input
              {...register('description', {
                required: 'Обязательно для заполнения!',
              })}
              id="short"
              type="text"
              className={classes(styles.articleFormInput, errors.description && styles.error)}
              placeholder="Title*"
            />
            {errors.description && <p className={styles.error_message}>{errors.description.message}</p>}
            <label htmlFor="body" className={styles.articleFormLabel}>
              Text
            </label>
            <textarea
              {...register('body', {
                required: 'Обязательно для заполнения!',
              })}
              id="body"
              placeholder="Text*"
              maxLength={400}
              className={classes(styles.articleFormInput, styles.textarea, errors.body && styles.error)}
            />
            {errors.body && <p className={styles.error_message}>{errors.body.message}</p>}
            <span className={styles.articleFormLabel}>Tags</span>
            <div className={styles.tagsList}>
              {fields.map((field, index) => {
                return (
                  <div className={styles.tagsItem} key={field.id}>
                    <input
                      {...register(`tags.${index}.name` as const)}
                      placeholder="Tag"
                      defaultValue={field.name}
                      className={classes(styles.articleFormInput, styles.tag)}
                    />
                    <button className={styles.deleteBtn} type="button" onClick={() => remove(index)}>
                      Delete
                    </button>
                  </div>
                )
              })}
              <button className={styles.addBtn} type="button" onClick={() => append({ name: '' })}>
                Add teg
              </button>
            </div>

            <button className={styles.articleFormBtn} type="submit">
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default CreateArticlePage
