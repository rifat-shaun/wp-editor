import type { RefObject } from "react";

interface ButtonProps {
	id?: string;
	children: React.ReactNode;
	className?: string;
	title?: string;
	size?: 'extra-small' | 'small' | 'medium' | 'large';
	disabled?: boolean;
	active?: boolean;
	buttonRef?: RefObject<HTMLButtonElement>;
	onClick: () => void;
}

const sizeClasses = {
	'extra-small': 'p-0.5 text-xs',
	'small': 'p-1 text-sm',
	'medium': 'p-1.5 text-base',
	'large': 'p-1.5 text-lg',
};

export const Button = ({ id, children, className, title, size = 'small', disabled = false, active = false, buttonRef, onClick }: ButtonProps) => {
	const stateClasses = `
		${active ? 'bg-neutral-300' : ''}
		${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-200'}
	`;

	return (
		<button
			id={id}
			onClick={onClick}
			disabled={disabled}
			className={`flex items-center justify-center text-neutral-700 rounded transition-colors ${sizeClasses[size]} ${stateClasses} ${className}`}
			title={title}
			ref={buttonRef}
		>
			{children}
		</button>
	)
}