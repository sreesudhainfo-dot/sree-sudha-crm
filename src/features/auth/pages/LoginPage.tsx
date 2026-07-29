import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const success = login(
      username,
      password
    );

    if (!success) {
      setError("Invalid username or password");
      return;
    }

    navigate("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold">
          CRM Login
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Sign in to continue
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            className="w-full rounded-lg border p-3"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            className="w-full rounded-lg border p-3"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}