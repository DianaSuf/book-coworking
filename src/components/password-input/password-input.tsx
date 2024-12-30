import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styles from './password-input.module.css';

interface PasswordInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
}

export default function PasswordInput({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.passwordWrapper}>
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={styles.inputPassword}
        />
        <IconButton
          onClick={handleClickShowPassword}
          aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
          edge="end"
          className={styles.iconButton}
          sx={{ position: 'absolute' }}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </div>
      {touched && error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}
