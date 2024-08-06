# Hyper-Commerce

Composable-commerce storefront demo to show off the performance of Hypermode's vector search.

Example site: [hypermode-commerce.com](https://hypermode-commerce.com)

When a user pauses in the search bar, Hypermode generates an embedding of the user's input and executes a vector search (HNSW or sequential) of a 10,000 item catalog in less than 200ms.

## Lightning Fast Semantic Search

This template illustrates the power of Hypermode collections to create real-time production-grade semantic search.

This is accomplished by hosting small embedding models, and building vector indexes in memory, allowing for low latency results.

To try it out, add sample data to your collection using the `upsertProducts` api, which embeds & inserts texts into your index, and query the index using `searchProducts`.

## How to use the template

- To deploy this code, click "use this template" in this repo.
- Go to [hypermode.com/sign-up](https://hypermode.com/sign-up).
- Create new project
- Import this repo

Hypermode will automatically spin up the embedding model found in `backend/hypermode.json` file as well as generate a working GraphQL API for all functions exported from your `backend/functions/index.ts` file.

### Sample data

An example is provided, named `backend/extras/hyper_toys.csv`, and the corresponding python script to run it is named `backend/extras/ecommerce_populate.py`. Navigate to the subfolder to run them.
To install dependencies, run `pip install -r requirements.txt` from within that directory.

You'll need to edit the `ecommerce_populate.py` file with your Hypermode project URL and auth token found in your Hypermode console dashboard. 


[![hyper-cons](https://github.com/user-attachments/assets/18478278-93bf-479b-955c-c23c7a7cdecb)](hypermode.com)

Load the data using `python3 ecommerce_populate.py`, and it will show you the batched inserts and time taken.
Please note: since this is inserting 10k rows sequentially, it will take ~18 minutes to embed & insert data. If you want to just try this out with a smaller dataset, feel free to shrink the csv to whatever you need.

### Calling the APIs

Open up postman and create a new GraphQL request, and add the endpoint with the authorization as a bearer token. On schema introspection you will see all the functions from the template light up as APIs. Just mess around with it and see what happens!

## References

Hypermode is a framework for building AI powered API.
In an Hypermode project, exported functions from `functions/assembly/index.ts` are immediately available as a scalable GraphQL API, allowing direct integration of your AI logic into your existing applications.

Each function can use AI models inferences, data connections (HTTP, GraphQL, DB, ...), collections ( a flexible vector search abstraction) and custom logic.

For more information on functions, models, connections, collections and project configuration, consult [our documentation](https://docs.hypermode.com).

For writing functions in AssemblyScript, you can refer to the [examples](https://github.com/hypermodeAI/functions-as/tree/main/examples) in [hypermodeAI/functions-as](https://github.com/hypermodeAI/functions-as).

## Frontend Template

### Running Locally

To run this project locally, start by setting up your environment variables. Copy the definitions from [`.env.example`](https://github.com/hypermodeAI/hyper-commerce/blob/main/frontend/.env.example) into a new file named `.env.local` at the root of your project, and provide the values from your Hypermode dashboard.

Once your environment variables are configured, install the necessary dependencies with:

```
pnpm install
```

Then, start the development server using:

```
pnpm dev
```

Your app should be up and running at [localhost:3000](http://localhost:3000/)

### Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/hypermodeAI/hyper-commerce/frontend)

_NOTES_: Make sure your environment variables are added to your Vercel project.
