import { Tooltip } from 'antd';
import React from 'react';

type TToolbarButtonItemProps = {
  children: React.ReactNode;
  tooltip?: string;
  onClick?: () => void;
  disabled?: boolean;
  active: boolean;
  className?: string;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  size?: 'small' | 'medium' | 'extra-small';
  buttonTitle?: string;
  showChildrenInline?: boolean;
};

export const ToolbarButtonItem = ({
  children,
  tooltip,
  onClick,
  disabled,
  active,
  className,
  buttonRef,
  size = 'medium',
  buttonTitle,
  showChildrenInline = false,
}: TToolbarButtonItemProps) => {
  return (
    <Tooltip title={tooltip} arrow={false} color='black' mouseEnterDelay={0.3}>
      <button
        ref={buttonRef}
        className={`flex items-center justify-center rounded-md min-w-max
          ${size === 'extra-small' ? 'p-1 h-4' : size === 'small' ? 'p-1 h-6' : 'p-2 h-12'}
          ${active && 'bg-primary-100 border-primary-500'}
          ${!active && !disabled && !className?.includes('!hover:bg-none') && 'hover:bg-primary-50 hover:duration-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        onClick={onClick ? onClick : undefined}
        disabled={disabled}
      >
        <div className={`flex items-center justify-between ${showChildrenInline ? 'flex-row gap-1' : 'flex-col gap-0.5'}`}>
          {children}
          {buttonTitle && <span className='text-sm min-w-max'>{buttonTitle}</span>}
        </div>
      </button>
    </Tooltip>
  );
};
