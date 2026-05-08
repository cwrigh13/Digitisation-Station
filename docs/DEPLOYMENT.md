# Deployment Guide

This guide explains how to deploy the Digitisation Station Dashboard to various hosting platforms.

## Deployment Options

### Option 1: Static Hosting (Recommended)

The dashboard is a static React application that can be hosted on any static file server.

#### Netlify Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Create a Netlify account at netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click "Deploy site"

3. **Custom Domain** (optional)
   - Go to Site settings → Domain management
   - Add your custom domain (e.g., `digitisation.georgesriver.nsw.gov.au`)

#### Vercel Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   - Create a Vercel account at vercel.com
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect React settings
   - Click "Deploy"

#### GitHub Pages Deployment

1. **Install gh-pages package**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/Digitisation-Station",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Option 2: Library Web Server

If your library has an existing web server:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Upload the build folder**
   - The `build/` folder contains all static files
   - Upload contents to your web server via FTP/SFTP
   - Configure web server to serve index.html for all routes

3. **Web Server Configuration**

   **Apache (.htaccess)**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   **Nginx**
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

### Option 3: Kiosk/Tablet Deployment

For a dedicated tablet or kiosk at the library:

#### Setup

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Local Web Server**
   - Install a simple HTTP server on the tablet/kiosk
   - Python: `python -m http.server 8000` (from build directory)
   - Node: `npx serve -s build`

3. **Kiosk Mode Configuration**

   **Chrome Kiosk Mode (Windows/macOS/Linux)**
   ```bash
   chrome --kiosk --app=http://localhost:8000
   ```

   **iPad Guided Access**
   - Open Settings → Accessibility → Guided Access
   - Enable Guided Access
   - Open the dashboard in Safari
   - Triple-click home button to start Guided Access

   **Android Kiosk Mode**
   - Install "Fully Kiosk Browser" from Play Store
   - Configure app to launch on startup
   - Point to local dashboard URL

## Asset Management

### Adding Photos

1. Place photos in `assets/` folder:
   - `station-overview.jpg` - Full station photo (recommended: 1920x1080px)
   - `keypad-closeup.jpg` - Keypad close-up (recommended: 1920x1080px)

2. Optimize images before adding:
   ```bash
   # Using ImageOptim (Mac) or similar tools
   # Target: <500KB per image for fast loading
   ```

3. Ensure photos match the current physical setup

### Updating Photos

When equipment changes:
1. Take new high-resolution photos
2. Replace old photos in `assets/` folder
3. Rebuild and redeploy
4. Complete verification checklist

## Environment Configuration

### Translation API

The dashboard uses the Anthropic Claude API for translation. The API key is handled through the Claude API endpoint and doesn't require local configuration.

If you need to modify the translation endpoint:

1. Edit `src/DigitisationStationDashboard.jsx`
2. Find the `translateContent` function
3. Update the API endpoint if needed

## Testing Deployment

Before going live:

1. **Test on actual devices**
   - Mobile phone (iOS and Android)
   - Tablet
   - Desktop browser
   - Library kiosk if available

2. **Test all features**
   - All navigation buttons work
   - Images load and enlarge correctly
   - Translation feature works
   - Guides display properly on mobile

3. **Load Testing**
   - Have 5-10 people access simultaneously
   - Check performance and responsiveness

4. **Complete Verification**
   - Work through the entire verification checklist
   - Test with first-time users

## Rollback Procedure

If issues arise after deployment:

1. **Keep previous version**
   - Always tag releases in git: `git tag v1.0.0`
   - Keep previous build folder as backup

2. **Quick Rollback**
   - Netlify/Vercel: Use dashboard to rollback to previous deployment
   - Static hosting: Re-upload previous build folder
   - GitHub Pages: Revert git commit and redeploy

## Monitoring

### Analytics (Optional)

Add Google Analytics or similar:

1. Get tracking ID
2. Add to `public/index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'YOUR-ID');
   </script>
   ```

### Error Monitoring

Consider adding error tracking:
- Sentry
- LogRocket
- Bugsnag

## Security Considerations

1. **HTTPS Only**
   - Ensure deployment uses HTTPS
   - Most platforms (Netlify, Vercel, GitHub Pages) provide free SSL

2. **Content Security Policy**
   - Add CSP headers if possible
   - Restrict API calls to anthropic.com only

3. **Regular Updates**
   - Update React and dependencies quarterly
   - Check for security vulnerabilities: `npm audit`

## Support

For deployment issues:
- Check build logs for errors
- Verify all dependencies are installed
- Test locally before deploying
- Contact your IT department for server-specific issues

## Checklist Before Going Live

- [ ] All photos are current and high-quality
- [ ] Translation feature tested with at least 3 languages
- [ ] Tested on mobile, tablet, and desktop
- [ ] Verification checklist completed
- [ ] Staff trained on directing patrons to dashboard
- [ ] Backup of current deployment saved
- [ ] Rollback procedure documented
- [ ] Contact information for support added

---

**Last Updated**: May 2026  
**Maintained By**: Georges River Libraries IT Department
