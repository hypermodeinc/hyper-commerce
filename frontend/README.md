# Hypermode Commerce Frontend

This frontend for Hypermode's [composable-commerce storefront demo](https://github.com/hypermodeAI/hyper-commerce) highlights its vector search capabilities. It provides a seamless user experience for searching a 10,000-item catalog with lightning-fast semantic search, delivering results in under 200ms. The search functionality ranks results by relevance, ratings, and stock status, and offers options to limit results and filter by minimum star rating. You can view the demo site [here](https://www.hypermode-commerce.com/).

## Running Locally

To run this project locally, start by setting up your environment variables. Copy the definitions from [`.env.example`](https://github.com/hypermodeAI/hyper-commerce-frontend/blob/main/.env.example) into a new file named `.env.local` at the root of your project, and provide the values from your Hypermode dashboard.

Once your environment variables are configured, install the necessary dependencies with:

```
pnpm install
```

Then, start the development server using:

```
pnpm dev
```

Your app should be up and running at [localhost:3000](http://localhost:3000/)

## Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/hypermodeAI/hyper-commerce-frontend)

*NOTES*: Make sure your environment variables are added to your Vercel project.