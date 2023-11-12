"use client";

import { useState } from "react";
import UploaderButton from "./components/Components/UploaderButton";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const signupHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/auth/signup", {
      username,
      password,
      role: "user",
      email: email,
    });

    console.log(data);

    signIn("credentials", {
      username,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploaderButton />

      <form action="" onSubmit={signupHandler} className="text-black">
        <div className="flex flex-col">
          <label htmlFor="username" className="text-white">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
