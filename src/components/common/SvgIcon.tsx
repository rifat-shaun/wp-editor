import React from "react";

interface SvgIconProps {
  /** Icon name in format: [dir]-[name] (e.g., "bold", "italic") */
  name: string;
  /** Icon size */
  size?: number | string;
  /** Additional CSS classes */
  className?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Click handler */
  onClick?: () => void;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  size = 14,
  className = "",
  strokeWidth,
  onClick,
}) => {
  const symbolId = `#icon-${name}`;
  const sizeStyle =
    typeof size === "number" ? { width: `${size}px`, height: `${size}px` } : { width: size, height: size };

  const combinedStyle = {
    ...sizeStyle,
    ...(strokeWidth && { strokeWidth }),
  };

  return (
    <svg
      className={className}
      style={combinedStyle}
      aria-hidden="true"
      onClick={onClick}
    >
      <use xlinkHref={symbolId} />
    </svg>
  );
};

export default SvgIcon;

