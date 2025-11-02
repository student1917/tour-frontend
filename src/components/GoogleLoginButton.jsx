import { useEffect } from "react";
import { handleGoogleAuth } from "../utils/authGoogle";

const GoogleLoginButton = ({ clientId, dispatch, navigate, buttonId, type = "standard", textType = "signin_with" }) => {

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => handleGoogleAuth(response.credential, dispatch, navigate),
      });

      google.accounts.id.renderButton(
        document.getElementById(buttonId),
        {
          theme: "outline",
          size: "large",
          type: type,      
          text: textType, 
        }
      );
    }
  }, [clientId, dispatch, navigate, buttonId, type, textType]);

  return <div id={buttonId} className="w-100"></div>;
};

export default GoogleLoginButton;
