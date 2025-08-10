import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
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
  render: () => <Skeleton className="h-4 w-64" />,
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton className="h-2 w-32" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-8 w-80" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-8 w-8 rounded" />
      <Skeleton className="h-6 w-6 rounded-sm" />
      <Skeleton className="h-4 w-32" />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="flex items-center space-x-4 w-80">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  ),
};

export const ArticleSkeleton: Story = {
  render: () => (
    <div className="w-96 space-y-4 p-4 border rounded-lg">
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-1 flex-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <div className="border rounded-lg p-4">
        <div className="space-y-3">
          <div className="flex space-x-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex space-x-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const ComplexLayout: Story = {
  render: () => (
    <div className="w-96 space-y-6 p-6 border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-8 w-16 rounded" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-16 rounded" />
          <Skeleton className="h-8 w-16 rounded" />
        </div>
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  ),
};
