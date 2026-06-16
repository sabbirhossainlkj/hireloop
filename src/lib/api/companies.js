import { protectedFetch, serverFetch } from "../core/server";
import { getSessionUser } from "../core/session";

export const getCompanies = () => {
  return protectedFetch(`/api/companies`);
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getRecruiterCompany = async (recruiterId) => {
  return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`);
};

export const getLoggedInRecruiterCompany = async () => {
  const user = await getSessionUser();
  console.log(user);
  return getRecruiterCompany(user?.id);
};
