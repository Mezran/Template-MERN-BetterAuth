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
import { Typography } from "~/shared/shadcn/components/ui/typography";

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
      <Typography variant="h2">Home page</Typography>

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
    </div>
  );
}
