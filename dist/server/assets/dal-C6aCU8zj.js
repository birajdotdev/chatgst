import { redirect } from "@tanstack/react-router";
import { e as env } from "./env-CgjodLxP.js";
import { v as verifySessionFn } from "./session.server-oiI_kIZw.js";
async function verifySession() {
  const session = await verifySessionFn();
  if (!session) {
    throw redirect({ to: "/login" });
  }
  return session;
}
async function getOptionalSession() {
  const session = await verifySessionFn();
  return session;
}
async function getUser() {
  const session = await verifySession();
  try {
    const res = await fetch(`${env.API_URL}/profile/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`
      }
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch {
    return null;
  }
}
async function getOptionalUser() {
  const session = await getOptionalSession();
  if (!session) {
    return null;
  }
  try {
    const res = await fetch(`${env.API_URL}/profile/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`
      }
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch {
    return null;
  }
}
export {
  getOptionalUser as a,
  getUser as b,
  getOptionalSession as g,
  verifySession as v
};
