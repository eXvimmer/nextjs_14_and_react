"use server";

import { createAuthSession } from "@/lib/auth";
import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
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
