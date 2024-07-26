# Hyper Commerce

This is a template for new Hypermode projects to create an ecommerce website.

See other templates at [justship.ai](https://justship.ai/)

## Lightning Fast Semantic Search

This template illustrates the power of Hypermode collections to create production-grade semantic search, capable of results in sub 200ms.
This is accomplished by hosting small embedding models, and building vector indexes in memory, allowing for low latency results.

To try it out, add sample data to your collection using the `upsertProducts` api, which embeds & inserts texts into your index, and query the index using `searchProducts`.

## How to use the template

To deploy this code, navigate to [hypermode.com/go](https://hypermode.com/go) and select this template to deploy. That will automatically spin up the embedding model found in the `hypermode.json` file.

### Sample data

An example is provided, named `hyper_toys.csv`, and the corresponding python script to run it is named `ecommerce_populate.py`, both found at the root directory. Load the data using `python3 ecommerce_populate.py`, and it will show you the batched inserts and time taken.

### Calling the APIs

Open up postman and create a new GraphQL request, and add the endpoint with the authorization as a bearer token. On schema introspection you will see all the functions from the template light up as APIs. Just mess around with it and see what happens!

## References

Hypermode is a framework for building AI powered API.
In an Hypermode project, exported functions from `functions/assembly/index.ts` are immediately available as a scalable GraphQL API, allowing direct integration of your AI logic into your existing applications.

Each function can use AI models inferences, data connections (HTTP, GraphQL, DB, ...), collections ( a flexible vector search abstraction) and custom logic.

For more information on functions, models, connections, collections and project configuration, consult [our documentation](https://docs.hypermode.com).

For writing functions in AssemblyScript, you can refer to the [examples](https://github.com/hypermodeAI/functions-as/tree/main/examples) in [hypermodeAI/functions-as](https://github.com/hypermodeAI/functions-as).
