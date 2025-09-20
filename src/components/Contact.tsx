import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCMSContent } from "@/hooks/useCMSContent";

const Contact = () => {
  const { toast } = useToast();
  const { content, loading } = useCMSContent();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    venue: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() ||
        !formData.eventDate.trim() || !formData.eventType.trim() || !formData.venue.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Validate recipient email from CMS
    const recipientEmail = content.contact.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!recipientEmail || !emailRegex.test(recipientEmail)) {
      toast({
        title: "Email Configuration Error",
        description: "Invalid recipient email address in CMS settings. Please contact the site administrator.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create hidden form and submit it (GitHub Pages compatible)
      const form = document.createElement('form');
      form.action = `mailto:${recipientEmail}`;
      form.method = 'POST';
      form.enctype = 'text/plain';
      form.style.display = 'none';

      const emailBody = `
Booking Inquiry - ${formData.eventType} on ${formData.eventDate}

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Event Date: ${formData.eventDate}
Event Type: ${formData.eventType}
Venue: ${formData.venue}

Message:
${formData.message}
      `.trim();

      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'body';
      input.value = emailBody;
      form.appendChild(input);

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      toast({
        title: "Email Client Opened!",
        description: "Your email client should open with the booking inquiry. Please send the email to complete your booking request.",
      });

      // Clear form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        eventType: "",
        venue: "",
        message: ""
      });

    } catch (error) {
      console.error('Email opening error:', error);
      toast({
        title: "Please contact directly",
        description: `Please email ${recipientEmail} directly with your booking inquiry.`,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (loading) {
    return <div className="section-padding bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-max">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-glow text-center mb-16">
          {content.contact.title}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card-professional">
            <h3 className="text-2xl font-playfair font-bold mb-6 text-foreground">
              {content.contact.title}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventType">Event Type</Label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="private">Private Party</option>
                    <option value="concert">Concert</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="venue">Venue Address</Label>
                  <Input
                    id="venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your event..."
                  className="mt-1"
                />
              </div>
              
              <Button type="submit" className="btn-primary w-full transform hover:scale-105 transition-all duration-300 shadow-lg">
                {content.contact.bookButton}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="card-professional">
              <h3 className="text-2xl font-playfair font-bold mb-6 text-foreground">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">{content.contact.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-muted-foreground">{content.contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Location</p>
                    <p className="text-muted-foreground">{content.contact.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-professional">
              <h4 className="text-xl font-playfair font-bold mb-4 text-foreground">
                {content.contact.responseTimeTitle}
              </h4>
              <p className="text-muted-foreground">
                {content.contact.responseTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;