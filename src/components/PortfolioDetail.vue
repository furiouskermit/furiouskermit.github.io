<template>
    <div>
        <!-- thumbnail & description -->
        <div class="d-flex align-items-center portfolio-detail-top">
            <!-- thumb -->
            <div class="overflow-h portfolio-detail-thumb">
                <img class="d-block w-100" :src="detailData.thumbnail.fields.file.url" :alt="detailData.thumbnail.fields.title" />
            </div>

            <!-- desc -->
            <div class="portfolio-detail-desc">
                <div class="text-muted fz-16">WORK DETAIL</div>
                <strong class="d-block portfolio-detail-title">{{ detailData.title }}</strong>
                <p class="word-keep fz-16 portfolio-detail-summary">{{ detailData.summary }}</p>
                <div class="portfolio-detail-tagList">
                    <span v-for="t in detailData.tech" class="d-inline-block text-muted portfolio-detail-tag" :key="t">#{{ t }}</span>
                </div>
                <div>
                    <span class="d-inline-block bg-point-light portfolio-detail-contribution">{{ detailData.contribution }}</span>
                </div>
                <div class="d-flex align-items-center gap-2 text-center portfolio-detail-btn-list">
                    <a class="input-btn btn-black-border portfolio-detail-btn" :href="detailData.urlPc" target="_blank">
                        <i class="ri-cursor-fill"></i> {{ detailData.urlMobile ? 'PC 사이트' : '자세히 보기' }}
                    </a>
                    <template v-if="detailData.urlMobile">
                        <a class="input-btn btn-black-border portfolio-detail-btn" :href="detailData.urlMobile" target="_blank">모바일 사이트</a>
                    </template>
                    <template v-if="detailData.urlGithub">
                        <a class="input-btn btn-black-border portfolio-detail-btn" :href="detailData.urlGithub" target="_blank"><i class="ri-github-fill"></i> Github</a>
                    </template>
                </div>
            </div>
        </div>

        <!-- content -->
        <div class="portfolio-detail-bottom">
            <!-- screenshots -->
            <slot />

            <!-- text -->
            <div class="word-keep fz-18 portfolio-detail-content">
                <p v-for="content in detailData.content.content" class="portfolio-detail-content-text">
                    {{ content.content[0].value }}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['data'],
        data(){
            return {
                detailData: this.data,
            }
        }
    }
</script>
<style scoped>
    .portfolio-detail-top {
        margin: 0 0 80px;
        padding: 80px 0;
        line-height: 1.45em;
        border-bottom: 1px solid var(--text-muted);
    }
    .portfolio-detail-bottom {
        padding: 0 0 80px;
    }
    .portfolio-detail-thumb {
        border-radius: 30px;
    }
    .portfolio-detail-desc {
        padding-left: 40px;
    }
    
    /* ### thumbnail & description ### */
    /* --- thumbnail --- */
    .portfolio-detail-thumb img {
        transition: 0.2s;
    }
    .portfolio-detail-thumb:hover img {
        transform: scale(1.6) translateY(20px);
    }

    /* --- description --- */
    .portfolio-detail-title {
        margin: 15px 0 25px;
        font-size: 36px;
    }
    .portfolio-detail-tagList {
        margin: 10px 0;
    }
    .portfolio-detail-tag:not(:last-child) {
        margin-right: 5px;
    }
    .portfolio-detail-contribution {
        padding: 4px 7px;
        border-radius: var(--border-radius);
    }
    .portfolio-detail-btn-list {
        margin: 40px 0 0;
    }
    .portfolio-detail-btn {
        width: 180px;
        border-radius: 100px;
    }

    /* ### content ### */
    /* --- screenshots --- */
    .portfolio-detail-content-img img {
        border: 1px solid var(--border-color);
        border-radius: 20px;
    }

    /* --- text --- */
    .portfolio-detail-content {
        margin: 20px 0 0;
        line-height: 1.5em;
    }

    /* ### RESPONSIVE ### */
    @media (max-width: 768px) {
        .portfolio-detail-top {
            display: block;
            margin: 0 0 40px;
            padding: 30px 0 40px;
        }

        /* ### thumbnail & description ### */
        /* --- description --- */
        .portfolio-detail-desc {
            margin: 15px 0 0;
            padding-left: 0;
        }
        .portfolio-detail-btn-list {
            margin: 20px 0 0;
        }
        .portfolio-detail-btn {
            width: calc(calc(100% - calc(var(--gap) * 2)) / 2);
        }
        .portfolio-detail-btn:first-child:last-child {
            width: 100%;
        }

        /* ### content ### */
        /* --- text --- */
        .portfolio-detail-content {
            line-height: 1.6em;
            font-size: 16px;
        }
    }
</style>