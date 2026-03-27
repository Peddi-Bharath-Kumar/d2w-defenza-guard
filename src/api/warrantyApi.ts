import api from "@/lib/axios";

export const getAllWarranties = () => {
  return api.get("/allWarranty");
};

export const createWarranty = (data: {
  roleId: string;
  customerName: string;
  customerEmail: string;
  make: string;
  model: string;
  year: number;
  vinNumber: string;
  productType: string;
  installerName: string;
  installationDate: string;
  warrantyPeriod: string;
}) => {
  return api.post("/createWarranty", data);
};