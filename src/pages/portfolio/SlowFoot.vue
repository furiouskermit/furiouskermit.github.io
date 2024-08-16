<template>
    <div>
        <div class="container-inner">
            <portfolio-detail :data="detailData">
                <!-- screenshots -->
                <div class="d-grid portfolio-detail-content-screenshots">
                    <div v-for="img in detailData.screenshots" class="portfolio-detail-content-img">
                        <img class="w-100" :src="img.fields.file.url" :alt="img.fields.title" />
                    </div>
                </div>
            </portfolio-detail>
        </div>
    </div>
</template>
<script>
    import PortfolioDetail from '@/components/PortfolioDetail';

    export default {
        components: {
            PortfolioDetail,
        },
        props: ['data'],
        data(){
            return {
                detailData: this.data,
            }
        },
        methods: {},
        mounted(){},
        beforeDestroy(){}
    }
</script>
<style scoped>
    .portfolio-detail-content-screenshots {
        grid-template-columns: repeat(2, calc(calc(100% - 20px) / 2));
        grid-gap: 20px;
    }
    .portfolio-detail-content-img:nth-child(1),
    .portfolio-detail-content-img:nth-child(2) {
        grid-column: 1 / 3;
    }
</style>