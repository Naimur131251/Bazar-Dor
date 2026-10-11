 <div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=32&pause=1000&color=05893E&center=true&vCenter=true&width=700&lines=%E0%A6%AC%E0%A6%BE%E0%A6%9C%E0%A6%BE%E0%A6%B0+%E0%A6%A6%E0%A6%B0;Smart+Market+Price+Tracker;Know+the+Price.+Shop+Smarter." alt="Bazar Dor animated title" />

<p><strong>বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন, তুলনা করুন এবং সচেতনভাবে কেনাকাটা করুন।</strong></p>

<p>
  <a href="#-overview">Overview</a> ·
  <a href="#-features">Features</a> ·
  <a href="#-tech-stack">Tech Stack</a> ·
  <a href="#-installation">Installation</a> ·
  <a href="#-project-structure">Structure</a>
</p>

<img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
<img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/Better_Auth-Authentication-05893E?style=for-the-badge" alt="Better Auth" />

<br />

**Making everyday shopping smarter, one price at a time.**

</div>

---

## 📌 Overview

**Bazar Dor (বাজার দর)** is a modern, responsive market-price tracking web application built with Next.js and TypeScript. It helps users explore essential product prices, track price changes, compare market prices and access personalized account features.

The project focuses on a clean user experience, Bengali-first content, reusable components, loading states and secure authentication workflows.

<br/>

## ✨ Features

<table>
<tr>
<td width="50%">

### 📊 Market Insights
- Browse essential product prices.
- Discover products by category.
- View price increases and decreases.
- Explore individual product details.

</td>
<td width="50%">

### 💹 Price Comparison
- Compare minimum and maximum prices.
- View average market prices.
- Check yesterday's and today's prices.
- Sort products by price.

</td>
</tr>
<tr>
<td width="50%">

### 🔐 Authentication
- Email and password sign-in.
- Account registration.
- Google and GitHub sign-in options.
- Better Auth integration with MongoDB.

</td>
<td width="50%">

### 👤 Profile Management
- View account information.
- Update your display name.
- Change your profile image using a URL.
- Sign out securely.

</td>
</tr>
<tr>
<td width="50%">

### ⚡ User Experience
- Responsive layouts.
- Animated loading skeletons.
- Toast notifications.
- Custom 404 page.
- Bengali number formatting.

</td>
<td width="50%">

### 🧩 Modern Architecture
- Next.js App Router.
- Reusable React components.
- TypeScript interfaces.
- API-driven product data.
- Server-side data fetching and revalidation.

</td>
</tr>
</table>

<br/>

## ✨ Key Features

- 🛒 **Real-Time Market Price Data** — Fetch market product prices from an external API.
- 📂 **Dynamic Product Categories** — Browse products by categories such as চাল, ডাল, and তেল.
- 📈 **Price Increase Tracking** — Highlight products whose prices have increased.
- 📉 **Price Decrease Tracking** — Identify products whose prices have decreased.
- 💹 **Price Change Indicators** — Display price trends using directional arrows and percentage changes.
- 🔎 **Product Details** — View individual product information through dynamic routes.
- 🇧🇩 **Bangla-First Experience** — Present product names, market prices, and relevant information in Bengali.
- 🔢 **Bengali Number Formatting** — Improve readability by displaying numbers in Bengali where applicable.
- 🔄 **API Data Fetching & Caching** — Use Next.js data-fetching and revalidation strategies to manage API requests.
- 🧭 **Dynamic Navigation** — Navigate between the home page, product categories, and product details.
- 🚫 **Custom 404 Page** — Display a friendly not-found page with a link back to the home page.
- 📱 **Responsive Interface** — Provide a layout designed for mobile, tablet, and desktop screens.
- 🔐 **Authentication Integration** — Integrate Better Auth with MongoDB for authentication functionality, where configured.
- 🎨 **Modern UI Design** — Use a clean interface with a consistent color palette and clear visual hierarchy.

<br/>

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js (App Router) | Application framework and routing |
| React | Component-based UI |
| TypeScript | Type safety |
| Tailwind CSS | Responsive styling |
| Better Auth | Authentication |
| MongoDB | Authentication data storage |
| External REST API | Market price and category data |
| Git & GitHub | Version control and project hosting |

<br/>

