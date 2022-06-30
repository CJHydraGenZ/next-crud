import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    let token = sessionStorage.getItem("Token");
    if (!token) return router.push("/register");
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
