import { useAppDispatch } from "../../hooks"
import { confirmAction } from "../../store/api-actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppRoute } from "../../const";

export default function ConfirmScreen() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get('data');

  useEffect(() => {
    if (data) {
      dispatch(confirmAction({message: data}))
      .unwrap()
      .then(() => {
        navigate(AppRoute.Profile, { replace: true });
      })
      .catch(() => {
        navigate(AppRoute.NotFound);
      })
    }
  })

  return (
    <>
    </>
  )
}
