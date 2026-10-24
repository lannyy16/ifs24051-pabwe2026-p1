
import {
  createContext,
  useContext,
  useState
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("herba_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  function register(name, email, password) {
    const users = JSON.parse(
      localStorage.getItem("herba_users") || "[]"
    );

    const existingUser = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        message: "Email sudah terdaftar."
      };
    }

    users.push({
      name,
      email,
      password
    });

    localStorage.setItem(
      "herba_users",
      JSON.stringify(users)
    );

    return {
      success: true,
      message: "Register berhasil."
    };
  }

  function login(email, password) {
    const users = JSON.parse(
      localStorage.getItem("herba_users") || "[]"
    );

    const foundUser = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Email atau password salah."
      };
    }

    const loggedUser = {
      name: foundUser.name,
      email: foundUser.email
    };

    localStorage.setItem(
      "herba_user",
      JSON.stringify(loggedUser)
    );

    setUser(loggedUser);

    return {
      success: true,
      message: "Login berhasil."
    };
  }

  function logout() {
    localStorage.removeItem("herba_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
