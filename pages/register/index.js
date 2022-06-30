import React, { useEffect, useState } from "react";
import { app } from "firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { async } from "@firebase/util";
import { useRouter } from "next/router";
const Register = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const signUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const log = await response.user;
      // console.log(log);
      sessionStorage.setItem("Token", await response.user.accessToken);
      router.push("/home");
    } catch (error) {
      alert(error.message);
    }
  };
  const signUpWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      // const log = await response.user;
      // console.log(log);
      sessionStorage.setItem("Token", await response.user.accessToken);

      console.log(await response.user);
      await router.push("/home");
    } catch (error) {
      alert(error);
    }
  };
  const signUpWithGithub = async () => {
    try {
      const response = await signInWithPopup(auth, githubProvider);

      // alert);
      sessionStorage.setItem("Token", await response.user.accessToken);

      alert(await response.user);
      await router.push("/home");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    let token = sessionStorage.getItem("Token");
    if (token) router.push("/home");
  }, []);

  return (
    <div className="flex flex-col p-5 gap-4">
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className="flex justify-center" onClick={signUp}>
        Sign Up
      </button>
      <button className="flex justify-center" onClick={signUpWithGoogle}>
        Sign Up with Google
      </button>
      <button className="flex justify-center" onClick={signUpWithGithub}>
        Sign Up with Github
      </button>
    </div>
  );
};

export default Register;
