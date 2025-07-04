import { ModalType, ReservalType } from '../../const'
import { useAppDispatch } from '../../hooks'
import { CancelReservalAction, ConfirmReservalGroupAction, UnConfirmReservalGroupAction } from '../../store/api-actions'
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
    } catch (error) {
      console.error("Ошибка при подтверждении группового бронирования:", error);
    }
  };

  const handleUnConfirmGroupModal = async (id: number) => {
    try {
      await dispatch(UnConfirmReservalGroupAction({ id })).unwrap();
    } catch (error) {
      console.error("Ошибка при отклонении группового бронирования:", error);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      await dispatch(CancelReservalAction({ id })).unwrap();
    } catch (error) {
      console.error("Ошибка при отмене бронирования:", error);
    }
  };

  const getStatusSpan = (reserval: IReserval) => {
    if (reserval.type === ReservalType.CONFIRMED) {
      return <Status type="green" text="Подтверждено" />;
    }
    if (reserval.type === ReservalType.UNCONFIRMED) {
      return <Status type="red" text="Не подтверждено" />;
    }
    if (reserval.type === ReservalType.GROUP || reserval.type === ReservalType.CODE) {
      return <Status type="green" text="Ожидает подтверждения" />;
    }
    return null;
  };

  const getActionButton = (reserval: IReserval) => {
    if (reserval.type === ReservalType.GROUP) {
      return [
        <button onClick={() => handleConfirmGroupModal(reserval.id)}><Status type="red" text="Принять" /></button>,
        <button onClick={() => handleUnConfirmGroupModal(reserval.id)}><Status type="red" text="Отклонить" /></button>
      ];
    }
    if (reserval.type === ReservalType.ACTIVE) {
      return [<button onClick={() => handleCancel(reserval.id)}><Status type="red" text="Отменить" /></button>];
    }
    if (reserval.type === ReservalType.CODE) {
      return [<button onClick={() => handleConfirmModal(reserval.id)}><Status type="red" text="Подтвердить" /></button>];
    }
    if (reserval.type === ReservalType.HOURS) {
      return [<button><Status type="grey" text="Отменить" /></button>];
    }
    return [];
  };

  return (
    <>
      {reservals.map((reserval) => (
        <Card
          key={reserval.id}
          title={<h5>{reserval.type === ReservalType.GROUP ? 'Приглашение' : 'Бронирование'}</h5>}
          timeText={reserval.sendTime}
          status={getStatusSpan(reserval)}
          text={
            reserval.type === ReservalType.GROUP
              ? `Приглашение от ${reserval.invit} ${reserval.dateReserval} с ${reserval.timeStartReserval} до ${reserval.timeEndReserval} место №${reserval.table}`
              : `Бронирование ${reserval.dateReserval} с ${reserval.timeStartReserval} до ${reserval.timeEndReserval} место №${reserval.table}.`
          }
          actionButtons={getActionButton(reserval)}
        />
      ))}
    </>
  )
}
