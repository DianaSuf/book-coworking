import { useAppDispatch } from "../hooks"
import { ConfirmAction } from "../store/api-actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppRoute } from "../const";

export default function ConfirmScreen() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get('data');

  useEffect(() => {
    if (data) {
      dispatch(ConfirmAction({message: data}))
      .unwrap()
      .then(() => {
        navigate(AppRoute.Profile);
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
