import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button1';
import { AddCircleOutline, DeleteOutline, SaveOutlined } from '@mui/icons-material';

const meta: Meta<typeof Button> = {
  title: 'Components/Base/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'secondary-neutral',
        'error',
        'error-secondary',
        'warning',
        'success',
        'publish',
        'no-background',
        'default',
      ],
      description: 'Visual status/variant of the button',
    },
    appearance: {
      control: 'select',
      options: ['filled', 'outline', 'ghost', 'dashed'],
      description: 'Appearance style of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading state',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
    },
    tooltipPlacement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip placement',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: {
    children: 'Button',
    id: 'default-button',
    status: 'primary',
  },
};

// All Status Variants (Filled)
export const AllStatusVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <Button id="primary-btn" status="primary">
          Primary
        </Button>
        <Button id="secondary-btn" status="secondary">
          Secondary
        </Button>
        <Button id="secondary-neutral-btn" status="secondary-neutral">
          Secondary Neutral
        </Button>
        <Button id="error-btn" status="error">
          Error
        </Button>
        <Button id="error-secondary-btn" status="error-secondary">
          Error Secondary
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button id="warning-btn" status="warning">
          Warning
        </Button>
        <Button id="success-btn" status="success">
          Success
        </Button>
        <Button id="publish-btn" status="publish">
          Publish
        </Button>
        <Button id="no-bg-btn" status="no-background">
          No Background
        </Button>
        <Button id="default-btn" status="default">
          Default
        </Button>
      </div>
    </div>
  ),
};

// All Appearances
export const AllAppearances: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm font-semibold w-20">Filled:</span>
        <Button id="filled-primary" status="primary" appearance="filled">
          Primary
        </Button>
        <Button id="filled-secondary" status="secondary" appearance="filled">
          Secondary
        </Button>
        <Button id="filled-error" status="error" appearance="filled">
          Error
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm font-semibold w-20">Outline:</span>
        <Button id="outline-primary" status="primary" appearance="outline">
          Primary
        </Button>
        <Button id="outline-secondary" status="secondary" appearance="outline">
          Secondary
        </Button>
        <Button id="outline-error" status="error" appearance="outline">
          Error
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm font-semibold w-20">Ghost:</span>
        <Button id="ghost-primary" status="primary" appearance="ghost">
          Primary
        </Button>
        <Button id="ghost-secondary" status="secondary" appearance="ghost">
          Secondary
        </Button>
        <Button id="ghost-error" status="error" appearance="ghost">
          Error
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm font-semibold w-20">Dashed:</span>
        <Button id="dashed-primary" status="primary" appearance="dashed">
          Primary
        </Button>
        <Button id="dashed-secondary" status="primary" appearance="dashed">
          Secondary
        </Button>
        <Button id="dashed-error" status="primary" appearance="dashed">
          Error
        </Button>
      </div>
    </div>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button id="icon-left" status="primary">
        <AddCircleOutline fontSize="small" />
        Add New
      </Button>
      <Button id="icon-right" status="error" appearance="outline">
        Delete
        <DeleteOutline fontSize="small" />
      </Button>
      <Button id="icon-only" status="secondary-neutral">
        <SaveOutlined fontSize="small" />
      </Button>
    </div>
  ),
};

// Disabled State
export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button id="disabled-primary" status="primary" disabled>
        Primary Disabled
      </Button>
      <Button id="disabled-secondary" status="secondary" disabled appearance="outline">
        Secondary Disabled
      </Button>
      <Button id="disabled-error" status="error" disabled>
        Error Disabled
      </Button>
    </div>
  ),
};

// Loading State
export const LoadingState: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button id="loading-primary" status="primary" isLoading>
        Loading...
      </Button>
      <Button id="loading-secondary" status="secondary" isLoading>
        Loading...
      </Button>
    </div>
  ),
};

