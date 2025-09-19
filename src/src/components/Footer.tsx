import { Music, Mail, Phone } from "lucide-react";
import { useCMSContent } from "@/hooks/useCMSContent";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content, loading } = useCMSContent();

  if (loading) {
    return <div className="bg-background border-t border-border p-12">Loading...</div>;
  }


  return (
    <footer className="bg-background border-t border-border">
      <div className="container-max py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Music className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-playfair font-bold text-primary text-glow-subtle">
                {content.footer.brandTitle}
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              {content.footer.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{content.footer.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{content.footer.phone}</span>
              </div>
            </div>
          </div>


          {/* Services */}
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4 text-foreground">
              Services
            </h4>
            {/* Desktop list */}
            <ul className="space-y-2 text-muted-foreground hidden md:block">
              {content.footer.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
            {/* Mobile comma-separated */}
            <p className="text-muted-foreground md:hidden">
              {content.footer.services.join(', ')}
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground">
            {content.footer.copyrightText}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {content.footer.influencedByText}
          </p>
          
          {/* Developer Credit */}
          <div className="mt-6 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground/70 flex items-center justify-center gap-1 flex-wrap">
              <span>Website built by</span>
              <span className="text-primary/80 font-medium">Bassel Tarhini</span>
              <span>-</span>
              <a 
                href="mailto:basseltar2016@gmail.com" 
                className="text-primary/80 hover:text-primary transition-colors duration-300 font-medium underline decoration-primary/30 hover:decoration-primary"
                title="Contact Developer"
              >
                basseltar2016@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;