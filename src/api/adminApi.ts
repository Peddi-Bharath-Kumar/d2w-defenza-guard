import api from "@/lib/axios";

export const loginAdmin = (email: string, password: string) => {
  return api.post("/AdminLogin", {
    email,
    password,
  });
};