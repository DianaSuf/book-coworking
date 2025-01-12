import { useFormik } from 'formik';
import * as Yup from 'yup';
import ActionButton from "../action-button/action-button";
import { ActionButtonType } from "../../const";
import { resetUserPasswordAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import styles from './forgot-password-modal.module.css'

export default function ForgotPasswordModal( ) {
  const dispatch = useAppDispatch();

  const handleSubmit = async (email: string) => {
    try {
      await dispatch(resetUserPasswordAction({ username: email })).unwrap();
    } catch (error) {
      console.error('Ошибка при бронировании:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnBlur: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Введите корректный email')
        .test(
          'is-valid-domain',
          'Email должен быть с доменом urfu.me или at.urfu.ru',
          (value) => /@(?:urfu.me|at.urfu.ru)$/.test(value || '')
        )
        .required('Email обязателен'),
    }),
    onSubmit: (values) => {
      handleSubmit(values.email);
    },
  });

  return (
    <>
      <h1 className={styles.title}>Забыли пароль?</h1>
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
              placeholder="Введите ваш email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className={styles.errorText}>{formik.errors.email}</p>
            )}
          </div>
        </div>
        <ActionButton text="Отправить письмо для сброса пароля" variant={ActionButtonType.Black} buttonType="submit" />
      </form>
    </>
  );
}
