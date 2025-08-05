import type { Route } from "./+types/_root";
import { Link } from "react-router";
import { Button } from "../../shared/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/shadcn/components/ui/card";
import { useGetSessionQuery } from "../../store/api/auth/authApi";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MERN Template - Home" },
    {
      name: "description",
      content: "Welcome to our MERN stack application with BetterAuth!",
    },
  ];
}

export default function _Root() {
  const { data: session } = useGetSessionQuery();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to MERN Template</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern full-stack application built with MongoDB, Express, React, and Node.js,
          featuring BetterAuth for authentication.
        </p>
      </div>

      {/* User Status Card */}
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>
              {session?.user ? `Hello, ${session.user.name}!` : "Welcome, Guest!"}
            </CardTitle>
            <CardDescription>
              {session?.user
                ? "You are successfully logged in."
                : "Please log in to access all features."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {session?.user ? (
              <div className="flex flex-col space-y-2">
                <Link to="/dashboard">
                  <Button className="w-full">Go to Dashboard</Button>
                </Link>
                <Link to="/profile">
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login">
                  <Button className="w-full">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="w-full">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🔐 Secure Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Built with BetterAuth for robust, secure user authentication.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">⚡ Modern Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              React Router v7, RTK Query, TypeScript, and Tailwind CSS.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🎨 Beautiful UI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Styled with shadcn/ui components for a polished experience.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
