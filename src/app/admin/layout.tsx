"use client";

import { AuthProvider } from "@/src/contexts/AuthContext";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin";

  return (
    <AuthProvider>
      {isLoginPage ? children : <ProtectedRoute>{children}</ProtectedRoute>}
    </AuthProvider>
  );
}
