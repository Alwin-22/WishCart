import React, { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Routing from "./components/Routing/routing";
import { date } from "zod";
import { getUser } from "./services/userServices";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);
  return (
    <div className="App">
      <Navbar user={user} />
      <main>
        <Routing setUser={setUser} />
      </main>
    </div>
  );
};

export default App;
