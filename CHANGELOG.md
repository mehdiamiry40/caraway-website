## 2.0.0 - 2025-10-30

### Added
- New blog post: "5 Reasons to Choose a Local Cash for Cars Service in Brisbane".
- "Back to Top" button for improved user experience.
- New section on the homepage highlighting the benefits of a local Brisbane service.

### Changed
- Updated hero section with more SEO-friendly content.
- Improved internal linking between blog posts.
- Enhanced UI/UX with minor design tweaks and improved visual hierarchy.

# Changelog - Improvements Implemented

## ✅ Completed Improvements

### 1. **Performance Optimizations**
- ✅ Removed CSS duplication (form-group styles consolidated)
- ✅ Added lazy loading to footer logo image
- ✅ Set logo to `loading="eager"` (above-fold image)
- ✅ Added font-display optimization

### 2. **Accessibility Enhancements**
- ✅ Added skip navigation link (appears on Tab key)
- ✅ Wrapped main content in `<main>` tag with proper ID
- ✅ Added `aria-describedby` for phone and year inputs
- ✅ Added screen reader hints with `.sr-only` class
- ✅ Enhanced form message with `aria-atomic="true"`
- ✅ Added `aria-busy` attribute to submit button
- ✅ Added `role="status"` and `role="alert"` to form messages
- ✅ Implemented focus trap for mobile menu
- ✅ Added Escape key handler to close mobile menu
- ✅ Mobile menu now traps focus when open (Tab navigation)

### 3. **Form Improvements**
- ✅ Added loading spinner animation to submit button
- ✅ Added spinning loader to form loading message
- ✅ Enhanced error handling with try-catch blocks
- ✅ Added visual validation states (red border for invalid, green for valid)
- ✅ Real-time validation feedback
- ✅ Improved phone number formatting with error clearing
- ✅ Added pattern attribute to phone input
- ✅ Added `inputmode` attributes for better mobile keyboards
- ✅ Added placeholder to phone field
- ✅ Form timeout handling (10-second fallback if FormSubmit fails)
- ✅ Better error messages with phone number fallback

### 4. **Mobile UX**
- ✅ Added `inputmode="tel"` to phone field (shows numeric keypad)
- ✅ Added `inputmode="numeric"` to year field
- ✅ Enhanced focus management in mobile menu
- ✅ Better touch targets maintained

### 5. **SEO**
- ✅ Added BreadcrumbList schema markup
- ✅ Existing structured data maintained (LocalBusiness, Organization, FAQPage)

### 6. **Code Quality**
- ✅ Added comprehensive error handling throughout JavaScript
- ✅ Better validation messages
- ✅ Improved code organization
- ✅ Added `.error` class styling for form fields

## 🎨 Visual Improvements

### Loading States
- **Submit Button**: Shows spinning loader when submitting
- **Form Message**: Shows animated spinner in loading state
- **Error States**: Fields with errors show red border and light red background
- **Success States**: Valid fields show green border

### Animations
- Smooth loading spinner animation (`@keyframes spin`)
- Form validation feedback animations
- Focus trap animations for better UX

## 🔧 Technical Details

### Error Handling
All JavaScript functions now wrapped in try-catch blocks:
- Form submission handler
- Phone number formatting
- Year validation
- Success parameter checking
- Form validation setup

### Accessibility Features
- **Skip Link**: Appears when Tab key is pressed, allows skipping to main content
- **Focus Trap**: Mobile menu keeps focus within menu when open
- **Keyboard Navigation**: Full keyboard support throughout
- **Screen Reader Support**: All interactive elements properly labeled

### Form Validation
- **Real-time**: Fields validate as user types
- **Visual Feedback**: Error states shown immediately
- **Accessible**: Error messages announced to screen readers
- **Mobile-Friendly**: Proper keyboard types on mobile devices

## 📝 Notes

### Known Considerations
- FormSubmit service handles actual form submission
- Loading spinner shows for up to 10 seconds as fallback
- Success message appears after FormSubmit redirects back
- All error handling is defensive (won't break if elements don't exist)

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Keyboard navigation tested
- Screen reader compatible

## 🚀 Performance Impact

- **CSS**: Reduced file size by removing duplicates
- **JavaScript**: Added error handling (minimal performance impact)
- **Accessibility**: Improved without sacrificing performance
- **Mobile**: Enhanced UX with proper input types

## ✨ User Experience Improvements

1. **Better Feedback**: Users see immediate visual feedback when submitting forms
2. **Error Prevention**: Real-time validation prevents submission errors
3. **Accessibility**: All users can navigate and use the site effectively
4. **Mobile**: Better mobile keyboard experience
5. **Loading States**: Clear indication when forms are processing

---

*Last Updated: Based on latest improvements*
