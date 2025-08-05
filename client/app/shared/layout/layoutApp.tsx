import { Outlet } from "react-router";
import { Header } from "./header";

export default function LayoutApp() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
