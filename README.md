# Finis Website - GitHub Setup Guide

Welcome to the Finis Acoustic Architecture website! This guide will walk you through setting up and deploying your website on GitHub Pages.

## 📁 Website Structure

```
finis-website/
├── index.html          # Main homepage
├── solutions.html      # Acoustic solutions showcase
├── realizations.html   # Project portfolio
├── style.css          # Main stylesheet
├── script.js          # Interactive features
└── README.md          # This file
```

## 🚀 Quick Start - Deploy to GitHub Pages

### Step 1: Create a GitHub Account
If you don't have one already:
1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Follow the registration process

### Step 2: Create a New Repository

1. Log in to GitHub
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `finis-website` (or your preferred name)
   - **Description**: "Finis Acoustic Architecture Website"
   - **Public** or **Private**: Choose "Public" (required for free GitHub Pages)
   - **Do NOT** initialize with README, .gitignore, or license
5. Click **"Create repository"**

### Step 3: Upload Your Website Files

#### Option A: Using GitHub Web Interface (Easiest)

1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop all website files:
   - index.html
   - solutions.html
   - realizations.html
   - style.css
   - script.js
   - README.md
3. Add a commit message: "Initial website upload"
4. Click **"Commit changes"**

#### Option B: Using Git Command Line

If you have Git installed:

```bash
# Navigate to your website folder
cd /path/to/finis-website

# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial website upload"

# Add remote repository (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/finis-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** (top menu)
3. Scroll down to **"Pages"** in the left sidebar (under "Code and automation")
4. Under **"Source"**, select:
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **"Save"**
6. Wait 1-2 minutes for deployment
7. Your site will be live at: `https://USERNAME.github.io/finis-website/`

## 🌐 Custom Domain Setup (Optional)

To use your own domain (e.g., www.finis-acoustic.com):

### Step 1: Configure DNS Settings

At your domain registrar (where you bought the domain), add these DNS records:

**For www subdomain:**
```
Type: CNAME
Name: www
Value: USERNAME.github.io
```

**For root domain (optional):**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

### Step 2: Configure GitHub Pages

1. Go to repository **Settings > Pages**
2. Under **"Custom domain"**, enter your domain: `www.finis-acoustic.com`
3. Click **"Save"**
4. Check **"Enforce HTTPS"** (after DNS propagates, ~24 hours)

## 📝 Updating Your Website

### Via GitHub Web Interface

1. Navigate to the file you want to edit
2. Click the **pencil icon** (✏️) to edit
3. Make your changes
4. Scroll down and click **"Commit changes"**
5. Your site will automatically update in 1-2 minutes

### Via Git Command Line

```bash
# Make your changes to files
# Then:

git add .
git commit -m "Description of your changes"
git push
```

## 🎨 Customization Guide

### Update Company Information

**Contact Details** (in index.html):
```html
<!-- Find and update: -->
<a href="mailto:info@finis-acoustic.com">info@finis-acoustic.com</a>
<a href="tel:+32123456789">+32 12 345 67 89</a>
```

### Change Colors

**Main Colors** (in style.css):
```css
:root {
    --teal: #006B5D;        /* Primary brand color */
    --copper: #B87333;      /* Secondary accent */
    --charcoal: #1F2937;    /* Dark text */
    --warm-white: #FAFAFA;  /* Background */
}
```

### Add Real Project Images

Currently, projects use colored gradients. To add real images:

1. Upload images to your repository (create an `images/` folder)
2. In `index.html` and `realizations.html`, replace:
```html
<!-- Current: -->
<div class="project-thumbnail" style="background: linear-gradient(...);">

<!-- Change to: -->
<div class="project-thumbnail" style="background-image: url('images/project-name.jpg'); background-size: cover;">
```

### Update Statistics

In `index.html`, find the hero stats:
```html
<span class="stat-number">500+</span>
<span class="stat-label">Projects Delivered</span>
```

### Link Parent Company Websites

The footer already includes links to STRETCH and Alto Design:
```html
<a href="https://stretchplafond.be" target="_blank">STRETCH</a>
<a href="https://altodesign.pl" target="_blank">Alto Design</a>
```

## 📧 Contact Form Setup

The contact form currently shows an alert. To connect it to email:

### Option 1: Formspree (Free & Easy)

1. Go to [formspree.io](https://formspree.io)
2. Create a free account
3. Get your form endpoint
4. In `index.html`, update the form:
```html
<form action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
```

### Option 2: Google Forms Integration

1. Create a Google Form
2. Use a service like [formfacade.com](https://formfacade.com) to embed it
3. Replace the form section in `index.html`

## 🔧 Troubleshooting

### Site Not Loading?
- Check if GitHub Pages is enabled (Settings > Pages)
- Verify files uploaded correctly
- Wait 2-5 minutes after changes for deployment

### CSS Not Working?
- Ensure `style.css` is in the same folder as `index.html`
- Check browser console for errors (F12)
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Custom Domain Not Working?
- DNS changes take 24-48 hours to propagate
- Verify DNS records are correct
- Check [whatsmydns.net](https://www.whatsmydns.net) for propagation status

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1400px+)

## 🚀 Performance Tips

1. **Optimize Images**: Use compressed images (aim for <200KB per image)
2. **Enable HTTPS**: Always use HTTPS for security (GitHub Pages provides this free)
3. **Test Loading Speed**: Use [PageSpeed Insights](https://pagespeed.web.dev/)

## 📊 Analytics (Optional)

To track visitors:

### Google Analytics Setup

1. Create a Google Analytics account
2. Get your tracking code
3. Add to all HTML files before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🆘 Support

### GitHub Documentation
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

### Web Development Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)

## 📜 License

© 2025 Finis - Part of Stretch Group. All rights reserved.

---

## ✅ Deployment Checklist

Before going live, make sure you've:

- [ ] Uploaded all website files to GitHub
- [ ] Enabled GitHub Pages in repository settings
- [ ] Updated company contact information
- [ ] Tested on mobile devices
- [ ] Set up contact form integration
- [ ] Configured custom domain (if applicable)
- [ ] Added Google Analytics (optional)
- [ ] Tested all navigation links
- [ ] Verified parent company links work

**Your website is now live! 🎉**

Visit: `https://YOUR-USERNAME.github.io/finis-website/`
