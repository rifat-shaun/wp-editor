import React from "react";

interface SvgIconProps {
  /** Icon name in format: [dir]-[name] (e.g., "bold", "italic") */
  name: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  size = 14,
  color = "currentColor",
  className = "",
  onClick,
}) => {
  const symbolId = `#icon-${name}`;
  const sizeStyle =
    typeof size === "number" ? { width: `${size}px`, height: `${size}px` } : { width: size, height: size };

  return (
    <svg
      className={className}
      style={{ ...sizeStyle, fill: color }}
      aria-hidden="true"
      onClick={onClick}
    >
      <use xlinkHref={symbolId} />
    </svg>
  );
};

export default SvgIcon;

