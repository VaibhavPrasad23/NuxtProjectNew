<template>
    <NuxtLayout name="default">

        <!-- title -->
        <section class="mb-8">
            <h2 class="text-blue-800 text-xl">Product Search</h2>
            <p class="text-gray-700">Welcome to iCube System's Marketplace.</p>
        </section>
        <!-- end of title -->

        <!-- categories -->
        <ProoductCategory @category:change="categoryHandler" ></ProoductCategory>

        <!-- products counter -->
        <section v-if="!pending" class="my-5 md:text-right">
            <p class="text-gray-600">Showing {{ products?.length }} products</p>
        </section>
        <!-- end of products counter -->

        <!-- list of cards -->
        <section v-if="!pending" class="grid md:grid-cols-4 grid-cols-1 gap-4">
            <template v-for="product in products" :key="product?.id">
                <!-- card -->
                <ProductCard :product="product"></ProductCard>
            </template>
        </section>
        <!-- end of list of cards -->

        <!-- fetching state -->
        <section v-else class="mt-12">
            <p class="text-center">Please wait ...</p>
        </section>
        <!-- end of fetching state -->
    </NuxtLayout>
</template>

<script setup lang="ts">

import { IProduct } from '../../interfaces/product.interface'

useHead({
    title: 'List of Products',
    meta: [
        { name: 'description', content: 'List of products.' }
    ]
})

// parse response
const { data: products, pending }: { data: Ref<IProduct[]>, pending: Ref<boolean> } = await useFetch('/api/products', { lazy: true })

const categoryHandler = async (URI: string) => {

    pending.value = true

    await useFetch(URI, {
        key: URI,
        onResponse({ response }) {
            products.value = response?._data
        }
    })

    pending.value = false
}

</script>