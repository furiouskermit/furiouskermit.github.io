<template>
    <div :data-path="currentRoute">
        <!-- header -->
        <header id="header">
            <div class="container-inner">
                <div class="d-flex align-items-center header-nav">
                    <router-link tag="div" to="/HyewonLeeVue/">
                        <a :class="currentRoute === '/HyewonLeeVue/' ? 'active' : ''">HOME</a>
                    </router-link>
                    <router-link tag="div" to="/HyewonLeeVue/portfolio">
                        <a :class="currentRoute.indexOf('portfolio') > -1 ? 'active' : ''">PORTFOLIO</a>
                    </router-link>
                    <router-link tag="div" to="/HyewonLeeVue/contact">
                        <a :class="currentRoute.indexOf('contact') > -1 ? 'active' : ''">CONTACT</a>
                    </router-link>
                </div>
            </div>
        </header>

        <!-- content -->
        <div id="content"><router-view></router-view></div>

        <!-- footer -->
        <footer id="footer">
            <div class="d-flex align-items-center justify-content-between container-inner">
                <div class="footer-copyright">
                    <div>@2024 LEE_HYEWON</div>
                    <div>All Rights Reserved.</div>
                </div>
                <div class="footer-email">12hyewonlee@gmail.com</div>
                <div class="footer-sns">
                    <a href="https://www.linkedin.com/in/hyewon-lee-b086681ab/" target="_blank"><i class="ri-linkedin-box-fill"></i></a>
                    <a href="https://github.com/furiouskermit" target="_blank"><i class="ri-github-fill"></i></a>
                </div>
            </div>
        </footer>

        <template v-if="currentRoute.indexOf('contact') === -1"><go-top-btn></go-top-btn></template>
    </div>
</template>
<script>
    import router from '@/routes/routes';
    import GoTopBtn from '@/components/GoTopBtn';

    export default {
        router,
        components: {
            GoTopBtn,
        },
        computed: {
            currentRoute(){
                return this.$route.path;
            }
        },
    }

</script>
<style>
    /* ### header ### */
    #header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: var(--header-height);
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid var(--default-color);
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(7px);
        -webkit-backdrop-filter: blur(7px);
        z-index: 99;
    }
    .header-nav div:not(:last-child) {
        margin-right: 28px;
    }
    .header-nav a {
        color: #757575;
    }
    .header-nav a.active {
        font-weight: 800;
        color: var(--default-color);
    }

    /* ### footer ### */
    #footer {
        padding: 20px 0;
        border-top: 1px solid var(--default-color);
    }
    .footer-sns a {
        font-size: 24px;
        color: var(--point-secondary);
        transition: 0.2s;
    }
    .footer-sns a:not(:last-child) {
        margin-right: 10px;
    }
    .footer-sns a:first-child:hover {
        color: #0A66C2;
    }
    .footer-sns a:last-child:hover {
        color: #1F2328;
    }

    /* ### for contact page ### */
    /* --- header --- */
    div[data-path="/contact"] #header {
        border: none;
        background-color: transparent;
        backdrop-filter: blur(0px);
        -webkit-backdrop-filter: blur(0px);
    }
    div[data-path="/contact"] .header-nav a {
        color: #dadada;
    }
    div[data-path="/contact"] .header-nav a.active {
        color: #fff;
    }

    /* --- content --- */
    div[data-path="/contact"] #content {
        padding-top: 0;
    } 

    /* --- footer --- */
    div[data-path="/contact"] #footer {
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 0;
        border: none;
        color: #fff;
        z-index: 99;
    }
    div[data-path="/contact"] #footer a:not(:hover) {
        color: #fff;
    }
</style>