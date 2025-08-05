import type { Route } from "./+types/dashboard";
import { useGetSessionQuery } from "../../store/api/auth/authApi";
import { Typography } from "~/shared/shadcn/components/ui/typography";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - MERN Template" },
    { name: "description", content: "User dashboard" },
  ];
}

export default function Dashboard() {
  const { data: session } = useGetSessionQuery();

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2" className="mb-2">
          Dashboard
        </Typography>
      </div>
    </div>
  );
}
