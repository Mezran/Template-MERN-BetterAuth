import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("shared/layout/layoutApp.tsx", [
    index("routes/_root/_root.tsx"),
    route("login", "routes/auth/login/login.tsx"),
    route("register", "routes/auth/register/register.tsx"),
    layout("shared/layout/protectedRoutes.tsx", [
      route("dashboard", "routes/dashboard/dashboard.tsx"),
      route("profile", "routes/user/profile/profile.tsx"),
    ]),
    // Catch-all route for unmatched URLs (including well-known endpoints)
    route("*", "routes/$.tsx"),
  ]),
] satisfies RouteConfig;
