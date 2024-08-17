<template>
    <div class="d-flex flex-column align-items-center justify-content-center empty-data">
        <div class="text-center text-muted empty-data-inner">
            <i class="ri-error-warning-line"></i>
            <span class="d-block">{{ text }}</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['text']
    }
</script>
<style scoped></style>