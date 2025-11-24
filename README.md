# Caraway - Cash for Cars Brisbane Website

A modern, SEO-optimized website for Caraway, a cash for cars business based in Brisbane, Australia.

## Features

- ✅ **SEO Optimized**: Built with "cash for cars" keyword optimization
- ✅ **Brisbane-Specific**: Local SEO elements and Brisbane suburb targeting
- ✅ **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- ✅ **Modern UI**: Clean, professional design with smooth animations
- ✅ **Schema Markup**: Structured data for better search engine visibility
- ✅ **Fast Loading**: Optimized for performance
- ✅ **Blog Posts**: 5 SEO-optimized blog posts targeting "cash for cars" keywords
- ✅ **Interactive FAQ**: Accordion-style FAQ section

## Project Structure

```
caraway-website/
├── index.html                      # Main website page
├── styles.css                      # CSS stylesheet
├── script.js                       # JavaScript functionality
├── logo.svg                        # Caraway logo
├── robots.txt                      # SEO robots file
├── sitemap.xml                     # XML sitemap for SEO
├── README.md                       # This file
└── blog/                           # Blog posts directory
    ├── ultimate-guide-cash-for-cars-brisbane.html
    ├── 10-tips-maximize-cash-for-cars-price.html
    ├── cash-for-cars-vs-private-sale.html
    ├── what-paperwork-needed-cash-for-cars.html
    └── how-to-sell-damaged-car-cash-for-cars.html
    └── 5-reasons-local-cash-for-cars-brisbane.html
```

## SEO Features

### On-Page SEO
- Optimized title tag: "Cash for Cars Brisbane - Caraway | Instant Cash for Your Car"
- Meta description with primary keyword
- Semantic HTML5 structure
- Proper heading hierarchy (H1, H2, H3)
- Alt tags for images
- Internal linking structure
- Canonical URLs

### Local SEO
- Schema.org LocalBusiness structured data
- Schema.org Organization structured data
- Schema.org FAQPage structured data
- Brisbane-specific content throughout
- Service area listings for Brisbane suburbs
- Local address and contact information
- Geographic coordinates (Brisbane, QLD)

### Technical SEO
- Mobile-responsive design
- Fast loading times
- Clean URL structure
- Open Graph tags for social sharing
- Twitter Card meta tags
- robots.txt file
- XML sitemap

## Blog Posts

The website includes 5 SEO-optimized blog posts:
1. The Ultimate Guide to Getting Cash for Cars in Brisbane
2. 10 Tips to Maximize Your Cash for Cars Price
3. Cash for Cars vs Private Sale: Which is Better?
4. What Paperwork is Needed for Cash for Cars?
5. How to Sell a Damaged Car for Cash for Cars
6. 5 Reasons to Choose a Local Cash for Cars Service in Brisbane

All blog posts are optimized for "cash for cars" keyword variations and include proper Schema.org markup.

## Setup Instructions

1. **Open the website**: Simply open `index.html` in a web browser
2. **For local development**: Use a local server (recommended)
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Then visit http://localhost:8000
   ```
3. **For production**: Upload all files to your web hosting service

## Customization

### Update Contact Information
Edit `index.html` and replace:
- Phone number: `+61-7-XXXX-XXXX` (appears in multiple places)
- Email: `info@caraway.com.au`
- Address: Update Brisbane address details

### Form Submission
The form currently shows an alert. To connect to a backend:
1. Update the form action in `script.js`
2. Set up an API endpoint to handle form submissions
3. Uncomment and configure the fetch API code in `script.js`

### Add Google Maps
Replace the map placeholder in the contact section:
```html
<iframe src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE" 
        width="100%" height="300" style="border:0;" allowfullscreen="" 
        loading="lazy"></iframe>
```

## Git Setup

This project is ready for GitHub. To push to GitHub:

1. Create a new repository on GitHub (don't initialize with README)
2. Add the remote:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/caraway-website.git
   ```
3. Push to GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- JavaScript (Vanilla JS, no dependencies)
- SVG (for logo)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Copyright © 2025 Caraway - Cash for Cars Brisbane. All rights reserved.

