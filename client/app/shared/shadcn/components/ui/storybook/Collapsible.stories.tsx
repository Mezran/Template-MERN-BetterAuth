import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../collapsible";
import { Button } from "../button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Collapsible> = {
  title: "UI/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const FAQ: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (item: string) => {
      setOpenItems((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    };

    const faqItems = [
      {
        id: "item-1",
        question: "What is React?",
        answer:
          "React is a JavaScript library for building user interfaces, particularly web applications.",
      },
      {
        id: "item-2",
        question: "How do I get started with React?",
        answer:
          "You can get started with React by creating a new project using Create React App or Vite.",
      },
      {
        id: "item-3",
        question: "What are React hooks?",
        answer:
          "Hooks are functions that let you use state and other React features in functional components.",
      },
    ];

    return (
      <div className="w-[500px] space-y-4">
        {faqItems.map((item) => (
          <Collapsible
            key={item.id}
            open={openItems.includes(item.id)}
            onOpenChange={() => toggleItem(item.id)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="flex w-full justify-between p-4 text-left font-semibold hover:bg-gray-50"
              >
                {item.question}
                {openItems.includes(item.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 pb-4 text-sm text-gray-600">{item.answer}</div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    );
  },
};

export const SimpleToggle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-[300px]">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="mb-4">
              {isOpen ? "Hide" : "Show"} Details
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Additional Information</h3>
              <p className="text-sm text-gray-600">
                This is some additional content that can be toggled on and off. It
                contains more detailed information about the topic.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const NestedCollapsible: Story = {
  render: () => {
    const [parentOpen, setParentOpen] = useState(false);
    const [childOpen, setChildOpen] = useState(false);

    return (
      <div className="w-[400px]">
        <Collapsible
          open={parentOpen}
          onOpenChange={setParentOpen}
          className="border rounded-lg"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-4">
              Parent Section
              {parentOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-4">This is the parent content.</p>

              <Collapsible
                open={childOpen}
                onOpenChange={setChildOpen}
                className="border rounded"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between p-3"
                  >
                    Child Section
                    {childOpen ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-3 pb-3">
                  <p className="text-sm text-gray-500">
                    This is nested content inside the child section.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};
