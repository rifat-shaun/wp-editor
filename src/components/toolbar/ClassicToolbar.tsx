import { TOOLBAR_TYPES } from "../../constants/Toolbar";

export const ClassicToolbar = () => {
  const { CLASSIC } = TOOLBAR_TYPES;
  return (
    <div
      className="flex items-center gap-2 bg-white w-full justify-between px-4 py-2"
      style={{ height: `${CLASSIC.height}px` }}
    >
      <div className="flex-1">Hello 2</div>
      <div>Toolbar</div>
    </div>
  );
};

export default ClassicToolbar;
