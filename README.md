# Caraway - Cash for Cars Brisbane Website

A modern, SEO-optimized website for Caraway, a cash for cars business based in Brisbane, Australia.

## Features

- ✅ **SEO Optimized**: Built with "cash for cars" keyword optimization
- ✅ **Brisbane-Specific**: Local SEO elements and Brisbane suburb targeting
- ✅ **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- ✅ **Modern UI**: Clean, professional design with smooth animations
- ✅ **Schema Markup**: Structured data for better search engine visibility
- ✅ **Fast Loading**: Optimized for performance

## SEO Features

### On-Page SEO
- Optimized title tag: "Cash for Cars Brisbane - Caraway | Instant Cash for Your Car"
- Meta description with primary keyword
- Semantic HTML5 structure
- Proper heading hierarchy (H1, H2, H3)
- Alt tags ready for images (add images and update alt attributes)
- Internal linking structure

### Local SEO
- Schema.org LocalBusiness structured data
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

## Files Structure

```
caraway-website/
├── index.html      # Main HTML file
├── styles.css      # CSS stylesheet
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Setup Instructions

1. **Open the website**: Simply open `index.html` in a web browser
2. **For local development**: Use a local server (recommended)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```
3. **For production**: Upload all files to your web hosting service

## Customization

### Update Contact Information
Edit `index.html` and replace:
- Phone number: `+61-7-XXXX-XXXX` (appears in multiple places)
- Email: `info@caraway.com.au`
- Address: Update Brisbane address details

### Add Images
1. Create an `images` folder
2. Add your images (logo, hero background, etc.)
3. Update image paths in HTML

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

## SEO Optimization Checklist

- [x] Title tag optimized with primary keyword
- [x] Meta description with keyword
- [x] H1 tag with keyword
- [x] Multiple H2 tags with keyword variations
- [x] Keyword density optimized (natural, not keyword-stuffed)
- [x] Schema.org structured data
- [x] Local business information
- [x] Internal linking
- [x] Mobile-responsive design
- [x] Fast page load times
- [ ] Add images with alt tags (recommended)
- [ ] Add Google Analytics (recommended)
- [ ] Submit sitemap to Google Search Console (recommended)
- [ ] Add Google My Business listing (recommended)

## Additional SEO Recommendations

1. **Content**: Consider adding a blog section with articles about:
   - "How to sell your car for cash in Brisbane"
   - "What to expect when selling your car"
   - "Tips for getting the best cash for cars price"

2. **Backlinks**: Reach out to local Brisbane directories and business listings

3. **Google My Business**: Create and optimize your Google Business Profile

4. **Social Media**: Add social media links and share buttons

5. **Reviews**: Add a testimonials/reviews section

6. **Images**: Add relevant images (cars, Brisbane landmarks, etc.) with alt tags

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Copyright © 2024 Caraway - Cash for Cars Brisbane. All rights reserved.

