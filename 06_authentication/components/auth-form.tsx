"use client";

import { signup } from "@/actions/auth-action";
import Link from "next/link";
import { useFormState } from "react-dom";

export type IFormMode = "login" | "signup";

export default function AuthForm({ mode }: { mode: IFormMode }) {
  const [formState, formAction] = useFormState(signup, { errors: {} });

  return (
    <form action={formAction} id="auth-form">
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      {formState.errors.email && (
        <p id="form-errors">{formState.errors.email}</p>
      )}
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors.password && (
        <p id="form-errors">{formState.errors.password}</p>
      )}
      <p>
        <button type="submit">{mode === "login" ? "Login" : "Sign Up"}</button>
      </p>
      <p>
        {mode === "login" && (
          <Link href="/?mode=signup">Create an account</Link>
        )}
        {mode === "signup" && (
          <Link href="/?mode=login">Login with existing account</Link>
        )}
      </p>
    </form>
  );
}
