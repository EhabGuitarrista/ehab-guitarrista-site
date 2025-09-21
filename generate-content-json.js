#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get Supabase credentials
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wuujwsddfjhpnqxieqvn.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1dWp3c2RkZmpocG5xeGllcXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMzU5NjEsImV4cCI6MjA3MzYxMTk2MX0.XCWQNQbCt8E8wLK2gQDFNUKh5aDZ45rNedoJy-u2R3s';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function generateContentJson() {
    console.log('Fetching content from Supabase...');

    const { data, error } = await supabase
        .from('site_content')
        .select('*');

    if (error) {
        console.error('Error fetching content:', error);
        // Use default content if error
        return createDefaultContent();
    }

    // Convert Supabase data to content.json format
    const content = {};

    if (data && data.length > 0) {
        data.forEach(item => {
            const section = item.content || {};

            // Handle dynamic arrays from images section
            if (item.section_name === 'images') {
                if (section.performanceImages) {
                    content.performanceImages = section.performanceImages.map(img => ({
                        title: img.caption || "",
                        description: img.caption || "",
                        image: img.url || "",
                        alt: img.caption || "Performance image"
                    }));
                }

                if (section.upcomingEvents) {
                    content.upcomingEvents = section.upcomingEvents.map(event => ({
                        title: event.name || "",
                        description: event.location || "",
                        image: event.imageUrl || "",
                        alt: `${event.name || 'Event'} poster`
                    }));
                }
            }

            switch(item.section_name) {
                case 'navigation':
                    content.navigation = {
                        logoText: section.logoText || "",
                        menuItems: {
                            home: section.home || "",
                            music: section.music || "",
                            performances: section.performances || "",
                            contact: section.contact || ""
                        },
                        ctaButton: section.ctaButton || ""
                    };
                    break;

                case 'hero':
                    content.hero = {
                        title: section.title || "",
                        subtitle: section.subtitle || "",
                        image: section.backgroundImage || section.image || "",
                        bookButtonText: section.bookButton || "",
                        listenButtonText: section.listenButton || ""
                    };
                    break;

                case 'about':
                    content.about = {
                        title: section.title || "Meet Ehab",
                        mainDescription: section.mainDescription || "",
                        secondParagraph: section.secondParagraph || "",
                        thirdParagraph: section.thirdParagraph || "",
                        fourthParagraph: section.fourthParagraph || "",
                        videoUrl: section.videoUrl || "",
                        videoTitle: section.videoTitle || "",
                        image: section.image || "",
                        extendedBio: {
                            earlyLife: {
                                title: section.earlyLifeTitle || "",
                                text: section.earlyLifeText || ""
                            },
                            mentorship: {
                                title: section.mentorshipTitle || "",
                                text: section.mentorshipText || ""
                            },
                            professional: {
                                title: section.professionalTitle || "",
                                text: section.professionalText || ""
                            },
                            musicalPhilosophy: {
                                title: section.musicalPhilosophyTitle || "",
                                text: section.musicalPhilosophyText || ""
                            }
                        }
                    };

                    // Initialize videos structure if it doesn't exist
                    if (!content.videos) {
                        content.videos = {};
                    }

                    // Add about section video to videos structure
                    content.videos.aboutSection = {
                        title: section.videoTitle || "",
                        file: section.videoUrl || ""
                    };
                    break;

                case 'stats':
                    content.stats = {
                        yearsPerforming: {
                            number: section.yearsNumber || "",
                            label: section.yearsLabel || ""
                        },
                        citiesToured: {
                            number: section.citiesNumber || "",
                            label: section.citiesLabel || ""
                        },
                        showsPlayed: {
                            number: section.showsNumber || "",
                            label: section.showsLabel || ""
                        },
                        awardsWon: {
                            number: section.awardsNumber || "",
                            label: section.awardsLabel || ""
                        }
                    };
                    // Extract live performance moments title from stats section
                    content.livePerformanceMoments = {
                        title: section.livePerformanceMomentsTitle || ""
                    };
                    break;

                case 'music':
                    content.music = {
                        title: section.title || "",
                        subtitle: section.subtitle || "",
                        featuredTracksTitle: section.featuredTitle || "",
                        tracks: (section.tracks || []).map(track => ({
                            title: track.title || "",
                            description: track.description || "",
                            file: track.url || "" // Map 'url' from CMS to 'file' for the music player
                        }))
                    };
                    break;

                case 'contact':
                    content.contact = {
                        title: section.title || "",
                        formTitle: section.formTitle || "",
                        infoTitle: section.infoTitle || "",
                        emailLabel: section.emailLabel || "",
                        phoneLabel: section.phoneLabel || "",
                        locationLabel: section.locationLabel || "",
                        email: section.email || "",
                        phone: section.phone || "",
                        location: section.location || "",
                        responseTimeTitle: section.responseTimeTitle || "",
                        responseTime: section.responseTime || "",
                        bookButtonText: section.bookButton || ""
                    };
                    break;

                case 'footer':
                    content.footer = {
                        brandTitle: section.brandTitle || "",
                        description: section.description || "",
                        email: section.email || "",
                        phone: section.phone || "",
                        services: section.services ? (typeof section.services === 'string' ? section.services.split(',').map(s => s.trim()).filter(s => s) : section.services) : [],
                        copyrightText: section.copyrightText || "",
                        influencedByText: section.influencedByText || ""
                    };
                    break;

                case 'performanceImages':
                    content.performanceImages = Array.isArray(section) ? section : [];
                    break;

                case 'upcomingEvents':
                    content.upcomingEvents = Array.isArray(section) ? section : [];
                    content.upcomingEventsTitle = "Upcoming Events";
                    break;

                case 'bookExperience':
                    content.bookExperience = section || {
                        title: "Book Your Experience",
                        description: "",
                        buttonText: "Book Now"
                    };
                    break;

                case 'images':
                    // Extract all image-related data from the images section
                    content.performanceImages = section.performanceImages || [];
                    content.upcomingEvents = section.upcomingEvents || [];
                    content.bookExperience = section.bookExperience || {
                        title: "Book Your Experience",
                        description: "Ready to bring the magic of flamenco guitar to your event? Let's create something extraordinary together.",
                        buttonText: "Schedule Consultation"
                    };
                    // Extract performance page content from images section
                    content.performancePage = {
                        mainTitle: section.performancePageMainTitle || "",
                        mainSubtitle: section.performancePageMainSubtitle || "",
                        eventsTitle: section.performancePageEventsTitle || "",
                        eventsDescription: section.performancePageEventsDescription || ""
                    };
                    break;

                case 'videos':
                    // Merge with existing videos structure
                    content.videos = {
                        ...content.videos,
                        bannerVideo: section.bannerVideo || {
                            title: '',
                            url: ''
                        },
                        performanceVideos: section.performanceVideos || [],
                        performances: section.performances || []
                    };

                    // Map performance videos array to individual video keys (performanceVideo1, performanceVideo2, etc.)
                    if (section.performanceVideos && Array.isArray(section.performanceVideos)) {
                        section.performanceVideos.forEach((video, index) => {
                            if (video.url) {
                                content.videos[`performanceVideo${index + 1}`] = {
                                    title: video.title || '',
                                    description: video.description || '',
                                    file: video.url
                                };
                            }
                        });
                    }
                    break;

            }
        });
    } else {
        return createDefaultContent();
    }

    return content;
}

