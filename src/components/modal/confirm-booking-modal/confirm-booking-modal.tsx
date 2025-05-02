import { useFormik } from 'formik';
import * as Yup from 'yup';
import ActionButton from "../../action-button/action-button";
import { ActionButtonType } from "../../../const";
import styles from './confirm-booking-modal.module.css'
import { getNotificationId, openModal } from '../../../store/slices/modal-slice';
import { ModalType } from '../../../const';
import { ConfirmReservalAction } from '../../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../../hooks';

export default function ConfirmBookingModal( ) {
  const dispatch = useAppDispatch()
  const id = useAppSelector(getNotificationId)

  const handleSubmit = async (id: number, code: string) => {
    try {
      await dispatch(ConfirmReservalAction({ id, code })).unwrap();
      dispatch(openModal(ModalType.SuccessConfirmBooking));
    } catch (error) {
      console.error('Ошибка отпраки кода:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validateOnBlur: true,
    validationSchema: Yup.object({
      code: Yup.string()
        .required('Код обязателен'),
    }),
    onSubmit: (values) => {
      handleSubmit(id, values.code);
    },
  });

  return (
    <>
      <h1 className={styles.title}>Подтверждение брони</h1>
      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
        <div className={styles.content}>
          <div className={styles.inputGroup}>
            <label htmlFor="code">Введите одноразовый код</label>
            <input
              id="code"
              name="code"
              type="text"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.code && formik.errors.code && (
              <p className={styles.errorText}>{formik.errors.code}</p>
            )}
          </div>
        </div>
        <ActionButton text="Применить" variant={ActionButtonType.Black} buttonType="submit" />
      </form>
    </>
  );
}
