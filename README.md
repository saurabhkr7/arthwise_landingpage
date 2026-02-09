# Arthhwise - Landing Page

## 🎯 Aim of Arthhwise
Arthhwise is a cutting-edge stock market simulation platform designed to demystify trading and financial literacy. It offers a risk-free environment through virtual paper trading, competitive fantasy stock contests, and real-time market dashboards. Beyond trading, it fosters a community with social features like articles, messaging, and leaderboards, empowering users to learn, compete, and grow their investment skills in a safe, gamified environment.

## 🚀 Repository Goal
This repository contains the **Next.js Landing Page**. Its primary purpose is to serve as the marketing gateway for the Arthhwise ecosystem, introducing the app, features, pricing, and providing a platform for blog content and user feedback.

## 🛠️ Prerequisites
- **Node.js**: v20 or later
- **npm**: v10 or later

## ⚙️ Setup & Installation
1. **Clone the repo**:
   ```bash
   git clone https://github.com/saurabhkr7/arthwise_landingpage.git
   cd arthwise_landingpage
   ```
2. **Install Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Environment Variables**:
   Create a `.env.local` file with the following:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000 # Points to ArthwiseServices backend
   ```

## 💻 Local Development
- **Start Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Lint Check**: `npm run lint`

## 🛡️ Development Rules & CI
To maintain code quality and production stability, the following rules apply:
- **No Direct Pushes**: All changes must be made in a new branch and submitted via a Pull Request (PR) to `main`.
- **Mandatory Approval**: Every PR requires at least **1 approval** from [@saurabhkr7](https://github.com/saurabhkr7) before merging.
- **CI Validation**: Every PR triggers a GitHub Action that validates:
  - **Dependency Integrity**: Ensures `npm install` passes.
  - **Build Integrity**: Ensures `npm run build` completes successfully.

## 📞 Communications
For any doubts, architectural questions, or PR reviews, please reach out to:
- **Primary Contact**: [@saurabhkr7](https://github.com/saurabhkr7)
