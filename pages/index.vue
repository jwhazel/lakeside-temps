<template>
    <main class="container mx-auto">
        <div class="text-center">
            <h1 class="text-2xl font-bold">Lakeside Swim Club Temperatures</h1>
        </div>

        <div class="flex justify-center flex-col items-center md:flex-row">
            <div class="w-80">
                <GuageChart title="Lake" :amount="data.lakeTemp" />
            </div>
            <div class="w-80">
                <GuageChart title="Pool" :amount="data.poolTemp" />
            </div>
        </div>
        <div class="text-center italic">Last Updated: {{ lastUpdated }} ago</div>
    </main>
</template>

<script setup>
import { formatDistance } from "date-fns";
const { data, error } = await useFetch('/api/get-temps');
const lastUpdated = formatDistance(new Date(), new Date(data.value?.timestamp))
</script>