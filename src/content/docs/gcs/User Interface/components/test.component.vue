<template>
    <button @click="handleClick" class="button">{{ label }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        label: {
            type: String,
            required: true
        }
    },
    methods: {
        handleClick() {
            // Handle button click event here
        }
    }
}
</script>

<style scoped>
</style>