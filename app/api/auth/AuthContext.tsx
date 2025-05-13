"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { login as LoginAuth } from "../services/auth.service";
import { saveCookies } from "./cookies";
import { useRouter } from "next/navigation";
import { Permission } from "@/hooks/permissions/permissions.type";

interface UserSession {
  refresh: string;
  access: string;
  id: string;
  email: string;
  full_name: string;
  avatar: string | null;
  roles: string[];
  permissions: string[];
  accessTokenExpiresIn: number;
}

interface AuthContextType {
  token: string;
  refresh: string;
  permissions: string[];
  user: UserSession | null;
  loading: boolean;
  login: (data: LoginDataI) => Promise<boolean>;
  logout: () => Promise<void>;
  validatePermissions: (permission: Permission) => boolean;
}

type LoginDataI = {
  email: string;
  password: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
  initialToken?: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string>("");
  const [refresh, setRefresh] = useState<string>("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const route = useRouter();

  const validatePermissions = (permission: Permission) => {
    if (
      session?.user?.permissions &&
      (session?.user?.permissions.length === 0 ||
        !session.user.permissions.includes(permission))
    ) {
      return false;
    }
    return true;
  };

  const updateContext = async (
    userUpd: UserSession = {
      refresh: "",
      access: "",
      id: "",
      email: "",
      full_name: "",
      avatar: null,
      roles: [],
      permissions: [],
      accessTokenExpiresIn: 0,
    },
    tokenUpd: string = "",
    refreshUpd: string = "",
    permissionsUpd: string[] = []
  ) => {
    setUser(userUpd);
    setToken(tokenUpd);
    setRefresh(refreshUpd);
    setPermissions(permissionsUpd);
    await saveCookies(tokenUpd);
  };

  const login = async ({ email, password }: LoginDataI): Promise<boolean> => {
    try {
      const resp = await LoginAuth( email, password );
      const signin = await signIn("credentials", {
        ...resp?.data,
        roles: resp?.data.roles,
        redirect: false,
      });
      if (resp?.status === 200 && signin?.ok) {
        await updateContext(
          resp.data,
          resp.data.access,
          resp.data.refresh,
          resp.data.permissions
        );
        route.push("/");
        return true;
      } else {
      }
    } catch {
    }
    return false;
  };

  const logout = useCallback(async () => {
    try {
      await updateContext();
      signOut();
      route.push("/auth");
    } catch {
  
    }
  }, [route]);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (session?.user?.refresh) {
          // await verifyJWT(session.user.refresh)       
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      verifyToken();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status, logout]);

  return (
    <AuthContext.Provider
      value={{
        token,
        permissions,
        user,
        loading,
        login,
        logout,
        refresh,
        validatePermissions,
      }}
    >
    
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};