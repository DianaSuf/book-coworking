import { useFormik } from 'formik';
import * as Yup from 'yup';
import ActionButton from "../action-button/action-button";
import { ActionButtonType } from "../../const";
import styles from './confirm-booking-modal.module.css'

export default function ConfirmBookingModal( ) {
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
      console.log('Код для подтверждения брони:', values.code);
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
