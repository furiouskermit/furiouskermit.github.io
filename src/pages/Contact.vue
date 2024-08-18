<template>
    <div class="d-flex flex-column justify-content-center text-center" id="contact" :style="{ 'background-image': `url(${backgroundImage})` }">
        <strong>Contact Me</strong>
        <a href="https://drive.google.com/file/d/1qLn6HZ4ciEHn9y8y9rHQoFYp0u25oJaz/view?usp=sharing" target="_blank" @mouseenter="onHoverBtn(true)" @mouseleave="onHoverBtn(false)">{{ btnText }} <i class="ri-arrow-right-line"></i></a>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                btnText: 'Lee Hyewon, Web Publisher'
            }
        },
        computed: {
            backgroundImage(){
                return require('@/assets/dog.jpg');
            }
        },
        methods: {
            onHoverBtn(boolean){
                this.btnText = boolean ? '이력서 열람하기' : 'Lee Hyewon, Web Publisher';
            }
        },
    }
</script>
<style scoped>
    #contact {
        min-height: 100vh;
        background-size: cover;
        background-position: center center;
    }
    #contact:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.25);
    }
    #contact :is(strong, a) {
        position: relative;
        z-index: 10;
        color: #fff;
    }
    #contact strong {
        margin: 0 0 60px;
        font-size: 60px;
    }
    #contact a {
        width: 350px;
        height: 60px;
        line-height: 60px;
        margin: 0 auto;
        border: 1px solid #fff;
        border-radius: 100px;
        font-size: 18px;
        transition: 0.2s;
    }
    #contact a:hover {
        background-color: rgba(255,255,255,0.25);
    }

    /* ### RESPONSIVE ### */
    @media (max-width: 768px) {
        #contact {
            padding: 0 var(--mobile-padding);
        }
        #contact strong {
            margin: 0 0 15px;
            font-size: 50px;
        }
        #contact a {
            width: 100%;
            max-width: 300px;
            height: 50px;
            line-height: 50px;
            font-size: 16px;
        }
    }
</style>