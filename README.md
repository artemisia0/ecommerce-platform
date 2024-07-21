# ecommerce-platform

[![Video](https://img.youtube.com/vi/5PtVlJK-Azg/0.jpg)](https://www.youtube.com/watch?v=5PtVlJK-Azg)
**Click on an image above to see what this website looks like.**

## Description
This project represents by itself an example eCommerce platform that I can develop. I am not a web designer thus design of this website is not very beautiful... :)

## Features
* auth (sign in, sign up, sign out)
    * user roles (regular user, admin, manager, CEO)
    * admin has an Admin Dashboard (there are CRUD operations for products, categories and collections)
* page /category/... has pagination
* online payment by card
* shopping cart and an ability to edit quantity of every cart's item
* product listings with an extra image preview on hover

### Tech stack
* iron session
* bcrypt
* next.js (app router)
* prisma ORM (PostgreSQL)
* stripe
* typescript
* heroicons
* material-tailwind
* tailwind-css
* jotai

#### Notes
I also used React Suspense (async server components + loading.tsx from next.js).

