# F+P Curriculum Website

A bilingual academic-style curriculum website for the F+P Group. The site presents the first four semesters through pathway, logic, abilities, matrix, and teaching model views.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Local JSON data

## Local Development

Install dependencies:

```powershell
npm install
```

Start the dev server:

```powershell
npm run dev
```

If `npm` is not available in PATH in this environment, the local helper script also works:

```powershell
.\run-dev.ps1
```

Build for production:

```powershell
npm run build
```

Start a stable local preview after build:

```powershell
.\run-start.ps1
```

Recommended local preview flow:

1. `.\run-build.ps1`
2. `.\run-start.ps1`
3. Open `http://127.0.0.1:3002`

## Project Structure

- `src/app` : app routes and global styles
- `src/components` : reusable UI sections and page modules
- `src/lib` : shared helpers
- `src/types` : TypeScript types
- `data` : local curriculum and course JSON data

## Deployment

This project is ready for Vercel deployment.

Recommended path:

1. Create a GitHub repository and push this project.
2. Import the repository into Vercel.
3. Keep the framework preset as `Next.js`.
4. Install dependencies from `package-lock.json`.
5. Use the default output setting for Next.js.
6. Deploy.

No environment variables are currently required.

## Pre-Deployment Checklist

- Confirm the latest content is correct in `data/curriculum.json`
- Confirm the latest content is correct in `data/courses.json`
- Run `npm run build` or `.\run-build.ps1`
- Optionally run `.\run-start.ps1` and review the site locally before deployment

## Recommended External Deployment

For a stable external link, Vercel is the simplest option for this project because:

- it supports Next.js directly
- it rebuilds automatically from Git
- it avoids local machine shutdown and port issues
- it produces a shareable public URL

Once deployed, the site will stay accessible even if this desktop computer is turned off.

## Content Notes

The current prototype focuses on:

- First four semesters of F+P curriculum structure
- Curriculum pathway and logic
- Course matrix and filters
- Teaching model and PBL studio format

Curriculum content is stored in:

- `data/curriculum.json`
- `data/courses.json`
