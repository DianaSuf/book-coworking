import styles from './profile-screen.module.scss'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchUserDataAction, updateUserRealnameAction, updateUserPasswordAction, fetchAdminDataAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUserData } from '../../store/slices/user-slice';
import { Helmet } from 'react-helmet-async'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import PasswordInput from '../../components/password-input/password-input';
import ActionButton from '../../components/action-button/action-button';
import { openModal } from '../../store/slices/modal-slice';
import { ActionButtonType, AuthorizationStatus, ModalType } from '../../const';
import ProfileDrawer from '../../components/profile-drawer/profile-drawer';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (AuthorizationStatus.USER === authorizationStatus) {
      dispatch(fetchUserDataAction());
    }
    if (AuthorizationStatus.ADMIN === authorizationStatus) {
      dispatch(fetchAdminDataAction());
    }
  }, [dispatch]);

  const personalForm = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validateOnBlur: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Имя и фамилия обязательны'),
    }),
    onSubmit: (values) => {
      dispatch(updateUserRealnameAction({ realname: values.name }))
      .unwrap()
      .then((message) => {
        console.log(message);
        if (AuthorizationStatus.USER === authorizationStatus) {
          dispatch(fetchUserDataAction());
        }
        if (AuthorizationStatus.ADMIN === authorizationStatus) {
          dispatch(fetchAdminDataAction());
        }
      })
      .catch((error) => {
        console.error('Ошибка обновления:', error);
      });
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
      dispatch(updateUserPasswordAction({ oldPassword: values.oldPassword, newPassword: values.newPassword }))
      .unwrap()
      .then((message) => {
        dispatch(openModal(ModalType.SuccessResetPassword));
        console.log(message);
      })
      .catch((error) => {
        console.error('Ошибка обновления:', error);
      });
    },
  });

  useEffect(() => {
    if (userData) {
      personalForm.setValues({
        name: userData.realname || '',
        email: userData.username || '',
      });
    }
  }, [userData]);
  
  return (
    <>
      <Helmet>
        <title>Брусника.Коворкинг</title>
      </Helmet>
      <Header/>
      <main className={styles.profile}>
        <div className={styles.profileSection}>
          <h2 className={styles.titleMain}>Личный кабинет</h2>
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
                  <div className={styles.emailWrapper}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={personalForm.values.email}
                      onChange={personalForm.handleChange}
                      onBlur={personalForm.handleBlur}
                      className={styles.inputEmail}
                      readOnly
                    />
                    <img
                      className={styles.lockImg}
                      src="../img/icon_lock.svg"
                      alt="lock icon"
                    />
                  </div>
                </div>
              </div>
              <ActionButton text="Сохранить" variant={ActionButtonType.Black} buttonType='submit' />
            </form>
            {authorizationStatus === AuthorizationStatus.ADMIN && userData && 'code' in userData && (
              <>
                <h3 className={styles.title}>код</h3>
                <div className={styles.form} style={{width: "400px"}}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="code">Код для бронирования</label>
                    <input
                      id="code"
                      name="code"
                      type="text"
                      value={userData?.code || ''}
                      readOnly />
                  </div>
                </div>
              </>
            )}
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
        </div>
      </main>
      {authorizationStatus === AuthorizationStatus.ADMIN && (
        <ProfileDrawer />
      )}
      <Footer/>
    </>
  )
}
