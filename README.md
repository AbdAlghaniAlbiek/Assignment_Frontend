## Getting Started

To get up running for project, you need to follow those steps:

First, You need to clone project and install dependencies with command `pnpm install`

Note:
May you need to delete file `pnpm-lock.yaml` then install dependencies

Then, You need to define `.env` file you can take a look to `.env-example`

```bash
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000/api"
NEXT_PUBLIC_APP_PORT=3000
NEXT_PUBLIC_APP_ENV=development
```

run the development server:

```bash
pnpm run dev
```

---

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Explanation

This Next.js project made by Tailwindcss and Shadcn UI kit that shows list of products and can filter them and assign some of them to your cart and increase/decrease items of that cart

Also I added static pages for product details that will be rendered on the server at the build time and when user request that details page it will be send directly because it's already rendered at build time

there are two main routes
[http://localhost:3000/products](http://localhost:3000/products)

[http://localhost:3000/products/:id](http://localhost:3000/products/:id)

## Tech Choices

- **State Management**: Zustand (simple and light weight)
- **Styling**: Tailwindcss (Have class and utilities that makes development process more faster)
- **Data Loading**: json-server that serve json file and can fetch data from it as backend server
- **UI Framework**: Shadcn UI (is most reliable and hand-crafted components library)
- **Motion**: Using motion library for increase UX interactivity

## Deployment

Deployed version hosted on this url
[https://e-commerce-phi-ten-89.vercel.app/products](https://e-commerce-phi-ten-89.vercel.app/products)
