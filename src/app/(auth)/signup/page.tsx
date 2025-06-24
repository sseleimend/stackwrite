"use client";

import { useAuthStore } from "@/store/Auth";
import { FormEvent, useState } from "react";

function SignUpPage() {
  const { createAccount, login } = useAuthStore();
  const { isLoading, setIsLoading } = useState(false);
  const { error, setError } = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!firstname || !email || !lastname || !password) {
      setError(() => "Please fill out all the fields");
      return;
    }

    setIsLoading(true);
    setError("");

    const response = await createAccount(
      `${firstname} ${lastname}`,
      email.toString(),
      password.toString()
    );

    if (response.error) {
      setError(() => response.error?.message);
    } else {
      const loginResponse = await login(email.toString(), password.toString());

      if (loginResponse.error) {
        setError(() => loginResponse.error?.message);
      }
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
