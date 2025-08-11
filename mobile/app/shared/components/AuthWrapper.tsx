import React from "react";
import { useGetSessionQuery } from "../../store/api/authApi";
import LoadingScreen from "./LoadingScreen";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { isLoading: isSessionLoading, isError } = useGetSessionQuery();

  // Show loading screen on initial load
  if (isSessionLoading) {
    return <LoadingScreen />;
  }

  // Always render children once session check is complete (whether success or error)
  return <>{children}</>;
}
