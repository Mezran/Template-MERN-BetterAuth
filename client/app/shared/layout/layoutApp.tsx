import { Outlet } from "react-router";
import { Header } from "./header";

export default function LayoutApp() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
