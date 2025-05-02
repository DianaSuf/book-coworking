import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../hooks';
import { useLocation, useNavigate } from "react-router-dom";
import PasswordInput from '../../password-input/password-input';
import ActionButton from "../../action-button/action-button";
import { ActionButtonType, ModalType } from "../../../const";
import { confirmPasswordAction } from '../../../store/api-actions';
import styles from './reset-password-modal.module.css'
import { openModal } from '../../../store/slices/modal-slice';
import { AppRoute } from '../../../const';

interface ResetPasswordProps {
  onClose: () => void;
}

export default function ResetPasswordModal({ onClose }: ResetPasswordProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get("data") || "";

  const handleSubmit = async (password: string) => {
    if (!data) {
      console.error("Параметр 'data' отсутствует в URL.");
      return;
    }

    try {
      await dispatch(confirmPasswordAction({ data, password })).unwrap();
      dispatch(openModal(ModalType.SuccessResetPassword));
      navigate(AppRoute.Root);
    } catch (error) {
      console.error('Ошибка восстановлении пароля:', error);
    }
  };
  
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
        handleSubmit(values.password);
      },
    });

  return (
    <>
      <h1 className={styles.title}>Восстановление пароля</h1>
      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
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
        <ActionButton text="Применить" onClick={onClose} variant={ActionButtonType.Black} buttonType="submit"/>
      </form>
    </>
  );
}
