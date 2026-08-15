# Ember & Crust — Pizza Shop

A full pizza shop web app: public marketing site (Home, About, Contact, Services, Menu),
email/password authentication (login, register, forgot password), and a role-protected
admin dashboard with CRUD for food items, services, and user roles.

- **Frontend:** React 19 + Vite + React Router + Tailwind CSS v4
- **Backend:** Google Firebase (Authentication + Firestore)

## 1. Firebase project setup

1. Go to the [Firebase console](https://console.firebase.google.com/) → **Add project** → name it
   (e.g. `ember-and-crust`) → finish the wizard.
2. **Add a web app**: on the project overview page, click the `</>` icon, register an app
   (nickname anything), and copy the `firebaseConfig` values shown — you'll need them in step 3.
3. **Enable Authentication**: left sidebar → *Build → Authentication → Get started* →
   under **Sign-in method**, enable **Email/Password**.
4. **Enable Firestore**: left sidebar → *Build → Firestore Database → Create database* →
   start in **production mode** → pick a region.
5. **Apply security rules**: in Firestore → **Rules** tab, paste the contents of
   `firestore.rules` (included in this project) and click **Publish**. These rules make the
   menu/services publicly readable, restrict writes to admins, let users create only their
   own "customer" profile, and only let admins read contact messages.

## 2. Configure the app

```bash
cp .env.example .env
```

Open `.env` and fill in the values from your Firebase web app config:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## 3. Install and run

```bash
npm install
npm run dev
```

Visit the printed local URL (usually `http://localhost:5173`).

## 4. Create your first admin account

Every new sign-up gets the `customer` role by default (see `AuthContext.jsx`). To make
someone an admin:

1. Register a normal account on the site (`/register`).
2. In the Firebase console → **Firestore Database** → `users` collection → open the
   document with that user's UID.
3. Change the `role` field from `customer` to `admin`, then save.
4. Refresh the site and log in again — you'll see a **Dashboard** link in the nav, and
   `/admin` will be accessible.

From then on, that admin can promote/demote other users directly from
**Admin → Users** in the dashboard (except changing their own role, to avoid
accidentally locking themselves out).

## 5. What's included

**Public site**
- `/` Home — hero, stats, featured dishes pulled live from Firestore
- `/about` — story, timeline, values
- `/services` — service offerings (falls back to sample content until an admin adds real ones)
- `/menu` — full food menu with category filtering, live from Firestore
- `/contact` — contact form that writes to the `contactMessages` collection

**Authentication** (`/login`, `/register`, `/forgot-password`)
- Email/password sign up and sign in via Firebase Auth
- New users get a `users/{uid}` profile document with `role: "customer"`
- Password reset sends a Firebase-hosted reset email

**Admin dashboard** (`/admin`, requires `role === "admin"`)
- **Overview** — live counts of food items, services, users, and contact messages
- **Food items** — add, edit, and remove menu items (name, price, category, image, description,
  visibility) — changes reflect instantly on the public `/menu` page
- **Services** — same CRUD pattern for the Services page
- **Users** — view all registered users and change their role between `customer` and `admin`

Route protection:
- `ProtectedRoute` — requires any signed-in user
- `AdminRoute` — requires a signed-in user whose Firestore profile has `role: "admin"`

## 6. Firestore data model

| Collection        | Fields                                                                | Access                        |
|--------------------|------------------------------------------------------------------------|--------------------------------|
| `users`            | `name, email, role, createdAt`                                        | self-read/create; admin write |
| `foodItems`        | `name, description, price, category, imageUrl, available, createdAt`  | public read; admin write      |
| `services`         | `name, description, tag, imageUrl, createdAt`                         | public read; admin write      |
| `contactMessages`  | `name, email, message, createdAt`                                     | public create; admin read     |

## 7. Build & deploy

```bash
npm run build
```

This outputs static files to `dist/`. Deploy anywhere that serves static sites — the
simplest option is **Firebase Hosting**, since it's the same project:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # choose "dist" as the public directory, configure as a single-page app
firebase deploy
```

## 8. Project structure

```
src/
  firebase/
    config.js           # Firebase app initialization (reads .env)
    firestoreApi.js      # CRUD helper functions for all collections
  contexts/
    AuthContext.jsx       # login/register/logout/reset + current user profile & role
  components/
    Navbar.jsx, Footer.jsx, TicketCard.jsx, LoadingScreen.jsx
    ProtectedRoute.jsx, AdminRoute.jsx
  pages/
    Home.jsx, About.jsx, Contact.jsx, Services.jsx, Menu.jsx
    Login.jsx, Register.jsx, ForgotPassword.jsx, NotFound.jsx
    admin/
      AdminLayout.jsx, Dashboard.jsx
      ManageFoodItems.jsx, ManageServices.jsx, ManageUsers.jsx
firestore.rules           # security rules to paste into the Firebase console
```
