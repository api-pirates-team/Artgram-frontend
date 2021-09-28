import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../CSS/Button.css";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const [scrolling,setScrolling] = useState(false);


  if(window.scrollY > 0 && !scrolling) {
    setScrolling(true);
    // console.log('working')
  }else if (window.scrollY === 0 && scrolling) {
     setScrolling(false);
     
   }

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })} className= { scrolling ?  "button_active" : "button"}>
      Log Out
    </button>
  );
};

export default LogoutButton;
