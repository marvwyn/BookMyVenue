import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] = useState(() => {
    const storedUser =
      localStorage.getItem("customerUser");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  const login = (
    user,
    accessToken
  ) => {
    localStorage.setItem(
      "customerUser",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "customerToken",
      accessToken
    );

    setUser(user);
  };

  const setActiveRole = (role) => {
    setUser((prevUser) => {
      if (!prevUser) return null;

      const updatedUser = {
        ...prevUser,
        activeRole: role,
      };

      localStorage.setItem(
        "customerUser",
        JSON.stringify(updatedUser)
      );

      return updatedUser;
    });
  };

  const logout = () => {
    localStorage.removeItem("customerUser");
    localStorage.removeItem(
      "customerToken"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setActiveRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);