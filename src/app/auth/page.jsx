"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { Button } from "../components/utilUI/ui/button";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const { data: session, status } = useSession();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signup, setSignup] = useState(true);

  const signupHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/auth/signup", {
      username,
      password,
      role: "user",
      email: email,
    });

    signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-black ">
      {status === "loading" && <p>Loading...</p>}

      <form
        action=""
        onSubmit={signup ? signupHandler : loginHandler}
        className="text-black flex flex-col items-center"
      >
        <div className="flex flex-col items-center">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border-y-2 border-black rounded-full py-2 px-4"
          />
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border-y-2 border-black rounded-full py-2 px-4"
          />
        </div>

        {signup && (
          <div className="flex flex-col items-center">
            <label htmlFor="username" className="">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="border-y-2 border-black rounded-full py-2 px-4"
            />
          </div>
        )}

        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>

      <div className="flex flex-col gap-y-3 mt-5">
        <Button onClick={() => setSignup((prev) => !prev)}>
          {signup
            ? "Already have an account? Login"
            : "Need an account? Signup"}
        </Button>

        <Button onClick={() => signIn()}>Sign in with accounts</Button>
        {session ? <Button onClick={() => signOut()}>Logout</Button> : null}
      </div>
    </main>
  );
};

export default AuthPage;