// With Badge
export const WithBadge: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button id="badge-number" status="primary" badge={5}>
        Notifications
      </Button>
      <Button id="badge-text" status="secondary" badge="NEW">
        Updates
      </Button>
      <Button id="badge-large" status="error" badge={99} appearance="outline">
        Messages
      </Button>
    </div>
  ),
};

// With Tooltip
export const WithTooltip: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button
        id="tooltip-top"
        status="primary"
        tooltip="This is a helpful tooltip"
        tooltipPlacement="top"
      >
        Hover Me (Top)
      </Button>
      <Button
        id="tooltip-bottom"
        status="secondary"
        tooltip="Bottom tooltip"
        tooltipPlacement="bottom"
      >
        Hover Me (Bottom)
      </Button>
      <Button
        id="tooltip-left"
        status="success"
        tooltip="Left tooltip"
        tooltipPlacement="left"
      >
        Hover Me (Left)
      </Button>
      <Button
        id="tooltip-right"
        status="warning"
        tooltip="Right tooltip"
        tooltipPlacement="right"
      >
        Hover Me (Right)
      </Button>
    </div>
  ),
};

// With Dropdown Options
export const WithDropdown: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button
        id="dropdown-primary"
        status="primary"
        options={[
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
          { key: '3', label: 'Option 3' },
        ]}
      >
        Actions
      </Button>
      <Button
        id="dropdown-secondary"
        status="secondary"
        options={[
          { key: 'edit', label: 'Edit' },
          { key: 'delete', label: 'Delete', danger: true },
          { type: 'divider' },
          { key: 'archive', label: 'Archive' },
        ]}
      >
        More Options
      </Button>
    </div>
  ),
};

// Interactive Example
export const Interactive: Story = {
  args: {
    children: 'Click Me',
    id: 'interactive-button',
    status: 'primary',
    appearance: 'filled',
    disabled: false,
    isLoading: false,
    tooltip: 'This is a tooltip',
    onClick: () => alert('Button clicked!'),
  },
};

// Button Sizes with Custom ClassName
export const CustomSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button id="small-btn" status="primary" className="!py-1 !px-2 !text-xs">
        Small
      </Button>
      <Button id="default-btn" status="primary">
        Default
      </Button>
      <Button id="large-btn" status="primary" className="!py-3 !px-6 !text-base">
        Large
      </Button>
    </div>
  ),
};

// Full Width Button
export const FullWidth: Story = {
  render: () => (
    <div className="w-96">
      <Button id="full-width" status="primary" className="w-full">
        Full Width Button
      </Button>
    </div>
  ),
};

// Button Types
export const ButtonTypes: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
      className="flex flex-col gap-3"
    >
      <div className="flex gap-3">
        <Button id="submit-btn" type="submit" status="primary">
          Submit
        </Button>
        <Button
          id="reset-btn"
          type="reset"
          status="secondary"
          onClick={() => alert('Form reset!')}
        >
          Reset
        </Button>
        <Button
          id="button-btn"
          type="button"
          status="secondary-neutral"
          onClick={() => alert('Just a button!')}
        >
          Button
        </Button>
      </div>
    </form>
  ),
};

// Real World Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Modal Actions</h3>
        <div className="flex gap-2 justify-end">
          <Button id="cancel-modal" status="secondary-neutral">
            Cancel
          </Button>
          <Button id="save-modal" status="primary">
            <SaveOutlined fontSize="small" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Delete Confirmation</h3>
        <div className="flex gap-2">
          <Button id="cancel-delete" status="secondary-neutral">
            Cancel
          </Button>
          <Button id="confirm-delete" status="error">
            <DeleteOutline fontSize="small" />
            Delete Permanently
          </Button>
        </div>
      </div>

      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Form Actions</h3>
        <div className="flex gap-2">
          <Button id="save-draft" status="secondary" appearance="outline">
            Save Draft
          </Button>
          <Button id="preview" status="secondary-neutral">
            Preview
          </Button>
          <Button id="publish" status="publish">
            Publish
          </Button>
        </div>
      </div>
    </div>
  ),
};

