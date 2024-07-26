import requests
import time
import statistics
import copy
import pandas as pd
import numpy as np
import concurrent.futures
import math
import json
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport

def post_mutation_to_runtime(ids, names, categories, selling_prices, descriptions, images, stars, in_stock):
    url = '<Add your endpoint here>'

    headers = {
        'Authorization': 'Bearer <Add your token here>',
    }

    # Define the transport with the URL and headers
    transport = RequestsHTTPTransport(url=url, headers=headers, use_json=True)

    # Create the client
    client = Client(transport=transport, fetch_schema_from_transport=True)

    # Convert ids and texts to JSON arrays
    ids_json = json.dumps(ids)
    names_json = json.dumps(names)
    categories_json = json.dumps(categories)
    selling_prices_json = json.dumps(selling_prices)
    descriptions_json = json.dumps(descriptions)
    images_json = json.dumps(images)
    stars_json = json.dumps(stars)
    in_stock_json = json.dumps(in_stock)


    query = gql(f'''
                query UpsertProducts {{
                    upsertProducts(ids: {ids_json}, names: {names_json}, categories: {categories_json}, prices: {selling_prices_json}, descriptions: {descriptions_json}, images: {images_json}, stars: {stars_json}, isStockedArray: {in_stock_json})
                }}
            ''')

    start_time = time.time()
    response = client.execute(query)
    end_time = time.time()

    return response, end_time - start_time


# Read the CSV file
df = pd.read_csv('hyper_toys.csv')

# Convert the columns to arrays
product_ids = df['Uniq Id'].values
product_names = df['Product Name'].values
product_categories = df['Category'].values
selling_prices = df['Selling Price'].values
about_products = df['About Product'].values
images = df['Image'].values
stars = df['Num Stars'].values
in_stock = df['In Stock'].values

selling_prices = selling_prices.astype(float)
stars = stars.astype(float)
in_stock = in_stock.astype(bool)

# Create batches of size 25
product_ids_batches = np.array_split(product_ids, len(product_ids) // 25)
product_names_batches = np.array_split(product_names, len(product_names) // 25)
product_categories_batches = np.array_split(product_categories, len(product_categories) // 25)
selling_prices_batches = np.array_split(selling_prices, len(selling_prices) // 25)
about_products_batches = np.array_split(about_products, len(about_products) // 25)
images_batches = np.array_split(images, len(images) // 25)
stars_batches = np.array_split(stars, len(stars) // 25)
in_stock_batches = np.array_split(in_stock, len(in_stock) // 25)

totalTimes = []

# sequential
for i in range(len(product_names_batches)):
    print(i)
    resp, duration = post_mutation_to_runtime(product_ids_batches[i].tolist(), product_names_batches[i].tolist(), product_categories_batches[i].tolist(), selling_prices_batches[i].tolist(), about_products_batches[i].tolist(), images_batches[i].tolist(), stars_batches[i].tolist(), in_stock_batches[i].tolist())
    print(duration)
    totalTimes.append(duration)

print(f"Total time combined: {sum(totalTimes)}")

print(f"median total time: {statistics.median(totalTimes)}")
