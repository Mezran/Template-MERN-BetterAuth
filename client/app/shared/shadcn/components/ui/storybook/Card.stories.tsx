import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "../card";
import { Button } from "../button";
import { Settings, MoreHorizontal } from "lucide-react";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Project Alpha</CardTitle>
        <CardDescription>
          A revolutionary new project that will change everything.
        </CardDescription>
        <CardAction>
          <Button size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View Details</Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent className="pt-6">
        <p>A simple card with just content.</p>
      </CardContent>
    </Card>
  ),
};

export const ProfileCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Software Engineer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Passionate about creating beautiful and functional web applications.
          </p>
          <div className="flex gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              React
            </span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              TypeScript
            </span>
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              Node.js
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Profile
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const NotificationCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">New message received</CardTitle>
            <CardDescription>2 minutes ago</CardDescription>
          </div>
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          "Hey! I'd love to discuss the new project requirements with you. Are you
          available for a quick call this afternoon?"
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm">
          Dismiss
        </Button>
        <Button size="sm">Reply</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl">$45,231.89</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-green-600">+20.1% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-2xl">2,350</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-green-600">+180.1% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Sales</CardDescription>
          <CardTitle className="text-2xl">+12,234</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-green-600">+19% from last month</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const MinimalCard: Story = {
  render: () => (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle className="text-lg">Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Notifications</span>
          <input type="checkbox" className="rounded" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Auto-save</span>
          <input type="checkbox" className="rounded" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Dark mode</span>
          <input type="checkbox" className="rounded" />
        </div>
      </CardContent>
    </Card>
  ),
};
