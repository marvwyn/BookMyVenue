import {
    createContext,
    useContext,
    useState,
  } from "react";
  
  const AdminAuthContext =
    createContext();
  
  export const AdminAuthProvider = ({
    children,
  }) => {
  
    const [admin, setAdmin] =
      useState(() => {
  
        const storedAdmin =
          localStorage.getItem(
            "adminUser"
          );
  
        return storedAdmin
          ? JSON.parse(storedAdmin)
          : null;
      });
  
    const loginAdmin = (
      admin,
      token
    ) => {
  
      localStorage.setItem(
        "adminUser",
        JSON.stringify(admin)
      );
  
      localStorage.setItem(
        "adminToken",
        token
      );
  
      setAdmin(admin);
    };
  
    const logoutAdmin = () => {
  
      localStorage.removeItem(
        "adminUser"
      );
  
      localStorage.removeItem(
        "adminToken"
      );
  
      setAdmin(null);
    };
  
    return (
      <AdminAuthContext.Provider
        value={{
          admin,
          loginAdmin,
          logoutAdmin,
        }}
      >
        {children}
      </AdminAuthContext.Provider>
    );
  };
  
  export const useAdminAuth = () =>
    useContext(AdminAuthContext);