import styles from './profile-screen.module.css'
import { Helmet } from 'react-helmet-async'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import PasswordInput from '../../components/password-input/password-input';
import ActionButton from '../../components/action-button/action-button';
import { ActionButtonType } from '../../const';

export default function ProfileScreen() {
  const personalForm = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validateOnBlur: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Имя и фамилия обязательны'),
      email: Yup.string()
        .test('is-valid-domain', 'Email должен быть с доменом urfu.me или at.urfu.ru', (value) => {
          return /@(?:urfu.me|at.urfu.ru)$/.test(value || '');
        })
        .required('Email обязателен'),
    }),
    onSubmit: (values) => {
      console.log('Личные данные отправлены:', values);
    },
  });

  const passwordForm = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validateOnBlur: true,
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Введите старый пароль'),
      newPassword: Yup.string()
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .required('Введите новый пароль'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), undefined], 'Пароли должны совпадать')
        .required('Повторите новый пароль'),
    }),
    onSubmit: (values) => {
      console.log('Пароль отправлен:', values);
    },
  });
  

  return (
    <>
      <Helmet>
        <title>Брусника.Коворкинг</title>
      </Helmet>
      <Header/>
      <main className={styles.profile}>
        <h2>Личный кабинет</h2>
        <section className={styles.section}>
          <h3 className={styles.title}>личные данные</h3>
          <form className={styles.form} onSubmit={personalForm.handleSubmit} noValidate>
            <div className={styles.content}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Имя и фамилия</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={personalForm.values.name}
                  onChange={personalForm.handleChange}
                  onBlur={personalForm.handleBlur}
                />
                {personalForm.touched.name && personalForm.errors.name && (
                  <p className={styles.errorText}>{personalForm.errors.name}</p>
                )}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={personalForm.values.email}
                  onChange={personalForm.handleChange}
                  onBlur={personalForm.handleBlur}
                />
                {personalForm.touched.email && personalForm.errors.email && (
                  <p className={styles.errorText}>{personalForm.errors.email}</p>
                )}
              </div>
            </div>
            <ActionButton text="Сохранить" variant={ActionButtonType.Black} buttonType='submit' />
          </form>
          <h3 className={styles.title}>пароль</h3>
          <form className={styles.form} onSubmit={passwordForm.handleSubmit} noValidate>
            <div className={styles.content}>
              <PasswordInput
                id="oldPassword"
                name="oldPassword"
                label="Введите старый пароль"
                value={passwordForm.values.oldPassword}
                onChange={passwordForm.handleChange}
                onBlur={passwordForm.handleBlur}
                touched={passwordForm.touched.oldPassword}
                error={passwordForm.errors.oldPassword}
              />
              <PasswordInput
                id="newPassword"
                name="newPassword"
                label="Новый пароль"
                value={passwordForm.values.newPassword}
                onChange={passwordForm.handleChange}
                onBlur={passwordForm.handleBlur}
                touched={passwordForm.touched.newPassword}
                error={passwordForm.errors.newPassword}
              />
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                label="Повторите новый пароль"
                value={passwordForm.values.confirmPassword}
                onChange={passwordForm.handleChange}
                onBlur={passwordForm.handleBlur}
                touched={passwordForm.touched.confirmPassword}
                error={passwordForm.errors.confirmPassword}
              />
            </div>
            <ActionButton text="Сохранить" variant={ActionButtonType.Black} buttonType='submit' />
          </form>
        </section>
      </main>
      <Footer/>
    </>
  )
}
