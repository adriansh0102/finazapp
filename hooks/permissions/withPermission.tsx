'use client';
import { useAuth } from "@/app/api/auth/AuthContext";
import { useSession } from "next-auth/react";
import React, { JSX } from "react";
import { Permission } from './permissions.type';
import UnauthorizedComponent from "@/components/common/Unauthorized";
import LoadingSpinner from "@/components/common/Loading";
import SinginComponent from "@/components/common/SinginComponent";


export function withPermission<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>,
  requiredPermission: Permission
) {
  return function WithPermissionWrapper(props: T) {
    const { data: session, status } = useSession();
    const { loading } = useAuth();

    if (status === 'loading' || loading) {
      return <LoadingSpinner />;
    }

    if (session?.user?.permissions?.length === 0 || (
      session?.user?.permissions &&
      !session?.user?.permissions.includes(requiredPermission)
    )) {
      return (
        <div className="relative flex flex-col items-center justify-center p-6 overflow-hidden z-1">
          <UnauthorizedComponent />
        </div>
      );
    }

    if (!session || session.user?.id === '') {
      return <SinginComponent />;
    }

    return <Component {...props} />;
  };
}
