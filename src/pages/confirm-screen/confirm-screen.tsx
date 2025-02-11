import { useAppDispatch, useAppSelector } from "../../hooks";
import { confirmRegisterAction, checkAuthAction } from "../../store/api-actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { AppRoute, AuthorizationStatus } from "../../const";
import { getAuthorizationStatus } from "../../store/slices/user-slice";

export default function ConfirmScreen() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const location = useLocation();
  const navigate = useNavigate();
  const isRequestSent = useRef(false);

  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get("data");

  useEffect(() => {
    if (
      data &&
      authorizationStatus !== AuthorizationStatus.USER &&
      authorizationStatus !== AuthorizationStatus.ADMIN &&
      !isRequestSent.current
    ) {
      isRequestSent.current = true;
      localStorage.setItem("confirmRegisterStatus", `Запрос отправлен с данными: ${data}`);

      dispatch(confirmRegisterAction({ message: data }))
        .unwrap()
        .then(() => {
          dispatch(checkAuthAction());
          localStorage.setItem("confirmRegisterStatus", "Успешный ответ от сервера, редирект в профиль");
          navigate(AppRoute.Profile);
        })
        .catch(() => {
          localStorage.setItem("confirmRegisterStatus", "Ошибка при подтверждении регистрации, редирект на NotFound");
          navigate(AppRoute.NotFound);
        });
    }
  }, [data, dispatch, navigate, authorizationStatus]);

  return null;
}


