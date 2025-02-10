import { useAppDispatch, useAppSelector } from "../../hooks";
import { confirmRegisterAction } from "../../store/api-actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppRoute, AuthorizationStatus } from "../../const";
import { getAuthorizationStatus } from "../../store/slices/user-slice";

export default function ConfirmScreen() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get("data");
  const [isRequestSent, setIsRequestSent] = useState(false);

  useEffect(() => {
    if (data && authorizationStatus !== AuthorizationStatus.USER && authorizationStatus !== AuthorizationStatus.ADMIN && !isRequestSent) {
      setIsRequestSent(true);
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
    }
  }, [authorizationStatus, data, dispatch, isRequestSent, navigate]);

  return null;
}
