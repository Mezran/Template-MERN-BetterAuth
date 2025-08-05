import type { Route } from "./+types/$";
import { Link } from "react-router";
import { Button } from "../shared/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../shared/shadcn/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Page Not Found - MERN Template" },
    { name: "description", content: "The page you're looking for doesn't exist" },
  ];
}

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="text-6xl mb-4">🔍</div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>Error 404</p>
          </div>

          <div className="flex flex-col space-y-2">
            <Link to="/">
              <Button className="w-full">Go Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
