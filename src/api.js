const BASE_URL = "http://localhost:8080";

export const API = {
  adminLogin: (data) =>
    fetch(`${BASE_URL}/AdminLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  getAllRoles: () =>
    fetch(`${BASE_URL}/allroles`),

  createWarranty: (data) =>
    fetch(`${BASE_URL}/createWarranty`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  checkRoll: (rollId) =>
    fetch(`${BASE_URL}/checkRoll?rollId=${rollId}`),
};