## 🎯 Project Goal

Bazar Dor aims to make everyday market prices easier to explore by organizing products into categories and highlighting price movements through a Bengali-friendly interface.

<br/>

## 🎨 Design System

<div align="center">

| Color | Hex | Usage |
|:---:|:---:|---|
| <img src="https://placehold.co/24x24/05893E/05893E.png" alt="Green" /> | `#05893E` | Primary brand color |
| <img src="https://placehold.co/24x24/1D271F/1D271F.png" alt="Dark green" /> | `#1D271F` | Main text |
| <img src="https://placehold.co/24x24/D03739/D03739.png" alt="Red" /> | `#D03739` | Price increase and errors |
| <img src="https://placehold.co/24x24/FFFFFF/FFFFFF.png" alt="White" /> | `#FFFFFF` | Card surfaces |

</div>

The interface uses Bengali typography, clean white cards, green accents, responsive spacing and subtle animations.

<br/>

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/bazar-dor.git
cd bazar-dor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

```env
BETTER_AUTH_DB_URL=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_strong_random_secret
BETTER_AUTH_URL=http://localhost:3000
```

> Configure Google and GitHub OAuth credentials if you want to use social sign-in. Match the environment variable names to those referenced in your authentication configuration. Never commit real secrets to GitHub.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm run start
```

## 🔌 API Integration

The application fetches product and category information from its configured REST API.

| Resource | Endpoint pattern |
|---|---|
| Products | `/api/bazardor/products` |
| Categories | `/api/bazardor/categories` |
| Product details | `/api/bazardor/products/{slug}` |
| Category products | `/api/bazardor/products?category={categoryId}` |

**Base URL:** `https://openapi.programming-hero.com` is used by the product detail and category snippets provided for this project. Other components may use a different configured API host.

Product information can include today's price, historical prices, price-change percentages, category information and market-level minimum/maximum prices.

## 🗂️ Project Structure

```text
bazar-dor/
├── public/
│   └── logo-icon.png
├── src/
│   ├── app/
│   │   ├── category/
│   │   │   └── [categoryId]/
│   │   ├── product/
│   │   │   └── [slug]/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── profile/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Banner.tsx
│   │   ├── AllProducts.tsx
│   │   ├── PriceIncrease.tsx
│   │   └── PriceDecrease.tsx
│   ├── lib/
│   │   └── auth-client.ts
│   └── types/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

*This tree is illustrative. Adjust it to match the actual location of your `app`, `components`, `lib` and `types` folders.*

## 🔒 Authentication Flow

<details>
<summary><strong>📧 Email & Password Authentication</strong></summary>

Users can create an account and sign in using email and password. Form validation checks required fields, email formatting and password requirements.

</details>

<details>
<summary><strong>🌐 Social Authentication</strong></summary>

Google and GitHub sign-in are available through Better Auth's social authentication integration. Valid provider credentials and callback URLs are required.

</details>

<details>
<summary><strong>👤 Profile Updates</strong></summary>

Authenticated users can update their name and profile image URL. The profile interface refreshes session data after a successful update.

</details>

## ⚡ Performance & UX

- **Data revalidation:** Product and category requests can use Next.js revalidation.
- **Loading states:** Skeleton components provide feedback while content loads.
- **Error handling:** Toast messages communicate authentication and profile-operation results.
- **Accessibility:** Semantic HTML and form labels improve usability.
- **Responsive design:** Layouts adapt to mobile, tablet and desktop screens.

## 🧭 Roadmap

- [x] Product category navigation
- [x] Product details and market price summaries
- [x] Price sorting
- [x] Authentication and profile management
- [x] Custom not-found page
- [ ] Advanced search and filtering
- [ ] Favorite products and personalized watchlists
- [ ] Historical price charts
- [ ] Automated tests and expanded accessibility checks

## 🤝 Contributing

Contributions, issues and feature suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request with a clear description.

## 👨‍💻 Author

<div align="center">

### MD Naimur Rahman

*Student of Programming Hero*

<a href="https://github.com/Naimur131251">
  <img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github" alt="GitHub Profile" />
</a>

</div>

---

<div align="center">

**বাজার দর — সঠিক দামের বিশ্বস্ত ঠিকানা।**

*Built with ❤️ using Next.js and TypeScript.*

</div>
