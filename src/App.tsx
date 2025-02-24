import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import Home from "./pages/home";
import About from "./pages/about";
import { AppSidebar } from "./components/principales/sidebarPrincipal";
import MusicPlayer from "./pages/music";
import { ThemeProvider } from "./components/provider/theme-provider";
import { ModeToggle } from "./components/ui/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <SidebarProvider>
          <main className="flex w-full">
            {/* Sidebar siempre visible */}
            <AppSidebar />

            {/* Contenido de las páginas */}
            <div className="w-full p-6">
              <div className="fixed flex gap-4 items-center top-4 right-4">
                <SidebarTrigger />
                <ModeToggle />
              </div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/music" element={<MusicPlayer />} />
              </Routes>
            </div>
          </main>
        </SidebarProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
