import { useFormik } from 'formik';
import * as Yup from 'yup';
import PasswordInput from '../password-input/password-input';
import ActionButton from "../action-button/action-button";
import { ActionButtonType } from "../../const";
import styles from './reset-modal.module.css'

interface ResetModalProps {
  onClose: () => void;
}

export default function ResetModal({ onClose }: ResetModalProps) {
  const formik = useFormik({
      initialValues: {
        password: '',
      },
      validateOnBlur: true,
      validationSchema: Yup.object({
        password: Yup.string()
          .min(6, 'Новый пароль должен содержать не менее 6 символов!')
          .required('Пароль обязателен'),
      }),
      onSubmit: (values) => {
        console.log('Введённый пароль:', values.password);
      },
    });

  return (
    <>
      <h1 className={styles.title}>Восстановление пароля</h1>
      <PasswordInput
        id="password"
        name="password"
        label="Введите новый пароль"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.password}
        error={formik.errors.password}
      />
      <ActionButton text="Применить" onClick={onClose} variant={ActionButtonType.Black} />
    </>
  );
}
