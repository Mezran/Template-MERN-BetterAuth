import { Outlet } from "react-router";
import { Header } from "./header";

export default function LayoutApp() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-2">
        <Outlet />
      </main>
    </div>
  );
}
