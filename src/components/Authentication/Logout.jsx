import React, { useEffect } from "react";

const Logout = () => {
    useEffect(() => {
        Logout();
    window.location = "/";
  }, []);
  return null;
};

export default Logout;
