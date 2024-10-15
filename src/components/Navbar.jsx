import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LibraryBig, Coins, Scroll, Menu, PieChart } from "lucide-react";
import { Link } from "react-router-dom";

// Navigation items with icons
const navItems = [
  { title: "DASHBOARD", href: "/dashboard", icon: LibraryBig },
  { title: "FORM", href: "/form", icon: Scroll },
  { title: "LEADERBOARD", href: "/lead", icon: Coins },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#2e3440] font-rocket font-bold">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <PieChart className="h-6 w-6 text-white" />
          <span className="font-bold text-white">KAIROS</span>
        </Link>
        
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex space-x-6">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors
                      hover:bg-[#3b4252] hover:text-white text-gray-300`}
                  >
                    <item.icon className="mr-2 h-4 w-4 text-gray-300" />
                    <span>{item.title}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden text-white border-white"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          
          {/* Mobile Menu Content */}
          <SheetContent side="left" className="bg-[#2e3440] font-rocket">
            <SheetHeader>
              <SheetTitle>
                <Link to="/" className="flex items-center space-x-2">
                  <PieChart className="h-6 w-6 text-white" />
                  <span className="font-bold text-white">KAIROS</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#3b4252] hover:text-white"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
