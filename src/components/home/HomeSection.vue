<template>
    <div class="home-section-inner">
        <div class="home-section-top">
            <span class="d-block home-section-title-deco" :style="computedStyle"></span>
            <strong class="home-section-title">{{ title }}.</strong>
        </div>
        <div class="home-section-bottom">
            <slot />
        </div>
    </div>
</template>
<script>
    export default {
        props: ['title', 'color'],
        computed: {
            computedStyle(){
                return {
                    background: this.color,
                };
            }
        }
    }
</script>
<style scoped>
    .home-section-inner {
        max-width: var(--max-width);
        margin: 0 auto;
    }
    .home-section-top {
        margin: 0 0 65px;
        padding: 50px 0 0;
    }
    .home-section-title-deco {
        width: 15px;
        height: 15px;
        border-radius: 100%;
    }
    .home-section-title {
        font-size: 80px;
    }

    /* ### RESPONSIVE ### */
    @media (max-width: 768px) {
        .home-section-top {
            margin: 0 0 30px;
        }
        .home-section:not(:first-child) .home-section-top {
            padding: 20px 0 0;
        }
        .home-section-title-deco {
            width: 10px;
            height: 10px;
        }
        .home-section-title {
            font-size: 50px;
        }
    }
</style>