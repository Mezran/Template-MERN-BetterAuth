import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import { Eye, EyeOff, Search, Mail, User } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "search", "url", "tel", "number"],
    },
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text here...",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

export const Password: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    );
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Search..." className="pl-10" />
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input type="email" placeholder="Email address" className="pl-10" />
      </div>

      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Username" className="pl-10" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <Input placeholder="Small input" className="h-8 text-sm" />
      <Input placeholder="Default input" />
      <Input placeholder="Large input" className="h-11 text-base" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <div>
        <Label htmlFor="normal">Normal</Label>
        <Input id="normal" placeholder="Normal input" />
      </div>

      <div>
        <Label htmlFor="focused">Focused (click to see)</Label>
        <Input id="focused" placeholder="Click me to focus" />
      </div>

      <div>
        <Label htmlFor="disabled">Disabled</Label>
        <Input id="disabled" placeholder="Disabled input" disabled />
      </div>

      <div>
        <Label htmlFor="readonly">Read Only</Label>
        <Input id="readonly" value="Read only value" readOnly />
      </div>

      <div>
        <Label htmlFor="error">Error State</Label>
        <Input
          id="error"
          placeholder="Error input"
          aria-invalid
          className="border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
        />
        <p className="text-sm text-red-500 mt-1">This field has an error</p>
      </div>
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <div>
        <Label htmlFor="text">Text</Label>
        <Input id="text" type="text" placeholder="Text input" />
      </div>

      <div>
        <Label htmlFor="email-type">Email</Label>
        <Input id="email-type" type="email" placeholder="email@example.com" />
      </div>

      <div>
        <Label htmlFor="password-type">Password</Label>
        <Input id="password-type" type="password" placeholder="Password" />
      </div>

      <div>
        <Label htmlFor="number">Number</Label>
        <Input id="number" type="number" placeholder="123" />
      </div>

      <div>
        <Label htmlFor="search-type">Search</Label>
        <Input id="search-type" type="search" placeholder="Search..." />
      </div>

      <div>
        <Label htmlFor="url">URL</Label>
        <Input id="url" type="url" placeholder="https://example.com" />
      </div>

      <div>
        <Label htmlFor="tel">Phone</Label>
        <Input id="tel" type="tel" placeholder="+1 (555) 000-0000" />
      </div>
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <div className="flex space-x-2">
        <Input placeholder="Enter email..." className="flex-1" />
        <Button type="submit">Subscribe</Button>
      </div>

      <div className="flex">
        <Input placeholder="Search..." className="rounded-r-none" />
        <Button type="submit" className="rounded-l-none">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ),
};
