import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../label";
import { Input } from "../input";
import { Button } from "../button";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
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
  args: {
    children: "Label",
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="name">
        Full Name
        <span className="text-red-500 ml-1">*</span>
      </Label>
      <Input id="name" placeholder="Enter your full name" />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="Enter username" />
      <p className="text-sm text-gray-600">This will be your public display name.</p>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="space-y-6 w-full max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="first-name">First Name</Label>
        <Input id="first-name" placeholder="Enter your first name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="last-name">Last Name</Label>
        <Input id="last-name" placeholder="Enter your last name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <textarea
          id="bio"
          placeholder="Tell us about yourself"
          className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300" />
        <Label htmlFor="terms" className="text-sm">
          I agree to the terms and conditions
        </Label>
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled-input" className="opacity-50">
        Disabled Field
      </Label>
      <Input id="disabled-input" placeholder="This is disabled" disabled />
    </div>
  ),
};

export const LabelSizes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <div>
        <Label className="text-xs">Extra Small Label</Label>
        <Input placeholder="Extra small" />
      </div>

      <div>
        <Label className="text-sm">Small Label</Label>
        <Input placeholder="Small" />
      </div>

      <div>
        <Label className="text-base">Base Label</Label>
        <Input placeholder="Base" />
      </div>

      <div>
        <Label className="text-lg">Large Label</Label>
        <Input placeholder="Large" />
      </div>
    </div>
  ),
};
