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
                                <img class="d-block w-100 h-100" :src="'/'+require('@/assets/AboutMeProfile.jpg')" alt="">
                            </div>
                            <div class="about-me-desc">
                                <strong class="d-block text-secondary fz-24 about-me-position">#Web Publisher</strong>
                                <strong class="d-block about-me-name">Lee Hyewon</strong>
                                <p class="text-secondary fz-18 word-keep about-me-intro">안녕하세요, 사용자 친화적인 웹 퍼블리셔로서의 여정을 이어가고 있는 이혜원입니다. 웹 표준을 준수하고, 다양한 브라우저와 디바이스에서 일관된 사용자 경험을 제공하는 것을 목표로 작업하고 있습니다. 사용자 중심의 웹 사이트를 제작하며, 팀과의 원활한 협업을 통해 더 나은 결과를 창출하기 위해 항상 노력합니다.</p>
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
                                        <span v-for="t in p.tag" :key="t" class="home-portfolio-tag">#{{ t }}</span>
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
    import Vue from 'vue';
    import VueClipboard from 'vue-clipboard2';

const HomeData = {
    aboutMe: {
        id: 'homeAboutMe',
        title: 'About Me',
        color: '#2361FF',
    },
    portfolio: {
        id: 'homePortfolio',
        title: 'Portfolio',
        color: '#FFB923',
    },
    career: {
        id: 'homeCareer',
        title: 'Career',
        color: '#1dd1a1',
    },
    contact: {
        id: 'homeContact',
        title: 'Contact',
        color: '#FF2323',
    },
}

const HomeCareerData = {
    math100: {
        id: 'careerMath100',
        title: '(주)리미트리스',
        date: '2021.09 ~ 2024.03',
        position: '사원 · 웹 퍼블리셔',
        task: ['카페24를 사용해 자사 쇼핑몰 관리(HTML, CSS, JS 수정 등)', '자사 제품 상세페이지 제작 및 기존 상세페이지 리뉴얼 작업', '자사 제품 패키지 디자인 작업', '자사 수학 문제은행 솔루션인 수학백서 프로젝트에서 웹 사이트 디자인 및 퍼블리싱 담당(HTML, CSS, JS, Jquery, Thymeleaf, Vue.js 사용)']
    }
}

const HomeContactData = {
    email: {
        id: 'contactEmail',
        title: 'Email',
        desc: '12hyewonlee@gmail.com',
        icon: 'ri-mail-line'
    },
    github: {
        id: 'contactGithub',
        title: 'Github',
        desc: 'furiouskermit',
        icon: 'ri-github-fill'
    },
    linkedIn: {
        id: 'contactLinkedIn',
        title: 'LinkedIn',
        desc: 'hyewon-lee-b086681ab',
        icon: 'ri-linkedin-box-fill'
    }
}
    
    // import { HomeData, HomeCareerData, HomeContactData } from '@/js/data/homeData';
    import Loading from '@/components/Loading';
    import HomeSection from '@/components/home/HomeSection';
    import AlertModal from '@/components/modal/AlertModal';

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
    .home-section:not(:last-child) {
        margin: 0 0 70px;
        padding: 0 40px 120px;
        border-bottom: 1px dashed var(--border-color);
    }
    .home-section:last-child {
        padding: 0 40px 120px;
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
</style>