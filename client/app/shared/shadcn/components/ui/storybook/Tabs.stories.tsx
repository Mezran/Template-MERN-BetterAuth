import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../tabs";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const Simple: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[300px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <p className="text-sm text-gray-600">Content for tab 1</p>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4">
        <p className="text-sm text-gray-600">Content for tab 2</p>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <p className="text-sm text-gray-600">Content for tab 3</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics">
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Analytics
        </TabsTrigger>
        <TabsTrigger value="settings">
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Overview</h3>
          <p className="text-sm text-gray-600">Dashboard overview content goes here.</p>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Analytics</h3>
          <p className="text-sm text-gray-600">
            Analytics and reporting content goes here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Settings</h3>
          <p className="text-sm text-gray-600">Application settings content goes here.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[300px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Active</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="tab3">Available</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <p className="text-sm text-gray-600">This tab is active and available.</p>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <p className="text-sm text-gray-600">This tab is also available.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="tab1">Home</TabsTrigger>
        <TabsTrigger value="tab2">About</TabsTrigger>
        <TabsTrigger value="tab3">Services</TabsTrigger>
        <TabsTrigger value="tab4">Portfolio</TabsTrigger>
        <TabsTrigger value="tab5">Contact</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Home</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">This is the home page content.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>About Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Learn more about our company and mission.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Our Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Discover the services we offer to our clients.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab4" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Check out our latest projects and work.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab5" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Get in touch with us for any inquiries.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};
