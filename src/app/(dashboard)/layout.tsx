import React from "react";
import { cookies } from "next/headers";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { SidebarProvider, DashboardMain } from "@/components/layout/sidebar-context";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultExpanded = cookieStore.get("khit_sidebar_expanded")?.value === "true";

  return (
    <SidebarProvider defaultExpanded={defaultExpanded}>
      <div className="bg-[#09090b] text-zinc-100 min-h-screen">
        <Header />
        <Sidebar />
        
        <DashboardMain>
          {children}
        </DashboardMain>

        <MobileBottomNav />
      </div>
    </SidebarProvider>
  );
}