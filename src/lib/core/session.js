import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export const getSessionUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user || null;
};

export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.session?.token || null;
};

export const requireRole = async (role) => {
  const user = await getSessionUser();

  if (!user) {
    redirect("/auth/singin");
  }
  if (user?.role !== role) {
    redirect("/unauthorized");
  }
  return user;
};
