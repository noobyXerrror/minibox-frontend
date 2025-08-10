// src/utils/auth.ts
export const saveAuthData = (token: string, role: string) => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("userRole", role);
};

export const getUserRole = () => localStorage.getItem("userRole");
export const getToken = () => localStorage.getItem("accessToken");
export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};
