import type { RefObject } from "react";

interface ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	className?: string;
	title?: string;
	size?: 'extra-small' | 'small' | 'medium' | 'large';
	disabled?: boolean;
	active?: boolean;
	buttonRef?: RefObject<HTMLButtonElement>;
}

const sizeClasses = {
	'extra-small': 'p-0.5 text-xs',
	'small': 'p-1 text-sm',
	'medium': 'p-2 text-base',
	'large': 'p-3 text-lg',
};

export const Button = ({ children, onClick, className, title, size = 'medium', disabled = false, active = false, buttonRef }: ButtonProps) => {
	const stateClasses = `
		${active ? 'bg-neutral-300' : ''}
		${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-200'}
	`;

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`text-neutral-700 rounded transition-colors ${sizeClasses[size]} ${stateClasses} ${className}`}
			title={title}
			ref={buttonRef}
		>
			{children}
		</button>
	)
}