import styles from './login-modal.module.css';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ActionButton from '../action-button/action-button';
import { ActionButtonType } from '../../const';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  onSwitch: () => void;
  onClose: () => void;
}

export default function LoginModal({ onSwitch, onClose }: LoginModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await dispatch(loginAction({ username: values.email, password: values.password })).unwrap();
      onClose();
      navigate(AppRoute.Profile);
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnBlur: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .test(
          'is-valid-domain',
          'Email должен быть с доменом urfu.me или at.urfu.ru',
          (value) => /@(?:urfu.me|at.urfu.ru)$/.test(value || '')
        ),
      password: Yup.string()
        .min(6, 'Пароль должен содержать хотя бы 6 символов')
        .required('Пароль обязателен'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <>
      <h1 className={styles.title}>Вход</h1>
      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
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
        <ActionButton text="Войти" variant={ActionButtonType.Black} buttonType="submit" />
      </form>
      <p>
        Нет аккаунта?{' '}
        <button type="button" onClick={onSwitch}>
          <p className={styles.switchButton}>Зарегистрироваться</p>
        </button>
      </p>
    </>
  );
}
