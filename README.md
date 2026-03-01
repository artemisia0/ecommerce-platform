# E-commerce Platform

[Demo video](https://www.youtube.com/watch?v=5PtVlJK-Azg)

---

## Overview
This project is an educational full-stack e-commerce application built to demonstrate core web development concepts, including authentication, role-based access control, data modeling, and payment integration. The focus is on functionality and architecture rather than visual design.

---

## Features

### Authentication & Authorization
- User authentication (sign up, sign in, sign out)
- Role-based access control:
  - Regular user
  - Admin

### Admin Dashboard
- Accessible to admin users
- CRUD operations for:
  - Products
  - Categories
  - Collections

### Store Functionality
- Product listings with image preview on hover
- Category pages with pagination
- Shopping cart with editable item quantities
- Online card payments via Stripe (test mode)

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React (Server Components, Suspense)
- TypeScript
- Tailwind CSS
- Material Tailwind
- Heroicons
- Jotai

### Backend / Infrastructure
- Prisma ORM (PostgreSQL)
- iron-session
- bcrypt
- Stripe

---

## Purpose
This project was built as a learning and portfolio application to practice full-stack development patterns and modern Next.js features. It is not intended to be production-ready.
