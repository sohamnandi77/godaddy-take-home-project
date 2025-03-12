import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <nav className="bg-background shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex-shrink-0 flex items-center text-primary font-extrabold"
              >
                <img
                  className="h-8 w-8 mr-2"
                  src="https://avatars.githubusercontent.com/u/1406546?v=4"
                  alt="GoDaddy Logo"
                />
                GoDaddy Repos
              </Link>
            </div>
            <div className="flex items-center">
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </ThemeProvider>
  ),
});
