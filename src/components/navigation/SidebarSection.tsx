import SidebarItem from "./SidebarItem";

interface Child {
  title: string;
  icon?: any;
  path: string;
}

interface Props {
  title: string;
  icon?: any;
  path?: string;
  children?: Child[];
}

export default function SidebarSection({
  title,
  icon,
  path,
  children,
}: Props) {
  if (!children) {
    return (
      <SidebarItem
        title={title}
        icon={icon}
        path={path}
      />
    );
  }

  return (
    <div className="space-y-1">
      <SidebarItem title={title} icon={icon} />

      <div className="ml-6 border-l pl-3">
        {children.map((item) => (
          <SidebarItem
            key={item.title}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}