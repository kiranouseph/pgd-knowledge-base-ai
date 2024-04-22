import React from "react";
import { GoogleLogout } from "react-google-login";
import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";

const clientId =
  "1037415014792-btegcu6ssjqk1pqn5aj9unfvvd6j3ear.apps.googleusercontent.com";

function LogoutButton() {
  const dispatch = useDispatch();

  const onSuccess = (res) => {
    console.log("LOGOUT SUCCESSFUL!");
    dispatch(authActions.logout());
  };

  return (
    <div id="logoutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText=""
        onLogoutSuccess={onSuccess}
      >
        <span className="material-symbols-outlined">logout</span>
      </GoogleLogout>
    </div>
  );
}

export default LogoutButton;
