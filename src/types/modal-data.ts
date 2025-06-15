export type IModalType =
  // Аутентификация
  | 'login'
  | 'register'
  | 'forgotPassword'
  | 'successConfirmPassword'
  | 'successResetPassword'
  
  // Регистрация
  | 'confirmRegister'
  
  // Бронирование
  | 'successReserval'
  | 'confirmBooking'
  | 'successConfirmBooking';
