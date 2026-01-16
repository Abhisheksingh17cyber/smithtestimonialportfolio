# Smith Aerospace Portfolio

A stunning, space-themed portfolio website for Aerospace Engineer Smith, built with React, TypeScript, and modern animation libraries.

## 🚀 Features

- **Space Galaxy Theme** - Immersive dark space theme with stars, nebulae, and floating elements
- **Smooth Animations** - Powered by Framer Motion, GSAP, and AOS
- **Interactive Particles** - Dynamic star field using tsparticles
- **3D Effects** - Parallax tilt cards and 3D transformations
- **Responsive Design** - Fully responsive across all devices
- **Custom Cursor** - Interactive cursor follower
- **Scroll Progress** - Visual scroll progress indicator
- **Contact Form** - EmailJS integration for contact form
- **Image Gallery** - Lightbox gallery with smooth transitions
- **Testimonials Slider** - Swiper.js powered testimonial carousel

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, GSAP, AOS
- **3D/Particles:** Three.js, tsparticles
- **Forms:** React Hook Form + EmailJS
- **Carousel:** Swiper.js
- **Icons:** React Icons, Lucide React, Heroicons

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/smith-aerospace-portfolio.git

# Navigate to directory
cd smith-aerospace-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗️ Build for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 🌐 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect the Vite configuration
5. Click Deploy

### GitHub Pages Deployment

1. Install gh-pages: `npm install -D gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run: `npm run deploy`

## ⚙️ Configuration

### EmailJS Setup

1. Create an account at [EmailJS](https://emailjs.com)
2. Create an email service and template
3. Update the following in `src/components/Contact.tsx`:
   - `YOUR_SERVICE_ID`
   - `YOUR_TEMPLATE_ID`
   - `YOUR_PUBLIC_KEY`

## 📁 Project Structure

```
smith-aerospace-portfolio/
├── public/
│   └── rocket.svg
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── CursorFollower.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Gallery.tsx
│   │   ├── Hero.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── Skills.tsx
│   │   ├── StarField.tsx
│   │   └── Testimonials.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Space Dark | `#0a0a0f` | Primary background |
| Space Navy | `#0d1b2a` | Secondary background |
| Space Blue | `#1b263b` | Cards and elements |
| Space Accent | `#00d4ff` | Primary accent |
| Space Cyan | `#00fff7` | Highlights |
| Space Purple | `#7b2cbf` | Secondary accent |
| Space Gold | `#ffd700` | Tertiary accent |
| Space Orange | `#ff6b35` | Warnings/alerts |

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍🚀 Author

**Smith** - Aerospace Engineer

---

*"Pioneering the future of space exploration"* 🚀
