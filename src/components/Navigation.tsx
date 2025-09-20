import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useCMSContent } from "@/hooks/useCMSContent";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { content } = useCMSContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: content.navigation.menuItems.home, href: '#home' },
    { name: content.navigation.menuItems.music, href: '#music' },
    { name: content.navigation.menuItems.performances, href: '/performances' },
  ].filter(item => item.name && item.name.trim());

  const scrollToSection = (href: string) => {
    if (href.startsWith('/') && !href.includes('#')) {
      // Navigate to different page using React Router
      navigate(href);
    } else if (href.includes('#')) {
      // Handle anchor scrolling
      const sectionId = href.split('#')[1];
      if (sectionId === 'home') {
        // If we're not on home page, navigate to home, otherwise scroll to top
        if (location.pathname !== '/') {
          navigate('/');
        } else {
          window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
          });
        }
      } else {
        // If we're not on home page, navigate to home with section, otherwise scroll to section
        if (location.pathname !== '/') {
          navigate('/');
          // Wait for navigation to complete, then scroll to section
          setTimeout(() => {
            const element = document.querySelector(`#${sectionId}`);
            if (element) {
              element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }
          }, 100);
        } else {
          const element = document.querySelector(`#${sectionId}`);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="container-max">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {content.navigation.logoText && (
            <div className="flex-shrink-0">
              <h2 className="text-3xl font-playfair font-bold text-white text-glow tracking-wide">
                {content.navigation.logoText}
              </h2>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary transition-all duration-300 font-inter font-medium tracking-wide text-lg transform hover:scale-105"
              >
                {item.name}
              </button>
            ))}
            {content.navigation.ctaButton && (
              <Button
                className="btn-primary transform hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection('#contact')}
              >
                {content.navigation.ctaButton}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block text-foreground hover:text-primary transition-all duration-300 transform hover:translate-x-2"
              >
                {item.name}
              </button>
            ))}
            {content.navigation.ctaButton && (
              <Button
                className="btn-primary w-full transform hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection('#contact')}
              >
                {content.navigation.ctaButton}
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;