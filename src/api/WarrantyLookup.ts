import api from "@/lib/axios";

export const findWarrantyByWarrantyId = (warrantyid: string) => {
  return api.get("/Find_Warranty", {
    params: { warrantyid },
  });
};