<template>
    <div>
        <div class="container-inner">
            <portfolio-detail :data="detailData">
                <!-- screenshots -->
                <div class="portfolio-detail-content-screenshots">
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
    }
</script>
<style scoped>
    .portfolio-detail-content-img:not(:last-child) {
        margin: 0 0 30px;
    }
</style>