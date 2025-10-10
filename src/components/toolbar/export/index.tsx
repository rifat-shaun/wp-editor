import { Button } from "@/components/base";
import SvgIcon from "@/components/common/SvgIcon";
import { useToolbar } from "@/contexts/ToolbarContext";
import { TOOLBAR_TYPES_ENUM } from "@/constants/Toolbar";
import { useExport } from "@/hooks/useExport";

export const ExportOptions = () => {
  const {
    downloadTextFile,
    downloadJsonFile,
    downloadMarkdownFile,
    downloadHtmlFile,
  } = useExport();
  const { currentToolbar } = useToolbar();
  const isClassicToolbar = currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC;

  return (
    <>
      <Button title="Export PDF" onClick={() => {}}>
        {isClassicToolbar ? (
          <div className="relative flex items-center gap-1">
            <SvgIcon name="pdf" strokeWidth={3.5} />
            <span className="text-xs">PDF</span>
          </div>
        ) : (
          <div className="relative flex flex-col items-center gap-1 min-w-10">
            <SvgIcon name="pdf" size={20} strokeWidth={3.5} />
            <span className="text-xs">PDF</span>
          </div>
        )}
      </Button>

      <Button title="Export Text" onClick={downloadTextFile}>
        {isClassicToolbar ? (
          <div className="relative flex items-center gap-1">
            <SvgIcon name="text" strokeWidth={3.5} />
            <span className="text-xs">Text</span>
          </div>
        ) : (
          <div className="relative flex flex-col items-center gap-1 min-w-10">
            <SvgIcon name="text" size={20} strokeWidth={3.5} />
            <span className="text-xs">Text</span>
          </div>
        )}
      </Button>

      <Button title="Export JSON" onClick={downloadJsonFile}>
        {isClassicToolbar ? (
          <div className="relative flex items-center gap-1">
            <SvgIcon name="json" strokeWidth={3.5} />
            <span className="text-xs">JSON</span>
          </div>
        ) : (
          <div className="relative flex flex-col items-center gap-1 min-w-10">
            <SvgIcon name="json" size={20} strokeWidth={3.5} />
            <span className="text-xs">JSON</span>
          </div>
        )}
      </Button>

      <Button title="Export HTML" onClick={downloadHtmlFile}>
        {isClassicToolbar ? (
          <div className="relative flex items-center gap-1">
            <SvgIcon name="embed" strokeWidth={3.5} />
            <span className="text-xs">HTML</span>
          </div>
        ) : (
          <div className="relative flex flex-col items-center gap-1 min-w-10">
            <SvgIcon name="embed" size={20} strokeWidth={3.5} />
            <span className="text-xs">HTML</span>
          </div>
        )}
      </Button>

      <Button title="Export Markdown" onClick={downloadMarkdownFile}>
        {isClassicToolbar ? (
          <div className="relative flex items-center gap-1">
            <SvgIcon name="markdown" strokeWidth={3.5} />
            <span className="text-xs">Markdown</span>
          </div>
        ) : (
          <div className="relative flex flex-col items-center gap-1 min-w-10">
            <SvgIcon name="markdown" size={20} strokeWidth={3.5} />
            <span className="text-xs">Markdown</span>
          </div>
        )}
      </Button>
    </>
  );
};
