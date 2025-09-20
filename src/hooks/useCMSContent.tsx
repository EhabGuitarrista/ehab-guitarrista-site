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
      musicalPhilosophy: { title: string; text: string };
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
    logoText: "",
    menuItems: {
      home: "",
      music: "",
      performances: "",
      contact: ""
    },
    ctaButton: ""
  },
  hero: {
    title: "",
    subtitle: "",
    image: "",
    bookButtonText: "",
    listenButtonText: ""
  },
  about: {
    title: "",
    mainDescription: "",
    secondParagraph: "",
    thirdParagraph: "",
    fourthParagraph: "",
    image: "",
    extendedBio: {
      earlyLife: {
        title: "",
        text: ""
      },
      mentorship: {
        title: "",
        text: ""
      },
      professional: {
        title: "",
        text: ""
      },
      musicalPhilosophy: {
        title: "",
        text: ""
      }
    }
  },
  stats: {
    yearsPerforming: { number: "", label: "" },
    citiesToured: { number: "", label: "" },
    showsPlayed: { number: "", label: "" },
    awardsWon: { number: "", label: "" }
  },
  music: {
    title: "",
    subtitle: "",
    featuredTracksTitle: "",
    tracks: []
  },
  contact: {
    title: "",
    email: "",
    phone: "",
    location: "",
    responseTimeTitle: "",
    responseTime: "",
    bookButtonText: ""
  },
  footer: {
    brandTitle: "",
    description: "",
    email: "",
    phone: "",
    services: [],
    copyrightText: "",
    influencedByText: ""
  },
  performanceImages: [],
  upcomingEventsTitle: "",
  upcomingEvents: [],
  bookExperience: {
    title: "",
    description: "",
    buttonText: ""
  },
  videos: {
    aboutSection: {
      title: "",
      file: ""
    },
    billBourneMainPage: {
      title: "",
      file: ""
    },
    billBournePerformances: {
      title: "",
      file: ""
    },
    notreDame: {
      title: "",
      file: ""
    },
    piano: {
      title: "",
      file: ""
    },
    ensemble: {
      title: "",
      file: ""
    },
    oud: {
      title: "",
      file: ""
    }
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

            // Transform flat extended bio structure to nested structure
            const transformedData = { ...data };
            if (data.earlyLifeTitle && data.earlyLifeText) {
              transformedData.about = {
                ...transformedData.about,
                extendedBio: {
                  earlyLife: {
                    title: data.earlyLifeTitle,
                    text: data.earlyLifeText
                  },
                  mentorship: {
                    title: data.mentorshipTitle || "",
                    text: data.mentorshipText || ""
                  },
                  professional: {
                    title: data.professionalTitle || "",
                    text: data.professionalText || ""
                  },
                  musicalPhilosophy: {
                    title: data.musicalPhilosophyTitle || "",
                    text: data.musicalPhilosophyText || ""
                  }
                }
              };
            }

            setContent({ ...defaultContent, ...transformedData });
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

          // Transform flat extended bio structure to nested structure
          const transformedData = { ...data };
          if (data.earlyLifeTitle && data.earlyLifeText) {
            transformedData.about = {
              ...transformedData.about,
              extendedBio: {
                earlyLife: {
                  title: data.earlyLifeTitle,
                  text: data.earlyLifeText
                },
                mentorship: {
                  title: data.mentorshipTitle || "",
                  text: data.mentorshipText || ""
                },
                professional: {
                  title: data.professionalTitle || "",
                  text: data.professionalText || ""
                },
                musicalPhilosophy: {
                  title: data.musicalPhilosophyTitle || "",
                  text: data.musicalPhilosophyText || ""
                }
              }
            };
          }

          setContent({ ...defaultContent, ...transformedData });
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