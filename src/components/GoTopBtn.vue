<template>
    <div>
        <button type="button" class="d-flex align-items-center justify-content-center go-top" @click="goToTop"><i class="ri-arrow-up-s-line fz-24"></i></button>
    </div>
</template>
<script>
    export default {
        methods: {
            goToTop(){
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })
            }
        }
    }
</script>
<style scoped>
    .go-top {
        position: fixed;
        bottom: 40px;
        right: 40px;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background-color: rgba(var(--point-secondary-rgb), 0.2);
        color: var(--point-secondary);
        z-index: 95;
    }
</style>