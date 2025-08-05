import type { Route } from "./+types/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/shadcn/components/ui/card";
import { Button } from "../../shared/shadcn/components/ui/button";
import { useGetSessionQuery } from "../../store/api/auth/authApi";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - MERN Template" },
    { name: "description", content: "User dashboard" },
  ];
}

export default function Dashboard() {
  const { data: session } = useGetSessionQuery();

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session?.user?.name}!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium">Name</p>
              <p className="text-sm text-muted-foreground">{session?.user?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Email Verified</p>
              <p className="text-sm text-muted-foreground">
                {session?.user?.emailVerified ? "✅ Verified" : "❌ Not verified"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Session Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Session Information</CardTitle>
            <CardDescription>Current session details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {session?.session && (
              <>
                <div>
                  <p className="text-sm font-medium">Session ID</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {session.session.id.slice(0, 8)}...
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(session.session.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Expires</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(session.session.expiresAt)}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and navigation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/profile" className="block">
              <Button variant="outline" className="w-full justify-start">
                👤 View Profile
              </Button>
            </Link>
            <Link to="/" className="block">
              <Button variant="outline" className="w-full justify-start">
                🏠 Go Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <span className="text-2xl">👋</span>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Welcome</p>
                <p className="text-2xl font-bold">Back!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-500/10 rounded-full">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="text-2xl font-bold">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-500/10 rounded-full">
                <span className="text-2xl">🔐</span>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Security</p>
                <p className="text-2xl font-bold">Secure</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-500/10 rounded-full">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Performance</p>
                <p className="text-2xl font-bold">Fast</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
