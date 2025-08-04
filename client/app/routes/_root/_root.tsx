import type { Route } from "./+types/_root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function _Root() {
  return <div>_root</div>;
}
