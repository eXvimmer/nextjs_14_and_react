"use server";

import { IFormMode } from "@/components/auth-form";
import { createAuthSession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { IErrors } from "@/types/types";
import { redirect } from "next/navigation";

export async function signup(_prevState: IErrors, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const errors: IErrors["errors"] = {};
  // TODO: add real validation
  if (!email.includes("@")) {
    errors.email = "Please provide a valid email address.";
  }
  if (password.trim().length < 8) {
    errors.password = "Password should be at least 8 characters long";
  }
  if (Object.keys(errors).length) {
    return {
      errors,
    };
  }
  const hashedPassword = hashUserPassword(password);
  try {
    const id = createUser(email, hashedPassword);
    await createAuthSession(id.toString());
    redirect("/training");
  } catch (e) {
    if (e.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email: "The email has already been taken",
        },
      };
    }
    throw e;
  }
}

export async function login(_prevState: IErrors, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const existingUser = getUserByEmail(email);
  if (!existingUser) {
    return {
      errors: {
        email: "Couldn't authenticate the user. Please check your credentials",
      },
    };
  }
  const isValidPassword = verifyPassword(existingUser.password, password);
  if (!isValidPassword) {
    return {
      errors: {
        password:
          "Couldn't authenticate the user. Please check your credentials",
      },
    };
  }
  await createAuthSession(existingUser.id.toString());
  redirect("/training");
}

export async function auth(
  mode: IFormMode,
  prevState: IErrors,
  formData: FormData,
) {
  if (mode === "login") {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
}
