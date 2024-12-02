<template>
    <div id="portfolio">
        <template v-if="isLoading">
            <loading></loading>
        </template>
        <template v-else>
            <div class="container-inner">
                <strong class="d-block text-center">Portfolio.</strong>
                <ul>
                    <li v-for="list in portfolioList"
                        class="portfolio-list-item"
                        :key="list.id+'List'"
                        data-aos="fade-up"
                        data-aos-anchor-placement="top-center"
                    >
                        <!-- title area -->
                        <span class="d-flex align-items-center justify-content-between portfolio-list-title">
                            <!-- title -->
                            <strong class="portfolio-list-title-left">{{ list.title }}</strong>

                            <!-- date -->
                            <strong v-if="list.startDate && list.endDate" class="text-muted portfolio-list-title-right">{{ list.startDate }} - {{ list.endDate }}</strong>
                        </span>

                        <!-- content area -->
                        <span class="d-flex align-items-start portfolio-list-content">
                            <span class="word-keep portfolio-list-content-left">
                                <span class="d-flex flex-column gap-1 portfolio-list-content-overview">
                                    <strong>OVERVIEW</strong>
                                    <span>{{ list.content.content[0].content[0].value }}</span>
                                </span>
                                <span class="d-flex flex-column gap-1 portfolio-list-content-tech">
                                    <strong>TECHNOLOGIES</strong>
                                    <span>
                                        <template v-for="(t, idx) in list.tag">
                                            {{ t + (idx === list.tag.length - 1 ? '' : ', ') }}
                                        </template>
                                    </span>
                                </span>
                                <span class="d-block">
                                    <router-link tag="span" :to="list.routerLink">
                                        <a class="input-btn btn-black-border text-center portfolio-list-content-btn">View more</a>
                                    </router-link>
                                </span>
                            </span>
                            <span class="portfolio-list-content-right">
                                <img class="w-100" :src="list.img[0].fields.file.url" :alt="list.img[0].fields.title" />
                            </span>
                        </span>
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>
<script>
    import Loading from '@/components/Loading';

    let loading;
    
    export default {
        components: {
            Loading,
        },
        data(){
            return {
                isLoading: true,
                portfolioList: [],
            }
        },
        mounted(){
            const client = this.$getContentfulClient();
            client.getEntries({
                content_type: 'portfolio',
                order: 'fields.entryTitle'
            }).then((response) => {
                response.items.forEach((item) => {
                    this.portfolioList.push(item.fields);
                })
            }).catch(console.error)
            
            loading = setTimeout(()=>{
                this.isLoading = false;
                this.$initAOS();
            }, 1000)
        },
        beforeDestroy(){
            clearTimeout(loading);
        }
    }
</script>
<style scoped>
    #portfolio {
        padding: 20px 20px 0;
    }
    .container-inner {
        padding-bottom: 70px;
    }
    .container-inner > strong {
        padding: 40px 0 50px;
        font-size: 80px;
    }
    .portfolio-list-item {
        border: 1px solid var(--border-color);
        border-radius: 20px;
    }
    .portfolio-list-item:not(:last-child) {
        margin: 0 0 50px;
    }

    /* ### title ### */
    .portfolio-list-title {
        margin: 0 0 30px;
        padding: 20px 40px;
        border-bottom: 1px dashed var(--border-color);
        font-size: 32px;
    }

    /* ### content ### */
    .portfolio-list-content {
        padding: 0 40px 40px;
    }
    .portfolio-list-content-left {
        width: 55%;
        line-height: 1.45em;
        padding-right: 20px;
    }
    .portfolio-list-content-right {
        width: 45%;
    }
    .portfolio-list-content-tech {
        margin: 20px 0 30px;
    }
    .portfolio-list-content-btn {
        display: inline-block;
        width: 180px;
        border-radius: 100px !important;
    }

    /* --- thumbnail --- */
    .portfolio-list-content-right img {
        border-radius: 25px;
    }

    /* ### RESPONSIVE ### */
    @media (max-width: 768px) {
        .d-flex {
            flex-direction: column;
        }
        .container-inner {
            padding: 0 0 45px;
        }
        .container-inner > strong {
            padding: 15px 0 30px;
            font-size: 60px;
        }

        /* ### title ### */
        .portfolio-list-title {
            display: block;
            padding: 20px;
        }
        .portfolio-list-title strong {
            display: block;
        }
        .portfolio-list-title-right {
            margin: 4px 0 0;
            font-size: 16px;
        }

        /* ### content ### */
        .portfolio-list-content {
            padding: 0 20px 20px;
        }
        .portfolio-list-content-left,
        .portfolio-list-content-right {
            width: 100%;
        }
        .portfolio-list-content-left {
            padding-right: 0;
            order: 2;
        }
        .portfolio-list-content-left .input-btn {
            width: 100%;
        }
        .portfolio-list-content-right {
            order: 1;
            margin: 0 0 15px;
        }
        .portfolio-list-content-right img {
            border-radius: 18px;
        }
    }
</style>