import { useState, useEffect } from 'react';

interface CMSContent {
  navigation: {
    logoText: string;
    menuItems: {
      home: string;
      music: string;
      performances: string;
      contact: string;
    };
    ctaButton: string;
  };
  hero: {
    title: string;
    subtitle: string;
    image: string;
    bookButtonText: string;
    listenButtonText: string;
  };
  about: {
    title: string;
    mainDescription: string;
    secondParagraph: string;
    thirdParagraph: string;
    fourthParagraph: string;
    image: string;
    extendedBio: {
      earlyLife: { title: string; text: string };
      mentorship: { title: string; text: string };
      professional: { title: string; text: string };
    };
  };
  stats: {
    yearsPerforming: { number: string; label: string };
    citiesToured: { number: string; label: string };
    showsPlayed: { number: string; label: string };
    awardsWon: { number: string; label: string };
  };
  music: {
    title: string;
    subtitle: string;
    featuredTracksTitle: string;
    tracks: {
      title: string;
      description: string;
      file: string;
    }[];
  };
  contact: {
    title: string;
    email: string;
    phone: string;
    location: string;
    responseTimeTitle: string;
    responseTime: string;
    bookButtonText: string;
  };
  footer: {
    brandTitle: string;
    description: string;
    email: string;
    phone: string;
    services: string[];
    copyrightText: string;
    influencedByText: string;
  };
  performanceImages?: {
    title: string;
    description: string;
    image: string;
    alt: string;
  }[];
  upcomingEvents?: {
    title: string;
    description: string;
    image: string;
    alt: string;
  }[];
  upcomingEventsTitle?: string;
  bookExperience?: {
    title: string;
    description: string;
    buttonText: string;
  };
  videos?: {
    aboutSection?: {
      title: string;
      file: string;
    };
    billBourneMainPage?: {
      title: string;
      file: string;
    };
    billBournePerformances?: {
      title: string;
      file: string;
    };
    notreDame?: {
      title: string;
      file: string;
    };
    piano?: {
      title: string;
      file: string;
    };
    ensemble?: {
      title: string;
      file: string;
    };
    oud?: {
      title: string;
      file: string;
    };
  };
}

