<div align="center">

# 🏏 King Kohli: The Journey

### An animated, scroll-driven tribute to the career of Virat Kohli

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?logo=three.js)](https://threejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)

[Live Demo](#) · [Report a Bug](../../issues) · [Request a Feature](../../issues)

</div>

---

> ⚠️ **Unofficial fan project.** This site is not affiliated with, endorsed by, or connected to Virat Kohli, the BCCI, the IPL, or any cricket board or franchise. It is a fan-made tribute, built for educational and portfolio purposes. All trademarks and player likeness belong to their respective owners.

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Backend Setup (Firebase)](#-backend-setup-firebase)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Content & Media Disclaimer](#-content--media-disclaimer)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

## 🎯 About the Project

**King Kohli: The Journey** is a cinematic, scroll-driven website celebrating the career of cricketer Virat Kohli — from his childhood in Delhi to becoming one of the most decorated batsmen in the sport's history.

The site guides visitors through a scroll-scrubbed timeline of his life and career: junior cricket, international debuts, career-defining moments, and a full breakdown of his achievements across Test, ODI, T20I, and IPL cricket — anchored by a 3D, HUD-style interactive hero section inspired by heads-up-display interfaces.

This project was built as a showcase of modern front-end animation techniques (scroll-linked 3D rendering, GSAP-driven timelines) combined with a lightweight real-time backend.

## ✨ Features

- 🧊 **3D interactive hero** — a Three.js / React Three Fiber scene where a portrait rotates and shifts in true 3D space as the user scrolls, layered with animated HUD-style overlays and stat readouts. Includes a performance-aware 2D fallback for lower-powered devices.
- 🎬 **Cinematic scroll animations** — GSAP ScrollTrigger-driven reveals, pinned sections, and a scroll-scrubbed vertical milestone timeline.
- 📊 **Live, format-by-format stats dashboard** — animated counters across Test, ODI, T20I, and IPL, switchable via a sticky navigation bar and kept fresh by a scheduled backend job.
- 🏏 **Complete career timeline** — from the 2008 U-19 World Cup win through to his 2024 T20 World Cup title and 2025/2026 back-to-back IPL championships.
- 🏆 **Awards wall** — Arjuna Award, Padma Shri, Khel Ratna, and ICC honors, presented as an animated card grid.
- 🎥 **Iconic moments gallery** — embedded official YouTube highlights (no self-hosted video).
- 💬 **Fan Zone** — a community message wall and live poll, backed by Firestore.
- 📱 **Fully responsive** — designed and tested for both desktop and mobile browsers, with animations that gracefully simplify on smaller screens.
- ♿ **Accessibility-conscious** — respects `prefers-reduced-motion` throughout, including in the 3D hero.

## 📸 Screenshots

> _Add screenshots or a short GIF/video walkthrough here once the build is live — this section sells the project at a glance._

```
docs/
  screenshot-hero.png
  screenshot-timeline.png
  screenshot-stats.png
```

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Scroll Animation | [GSAP](https://gsap.com/) + ScrollTrigger |
| UI Motion | [Framer Motion](https://www.framer.com/motion/) |
| 3D Rendering | [Three.js](https://threejs.org/) via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei) |
| Backend / Database | [Firebase](https://firebase.google.com/) (Firestore, Auth, Cloud Functions, Hosting) |
| Live Sports Data | [CricketData.org](https://cricketdata.org) API |
| Deployment | [Vercel](https://vercel.com/) |

## 📁 Project Structure

```
king-kohli-journey/
├── app/                    # Next.js App Router pages & layouts
├── components/
│   ├── hero/                # 3D hero scene + HUD overlays
│   ├── timeline/             # Scroll-scrubbed milestone timeline
│   ├── stats-dashboard/      # Format-based stats counters
│   ├── ipl-section/
│   ├── gallery/
│   ├── awards-wall/
│   └── fan-zone/             # Message wall + live poll
├── data/
│   └── kohli-data.json      # Career stats, milestones, awards (seed data)
├── functions/                # Firebase Cloud Functions (scheduled stats refresh)
├── public/                   # Static assets (placeholder images, icons)
├── styles/
├── .env.example
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A [Firebase](https://firebase.google.com/) project (free tier is sufficient)
- A [CricketData.org](https://cricketdata.org) API key (free tier available)

### Installation

```bash
# clone the repo
git clone https://github.com/<your-username>/king-kohli-journey.git
cd king-kohli-journey

# install dependencies
npm install

# set up environment variables
cp .env.example .env.local
# then fill in your Firebase config values

# run the dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site locally.

### Environment Variables

Create a `.env.local` file with the following (see `.env.example`):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

> 🔒 **Never commit `.env.local` or real API keys.** The CricketData.org API key belongs only in your Cloud Function's environment config, never in client-side code or the repo.

## ☁️ Backend Setup (Firebase)

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
2. Enable **Firestore Database** and **Anonymous Authentication**
3. Deploy the scheduled Cloud Function in `/functions` that refreshes player stats from CricketData.org:
   ```bash
   cd functions
   npm install
   firebase deploy --only functions
   ```
4. Apply the Firestore security rules in `firestore.rules` (fan wall/poll writes are open to anonymous auth; the cached stats document is read-only from the client)
5. Seed Firestore with the initial data from `data/kohli-data.json`

## 🗺 Roadmap

- [ ] Core scroll experience & 3D hero
- [ ] Live stats dashboard (Test / ODI / T20I / IPL)
- [ ] Fan Zone (message wall + poll)
- [ ] Awards wall & gallery
- [ ] Performance pass for low-end/mobile devices
- [ ] Accessibility audit
- [ ] Public launch

See the [open issues](../../issues) for a full list of proposed features and known issues.

## 🤝 Contributing

This is primarily a personal/portfolio project, but suggestions and bug reports are welcome.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 Content & Media Disclaimer

All player photos, video content, and career statistics referenced in this project are used for **non-commercial, fan-tribute purposes only**. Video content is embedded exclusively via the official YouTube iframe player — no video files are hosted in this repository. Images must be properly licensed, sourced from Creative Commons/Wikimedia, or used with explicit permission — replace placeholder assets accordingly before any public deployment. This project claims no ownership over Virat Kohli's name, image, likeness, or any associated trademarks.

## 📄 License

Distributed under the MIT License for the **codebase only**. See [`LICENSE`](./LICENSE) for details. This license does **not** extend to third-party media (photographs, video, player likeness, or trademarks) referenced or displayed within the project.

## 🙏 Acknowledgements

- Career statistics and milestones compiled from public sources including [ESPNcricinfo](https://www.espncricinfo.com/), [Wikipedia](https://en.wikipedia.org/), and the [official IPL website](https://www.iplt20.com/)
- Built with [Next.js](https://nextjs.org/), [GSAP](https://gsap.com/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), and [Firebase](https://firebase.google.com/)

---

<div align="center">

Made by saudcoder7, for Virat Kohli fans.
linkedin https://www.linkedin.com/in/saood-faisal-259b40316/

</div>
