import styles from './register-modal.module.css'
import { useAppDispatch } from '../../hooks';
import { registerAction } from '../../store/api-actions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PasswordInput from '../password-input/password-input';
import ActionButton from '../action-button/action-button';
import { ActionButtonType } from '../../const';

interface RegisterModalProps {
  onSwitch: () => void;
  onClose: () => void;
  onRegisterSuccess: () => void;
}

export default function RegisterModal({ onSwitch, onClose, onRegisterSuccess }: RegisterModalProps) {
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    try {
      await dispatch(registerAction({
        username: values.email, 
        realname: values.name, 
        password: values.password,
      })).unwrap();
      onClose();
      onRegisterSuccess();
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
    <>
      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
        <div className={styles.content}>
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
        <ActionButton text="Зарегистрироваться" variant={ActionButtonType.Black} buttonType='submit' />
      </form>
      <p>
        Если у Вас уже есть аккаунт -{' '}
        <button type="button" onClick={onSwitch}>
          <p className={styles.switchButton}>войти</p>
        </button>
      </p>
    </>
  );
};
