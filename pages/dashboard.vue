<template>
    <div>Lake Temperature: {{ data.lakeTemp }} °F</div>
    <div>Pool Temperature: {{ data.poolTemp }} °F</div>
    <div>Last Updated: {{ lastUpdated }} ago</div>
</template>

<script setup>
import { formatDistance } from "date-fns";
const { data, error } = await useFetch('/api/get-temps');
const lastUpdated = formatDistance(new Date(), new Date(data.value.timestamp))
</script>