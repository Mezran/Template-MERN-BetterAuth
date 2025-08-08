import { SidebarProvider } from "~/shared/shadcn/components/ui/sidebar";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from "../../shared/shadcn/components/ui/sidebar";

import { Separator } from "../../shared/shadcn/components/ui/separator";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
            />
          ))}
        </div>
        last content
      </SidebarInset>
    </SidebarProvider>
  );
}
