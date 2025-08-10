import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    decorative: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-gray-600">An open-source UI component library.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-64 bg-white border rounded-lg p-2">
      <div className="py-2 px-2 text-sm">Home</div>
      <Separator />
      <div className="py-2 px-2 text-sm">About</div>
      <Separator />
      <div className="py-2 px-2 text-sm">Services</div>
      <Separator />
      <div className="py-2 px-2 text-sm">Contact</div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-80 bg-white border rounded-lg shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Profile Settings</h3>
        <p className="text-sm text-gray-600 mt-1">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />
      <div className="p-6">
        <h4 className="text-sm font-medium mb-4">Personal Information</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
              placeholder="john@example.com"
            />
          </div>
        </div>
      </div>
      <Separator />
      <div className="p-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  ),
};

export const ThickSeparator: Story = {
  render: () => (
    <div className="w-64">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Section 1</h4>
        <p className="text-sm text-gray-600">Content for the first section.</p>
      </div>
      <Separator className="my-4 h-0.5 bg-gray-300" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Section 2</h4>
        <p className="text-sm text-gray-600">Content for the second section.</p>
      </div>
    </div>
  ),
};

export const ColoredSeparator: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <div>
        <p className="text-sm">Default separator</p>
        <Separator className="my-2" />
      </div>

      <div>
        <p className="text-sm">Blue separator</p>
        <Separator className="my-2 bg-blue-500" />
      </div>

      <div>
        <p className="text-sm">Red separator</p>
        <Separator className="my-2 bg-red-500" />
      </div>

      <div>
        <p className="text-sm">Green separator</p>
        <Separator className="my-2 bg-green-500" />
      </div>
    </div>
  ),
};
