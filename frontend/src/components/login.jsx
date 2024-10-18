import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const clientId =
  "190098913382-cgc12ml4nme8u32kjgumdcm50nhsc28g.apps.googleusercontent.com";

function Login() {
  const onSuccess = async (res) => {
    const userProfile = res.profileObj;
  };

  const onFailure = (res) => {
    console.log("Login failed. Response:", res);
  };

  return (
    <div id="signin-button">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;