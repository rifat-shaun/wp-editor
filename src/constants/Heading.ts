// Constants for better maintainability
export const DROPDOWN_OFFSET = 6;
export const VIEWPORT_BUFFER = 20;

export const HEADING_OPTIONS = [
	{ label: 'Normal text', value: 'paragraph' },
	{ label: 'Title 1', value: 'h1' },
	{ label: 'Title 2', value: 'h2' },
	{ label: 'Title 3', value: 'h3' },
	{ label: 'Title 4', value: 'h4' },
	{ label: 'Title 5', value: 'h5' },
	{ label: 'Title 6', value: 'h6' },
];

// Heading styles configuration
export const HEADING_STYLES = {
	h1: { fontSize: '1rem', fontWeight: 'bold', lineHeight: '1' },
	h2: { fontSize: '0.9rem', fontWeight: 'bold', lineHeight: '1' },
	h3: { fontSize: '0.8rem', fontWeight: 'bold', lineHeight: '1' },
	h4: { fontSize: '0.75rem', fontWeight: 'bold', lineHeight: '1' },
	h5: { fontSize: '0.7rem', fontWeight: 'bold', lineHeight: '1' },
	h6: { fontSize: '0.65rem', fontWeight: 'bold', lineHeight: '1' },
	paragraph: { fontSize: '0.7rem', lineHeight: '1' },
} as const;