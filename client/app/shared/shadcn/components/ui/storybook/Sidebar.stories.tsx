import type { Meta, StoryObj } from "@storybook/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "../sidebar";
import { Button } from "../button";
import {
  Home,
  Search,
  Settings,
  User,
  FileText,
  Mail,
  Calendar,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

const meta: Meta<typeof Sidebar> = {
  title: "UI/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">My App</h2>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FileText className="mr-2 h-4 w-4" />
                      Documents
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Mail className="mr-2 h-4 w-4" />
                      Messages
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Calendar className="mr-2 h-4 w-4" />
                      Calendar
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <Button variant="outline" size="sm" className="w-full">
              <User className="mr-2 h-4 w-4" />
              John Doe
            </Button>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        <main className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600">Main content area</p>
            <p className="text-sm text-gray-500 mt-2">
              Use the toggle button to open/close the sidebar
            </p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen">
        <Sidebar collapsible="icon">
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">App</h2>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Search className="h-4 w-4" />
                      <span>Search</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FileText className="h-4 w-4" />
                      <span>Documents</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarRail />
        </Sidebar>

        <main className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Collapsed Sidebar</h1>
          </div>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600">
              Sidebar is collapsed by default - shows only icons
            </p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  ),
};

export const WithSubmenus: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">Project Manager</h2>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FileText className="mr-2 h-4 w-4" />
                      Project Alpha
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FileText className="mr-2 h-4 w-4" />
                      Project Beta
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FileText className="mr-2 h-4 w-4" />
                      Project Gamma
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Tools</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Calendar className="mr-2 h-4 w-4" />
                      Calendar
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Mail className="mr-2 h-4 w-4" />
                      Messages
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <User className="mr-2 h-4 w-4" />
                  John Doe
                  <MoreHorizontal className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        <main className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Projects Dashboard</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Project Alpha</h3>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Project Beta</h3>
              <p className="text-sm text-gray-600">Planning</p>
            </div>
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Project Gamma</h3>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  ),
};
