import api from "@/lib/axios";

// Get all roles
export const getAllRoles = () => {
  return api.get("/allroles");
};

// Add role
export const addRole = (data: any) => {
  return api.post("/roleinventory", data);
};

// Mark damage
export const markDamage = (roleId: string) => {
  return api.post("/mark_damagebutton", null, {
    params: { roleId },
  });
};

// Restore role
export const restoreRole = (roleId: string) => {
  return api.post("/restorebutton", null, {
    params: { roleId },
  });
};