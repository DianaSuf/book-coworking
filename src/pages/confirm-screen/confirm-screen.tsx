// import { useAppDispatch } from "../../hooks"
// import { confirmRegisterAction } from "../../store/api-actions";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { AppRoute } from "../../const";

// export default function ConfirmScreen() {
//   const dispatch = useAppDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const queryParams = new URLSearchParams(location.search);
//   const data = queryParams.get("data");

//   // Локальное состояние для предотвращения повторных запросов
//   const [isRequestSent, setIsRequestSent] = useState(false);

//   useEffect(() => {
//     if (data && !isRequestSent) {
//       setIsRequestSent(true); // Устанавливаем флаг до отправки запроса

//       dispatch(confirmRegisterAction({ message: data }))
//         .unwrap()
//         .then(() => {
//           // navigate(AppRoute.Profile);
//           console.log("Profile");
//         })
//         .catch(() => {
//           // navigate(AppRoute.NotFound);
//           console.log("NotFound");
//         });
//         navigate(AppRoute.Profile);
//     }
//   }, [data, dispatch, navigate, isRequestSent]);

//   return null;
// }
import { useAppDispatch } from "../../hooks";
import { confirmRegisterAction } from "../../store/api-actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppRoute } from "../../const";

export default function ConfirmScreen() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get("data");

  // Локальное состояние для предотвращения повторных запросов
  const [isRequestSent, setIsRequestSent] = useState(false);

  useEffect(() => {
    if (data && !isRequestSent) {
      setIsRequestSent(true); // Устанавливаем флаг, чтобы предотвратить повторный запрос

      // Сохраняем флаг успешной отправки в localStorage, чтобы при перезагрузке компонента не отправлялся новый запрос
      if (!localStorage.getItem('confirmRegisterSent')) {
        localStorage.setItem('confirmRegisterSent', 'true');

        dispatch(confirmRegisterAction({ message: data }))
          .unwrap()
          .then(() => {
            navigate(AppRoute.Profile);
            console.log("Profile");
          })
          .catch(() => {
            navigate(AppRoute.NotFound);
            console.log("NotFound");
          });
      } else {
        console.log("Request already sent");
      }
    }
  }, [data, dispatch, navigate, isRequestSent]);

  return null;
}
