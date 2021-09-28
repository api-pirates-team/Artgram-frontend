import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";
import "../CSS/Button.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const [scrolling,setScrolling] = useState(false);


  if(window.scrollY > 0 && !scrolling) {
    setScrolling(true);
    // console.log('working')
  }else if (window.scrollY === 0 && scrolling) {
     setScrolling(false);
     
   }

  return (
    <Button  onClick={() => loginWithRedirect()} className= { scrolling ?  "button_active" : "button"}>
      Log In
    </Button>
  );
};

export default LoginButton;
