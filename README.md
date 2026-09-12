# Ahmedabad Pest Control Website

This is a static, multi-page marketing website built for Ahmedabad Pest Control. It features a modern, responsive design optimized for lead generation.

## Tech Stack

- **Framework:** React + Vite (TypeScript)
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **SEO Management:** React Helmet Async

## Setup Instructions

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```

3.  **Build for production:**
    ```bash
    npm run build
    ```
    This will generate a `dist` folder containing static assets ready for deployment on Vercel, Netlify, or any static host.

## Customizing Content

- **Theme Colors:** All brand colors are defined in `src/index.css` using Tailwind v4 `@theme` variables (`--color-brand-green`, `--color-brand-dark`, etc.). Update these variables to instantly change the site's color scheme.
- **Data (Services, Testimonials, FAQs):** Content is managed via data files in `src/data/`. You can edit `services.ts`, `testimonials.ts`, or `faqs.ts` to update the content dynamically across the site without changing component code.
- **Images:** Look for the comments `/* TODO: Replace with real image */` in the page components (e.g., `Home.tsx`, `About.tsx`) to swap out the placeholder graphics with real assets.

## Contact Form Integration (Formspree)

The contact form is currently set up to send POST requests but needs your specific endpoint.
1. Create a free account at [Formspree](https://formspree.io/) (or Web3Forms/EmailJS).
2. Create a new form and copy the endpoint URL (e.g., `https://formspree.io/f/YOUR_FORM_ID`).
3. Open `src/pages/Contact.tsx`.
4. Replace the placeholder URL in the `fetch` call with your real endpoint.
