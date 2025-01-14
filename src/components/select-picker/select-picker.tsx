import { FC } from 'react';
import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from './select-picker.module.css';

interface SelectPickerComponentProps {
  value: string | null;
  onChange: (value: string | null) => void;
  data: { label: string; value: string }[];
  touched: boolean | undefined;
  error: string | undefined;
  placeholder: string;
  disabled?: boolean;
}

const SelectPickerComponent: FC<SelectPickerComponentProps> = ({
  value,
  onChange,
  data,
  touched,
  error,
  placeholder,
  disabled = false
}) => {
  return (
    <div className={styles.container}>
      <SelectPicker
        value={value || ''}
        onChange={onChange}
        data={data}
        searchable={false}
        placeholder={placeholder}
        disabled={disabled}
        renderValue={(_value, item) =>
          item && typeof item === 'object' && 'label' in item ? (
            <span style={{ color: '#14191A' }}>{item.label}</span>
          ) : <span style={{ color: '#8A8C8C' }}>{placeholder}</span>
        }
        style={{ width: 100 }}
      />
      {touched && error && (
        <p className={styles.errorText}>{error}</p>
      )}
    </div>
  );
};

export default SelectPickerComponent;
