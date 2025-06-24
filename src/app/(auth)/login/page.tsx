"use client";

import { useAuthStore } from "@/store/Auth";
import { FormEvent, useState } from "react";

function LoginPage() {
  const { login } = useAuthStore();
  const { isLoading, setIsLoading } = useState(false);
  const { error, setError } = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      setError(() => "Please fill out all the fields");
      return;
    }

    setIsLoading(true);
    setError("");

    const loginResponse = await login(email.toString(), password.toString());

    if (loginResponse.error) {
      setError(() => loginResponse.error?.message);
    }

    setIsLoading(() => false);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}></form>
    </div>
  );
}
