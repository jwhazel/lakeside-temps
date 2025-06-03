<template>
    <div class="app-container">
        <div class="input-container">
            <label for="input-lake">Lake Temperature:</label>
            <input id="input-lake" type="number" min="40" max="100" v-model="lakeTemp" /> °F
        </div>
        <div class="input-container">
            <label for="input-pool">Pool Temperature:</label>
            <input id="input-pool" type="number" min="40" max="100" v-model="poolTemp" /> °F
        </div>
        <div class="input-container">
            <label for="input-pass">Passphrase:</label>
            <input id="input-pass" type="text" v-model="passPhrase" />
        </div>
        <div class="input-container">
            <button @click="submit" :disabled="formIsSubmitting">Update</button>
        </div>

        <div class="success" v-if="formSubmissionStatus === 'succeeded'">Successfully submitted temperatures</div>
        <div class="failure" v-if="formSubmissionStatus === 'failed'">There was an error saving temperatures</div>
    </div>
</template>

<script setup>
const lakeTemp = ref()
const poolTemp = ref()
const passPhrase = ref()
const formIsSubmitting = ref(false)
const formSubmissionStatus = ref(null)

const submit = async () => {
    formIsSubmitting.value = true;
    
    try {
        await $fetch('/api/set-temps', {
            method: 'post',
            body: { lakeTemp: lakeTemp.value, poolTemp: poolTemp.value, passPhrase: passPhrase.value.toLowerCase() }
        })
        formSubmissionStatus.value = "succeeded"
    }
    catch (e) {
        formSubmissionStatus.value = "failed"
    }

    formIsSubmitting.value = false;
}
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(94, 145, 163)
}

.app-container {
    display: flex;
    flex-direction: column;
    font-family: Arial, Helvetica, sans-serif;
    padding: 3em;
    border: 1px solid #eee;
    border-radius: 8px;
    background-color: #fff;
}

label {
    display: block;
}

.input-container {
    margin-bottom: 20px;
}

input {
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid #888
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

.success {
    color: rgb(32, 109, 32)
}

.failure {
    color: rgb(186, 31, 31)
}
</style>
