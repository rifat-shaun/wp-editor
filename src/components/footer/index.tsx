import { FOOTER_HEIGHT } from "../../constants";

export const Footer = () => {
  return (
    <div
      className="flex items-center gap-2 bg-white w-full justify-between px-4 py-2"
      style={{ height: `${FOOTER_HEIGHT}px` }}
    >
      <div>Hello 2</div>
      <div>Toolbar</div>
    </div>
  );
};

export default Footer;
