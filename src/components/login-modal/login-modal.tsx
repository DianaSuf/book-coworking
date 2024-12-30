import styles from './login-modal.module.css';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PasswordInput from '../password-input/password-input';
import ActionButton from '../action-button/action-button';
import { ActionButtonType } from '../../const';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  onSwitch: () => void;
  onForgotPassword: () => void;
  onClose: () => void;
}

export default function LoginModal({ onSwitch, onForgotPassword, onClose }: LoginModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    onForgotPassword();
    onClose();
  };

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
      // email: Yup.string()
      //   .test(
      //     'is-valid-domain',
      //     'Email должен быть с доменом urfu.me или at.urfu.ru',
      //     (value) => /@(?:urfu.me|at.urfu.ru)$/.test(value || '')
      //   ),
      // password: Yup.string()
      //   .min(6, 'Пароль должен содержать хотя бы 6 символов')
      //   .required('Пароль обязателен'),
      email: Yup.string()
        .required('Email обязателен'),
      password: Yup.string()
        // .min(6, 'Пароль должен содержать хотя бы 6 символов')
        .required('Пароль обязателен'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <>
      <h1 className={styles.title}>Вход</h1>
      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
        <div className={styles.content}>
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
          <PasswordInput
            id="password"
            name="password"
            label="Пароль"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.password}
            error={formik.errors.password}
          />
        </div>
        <ActionButton text="Войти" variant={ActionButtonType.Black} buttonType="submit" />
      </form>
      <div className={styles.switch}>
        <p>
          Если Вы забыли пароль, его можно{' '}
          <button type="button" onClick={handleForgotPassword}>
            <p className={styles.switchButton}>восстановить</p>
          </button>
        </p>
        <p>
          Если у Вас еще нет аккаунта -{' '}
          <button type="button" onClick={onSwitch}>
            <p className={styles.switchButton}>зарегистрироваться</p>
          </button>
        </p>
      </div>
    </>
  );
}
