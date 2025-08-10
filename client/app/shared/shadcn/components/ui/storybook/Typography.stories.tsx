import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../typography";

const meta: Meta<typeof Typography> = {
  title: "UI/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "blockquote",
        "lead",
        "large",
        "small",
        "muted",
        "inlineCode",
      ],
    },
    as: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllHeadings: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
};

export const Paragraph: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Typography variant="p">
        This is a paragraph of text using the default paragraph styling. It demonstrates
        how regular body text appears with proper line height and spacing. The paragraph
        variant provides comfortable reading with appropriate margins.
      </Typography>
    </div>
  ),
};

export const Lead: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Typography variant="lead">
        This is a lead paragraph that stands out from regular text. It's typically used
        for introductory content or to emphasize important information at the beginning of
        an article or section.
      </Typography>
    </div>
  ),
};

export const Blockquote: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Typography variant="blockquote">
        "The best way to predict the future is to create it. This is a sample blockquote
        that demonstrates how quoted text is styled with proper indentation and
        formatting."
      </Typography>
    </div>
  ),
};

export const TextSizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Typography variant="large">Large text for emphasis</Typography>
      <Typography variant="p">Regular paragraph text</Typography>
      <Typography variant="small">Small text for less important information</Typography>
      <Typography variant="muted">Muted text for subtle content</Typography>
    </div>
  ),
};

export const InlineCode: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Typography variant="p">
        You can use{" "}
        <Typography variant="inlineCode" as="code">
          npm install
        </Typography>{" "}
        to install packages, or run{" "}
        <Typography variant="inlineCode" as="code">
          yarn dev
        </Typography>{" "}
        to start the development server.
      </Typography>
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Typography variant="list">
        <li>First item in the list</li>
        <li>Second item with more content</li>
        <li>Third item that demonstrates proper spacing</li>
        <li>Fourth item to show consistency</li>
      </Typography>
    </div>
  ),
};

export const ArticleExample: Story = {
  render: () => (
    <article className="max-w-2xl space-y-6">
      <Typography variant="h1">Getting Started with React</Typography>

      <Typography variant="lead">
        React is a popular JavaScript library for building user interfaces. This guide
        will help you understand the basics and get started with your first React
        application.
      </Typography>

      <Typography variant="h2">What is React?</Typography>

      <Typography variant="p">
        React is a declarative, efficient, and flexible JavaScript library for building
        user interfaces. It lets you compose complex UIs from small and isolated pieces of
        code called "components".
      </Typography>

      <Typography variant="h3">Key Features</Typography>

      <Typography variant="list">
        <li>Component-based architecture</li>
        <li>Virtual DOM for better performance</li>
        <li>Unidirectional data flow</li>
        <li>Large ecosystem and community</li>
      </Typography>

      <Typography variant="blockquote">
        "React makes it painless to create interactive UIs. Design simple views for each
        state in your application, and React will efficiently update and render just the
        right components when your data changes."
      </Typography>

      <Typography variant="h3">Installation</Typography>

      <Typography variant="p">
        To create a new React app, you can use{" "}
        <Typography variant="inlineCode" as="code">
          create-react-app
        </Typography>
        :
      </Typography>

      <Typography variant="small">
        Note: Make sure you have Node.js installed on your system before running these
        commands.
      </Typography>
    </article>
  ),
};

export const CustomElement: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Typography variant="h2" as="div">
        This is h2 styling but rendered as a div
      </Typography>

      <Typography variant="p" as="span">
        This is paragraph styling but rendered as a span element
      </Typography>

      <Typography variant="large" as="h3">
        This is large text styling but rendered as an h3 tag
      </Typography>
    </div>
  ),
};
