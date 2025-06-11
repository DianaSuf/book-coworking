import { ModalType, ReservalGroup, ReservalType } from '../../const'
import { useAppDispatch } from '../../hooks'
import { CancelReservalAction, ConfirmReservalGroupAction, fetchReservalsAction } from '../../store/api-actions'
import { openModal, setReservationId } from '../../store/slices/modal-slice'
import { IReserval } from '../../types/reservals-data'
import Card from './base-card/card'
import Status from '../status/status'

type ReservalProps = {
  reservals: IReserval[]
}

export default function Reserval({ reservals }: ReservalProps) {
  const dispatch = useAppDispatch()

  const handleConfirmModal = (id: number) => {
    dispatch(setReservationId(id));
    dispatch(openModal(ModalType.ConfirmBooking));
  };

  const handleConfirmGroupModal = async (id: number) => {
    try {
      await dispatch(ConfirmReservalGroupAction({ id })).unwrap();
      dispatch(openModal(ModalType.SuccessConfirmBooking));
    } catch (error) {
      console.error("Ошибка при подтверждении группового бронирования:", error);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      await dispatch(CancelReservalAction({ id })).unwrap();
      await dispatch(fetchReservalsAction());
    } catch (error) {
      console.error("Ошибка при отмене бронирования:", error);
    }
  };

  const getStatusSpan = (reserval: IReserval) => {
    if (reserval.stateReserval === ReservalType.CONFIRMED) {
      return <Status type="green" text="Подтверждено" />;
    }
    if (reserval.stateReserval === ReservalType.FALSE) {
      return <Status type="red" text="Не подтверждено" />;
    }
    return <Status type="green" text="Ожидает подтверждения" />;
  };

  const getActionButton = (reserval: IReserval) => {
    if (reserval.stateReserval === ReservalType.CONFIRMED) {
      return <button onClick={() => handleCancel(reserval.id)}><Status type="red" text="Отменить" /></button>;
    }
    if (reserval.stateReserval === ReservalType.FALSE) {
      return <button><Status type="grey" text="Отменить" /></button>;
    }
    if (reserval.stateGroup === ReservalGroup.FALSE) {
      return <button onClick={() => handleConfirmModal(reserval.id)}><Status type="red" text="Подтвердить" /></button>;
    }
    return <button onClick={() => handleConfirmGroupModal(reserval.id)}><Status type="red" text="Принять" /></button>;
  };

  return (
    <>
      {reservals.map((reserval) => (
        <Card
          key={reserval.id}
          title={<h5>{reserval.stateGroup === ReservalGroup.FALSE ? 'Бронирование' : 'Приглашение'}</h5>}
          timeText={reserval.sendTime}
          status={getStatusSpan(reserval)}
          text={
            reserval.stateGroup === ReservalGroup.FALSE
              ? `Бронирование ${reserval.dateReserval} с ${reserval.timeStartReserval} до ${reserval.timeEndReserval} место №${reserval.table}.`
              : `Приглашение от ${reserval.invit} ${reserval.dateReserval} с ${reserval.timeStartReserval} до ${reserval.timeEndReserval} место №${reserval.table}`
          }
          actionButton={getActionButton(reserval)}
        />
      ))}
    </>
  )
}
