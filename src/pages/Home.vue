<template>
    <div>
        <template v-if="isLoading">
            <loading></loading>
        </template>
        <template v-else>
            <div v-for="(info, idx) in homeData" class="home-section" :id="info.id" :key="info.id">
                <home-section :title="info.title" :color="info.color">
                    <!-- About Me -->
                    <template v-if="info.id === 'homeAboutMe'">
                        <div class="d-flex align-items-end"
                            data-aos="fade-down"
                        >
                            <div class="overflow-h about-me-thumb">
                                <img class="d-block w-100 h-100" :src="require('@/assets/AboutMeProfile.jpg')" alt="">
                            </div>
                            <div class="about-me-desc">
                                <strong class="d-block text-secondary fz-24 about-me-position">#Web Publisher</strong>
                                <strong class="d-block about-me-name">Lee Hyewon</strong>
                                <p class="text-secondary fz-18 word-keep about-me-intro">Hello, I’m Hyewon Lee, continuing my journey as a user-friendly web publisher. I strive to follow web standards and provide a consistent user experience across various browsers and devices. I focus on creating user-centered websites and always aim to produce better results through smooth collaboration with my team.</p>
                            </div>
                        </div>
                    </template>
    
                    <!-- Portfolio -->
                    <template v-if="info.id === 'homePortfolio'">
                        <div v-for="(p, idx) in portfolioData"
                            class="home-portfolio-box"
                            :key="p.id"
                            :data-aos="idx%2 === 0 ? 'fade-right' : 'fade-left'"
                        >
                            <a :href="p.url" :target="p.id === 'workPiece' ? '' : '_blank'" class="d-block">
                                <span class="d-block text-center overflow-h home-portfolio-thumb" :style="{ backgroundColor: p.backgroundColor }">
                                    <img class="h-100" :src="p.img[0].fields.file.url" :alt="p.img[0].fields.file.fileName" />
                                </span>
                                <span class="d-block home-portfolio-desc">
                                    <strong class="d-block word-keep home-portfolio-title">{{ p.title }}</strong>
                                    <span class="d-block fz-16 home-portfolio-content">{{ p.content.content[0].content[0].value }}</span>
                                    <span class="d-block text-muted">
                                        <span v-for="t in p.tag" :key="t" class="d-inline-block home-portfolio-tag">#{{ t }}</span>
                                    </span>
                                </span>
                            </a>
                        </div>
                    </template>
    
                    <!-- Career -->
                    <template v-if="info.id === 'homeCareer'">
                        <div v-for="(c, idx) in careerData"
                            class="d-flex align-items-start home-career-box"
                            :key="c.id"
                            data-aos="fade-up"
                            data-aos-anchor-placement="top-bottom"
                        >
                            <div class="home-career-left">
                                <strong class="d-block home-career-title">{{ c.title }}</strong>
                                <strong class="d-block text-muted fz-18">{{ c.date }}</strong>
                            </div>
                            <div class="home-career-right">
                                <strong class="d-block fz-18">{{ c.position }}</strong>
                                <ul class="word-keep home-career-task">
                                    <li v-for="(task, idx) in c.task" class="d-flex align-items-start gap-1 fz-18 home-career-task-item">
                                        <span>-</span>
                                        <span>{{ task }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>
    
                    <!-- Contact -->
                    <template v-if="info.id === 'homeContact'">
                        <div class="d-flex align-items-center"
                            data-aos="fade-up"
                            data-aos-anchor-placement="top-bottom"
                        >
                            <div v-for="(contact, idx) in contactData" class="home-contact-box" :key="contact.id">
                                <div class="text-end home-contact-icon"><i :class="contact.icon"></i></div>
                                <div class="home-contact-info">
                                    <strong class="d-block fz-18">{{ contact.title }}</strong>
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="fz-24">{{ contact.desc }}</span>
                                        <button type="button" class="fz-18 text-secondary copy-contact-info" @click="copyInfo(contact.desc)"><i class="ri-file-copy-line"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <alert-modal></alert-modal>
                    </template>
                </home-section>
            </div>
        </template>
    </div>
</template>
<script>
    import Loading from '@/components/Loading';
import HomeSection from '@/components/home/HomeSection';
import AlertModal from '@/components/modal/AlertModal';
import { HomeCareerData, HomeContactData, HomeData } from '@/js/data/homeData';
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';

    VueClipboard.config.autoSetContainer = true;
    Vue.use(VueClipboard);

    let loading;

    export default {
        components: {
            Loading,
            HomeSection,
            AlertModal,
        },
        data(){
            return {
                isLoading: true,
                homeData: HomeData,
                portfolioData: [],
                careerData: HomeCareerData,
                contactData: HomeContactData,
            }
        },
        methods: {
            copyInfo(text){
                this.$copyText(text).then(()=>{
                    this.$store.commit('alertStore/OPEN_ALERT_MODAL', {text: '복사가 완료되었습니다', type: 'success'})
                })
            },
            scrollArea(id){ // 특정 영역으로 스크롤 이동
                const windowScrollHeight = window.scrollY;
                const tagLocation = document.querySelector(`#${id}`).getBoundingClientRect().top;
                window.scrollTo({
                    top: windowScrollHeight + tagLocation,
                    left: 0,
                    behavior: 'smooth'
                });
                this.currentScroll = id;
            },
        },
        mounted(){
            const client = this.$getContentfulClient()
            client.getEntries({
                content_type: 'portfolio',
                order: 'fields.entryTitle'
            })
            .then((response) => {
                response.items.forEach(item => {
                    this.portfolioData.push(item.fields);
                })

                loading = setTimeout(()=>{
                    this.isLoading = false;
                    this.$initAOS();
                }, 500);
            })
            .catch(console.error)
        },
        beforeDestroy(){
            clearTimeout(loading);
        }
    }
</script>
<style scoped>
    .home-section {
        padding: 0 40px 120px;
    }
    .home-section:not(:last-child) {
        margin: 0 0 70px;
        border-bottom: 1px dashed var(--border-color);
    }

    /* ### About Me ### */
    #homeAboutMe .home-section-bottom > .d-flex {
        gap: 40px;
    }
    .about-me-thumb {
        width: 500px;
        height: 500px;
        border-radius: 80px;
    }
    .about-me-desc {
        width: calc(100% - calc(500px + 40px));
    }
    .about-me-name {
        margin: 40px 0 20px;
        font-size: 48px;
    }
    .about-me-intro {
        padding: 0 0 10px;
        line-height: 1.5em;
    }

    /* ### Portfolio ### */
    .home-portfolio-box:not(:last-child) {
        margin: 0 0 130px;
    }
    .home-portfolio-box:nth-child(odd) {
        padding-right: 35%;
    }
    .home-portfolio-box:nth-child(even) {
        padding-left: 35%;
    }
    .home-portfolio-thumb {
        height: 400px;
        margin: 0 0 35px;
    }
    .home-portfolio-box:nth-child(odd) .home-portfolio-thumb {
        border-radius: 40px 40px 40px 0px;
    }
    .home-portfolio-box:nth-child(even) .home-portfolio-thumb {
        border-radius: 40px 40px 0 40px;
    }
    .home-portfolio-thumb img {
        transition: 0.35s;
    }
    .home-portfolio-box > a:hover .home-portfolio-thumb img {
        transform: scale(2) translateY(50px);
    }
    .home-portfolio-desc {
        line-height: 1.5em;
    }
    .home-portfolio-title {
        font-size: 32px;
    }
    .home-portfolio-content {
        margin: 15px 0 7px;
    }
    .home-portfolio-tag:not(:last-child) {
        margin-right: 12px;
    }

    /* ### Career ### */
    .home-career-left {
        width: 30%;
    }
    .home-career-title {
        margin: 0 0 14px;
        font-size: 36px;
    }
    .home-career-right {
        width: 70%;
    }
    .home-career-task {
        margin: 15px 0 0;
    }
    .home-career-task-item:not(:last-child) {
        margin: 0 0 5px;
    }

    /* ### Contact ### */
    #homeContact .home-section-bottom > .d-flex {
        gap: 20px;
    }
    .home-contact-box {
        width: calc(100% - calc(20px * 2));
        background: #f5f5f5;
        padding: 20px;
        border-radius: 20px;
    }
    .home-contact-icon {
        margin: 0 0 20px;
        font-size: 28px;
    }
    .home-contact-info strong {
        margin: 0 0 6px;
    }
    .copy-contact-info {
        padding: 2px;
        border-radius: 4px;
        background: #dee2e6;
    }
    
    /* ### RESPONSIVE ### */
    @media (max-width: 768px) {
        .d-flex {
            flex-direction: column;
        }
        .home-section {
            padding: 0 var(--mobile-padding) 40px;
        }
        .home-section:not(:last-child) {
            margin: 0 0 30px;
        }
        :is(.home-portfolio-title, .home-career-title) {
            font-size: 28px;
        }
        :is(.about-me-intro, .home-career-task-item, .home-contact-info strong) {
            font-size: 16px;
        }

        /* ### about me ### */
        #homeAboutMe .home-section-bottom > .d-flex {
            gap: 0px;
        }
        .about-me-thumb {
            width: 100%;
            height: 300px;
            margin: 0 0 30px;
            border-radius: 40px;
        }
        .about-me-desc {
            width: 100%;
        }
        .about-me-position {
            font-size: 18px;
        }
        .about-me-name {
            margin: 10px 0;
            font-size: 34px;
        }

        /* ### portfolio ### */
        .home-portfolio-box:not(:last-child) {
            margin: 0 0 60px;
        }
        .home-portfolio-box:nth-child(odd) {
            padding-right: 0;
        }
        .home-portfolio-box:nth-child(even) {
            padding-left: 0;
        }
        .home-portfolio-tag {
            font-size: 14px;
        }
        .home-portfolio-thumb {
            height: 250px;
        }
        .home-portfolio-thumb img {
            width: 100%;
        }
        .home-portfolio-box > a:hover .home-portfolio-thumb img {
            transform: scale(1) translateY(0px);
        }
        
        /* ### career ### */
        .home-career-left,
        .home-career-right {
            width: 100%;
        }
        .home-career-right {
            margin: 20px 0 0;
        }
        .home-career-task-item {
            display: block;
            line-height: 1.45em;
        }

        /* ### contact ### */
        .home-contact-box {
            width: 100%;
        }
        .home-contact-icon {
            margin: 0 0 10px;
        }
        .home-contact-info > .d-flex {
            flex-direction: row;
        }
        .home-contact-info .fz-24 {
            font-size: 20px;
        }
    }
</style>