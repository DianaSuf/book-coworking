import styles from './register-modal.module.css'
import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { registerAction } from '../../store/api-actions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ActionButton from '../action-button/action-button';

interface RegisterModalProps {
  onSwitch: () => void;
  onClose: () => void;
}

export default function RegisterModal({ onSwitch, onClose }: RegisterModalProps) {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    try {
      await dispatch(registerAction({
        username: values.email, 
        realname: values.name, 
        password: values.password,
      })).unwrap();
      onClose();
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validateOnBlur: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Имя и фамилия обязательны'),
      email: Yup.string()
        .test('is-valid-domain', 'Email должен быть с доменом urfu.me или at.urfu.ru', (value) => {
          return /@(?:urfu.me|at.urfu.ru)$/.test(value || '');
        }),
      password: Yup.string()
        .min(6, 'Пароль должен содержать хотя бы 6 символов')
        .required('Пароль обязателен'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className={styles.modal}>
      <img src='../img/logo_white.svg' className={styles.logo}/>
      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Имя и фамилия</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className={styles.errorText}>{formik.errors.name}</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={styles.errorText}>{formik.errors.email}</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Пароль</label>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={styles.inputPassword}
            />
            <IconButton
              onClick={handleClickShowPassword}
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              edge="end"
              className={styles.iconButton}
              sx={{
                position: 'absolute',
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className={styles.errorText}>{formik.errors.password}</p>
          )}
        </div>
        <ActionButton text="Зарегистрироваться" variant='black' buttonType='submit' />
      </form>
      <p>
        Уже есть аккаунт?{' '}
        <button type="button" onClick={onSwitch}>
          <p className={styles.switchButton}>Войти</p>
        </button>
      </p>
    </div>
  );
};
