import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { TOOLBAR_TYPES, TOOLBAR_MENU_ITEMS, TABS, type TTabKey } from "../../constants/Toolbar";
import { useState } from "react";

interface ProfessionalToolbarProps {
  onToolbarChange?: (toolbarType: string) => void;
}

export const ProfessionalToolbar = ({
  onToolbarChange,
}: ProfessionalToolbarProps) => {
  const { PROFESSIONAL } = TOOLBAR_TYPES;

  const [activeTab, setActiveTab] = useState<TTabKey>(TABS[0]);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    onToolbarChange?.(key);
  };

  return (
    <div
      className="flex flex-col gap-0.5 bg-white w-full px-4 py-1"
      style={{ height: `${PROFESSIONAL.height}px` }}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          {TABS.map((tab: TTabKey) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative mx-2 pb-0.5 text-xs font-medium text-gray-600 transition-all duration-300 border-b-2 hover:text-primary-400 ${
                activeTab === tab ? 'border-primary-500 text-primary-600' : 'border-transparent'
              }`}
            >
              {tab}
              {activeTab === tab && <span className='absolute left-0 bottom-0 w-full h-[2px] bg-black transition-all duration-300' />}
            </button>
          ))}
        </div>
        <Dropdown
          menu={{ items: TOOLBAR_MENU_ITEMS, onClick: handleMenuClick }}
          placement="bottomRight"
        >
          <div className="px-3 py-1 text-sm hover:bg-neutral-50 transition-colors cursor-pointer">
            Toolbar
          </div>
        </Dropdown>
      </div>
      <div>hello</div>
      <div>hllo</div>
    </div>
  );
};
