"use client";
import { usePathname, useRouter } from "next/navigation";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;
  // console.log("Selected", selected);
  // console.log("pathname", pathname);

  return (
    <div
      className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-400"}  cursor-pointer p-2 pl-8`}
      onClick={() => {
        router.push(href);
      }}
    >
      <div className="pr-2">{icon}</div>
      <div
        className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-400"}`}
      >
        {title}
      </div>
    </div>
  );
};
