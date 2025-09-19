# Ehab Guitarrista Website (GitHub Pages)

This is the main website for Ehab Guitarrista, a professional flamenco guitarist and composer.

## Setup for GitHub Pages

1. Create a new repository on GitHub
2. Push this code to the repository
3. Go to Settings > Pages
4. Select "GitHub Actions" as the source
5. Set repository secrets:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Features

- React 18 with TypeScript
- Vite build system
- Tailwind CSS styling
- Content loaded from Supabase
- Automatic rebuilds when CMS updates content

## Content Management

Content is managed through the separate CMS deployed on Vercel.
Changes made in the CMS automatically trigger a rebuild of this GitHub Pages site.

## Local Development

```bash
npm install
npm run dev
```

The site reads content from `public/content.json` which is generated from Supabase data.