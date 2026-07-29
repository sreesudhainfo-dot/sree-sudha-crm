import Logo from "./Logo";
import SidebarSection from "./SidebarSection";
import { navigation } from "./navigation";

export default function Sidebar() {
  return (
    <aside className="h-screen w-72 flex-shrink-0 overflow-y-auto border-r bg-white">
      <Logo />

      <div className="space-y-2 p-4">
        {navigation.map((item) => (
          <SidebarSection
            key={item.title}
            {...item}
          />
        ))}
      </div>
    </aside>
  );
}