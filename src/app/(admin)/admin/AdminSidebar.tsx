import { ChartPie, ShieldQuestion } from "lucide-react";
import SidebarLink from "./SidebarLink";

export default function AdminSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[84dvh] w-full items-center overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-900">
      <div className="h-full w-60 flex-none p-4">
        <SidebarLink destination="/admin/pending">
          <ShieldQuestion size={18} />
          <p>Pending verifications</p>
        </SidebarLink>
      </div>
      <div className="h-[98%] w-0.5 rounded-full bg-neutral-300 py-4 dark:bg-neutral-800"></div>
      <div className="h-full w-full overflow-y-auto">{children}</div>
    </div>
  );
}
