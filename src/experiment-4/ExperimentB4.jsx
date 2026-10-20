
import React, {
  createContext,
  useContext,
  useState
} from "react";

const AuthContext = createContext(null);

const getRegisteredUsers = () => {
  try {
    const users = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
};

const toHex = (bytes) =>
  Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

const fromHex = (hex) =>
  new Uint8Array(
    hex.match(/.{2}/g).map((pair) => parseInt(pair, 16))
  );

const hashPassword = async (password, saltHex) => {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: fromHex(saltHex),
      iterations: 100000,
      hash: "SHA-256"
    },
    key,
    256
  );

  return toHex(new Uint8Array(bits));
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("authUser") || "null"
      );
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!user;

  // Create a new account
  const signup = async (name, email, password) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      return {
        success: false,
        error: "All fields are required."
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return {
        success: false,
        error: "Enter a valid email address."
      };
    }

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      return {
        success: false,
        error: "Password must contain at least 6 characters, one uppercase letter and one number."
      };
    }

    const users = getRegisteredUsers();

    const existingUser = users.some(
      (item) => item.email.toLowerCase() === cleanEmail
    );

    if (existingUser) {
      return {
        success: false,
        error: "This email is already registered. Please log in."
      };
    }

    try {
      const salt = crypto.getRandomValues(
        new Uint8Array(16)
      );

      const saltHex = toHex(salt);
      const passwordHash = await hashPassword(
        password,
        saltHex
      );

      const newUser = {
        name: cleanName,
        email: cleanEmail,
        salt: saltHex,
        passwordHash
      };

      localStorage.setItem(
        "registeredUsers",
        JSON.stringify([...users, newUser])
      );

      const sessionUser = {
        name: cleanName,
        email: cleanEmail
      };

      setUser(sessionUser);

      localStorage.setItem(
        "authUser",
        JSON.stringify(sessionUser)
      );

      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);

      return {
        success: false,
        error: "Could not create your account. Please try again."
      };
    }
  };

  // Log in only when the password matches the registered account
  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      return {
        success: false,
        error: "Email and password are required."
      };
    }

    try {
      const users = getRegisteredUsers();

      const account = users.find(
        (item) => item.email.toLowerCase() === cleanEmail
      );

      if (!account) {
        return {
          success: false,
          error: "No account found. Please sign up first."
        };
      }

      const enteredHash = await hashPassword(
        password,
        account.salt
      );

      if (enteredHash !== account.passwordHash) {
        return {
          success: false,
          error: "Incorrect email or password."
        };
      }

      const sessionUser = {
        name: account.name,
        email: account.email
      };

      setUser(sessionUser);

      localStorage.setItem(
        "authUser",
        JSON.stringify(sessionUser)
      );

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        error: "Login failed. Please try again."
      };
    }
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("authUser");
    localStorage.removeItem("profile");
    localStorage.removeItem("savedJobs");
    localStorage.removeItem("applications");
    localStorage.removeItem("jobAlerts");
    localStorage.removeItem("interviews");

    sessionStorage.clear();

    // Keep registeredUsers so the account still exists.
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signup,
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

export default AuthProvider;
