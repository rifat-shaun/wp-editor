import { ChevronRightRounded } from '@mui/icons-material';
import { Tooltip } from 'antd';
import { Dropdown } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import React, { type CSSProperties, useCallback } from 'react';

export interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  primary?: boolean;
  title?: string;
  id: string;
  status?: IButtonStatus;
  appearance?: IButtonAppearance;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  badge?: string | number;
  type?: 'button' | 'submit' | 'reset';
  options?: ItemType[];
  tooltip?: string;
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
}

export type IButtonStatus =
  | 'secondary-neutral'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'success'
  | 'error-secondary'
  | 'cancel'
  | 'no-background'
  | 'publish'
  | 'default';

export type IButtonAppearance = 'filled' | 'outline' | 'ghost' | 'dashed';

const Button: React.FC<IButtonProps> = ({
  status = 'primary',
  appearance,
  className,
  disabled,
  children,
  isLoading,
  title,
  id,
  onClick,
  onKeyDown,
  badge,
  type = 'button',
  options,
  tooltip,
  tooltipPlacement = 'top',
}) => {
  const appearanceStyle = useCallback(() => {
    switch (appearance) {
      case 'outline':
        return outlineStyle();
      case 'ghost':
        return ghostStyle();
      case 'dashed':
        return dashedStyle();
      default:
        return filledStyle();
    }
  }, [appearance, status, disabled]);

  const cssStyle = useCallback(() => {
    switch (appearance) {
      case 'dashed':
        return dashedCssStyle();
      default:
        return {};
    }
  }, [appearance, status, disabled]);

  const filledStyle = useCallback(() => {
    switch (status) {
      case 'primary':
        return 'bg-primary-600 text-white focus:border-primary-200 hover:bg-primary-700 disabled:opacity-60';

      case 'secondary':
        return 'bg-primary-50 dark:bg-black-800 text-primary-600 dark:hover:text-primary-400 border border-primary-200 dark:border-primary-600 hover:bg-primary-100 dark:hover:bg-black-800 focus:border-primary-200 hover:border-primary-200 dark:hover:border-primary-400 disabled:opacity-60';

      case 'error':
        return 'bg-error-600 dark:bg-error-500 text-white hover:bg-error-700 dark:hover:bg-error-600 focus:!border-error-300 dark:focus:!border-error-600 dark:focus:bg-error-800 disabled:opacity-60';

      case 'error-secondary':
        return 'bg-error-100 dark:bg-black-800 text-error-600 border !border-error-300 dark:!border-error-900 hover:bg-error-200 focus:!border-error-300 dark:focus:!border-error-400 disabled:opacity-60';

      case 'secondary-neutral':
        return 'bg-white dark:bg-black-800 text-neutral-900 border border-neutral-300 dark:border-black-600 dark:hover:bg-black-600 dark:text-black-200 hover:bg-neutral-100 focus:border-primary-200 disabled:opacity-60';

      case 'warning':
        return 'bg-warning-300 dark:bg-warning-600 text-white border-warning-300 border hover:bg-warning-400 disabled:opacity-60';

      case 'success':
        return 'bg-success-600 text-white border-success-600 border hover:bg-success-700 disabled:opacity-60';

      case 'publish':
        return 'bg-teal-800 text-white border-teal-800 border hover:bg-teal-900 disabled:opacity-60';

      case 'no-background':
        return 'bg-transparent text-neutral-900 dark:text-black-100 border-transparent border';

      default:
        return 'bg-white dark:bg-black-800 text-neutral-900 dark:text-white border-white border hover:bg-neutral-100 dark:hover:bg-black-600 disabled:opacity-60';
    }
  }, [status, disabled]);

  const outlineStyle = useCallback(() => {
    switch (status) {
      case 'primary':
        return 'text-primary-700 dark:text-primary-600 border-primary-700 border dark:border-primary-600 hover:bg-primary-100 disabled:opacity-60';

      case 'secondary':
        return 'text-primary-700 dark:text-primary-600 border-primary-100 dark:border-primary-600 border bg-primary-50 dark:bg-black-800 hover:bg-primary-100 disabled:opacity-60';

      case 'secondary-neutral':
        return 'text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700 border bg-white dark:bg-black-800 hover:bg-neutral-100 dark:hover:bg-black-600 disabled:opacity-60';

      case 'error':
        return 'text-error-600 dark:text-error-500 !border-error-600 dark:!border-error-500 border hover:bg-[#FEF3F2] disabled:opacity-60';

      case 'warning':
        return 'text-warning-300 dark:text-warning-500 border-warning-300 dark:border-warning-500 border hover:bg-[#FFFAEB] disabled:opacity-60';

      case 'success':
        return 'text-success-600 dark:text-success-500 border-success-600 dark:border-success-500 border hover:bg-[#ECFDF3] disabled:opacity-60';

      default:
        return 'bg-white dark:bg-black-800 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700 border hover:bg-neutral-100 dark:hover:bg-black-600 disabled:opacity-60';
    }
  }, [status]);

  const ghostStyle = useCallback(() => {
    switch (status) {
      case 'primary':
        return 'text-primary-700 dark:text-primary-600 border border-transparent dark:border-transparent hover:text-primary-700 disabled:opacity-60';

      case 'secondary':
        return 'text-primary-50 dark:text-primary-900 border border-transparent dark:border-transparent hover:text-primary-100 disabled:opacity-60';

      case 'error':
        return 'text-error-600 dark:text-error-500 border border-transparent dark:border-transparent hover:text-error-600 disabled:opacity-60';

      case 'warning':
        return 'text-warning-300 dark:text-warning-500 border border-transparent dark:border-transparent hover:text-warning-400 disabled:opacity-60';

      case 'success':
        return 'text-success-600 dark:text-success-500 border border-transparent dark:border-transparent hover:text-success-700 disabled:opacity-60';

      default:
        return 'text-neutral-900 dark:text-white border border-transparent dark:border-transparent hover:text-[#667085] disabled:opacity-60';
    }
  }, [status]);

  const dashedStyle = useCallback(() => {
    switch (status) {
      case 'primary':
        return 'bg-primary-50 dark:bg-black-700 text-primary-600 dark:text-primary-600 disabled:text-primary-100 hover:bg-primary-100 dark:hover:bg-black-600';
      default:
        return 'bg-primary-50 dark:bg-black-700 text-primary-600 dark:text-primary-600 disabled:text-primary-100 hover:bg-primary-100 dark:hover:bg-black-600';
    }
  }, [status]);

  const dashedCssStyle: () => CSSProperties = useCallback(() => {
    switch (status) {
      case 'primary':
        return {
          backgroundImage:
            'repeating-linear-gradient(3deg, #016DCF, #016DCF 10px, transparent 10px, transparent 19px, #016DCF 19px), repeating-linear-gradient(93deg, #016DCF, #016DCF 10px, transparent 10px, transparent 19px, #016DCF 19px), repeating-linear-gradient(183deg, #016DCF, #016DCF 10px, transparent 10px, transparent 19px, #016DCF 19px), repeating-linear-gradient(273deg, #016DCF, #016DCF 10px, transparent 10px, transparent 19px, #016DCF 19px)',
          backgroundSize: '1px 100%, 100% 1px, 1px 100% , 100% 1px',
          backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
          backgroundRepeat: 'no-repeat',
        };
      default:
        return {};
    }
  }, [status]);

  return (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
      <button
        className={`
        ${className || ''}
        cursor-pointer
        font-inter 
        font-medium 
        py-[6px] 
        px-3 
        rounded-lg 
        text-sm
        whitespace-nowrap
        disabled:cursor-not-allowed
        flex
        items-center
        justify-center
        gap-1.5
        relative
        max-h-[32px]
         ${appearanceStyle()}
      `}
        style={{ ...cssStyle() }}
        disabled={disabled || isLoading}
        id={id}
        onClick={onClick}
        onKeyDown={onKeyDown}
        title={title}
        type={type}
      >
        {children}
        {Boolean(options?.length) ? (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown
              menu={{
                items: options,
              }}
              trigger={['click']}
              overlayClassName='row-option-cell'
              placement='bottomRight'
            >
              <ChevronRightRounded className='rotate-90 text-neutral-300 hover:opacity-50' />
            </Dropdown>
          </div>
        ) : null}
        {badge ? (
          <span className='absolute -top-2 -right-2 bg-zinc-500 text-white rounded-full min-w-[1.5rem] min-h-[1.5rem] text-xs flex justify-center items-center'>
            {badge}
          </span>
        ) : null}
      </button>
    </Tooltip>
  );
};

export default Button;
