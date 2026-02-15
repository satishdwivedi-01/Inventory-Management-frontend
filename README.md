# Inventory Management System – Frontend

**Overview**

This repository contains the frontend of the Inventory Management System (IMS), built with React, Redux Toolkit, and TailwindCSS. It interacts with the backend API to provide a seamless inventory and stock management experience.


# Features

**User Roles:**

ADMIN – Full access (products, stock, history, adjustments)

VIEWER – Read-only access (products and stock history)

Dashboard: Quick overview of stock, low-stock alerts, and product summaries

Product Management:

Create, update, delete products

Auto-generated SKUs

Stock Management:

Adjust stock (IN/OUT)

Stock movement history

Soft delete stock movements

Before & after quantity tracking

Search & Pagination: For products and stock history

Role-Based UI: Admin-only actions like stock adjustment and deletion


**Tech Stack**

React.js with functional components

Redux Toolkit for state management

TailwindCSS for styling

Axios for API calls

React Router v6 for routing

JWT Authentication with backend

# Setup

1. Clone the repository

git clone https://github.com/satishdwivedi-01/Inventory-Management-frontend 
cd inventory-frontend

2. Install dependencies
npm install

3. Environment Variables

Create a .env file at the root:

VITE_API_URL=http://localhost:5000/api

4. Run  the app
npm run dev

5. Build for Production
npm run build


# Folder Structure
src/
 ├─ api/            # Axios instance and API calls
 ├─ app/            # Redux store and hooks
 ├─ components/     # Reusable UI components
 ├─ modules/
 │   ├─ auth/       # Login and authentication
 │   ├─ dashboard/  # Admin dashboard
 │   ├─ products/   # Product pages & modals
 │   ├─ stock/      # Stock pages, history, and modals
 ├─ routes/         # AppRoutes and ProtectedRoute


# Usage

**Login :**

Use the seeded users from backend scripts (seedAdmin.js / seedViewer.js)

Admin can create/edit products, adjust stock, and view full history

Viewer can only view products and stock history

**Products :**

Create or edit products using modals

Update stock directly from the product list

All product changes create stock movement if quantity changes

**Stock :**

Adjust stock using IN/OUT modal

View stock movement history with before/after quantities

Search by product name, SKU, or date

Admins can delete movements (soft delete)


# Notes

Make sure backend is running before using the frontend.

All API calls go through **VITE_API_URL** defined in .env.

Stock adjustments always track before/after quantities.

Soft deletes are respected in product and stock history listings.