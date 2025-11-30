# StayAssist - Modern Accommodation Booking Platform (Frontend)

StayAssist is a modern, responsive web application that serves as the
frontend for a property rental and booking service. It allows users to
browse listings, view property details, create listings as hosts, manage
bookings, and handle authentication --- all powered by a dedicated
backend API.

------------------------------------------------------------------------

## 🚀 Key Features

### **Authentication & User Management**

-   User **registration** (`/signup`) and **login** (`/login`)
-   Secure API interactions using **JWT tokens** (handled via cookies)
-   **My Bookings** page for authenticated users displaying reservation
    history

### **Listing Management & Discovery**

-   **Home Page (`/`)**: Search bar + 4 featured listings fetched from
    API
-   **Listings Page (`/listings`)**: Main property browsing area
-   **Detail View (`/listings/:id`)**: Full property information
-   **Host Tools (`/create-listing`)**: Authenticated users can add new
    listings

### **Booking Functionality**

-   Create bookings via `bookingApi.create`
-   Dedicated **My Bookings** section with clean date formatting and
    quick navigation

### **Responsive UI**

-   Built with **Next.js**, **Tailwind CSS**, and **React**
-   Works seamlessly across mobile, tablet, and desktop screens

------------------------------------------------------------------------

## 💻 Technology Stack

  Category           Technologies Used
  ------------------ -----------------------------
  Framework          Next.js (App Router)
  Language           TypeScript
  Styling            Tailwind CSS
  Components         React Functional Components
  API Client         Axios
  State Management   React Hooks

------------------------------------------------------------------------

## 🛠️ Setup & Installation

### **Prerequisites**

-   Node.js (LTS recommended)
-   A running instance of the StayFinder Backend API\
    (configured at: `http://localhost:4000/api/` inside `lib/api.ts`)

### **Steps**

#### 1. **Clone the Repository**

``` bash
git clone [your-repo-url]
cd stayfinder-frontend
```

#### 2. **Install Dependencies**

``` bash
npm install
# or
yarn install
```

------------------------------------------------------------------------

## 📌 Notes

This project is a fully client-side application designed to plug
directly into the StayAssist backend.

------------------------------------------------------------------------

