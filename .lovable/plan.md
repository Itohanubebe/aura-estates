# Luxury Real Estate Homepage Plan

## Goal
Create a custom, prestige-led homepage for a real estate developer and property portfolio. The experience will combine cinematic architecture, confident editorial typography, restrained GSAP storytelling, and one selective Three.js moment without compromising usability or speed.

The visual approach will take cues from Binghatti's architectural scale and branded development storytelling, plus Vide Infra's editorial composition and immersive real estate work. The design will be original, not a copy.

## Creative Direction

### Brand feeling
- Architectural, confident, contemporary, and exclusive
- Strong visual hierarchy with oversized typography and generous negative space
- A restrained neutral palette with one distinctive brand accent
- Premium photography and renders treated as the main visual language
- Sharp, precise interface details rather than generic luxury decoration

### Homepage narrative
1. **Opening experience**
   - Immediate full-screen architectural statement
   - Brand name and concise positioning line
   - Minimal navigation with Projects, About, Journal, and Contact
   - One clear action to explore the portfolio
   - A brief, non-blocking entrance sequence

2. **Signature project reveal**
   - Large project imagery or film with project name and location
   - Scroll-controlled text and image choreography
   - A clear route into the featured development

3. **Brand philosophy**
   - Short editorial statement about the developer's architectural vision
   - Oversized type paired with a detailed material or facade image
   - Animated statistics for years, completed developments, and locations

4. **Selected portfolio**
   - Curated sequence of three flagship properties
   - Each property includes status, location, category, and a direct project link
   - Horizontal or pinned scroll treatment on larger screens
   - Natural vertical flow on mobile

5. **Architectural signature**
   - One lightweight Three.js experience using an optimized building form, material study, or interactive facade detail
   - Subtle pointer and scroll response
   - Static image fallback for reduced motion, low-power devices, and slower connections

6. **Recognition and credibility**
   - Awards, press mentions, brand collaborations, or key milestones
   - Restrained typographic presentation without a crowded logo wall

7. **Journal or latest story**
   - One featured story about design, construction, or a development milestone
   - Editorial imagery and direct reading path

8. **Contact close**
   - Strong final statement and enquiry action
   - Office location, contact details, and social links
   - Compact footer with legal and privacy links

## Motion Plan
- Use GSAP ScrollTrigger for the featured project, philosophy statement, statistics, and portfolio sequence
- Prefer transform and opacity animation to protect frame rate
- Use smooth image masks, restrained parallax, and purposeful text reveals
- Limit pinned sections and avoid animating every element
- Use Three.js only for the architectural signature section
- Pause or simplify animation when content is outside the viewport
- Respect reduced-motion preferences throughout
- Avoid long preloaders and scroll hijacking

## Performance Plan
- Establish a mobile-first asset budget before animation work begins
- Serve responsive AVIF or WebP images and compressed short-form video
- Lazy-load media and the Three.js module below the first screen
- Use low-poly geometry, baked lighting, compressed textures, and capped pixel density
- Provide poster images and graceful fallbacks when WebGL is unavailable
- Load GSAP modules only where used
- Test smoothness on mid-range phones, not only desktop hardware
- Target strong Core Web Vitals and a useful first screen before optional motion finishes loading

## Content and Data Preparation
Before visual production, collect:
- Brand name, logo, palette, and typography preferences
- Brand positioning statement and company profile
- Three flagship properties for the homepage
- High-resolution exterior, interior, lifestyle, and detail imagery
- Project fields such as title, location, status, type, price visibility, and completion date
- Awards, milestones, contact details, and social links

Temporary editorial copy and generated architectural imagery can be used for the first visual concept, but they will be clearly marked for replacement.

## Technical Architecture

### Frontend
- Semantic custom HTML5
- Modular CSS with reusable design tokens and responsive layouts
- Vanilla JavaScript modules
- GSAP with ScrollTrigger for timeline and scroll animation
- Three.js for one isolated, dynamically loaded scene
- Progressive enhancement so the content remains usable without animation or WebGL

### PHP and MySQL
- PHP templates for shared navigation, footer, and reusable project views
- MySQL tables for projects, property media, categories, locations, amenities, availability, and enquiries
- Secure administrator area for managing projects and portfolio content
- Prepared statements, server-side validation, secure media handling, and role-based access
- SEO-friendly project URLs and server-rendered metadata

### Platform note
The current Lovable workspace runs a modern JavaScript application stack rather than PHP. The homepage can be designed and prototyped here, but the final PHP and MySQL implementation must be developed in, or transferred to, a PHP-capable codebase and hosting environment.

## Delivery Phases

### Phase 1: Homepage direction
- Establish sitemap context, content hierarchy, visual tokens, and typography
- Produce the complete desktop homepage design
- Adapt the chosen composition for tablet and mobile
- Define motion notes and the exact Three.js concept
- Review and approve the direction before extending the system

### Phase 2: Interactive homepage build
- Build the responsive homepage
- Add GSAP sequences in controlled passes
- Add and optimize the Three.js signature moment
- Complete accessibility, reduced-motion, browser, and performance checks

### Phase 3: Portfolio system
- Define the property data model and administration workflow
- Build portfolio listing, filters, property detail templates, and enquiry handling
- Connect the pages to PHP and MySQL

### Phase 4: Remaining pages
- Extend the approved design system to About, Projects, Project Detail, Journal, and Contact
- Add page-specific motion only where it supports the content
- Complete technical SEO, analytics, security, and launch checks

## Homepage Approval Criteria
- The first screen immediately communicates the developer and its architectural identity
- The page feels premium without resembling a template
- The project portfolio remains clear beneath the cinematic presentation
- Motion supports the narrative and never blocks navigation or reading
- Mobile users receive a complete, fast experience with lighter effects
- The design system can scale consistently across later pages
