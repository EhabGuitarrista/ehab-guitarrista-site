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
                        title: section.title || "Ehab Guitarrista",
                        subtitle: section.subtitle || "Professional Flamenco Guitarist & Composer",
                        image: section.backgroundImage || section.image || "",
                        bookButtonText: section.bookButton || "Book Performance",
                        listenButtonText: section.listenButton || "Listen Now"
                    };
                    break;

                case 'about':
                    content.about = section.mainDescription ? section : {
                        title: "Meet Ehab",
                        mainDescription: "As a composer of original music...",
                        secondParagraph: "",
                        thirdParagraph: "",
                        fourthParagraph: "",
                        image: "/lovable-uploads/profile-image.jpg",
                        extendedBio: {
                            earlyLife: { title: "Early Life & Education", text: "" },
                            mentorship: { title: "Mentorship & Influences", text: "" },
                            professional: { title: "Professional Development", text: "" }
                        }
                    };
                    break;

                case 'stats':
                    content.stats = {
                        yearsPerforming: {
                            number: section.yearsNumber || "15+",
                            label: section.yearsLabel || "Years Performing"
                        },
                        citiesToured: {
                            number: section.citiesNumber || "50+",
                            label: section.citiesLabel || "Cities Toured"
                        },
                        showsPlayed: {
                            number: section.showsNumber || "200+",
                            label: section.showsLabel || "Shows Played"
                        },
                        awardsWon: {
                            number: section.awardsNumber || "10+",
                            label: section.awardsLabel || "Awards Won"
                        }
                    };
                    break;

                case 'music':
                    content.music = section.tracks ? section : {
                        title: "My Music",
                        subtitle: "Original Compositions & Performances",
                        featuredTracksTitle: "Featured Tracks",
                        tracks: [{
                            title: "Sample Track",
                            description: "Add your music tracks through the CMS",
                            file: ""
                        }]
                    };
                    break;

                case 'contact':
                    content.contact = {
                        title: section.title || "Get in Touch",
                        formTitle: section.formTitle || "",
                        infoTitle: section.infoTitle || "",
                        emailLabel: section.emailLabel || "",
                        phoneLabel: section.phoneLabel || "",
                        locationLabel: section.locationLabel || "",
                        email: section.email || "contact@ehabguitarrista.com",
                        phone: section.phone || "+1 (555) 123-4567",
                        location: section.location || "Available across Canada",
                        responseTimeTitle: section.responseTimeTitle || "Response Time",
                        responseTime: section.responseTime || "All inquiries receive a response within 24 hours",
                        bookButtonText: section.bookButton || "Book Ehab"
                    };
                    break;

                case 'footer':
                    content.footer = {
                        brandTitle: section.brandTitle || "Ehab Guitarrista",
                        description: section.description || "Professional Flamenco Guitarist & Composer",
                        email: section.email || "contact@ehabguitarrista.com",
                        phone: section.phone || "+1 (555) 123-4567",
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
                    break;

                case 'videos':
                    content.videos = section.performances ? section : {
                        aboutSection: { title: '', file: '' },
                        billBourneMainPage: { title: '', file: '' },
                        performances: []
                    };
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