import { ALIGNMENT_OPTIONS } from "@/constants/Common";
import SvgIcon from "@/components/common/SvgIcon";
import { Button } from "@/components/base";
import { useImageAlignment } from "@/hooks/useImageAlignment";

export const ImageMenuContent = () => {
  const { currentImageAlignment, updateImageAlignment } = useImageAlignment();

  // Alignment button configurations
  const ALIGNMENT_BUTTONS = [
    { 
      alignment: ALIGNMENT_OPTIONS.LEFT, 
      icon: <SvgIcon name="align-left" />, 
      title: "Align Left" 
    },
    {
      alignment: ALIGNMENT_OPTIONS.CENTER,
      icon: <SvgIcon name="align-center" />,
      title: "Align Center",
    },
    {
      alignment: ALIGNMENT_OPTIONS.RIGHT,
      icon: <SvgIcon name="align-right" />,
      title: "Align Right",
    },
  ] as const;

  return (
    <div
      className="flex gap-1 bg-white p-1 rounded-md shadow-lg border border-neutral-200"
      onMouseDown={(e) => e.preventDefault()}
    >
      {ALIGNMENT_BUTTONS.map(({ alignment, icon, title }) => (
        <Button
          key={alignment}
          onClick={() => updateImageAlignment(alignment)}
          title={title}
          active={alignment === currentImageAlignment}
        >
          {icon}
        </Button>
      ))}
    </div>
  );
};
