# Pawfect Match Frontend

A vibrant pet adoption website frontend built with React, Vite, Tailwind CSS, React Router, Axios, Lucide icons, and Framer Motion.

## Features included

- Sticky navigation with role-aware admin link
- Hero banner and warm homepage sections
- Browse Pets page with live search and filters
- Pet profile page with health records and similar pets
- Adoption application form
- Pet suggestion quiz with animated question flow
- Success stories gallery with modal view
- Admin dashboard for managing core areas
- API-ready services with fallback mock data for demo safety

## Setup

```bash
npm install
npm run dev
```

## API base URL

Create a `.env` file from `.env.example` if needed:

```bash
cp .env.example .env
```

## Recommended backend routes

- `/api/pets`
- `/api/shelters`
- `/api/foster-parents`
- `/api/medical-records`
- `/api/applications`

The frontend can still render in demo mode even if some endpoints are not available.
