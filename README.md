# 🎨 ArtAuction — Fine Art Auction Marketplace

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.2.1-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Azure DevOps](https://img.shields.io/badge/Deployment-Local%20Dev-FE7A16?style=for-the-badge&logo=azuredevops)](https://github.com/Ahmad-Tharwat07/ArtAuction_Backend)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](#license)

> **ArtAuction** is a modern auction marketplace for curated fine art, built as a professional portfolio project with role-based access, live bidding, artwork administration, and advanced filtering.

---

## 🚀 Project Overview

ArtAuction is a full-featured frontend application crafted for a collaborative art auction ecosystem. It empowers artists, buyers, and administrators to manage artworks, launch auctions, bid in real time, and maintain reliable auction workflows.

### What problem does it solve?

Traditional art marketplaces can be fragmented and slow. ArtAuction centralizes the entire auction lifecycle in a single user interface so that:

- Artists can deploy and manage artwork listings.
- Buyers can discover, bid, and win art in real time.
- Admins can approve content, moderate users, and monitor marketplace health.

### Who is this for?

- 🎨 Artists who need a polished marketplace to launch and manage creative auctions.
- 🛍️ Collectors and buyers who want a modern auction experience with bidding history and watchlists.
- 🧑‍💼 Admins who require robust moderation, content approval, and analytics.
- 🧪 Recruiters and portfolio reviewers looking for a complex frontend architecture with production-ready patterns.

---

## 🌟 Core Features

ArtAuction delivers production-level capabilities across authentication, auction operations, administrative workflows, and marketplace discovery.

### Authentication & Authorization

- 🔐 Secure login and registration flows with JWT-based token authentication.
- 👤 Role-aware access control for `Artist`, `Buyer`, and `Admin` users.
- 🚫 Unauthorized users are redirected to a `Forbidden` page.
- 🗝️ Local token storage via `localStorage` for persistent sessions.

### User Management

- 🧾 Artist and buyer registration with backend approval flows.
- 🛠️ Admin dashboards for reviewing pending users, approving or rejecting accounts.
- 🚫 Account deletion available through profile actions.
- 📊 Role-specific page access ensures each user only sees what is relevant.

### Auctions & Art Management

- 🎟️ Seamless auction lifecycle: create, start, extend, close, and buy artwork.
- 🖼️ Artwork upload and edit flows for artists.
- 🛒 Buy-now and auction bidding support.
- 📌 Artist-specific `My Artworks` and `Artwork Management` pages.

### Bidding System

- 💬 Real-time bid updates using SignalR over a live auction hub.
- 🧾 Bid history accessible from artwork detail pages.
- 🥇 Buyer-specific views for `My Bids` and `My Wins`.
- 🛎️ Notification and activity flows tied to auction state.

### Notifications

- 🔔 In-app notifications for auction updates, approvals, and bid events.
- ✅ Mark notifications as read, clear individual messages, or clear all.
- 📚 User-specific notification listing.

### Search and Filtering

- 🔍 Text search across artwork titles and captions.
- 🏷️ Tag-based filtering plus category selection.
- 💰 Min/max price filters and artist name search.
- 🔄 Reset filters instantly for fast discovery.

### Dashboards

- 📈 Admin dashboard for marketplace oversight.
- 👩‍🎨 Artist dashboard for artwork performance and auction controls.
- 🧑‍💻 Buyer dashboard surfaces bids, wins, watchlist items, and active auctions.

### Responsive Design

- 📱 Mobile-first design with adaptive layouts.
- 📟 Tablet support for mid-size screens.
- 🖥️ Desktop dashboard and gallery layouts.
- 🎨 Tailwind CSS utility classes create a modern brand experience.

### Admin Tools

- 🗂️ Admin CRUD for artworks, categories, tags, and users.
- ✅ Approve/pending/rejected workflows for user accounts and artwork.
- 🧭 Admin navigation with sidebar management.

### Extra Platform Enhancements

- 🧩 Modular custom hooks for code reuse and separation of concerns.
- 🧠 Centralized `AuthContext` and `NotificationContex` for state management.
- 📦 Axios-based service layer for organized API communication.
- 🧩 Recharts for data presentation inside admin dashboards.

---

## 🧰 Tech Stack

### Frontend

- React 19
- React Router DOM 7
- Vite 7
- Tailwind CSS 4
- React Hook Form
- Formik
- Yup
- React Hot Toast
- Recharts
- Lucide React

### State & Context

- React Context API
- Custom hooks for domain-specific logic

### Networking & Real-Time

- Axios for API calls
- SignalR hub integration for live bidding
- react-use-websocket / real-time event handling

### Authentication and Security

- JWT authorization tokens
- Local storage session management
- Role-based route protection

### Deployment / Tooling

- Vite development server
- ESLint
- json-server (demo/mock mode available)

### Backend (inferred)

- .NET / ASP.NET Core style REST API patterns
- SignalR real-time hub service
- JWT bearer authentication
- Role-based authorization middleware
- Relational or document database storage

---

## 🏗️ Architecture

The architecture is organized as a modern single-page application with a dedicated API layer and real-time auction updates.

### Frontend Architecture

- `src/App.jsx` defines route layout and protected admin/user segments.
- `src/context/` manages authentication and notification state globally.
- `src/api/` contains service modules for each backend domain.
- `src/hooks/` abstracts data fetching, event handling, and business flows.
- `src/components/` houses reusable UI bricks, cards, layouts, modals, and filters.
- `src/pages/` contains route-level experience pages and admin views.

### Backend Architecture

- REST API endpoints are grouped by resource: `Account`, `Artwork`, `Bid`, `AuctionResult`, `Notification`, `Category`, `Tag`, `Watchlist`.
- Each request carries a bearer token for authentication.
- Admin and role-specific endpoints are protected with role checks.
- Real-time bid updates are delivered through a SignalR hub at `/bidAuction`.

### Database Architecture

The backend stores:

- Users and roles
- Artwork listings and auction metadata
- Bid history and auction results
- Categories, tags, and watchlist relationships
- Notification events and read state

### API Flow

- Frontend sends JSON or form-data requests to `http://localhost:5000/api/...`.
- Authenticated requests include `Authorization: Bearer <token>`.
- Backend validates JWT, applies role checks, and returns structured responses.
- Responses are rendered in data-driven pages and tables.

### Authentication Flow

```mermaid
sequenceDiagram
    participant User as User Browser
    participant FE as Frontend React App
    participant API as Backend API
    participant DB as Database

    User->>FE: Submit login form
    FE->>API: POST /api/Account/login
    API->>DB: Validate email/password
    DB-->>API: Return user record
    API-->>FE: Send JWT and user payload
    FE->>Browser: Store token + user profile in localStorage
    FE->>API: Request protected data with Bearer token
    API->>FE: Return protected resource
    FE->>User: Render dashboard or auction page
```

### System Diagram

```mermaid
flowchart LR
    subgraph Frontend
        F1[React UI] --> F2[Router & Protected Routes]
        F1 --> F3[AuthContext / NotificationContext]
        F1 --> F4[Realtime SignalR Client]
    end

    subgraph Backend
        B1[REST API /Controllers] --> B2[Auth Service]
        B1 --> B3[Business Logic]
        B1 --> B4[SignalR Auction Hub]
        B3 --> DB[Database]
    end

    F1 -->|HTTPS JSON| B1
    F4 -->|WebSocket / SignalR| B4
    B3 -->|CRUD| DB
```

---

## 🖼️ Screenshots

### Auctions Page

![Auctions](Screenshots/auctions.png)

The Auctions page displays the latest auction listings and includes filtering, trending art, and a list of live auctions available to buyers.
![Auctions](Screenshots/applied-filters.png)

The Auctions page with filters

### Auction Details

![Auction Details](Screenshots/auction-details.png)
![Auction Details](Screenshots/auction-details2.png)

Detailed auction view with current bid, remaining time, bid history, and action controls for watching or bidding.

### Create Auction

![Create Auction](Screenshots/create-auction.png)
![Create Auction](Screenshots/create-auction2.png)

Artist artwork upload and auction creation screen with category, tag, price, and timing fields.

### Logon

![Login](Screenshots/login.png)

Login page where users can sign in and make actions.

### Register

![Register](Screenshots/register.png)

Register page where users can create new account wheather as an artist or buyer.

### Profile

![Profile](Screenshots/profile.png)

Profile page where users can view their account information, update personal settings, and manage their own data.

### Dashboard

![Dashboard](Screenshots/dashboard.png)

Admin dashboard for marketplace overview, quick actions, and pending approvals.

### Categories Page

![Categories](Screenshots/categories.png)

Categories page with curated artwork sections and category filters.

### My Artworks

![My Artworks](Screenshots/my-artworks.png)

Artist dashboard listing all artworks, auction state, and management actions.

### My Bids

![My Bids](Screenshots/my-bids.png)

Buyer bid history page with current bids, past auctions, and auction status.

### My Wins

![My Wins](Screenshots/my-wins.png)

Winner page for buyers to see completed auction wins and claim records.

### Watchlist

![Watchlist](Screenshots/watchlist.png)

Saved watchlist page for buyers to follow auctions and receive updates on favorites.

### Notifications

![Notifications](Screenshots/notifications.png)

Notification center for auction alerts, approvals, and event reminders.

### Artwork Management

![Artwork Management](Screenshots/artwork-management.png)

Artwork management page for artists to update listings, view auction status, and access bid analytics.

### Admin Users

![Admin Users](Screenshots/admin-users.png)

Admin users page for managing registered users, pending approvals, and account moderation.

### Admin Artworks

![Admin Artworks](Screenshots/admin-artworks.png)

Admin artwork moderation area with approval and rejection controls.

### Admin Categories

![Admin Categories](Screenshots/admin-categories.png)

Category management interface for creating, editing, and deleting categories.

### Add Category

![add category](Screenshots/addcategory.png)


## 📱 Responsive Design

### Mobile

![Mobile](Screenshots/mobile2.png)
![Mobile](Screenshots/mobile.png)
![Mobile](Screenshots/my-wins.png)
![Mobile](Screenshots/my-bids.png)

Mobile layout delivers a vertical scrolling experience with condensed cards, collapsible menus, and streamlined auction actions.

**Responsive behavior details:**

- Tailwind CSS breakpoints deliver smooth scaling across screen widths.
- Cards, forms, and modals reflow for narrower viewports.
- Mobile-friendly navigation keeps key actions accessible.
- The auctions list, watchlist, and notifications remain usable on handheld devices.

---

## 🛠️ Installation Guide

### Frontend Setup

```bash
git clone https://github.com/cheetah-10/Art-Auction.git
cd project
npm install
npm run dev
```

### Backend Setup

Repository:

[ArtAuction Backend Repository](https://github.com/Ahmad-Tharwat07/ArtAuction_Backend)

```bash
git clone https://github.com/Ahmad-Tharwat07/ArtAuction_Backend.git
cd ArtAuction_Backend
```

Install backend dependencies with the backend package manager, then create the `.env` file and run the backend server.

### Backend Run Instructions

```bash
dotnet restore
dotnet run
```

### Local Development URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### Environment Variables

#### Frontend

The current frontend uses hard-coded backend endpoints in `src/api/*.js`.
For production, create a `.env` file with a variable like:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Then update API service modules to use `import.meta.env.VITE_API_BASE_URL`.

#### Backend

Based on the backend API patterns, the backend environment variables should include:


### API Configuration

The frontend communicates with the backend using Axios and bearer token authentication.
Every protected API call includes an `Authorization: Bearer <token>` header.

Example request flow:

1. User logs in.
2. Frontend stores JWT in `localStorage`.
3. Protected pages read token and send it with requests.
4. Backend validates the JWT and returns the requested resource.

## 📁 Project Structure

```text
src/
├── api/
│   ├── artwork.api.js
│   ├── auctionResult.api.js
│   ├── auctionHub.js
│   ├── auth.api.js
│   ├── bid.api.js
│   ├── category.api.js
│   ├── notification.api.js
│   ├── tag.api.js
│   └── watchlist.api.js
├── components/
│   ├── Artwork/
│   │   └── ArtworkForm.jsx
│   ├── ArtworkManagement/
│   │   ├── ArtworkHeader.jsx
│   │   ├── ArtworkStats.jsx
│   │   ├── AuctionResultModal.jsx
│   │   ├── BidsTable.jsx
│   │   ├── ControlPanel.jsx
│   │   └── ExtendAuctionModal.jsx
│   ├── Cards/
│   │   ├── ArtworkCard.jsx
│   │   ├── AuctionCard.jsx
│   │   ├── CategoryAdminCard.jsx
│   │   ├── PendingUserInfo.jsx
│   │   └── StatsCard.jsx
│   ├── Filters/
│   │   └── AuctionFilters.jsx
│   ├── Footer/
│   │   └── Footer.jsx
│   ├── Layout/
│   │   └── Layout.jsx
│   ├── Loader/
│   │   └── Loader.tsx
│   ├── Modals/
│   │   ├── CategoryModal.jsx
│   │   └── TagModal.jsx
│   ├── Navbar/
│   │   └── Navbar.jsx
│   ├── ProtectedRoute/
│   │   └── ProtectedRoute.jsx
│   └── Sidebar/
│       └── AdminSidebar.jsx
├── context/
│   ├── AuthContext.jsx
│   └── NotificationContex.jsx
├── hooks/
│   ├── useArtworkManagement.js
│   ├── useArtworks.js
│   ├── useAuctions.js
│   ├── useBids.js
│   ├── useCategories.js
│   ├── useNotifications.js
│   ├── useTags.js
│   ├── useUsers.js
│   └── useWatchlist.js
├── pages/
│   ├── Auction/
│   │   ├── AuctionDetails.jsx
│   │   ├── Auctions.jsx
│   │   ├── My-bids.jsx
│   │   └── My-wins.jsx
│   ├── artworks/
│   │   ├── ArtworkManagement.jsx
│   │   └── my-artworks.jsx
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   └── Register.jsx
│   ├── admin/
│   │   ├── AdminArtworks.jsx
│   │   ├── AdminCategories.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── AdminTags.jsx
│   │   └── AdminUsers.jsx
│   ├── Categories.jsx
│   ├── CategoryDetails.jsx
│   ├── Forbidden.jsx
│   ├── Notifications.jsx
│   ├── Notfound.jsx
│   └── Watchlist.jsx
├── index.css
├── main.jsx
└── App.jsx
```

### Folder meanings

- `src/api/`: HTTP service layer with clean endpoints and Axios configuration.
- `src/components/`: Reusable UI building blocks and layout elements.
- `src/context/`: Global state providers for auth and notifications.
- `src/hooks/`: Custom hooks for encapsulating domain logic.
- `src/pages/`: Route-specific views and page compositions.
- `src/styles/`: Theme and utility styling (via Tailwind and global CSS).

---

## 🧭 User Journey

### 1. Registration

- A new user lands on the registration page.
- They complete the form and submit details.
- The frontend calls `/api/Account/register`.
- The backend creates the user and may require admin approval for certain roles.

### 2. Login

- The user logs in with email and password.
- Frontend sends credentials to `/api/Account/login`.
- A JWT is returned and saved in `localStorage`.
- Protected routes become accessible based on the user's role.

### 3. Browsing Artworks

- Users can explore the home page and Auctions page.
- Search, tags, category filters, and price filters refine results.
- Each artwork links to an auction details page.

### 4. Creating Auctions

- Artists access `Upload Artwork` or `Edit Artwork`.
- Artwork forms allow image upload, category selection, tag assignment, and auction metadata.
- Artists submit to `/api/Artwork`.
- Submitted art flows into pending approval or live auction state.

### 5. Placing Bids

- Buyers select an auction and place a bid through `Bid` actions.
- The `placeBidApi` endpoint records the bid.
- Real-time SignalR notifications update current price for all viewers.

### 6. Winning Auctions

- Completed auctions are recorded in `AuctionResult`.
- Buyers can review wins on `My Wins`.
- Winner records integrate payment-ready or buy-now workflow.

### 7. Managing Profile

- Users reach `Profile` to view personal details.
- Account deletion and profile data updates are available.
- Buyers monitor watchlists, notifications, and bid history.
- Artists manage art and auction states from management views.

---

## 📡 API Documentation

| Endpoint | Method | Description |
| -------- | ------ | ----------- |
| `/api/Account/register` | POST | Register a new user |
| `/api/Account/login` | POST | Authenticate and receive JWT |
| `/api/Account/profile` | GET | Get current user profile |
| `/api/Account/{userId}` | DELETE | Delete user account |
| `/api/Account/all` | GET | Admin: list all users |
| `/api/Account/pending` | GET | Admin: list pending users |
| `/api/Account/rejected` | GET | Admin: list rejected users |
| `/api/Account/approve/{userId}` | POST | Admin: approve user registration |
| `/api/Account/reject/{userId}` | POST | Admin: reject user registration |
| `/api/Artwork` | POST | Create artwork / auction |
| `/api/Artwork/{id}` | PUT | Edit artwork details |
| `/api/Artwork/{id}` | GET | Fetch specific artwork |
| `/api/Artwork/{id}` | DELETE | Delete an artwork |
| `/api/Artwork/my` | GET | Get authenticated artist's artworks |
| `/api/Artwork/start/{id}` | POST | Start auction for artwork |
| `/api/Artwork/close/{id}` | POST | Close auction manually |
| `/api/Artwork/extend/{id}` | POST | Extend auction end time |
| `/api/Artwork` | GET | List all artworks and auctions |
| `/api/Artwork/pending` | GET | Admin: get pending artwork submissions |
| `/api/Artwork/rejected` | GET | Admin: get rejected artwork submissions |
| `/api/Artwork/approve/{id}` | POST | Admin approves artwork |
| `/api/Artwork/reject/{id}` | POST | Admin rejects artwork |
| `/api/Artwork/buy/{id}` | POST | Buy artwork now |
| `/api/Bid` | POST | Place a bid on an artwork |
| `/api/Bid/history/{artworkId}` | GET | Get bid history for artwork |
| `/api/Bid/my-bids` | GET | Get buyer's bid history |
| `/api/AuctionResult/my-wins` | GET | Get completed wins for buyer |
| `/api/AuctionResult/artwork/{id}` | GET | Get auction result for artwork |
| `/api/AuctionResult/{id}` | GET | Get auction result details |
| `/api/AuctionResult` | GET | Admin: list all auction results |
| `/api/Notification/my` | GET | Get user notifications |
| `/api/Notification/mark-read/{id}` | PUT | Mark one notification read |
| `/api/Notification/mark-all-read` | PUT | Mark all notifications read |
| `/api/Notification/{id}` | DELETE | Delete one notification |
| `/api/Notification/clear-all` | DELETE | Clear all notifications |
| `/api/Category` | POST | Create a new category |
| `/api/Category` | GET | Get all categories |
| `/api/Category/{id}` | GET | Get category by ID |
| `/api/Category/{id}` | PUT | Edit a category |
| `/api/Category/{id}` | DELETE | Delete a category |
| `/api/Tag` | POST | Create a new tag |
| `/api/Tag` | GET | Get all tags |
| `/api/Watchlist/add/?artworkId=` | POST | Add artwork to watchlist |
| `/api/Watchlist/remove/?artworkId=` | DELETE | Remove artwork from watchlist |
| `/api/Watchlist` | GET | Get authenticated user watchlist |

---

## ⚡ Performance & Security

### Authentication

- JWT tokens authenticate all protected routes.
- Token storage is implemented in `localStorage` and refreshed each session.
- Protected routes are enforced with `ProtectedRoute` and role checks.

### Authorization

- `ProtectedRoute` guards both page access and route rendering.
- Admin-only sections are restricted to the `Admin` role.
- Artist and buyer-specific pages are gated by permitted roles.

### Validation

- Form validation is handled using `Formik`, `react-hook-form`, and `Yup`.
- Input sanitization and error handling are applied before API submission.
- Filter and search inputs are validated at the page level.

### Error Handling

- API calls use `try/catch` blocks throughout custom hooks.
- User-friendly toast notifications communicate errors and success states.
- The UI directs failed authorization attempts to `Forbidden` or `Login` pages.

### Security Measures

- Backend calls require bearer tokens for sensitive endpoints.
- The frontend avoids exposing secret credentials in source files.
- Role-based route control prevents unauthorized administration.

### Optimization

- `React Router` dynamic routing reduces full-page reloads.
- Modular hooks minimize duplicated state logic.
- Tailwind CSS builds a lightweight, performant design system.
- Lazy network requests occur in page-specific hooks.

---

## 🔮 Future Improvements

These enhancements would make ArtAuction even stronger:

1. 🧩 Centralize API base URL into environment variables.
2. 🌐 Add social login with Google or GitHub.
3. 💳 Integrate payment and checkout processing.
4. 📦 Add persistent server-side pagination for auctions.
5. 📱 Improve mobile navigation with a native bottom tab bar.
6. 🧠 Add advanced dashboards with analytics charts and auction KPIs.
7. ⚙️ Implement server-side rendering or pre-rendering for SEO.
8. 🏗️ Add image optimization and CDN delivery for artwork assets.
9. 🔒 Add refresh token handling and session expiration handling.
10. 🧪 Create automated unit / integration tests for critical workflows.

---

## 🤝 Contributing

Thank you for your interest in ArtAuction.

To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/xyz`.
3. Install dependencies: `npm install`.
4. Make your changes.
5. Run the app locally and verify your changes.
6. Open a pull request with a clear summary.

Please keep contributions focused on:

- UI/UX improvements
- bug fixes
- performance optimizations
- accessibility updates
- documentation enhancements

---

## 📜 License

This project is provided under the **MIT License**.

---

## 🧑‍💼 Author

**Ahmad Tharwat**

- Frontend Architect for ArtAuction.
- Built with modern React, Tailwind, and real-time auction workflows.
- Portfolio-ready implementation of a role-based marketplace.

---

## 📌 Notes

- The frontend currently points to `http://localhost:5000` for all API calls.
- For production deployments, centralize the API base URL in environment variables.
- The backend repository is required to fully run the system and to understand additional server-side environment settings.
