import { FC } from 'react';
import DatePicker from 'rsuite/DatePicker';
import 'rsuite/dist/rsuite.min.css';
import ruRU from 'rsuite/locales/ru_RU';
import { CustomProvider } from 'rsuite';
import styles from './data-picker.module.css';

interface DatePickerComponentProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
  touched: boolean | undefined;
  error: string | undefined;
  placement?: 'bottomStart' | 'bottomEnd' | 'topStart' | 'topEnd' | 'leftStart' | 'leftEnd' | 'rightStart' | 'rightEnd' | 'auto' | 'autoVerticalStart' | 'autoVerticalEnd' | 'autoHorizontalStart' | 'autoHorizontalEnd';
}

const predefinedBottomRanges = [
  {
    label: `Сегодня ${new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    value: new Date(),
    closeOverlay: false,
  }
];

const DatePickerComponent: FC<DatePickerComponentProps> = ({
  value,
  onChange,
  touched,
  error,
  placement
}) => {
  return (
    <div className={styles.container}>
      <CustomProvider locale={ruRU}>
        <DatePicker
          isoWeek
          format="dd.MM.yyyy"
          placeholder="Выберите дату"
          oneTap
          editable={false}
          locale={{
            sunday: 'ВС',
            monday: 'ПН',
            tuesday: 'ВТ',
            wednesday: 'СР',
            thursday: 'ЧТ',
            friday: 'ПТ',
            saturday: 'СБ',
            ok: 'Сбросить',
            today: 'Сегодня',
            formattedMonthPattern: 'MMMM yyyy',
          }}
          shouldDisableDate={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          ranges={predefinedBottomRanges}
          renderCell={(date) => date.getDate()}
          value={value}
          onChange={onChange}
          placement={placement}
          style={{width: '150px'}}
        />
        {touched && error && (
          <p className={styles.errorText}>{error}</p>
        )}
      </CustomProvider>
    </div>
  );
};

export default DatePickerComponent;