import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId =
  "190098913382-cgc12ml4nme8u32kjgumdcm50nhsc28g.apps.googleusercontent.com";

function Logout() {
  const onLogoutSuccess = () => {
    console.log("User logged out successfully");
  };

  return (
    <div id="signout-button">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
}

export default Logout;
