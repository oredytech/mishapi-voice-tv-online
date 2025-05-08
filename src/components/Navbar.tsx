
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Tv, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Define categories
export const categories = [{
  name: "Actualités Nationales",
  path: "/actualites/nationales"
}, {
  name: "Actualités Internationales",
  path: "/actualites/internationales"
}, {
  name: "Politique",
  path: "/actualites/politique"
}, {
  name: "Économie",
  path: "/actualites/economie"
}, {
  name: "Société",
  path: "/actualites/societe"
}, {
  name: "Culture",
  path: "/actualites/culture"
}, {
  name: "Sport",
  path: "/actualites/sport"
}, {
  name: "Santé",
  path: "/actualites/sante"
}, {
  name: "Technologie",
  path: "/actualites/technologie"
}, {
  name: "Environnement",
  path: "/actualites/environnement"
}];
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const {
    theme,
    toggleTheme
  } = useTheme();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Main navigation links
  const navLinks = [{
    name: "Accueil",
    path: "/"
  }, {
    name: "TV en direct",
    path: "/tv",
    icon: <Tv className="h-5 w-5" />
  }, {
    name: "Radio en direct",
    path: "/radio",
    icon: <Radio className="h-5 w-5" />
  }, {
    name: "Catégories",
    path: "/actualites"
  }, {
    name: "Contact",
    path: "/contact"
  }];
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleCategoryMenu = () => {
    setIsCategoryMenuOpen(!isCategoryMenuOpen);
  };
  
  return <header className={`sticky top-0 z-50 w-full transition-all duration-300 
      ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background"}`}>
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/f7567e17-97fe-409c-9fdb-892bff8326de.png" alt="MISHAPI VOICE TV Logo" className="h-12 mr-3" />
            <div className="hidden sm:flex flex-col">
              
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={`nav-link flex items-center ${location.pathname === link.path ? "active" : ""}`}>
                {link.icon || link.name}
              </Link>)}
            
            {/* Category Menu Trigger for Desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2">
                  <Menu className="h-5 w-5 mr-2" />
                  Catégories
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {categories.map(category => <DropdownMenuItem key={category.name} asChild>
                    <Link to={category.path}>{category.name}</Link>
                  </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Changer de thème</span>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-1">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Changer de thème</span>
            </Button>
            <Button variant="outline" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 ease-in-out`}>
          <div className="flex flex-col py-4 space-y-2">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={`px-3 py-2.5 flex items-center ${location.pathname === link.path ? "bg-muted font-medium text-primary" : "text-foreground/80"} rounded-md`} onClick={() => setIsMenuOpen(false)}>
                {link.icon && <span className="mr-2">{link.icon}</span>}
                <span>{link.name}</span>
              </Link>)}
          </div>
        </div>
        
        {/* Desktop Sidebar Category Menu */}
        {!isMobile && isCategoryMenuOpen && <div className="fixed inset-y-0 left-0 w-2/5 bg-background/95 backdrop-blur-md shadow-lg z-50 p-6 overflow-auto transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Catégories</h2>
              <Button variant="ghost" size="icon" onClick={toggleCategoryMenu}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              {categories.map(category => <Link key={category.name} to={category.path} className="block px-4 py-2 hover:bg-muted rounded-md" onClick={toggleCategoryMenu}>
                  {category.name}
                </Link>)}
            </div>
          </div>}
      </nav>
    </header>;
}
