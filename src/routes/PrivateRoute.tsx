import { ReactNode } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "../redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  let navigate = useNavigate();
  const { account } = useSelector((state: RootState) => state.user);

  if (account && !account.auth) {
    return (
      <>
        <div className="alert alert-warning text-center mt-3" role="alert">
          <i style={{ color: "red" }}>
            You don't have permission access this page,{" "}
            <b style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
              Please login !
            </b>
          </i>
        </div>
      </>
    );
  } else {
    return <>{props.children}</>;
  }
};

export default PrivateRoute;
