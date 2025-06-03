<template>
    <main class="min-h-screen min-w-screen bg-slate-400 content-center justify-center">
        <section class="w-80 mx-auto">
            <div class="bg-white p-10">
                <div class="mb-5">
                    <label class="block font-semibold" for="input-lake">Lake Temperature:</label>
                    <input
                        class="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        id="input-lake" type="number" min="40" max="100" v-model="form.lakeTemp" /> °F
                </div>
                <div class="mb-5">
                    <label class="block font-semibold" for="input-pool">Pool Temperature:</label>
                    <input
                        class="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        id="input-pool" type="number" min="40" max="100" v-model="form.poolTemp" /> °F
                </div>
                <div class="mb-5">
                    <label class="block font-semibold" for="input-pass">Passphrase:</label>
                    <input
                        class="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        id="input-pass" type="text" v-model="form.passPhrase" />
                </div>
                <div class="mb-5">
                    <button
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        @click="submit" :disabled="status.submissionInProgress">Update</button>
                </div>

                <div>{{ status.response }}</div>
            </div>
        </section>
    </main>
</template>

<script setup>
const form = reactive({
    lakeTemp: null,
    poolTemp: null,
    passPhrase: null
})

const status = reactive({
    submissionInProgress: false,
    response: null
})

const submit = async () => {
    status.submissionInProgress = true;

    try {
        await $fetch('/api/set-temps', {
            method: 'post',
            body: { lakeTemp: form.lakeTemp, poolTemp: form.poolTemp, passPhrase: form.passPhrase.toLowerCase() }
        })
        status.response = "✅ Successfully submitted temperatures"
    }
    catch (e) {
        status.response = "❌ There was an error saving temperatures"
    }

    formIsSubmitting.value = false;
}
</script>

<style>
/* DISABLE THE ANNOYING NUMBER INPUT BUTTONS */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>
