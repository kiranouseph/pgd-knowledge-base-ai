import React from "react";
import { GoogleLogin } from "react-google-login";
import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";

const clientId =
  "1037415014792-btegcu6ssjqk1pqn5aj9unfvvd6j3ear.apps.googleusercontent.com";

function LoginButton() {
  const dispatch = useDispatch();

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    const profile = res.profileObj;
    dispatch(
      authActions.login({
        email: profile.email,
        imageUrl: profile.imageUrl,
        name: profile.name,
      })
    );
  };
  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  };
  return (
    <div id="loginButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="LOGIN"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default LoginButton;
