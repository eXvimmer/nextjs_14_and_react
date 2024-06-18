import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "./db";
import { Cookie, Lucia } from "lucia";
import { cookies } from "next/headers";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export async function createAuthSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}

export async function verifyAuth() {
  const sessionCookie = cookies().get(lucia.sessionCookieName);
  if (!sessionCookie) {
    return { user: null, session: null };
  }
  const sessionId = sessionCookie.value;
  if (!sessionId) {
    return { user: null, session: null };
  }
  const result = await lucia.validateSession(sessionId);
  try {
    let cookie: Cookie;
    if (!result.session) {
      cookie = lucia.createBlankSessionCookie(); // invalid => remove
    } else if (result.session.fresh) {
      cookie = lucia.createSessionCookie(result.session.id); // refresh
    }
    cookies().set(cookie.name, cookie.value, cookie.attributes);
  } catch {
    // ignore NextJS errors
  }
  return result;
}
