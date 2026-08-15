"use client";

import { usePathname } from "next/navigation";
import Experience from "@/components/Experience";
import Rail from "@/components/Rail";

export default function SiteChrome() {
  const pathname = usePathname();
  const home = pathname === "/";
  const zyrix = pathname === "/zyrix";
  return (
    <>
      <Experience variant={home ? "home" : "page"} />
      {(home || zyrix) && <Rail labels={zyrix ? ["Top", "Line", "Story", "Mission", "Vision", "Service", "Contact"] : undefined} />}
    </>
  );
}