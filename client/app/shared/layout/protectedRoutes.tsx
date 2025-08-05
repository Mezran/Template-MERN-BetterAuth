import { Outlet, Navigate } from "react-router";
import { useGetSessionQuery } from "../../store/api/auth/authApi";

export default function ProtectedRoutes() {
  const { data: session, isLoading, error } = useGetSessionQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !session?.user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