function createDefaultContent() {
    return {
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
            subtitle: "Professional Flamenco Guitarist & Composer",
            image: "",
            bookButtonText: "Book Performance",
            listenButtonText: "Listen Now"
        },
        about: {
            title: "Meet Ehab",
            mainDescription: "As a composer of original music...",
            secondParagraph: "",
            thirdParagraph: "",
            fourthParagraph: "",
            image: "",
            extendedBio: {
                earlyLife: { title: "Early Life & Education", text: "" },
                mentorship: { title: "Mentorship & Influences", text: "" },
                professional: { title: "Professional Development", text: "" }
            }
        },
        stats: {
            yearsPerforming: { number: "15+", label: "Years Performing" },
            citiesToured: { number: "50+", label: "Cities Toured" },
            showsPlayed: { number: "200+", label: "Shows Played" },
            awardsWon: { number: "10+", label: "Awards Won" }
        },
        music: {
            title: "Featured Music",
            subtitle: "Original Compositions & Performances",
            featuredTracksTitle: "Featured Tracks",
            tracks: []
        },
        contact: {
            title: "Get in Touch",
            email: "contact@ehabguitarrista.com",
            phone: "+1 (555) 123-4567",
            location: "Available across Canada",
            responseTimeTitle: "Response Time",
            responseTime: "All inquiries receive a response within 24 hours",
            bookButtonText: "Book Ehab"
        },
        footer: {
            brandTitle: "Ehab Guitarrista",
            description: "Professional Flamenco Guitarist & Composer",
            email: "contact@ehabguitarrista.com",
            phone: "+1 (555) 123-4567",
            services: [],
            copyrightText: "© 2024 Ehab Guitarrista. All rights reserved.",
            influencedByText: ""
        },
        performanceImages: [],
        upcomingEvents: [],
        bookExperience: {
            title: "Book Your Experience",
            description: "Ready to bring the magic of flamenco guitar to your event? Let's create something extraordinary together.",
            buttonText: "Schedule Consultation"
        },
        videos: {
            aboutSection: {},
            billBourneMainPage: {},
            performances: []
        },
        livePerformanceMoments: {
            title: ""
        },
        performancePage: {
            mainTitle: "",
            mainSubtitle: "",
            eventsTitle: "",
            eventsDescription: ""
        }
    };
}

async function main() {
    try {
        const content = await generateContentJson();

        // Create dist directory if it doesn't exist
        const distDir = path.join(__dirname, 'dist');
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir);
        }

        // Write to both dist and public directories
        const distPath = path.join(distDir, 'content.json');
        fs.writeFileSync(distPath, JSON.stringify(content, null, 2));

        const publicDir = path.join(__dirname, 'public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }
        const publicPath = path.join(publicDir, 'content.json');
        fs.writeFileSync(publicPath, JSON.stringify(content, null, 2));

        console.log('Generated content.json successfully!');
        console.log('Output:', distPath);
        console.log('Output:', publicPath);

    } catch (error) {
        console.error('Error generating content.json:', error);
        process.exit(1);
    }
}

main();