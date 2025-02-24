import { Home, Inbox, LucideRabbit, Music2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();

  // Función para cerrar solo en móviles
  const handleClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  // Menú de navegación con rutas
  const items = [
    { title: "Inicio", url: "/", icon: Home, onclick: handleClick },
    { title: "About", url: "/about", icon: Inbox, onclick: handleClick },
    { title: "Musica", url: "/music", icon: Music2, onclick: handleClick },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-col items-start my-5">
            <h1 className="text-xl text-primary flex gap-5">El Rabbit Music <LucideRabbit /></h1>
            
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild onClick={item.onclick}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