const defaultContent: CMSContent = {
  navigation: {
    logoText: "Ehab Guitarrista",
    menuItems: {
      home: "Home",
      music: "Music",
      performances: "Performances",
      contact: "Contact"
    },
    ctaButton: "Book Now"
  },
  hero: {
    title: "Ehab Guitarrista",
    subtitle: "Bringing Music to Life Across Canada",
    image: "/lovable-uploads/9c285a1d-9ff7-4834-a42f-2b0115d824b9.png",
    bookButtonText: "Book Performance",
    listenButtonText: "Listen Now"
  },
  about: {
    title: "Meet Ehab",
    mainDescription: "As a composer of original music, music director, and multi-instrumentalist skilled across 3 different instruments, Ehab Guitarrista has become one of Canada's most sought-after flamenco musicians. From intimate acoustic sets in cozy venues to electrifying performances at major festivals, Ehab brings an authentic and passionate approach to every show.",
    secondParagraph: "Born with music in his soul, Ehab's musical journey began at age 5 with classical foundations. The transition to guitar and flamenco composition came naturally, influenced by legendary masters like Paco De Lucia, Vicente Amigo, Al di Meola, and Antonio Rey.",
    thirdParagraph: "Ehab's sound blends traditional flamenco with modern elements from jazz, blues, Roma jazz, oriental, and classical music, creating compositions that resonate deeply with audiences across all demographics. Every performance is crafted to create genuine connection and memorable experiences.",
    fourthParagraph: "Ehab performs across Canada as a soloist and with curated ensembles, bringing a soulful, technically precise flamenco-inspired sound to stages, festivals, and private events.",
    image: "/lovable-uploads/profile-image.jpg",
    extendedBio: {
      earlyLife: {
        title: "Early Life & Education",
        text: "Ehab's musical journey began at the tender age of 5, rooted in classical foundations that would later evolve into his distinctive flamenco style. His early education provided the technical precision and musical theory that underpins his contemporary approach to traditional Spanish guitar."
      },
      mentorship: {
        title: "Mentorship & Influences", 
        text: "Deeply influenced by legendary masters like Paco De Lucia, Vicente Amigo, Al di Meola, and Antonio Rey, Ehab has developed a unique voice that honors tradition while embracing innovation. His studies with renowned instructors have shaped his understanding of both technical mastery and emotional expression."
      },
      professional: {
        title: "Professional Development",
        text: "Throughout his career, Ehab has continuously refined his craft through performance, composition, and collaboration with other musicians across diverse genres. His commitment to artistic growth has established him as a versatile and dynamic performer in the Canadian music scene."
      }
    }
  },
  stats: {
    yearsPerforming: { number: "15+", label: "Years Performing" },
    citiesToured: { number: "50+", label: "Cities Toured" },
    showsPlayed: { number: "200+", label: "Shows Played" },
    awardsWon: { number: "15+", label: "Awards Won" }
  },
  music: {
    title: "Listen to My Music",
    subtitle: "Flamenco compositions that blend traditional Spanish forms with jazz, blues, oriental, and classical music. Each piece tells a story of passion and artistry.",
    featuredTracksTitle: "Featured Tracks",
    tracks: [
      {
        title: "Sample Track",
        description: "Add your music tracks through the CMS",
        file: ""
      }
    ]
  },
  contact: {
    title: "Get in Touch",
    email: "contact@ehabguitarrista.com",
    phone: "+1 (555) 123-4567",
    location: "Available across Canada",
    responseTimeTitle: "Response Time",
    responseTime: "All inquiries receive a personal response within 24 hours. For urgent requests, please call directly.",
    bookButtonText: "Book Ehab"
  },
  footer: {
    brandTitle: "Ehab Guitarrista",
    description: "Professional flamenco guitarist bringing passion and artistry to life through masterful performances across Canada.",
    email: "ehab.guitarist@email.com",
    phone: "+1 (555) 123-4567",
    services: [
      "Concert Performances",
      "Wedding Ceremonies", 
      "Corporate Events",
      "Private Parties",
      "Studio Recording",
      "Music Composition"
    ],
    copyrightText: "© 2025 Ehab Guitarrista. All rights reserved.",
    influencedByText: "Influenced by: Paco De Lucia • Vicente Amigo • Al di Meola • Antonio Rey"
  },
  performanceImages: [],
  upcomingEventsTitle: "Upcoming Events",
  upcomingEvents: [],
  bookExperience: {
    title: "Book Your Experience",
    description: "Ready to bring the magic of flamenco guitar to your event? Let's create something extraordinary together.",
    buttonText: "Schedule Consultation"
  }
};

export const useCMSContent = () => {
  const [content, setContent] = useState<CMSContent>(defaultContent);
  const [loading, setLoading] = useState(import.meta.env.MODE !== 'production');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      const isProduction = import.meta.env.MODE === 'production';

      // In production, just use the generated content.json with reduced error attempts
      if (isProduction) {
        try {
          const response = await fetch('/ehab-guitarrista-site/content.json?t=' + Date.now(), {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          });

          if (response.ok) {
            const data = await response.json();
            const mergedContent = {
              ...defaultContent,
              ...data,
              about: {
                ...defaultContent.about,
                ...data.about,
                extendedBio: {
                  ...defaultContent.about.extendedBio,
                  ...data.about?.extendedBio
                }
              }
            };
            setContent(mergedContent);
          }
        } catch (e) {
          // Silently fall back to default content in production
        }
        setLoading(false);
        return;
      }

      // Development mode - try API first, then fallback
      try {
        let response: Response | null = null;

        // Try API endpoint first (dev mode)
        try {
          response = await fetch('/api/load-content?t=' + Date.now(), {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          });
        } catch (e) {
          // API not available, continue to static file
        }

        // Try static content.json (fallback)
        if (!response || !response.ok) {
          try {
            response = await fetch('/content.json?t=' + Date.now(), {
              headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
              }
            });
          } catch (e) {
            // Static file not available, use default content
          }
        }

        if (response && response.ok) {
          const data = await response.json();
          const mergedContent = {
            ...defaultContent,
            ...data,
            about: {
              ...defaultContent.about,
              ...data.about,
              extendedBio: {
                ...defaultContent.about.extendedBio,
                ...data.about?.extendedBio
              }
            }
          };
          setContent(mergedContent);
        }
      } catch (err) {
        // Silently use default content
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  return { content, loading, error };
};