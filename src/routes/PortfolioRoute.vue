<template>
    <div>
        <template v-if="isLoading">
            <loading></loading>
        </template>
        <template v-else>
            <template v-if="currentRoute === 'work-piece'"><work-piece></work-piece></template>
            <template v-else-if="currentRoute === 'slow-foot'"><slow-foot :data="detailData"></slow-foot></template>
            <template v-else-if="currentRoute === 'math100'"><math100 :data="detailData"></math100></template>
            <template v-else-if="currentRoute === 'clone-twitter'"><clone-twitter :data="detailData"></clone-twitter></template>
            <template v-else>잘못된 경로입니다</template>
        </template>
    </div>
</template>
<script>
    import WorkPiece from '@/pages/portfolio/WorkPiece';
    import SlowFoot from '@/pages/portfolio/SlowFoot';
    import Math100 from '@/pages/portfolio/Math100';
    import CloneTwitter from '@/pages/portfolio/CloneTwitter';
    import Loading from '@/components/Loading';

    let loading;

    export default {
        components: {
            WorkPiece,
            SlowFoot,
            Math100,
            CloneTwitter,
            Loading,
        },
        data(){
            return {
                detailData: {},
                isLoading: true,
            }
        },
        computed: {
            currentRoute(){
                return this.$route.params.name;
            }
        },
        mounted(){
            const curRoute = this.currentRoute;
            if(curRoute != 'work-piece') {
                const client = this.$getContentfulClient();
                client.getEntry(curRoute === 'math100' ? process.env.VUE_APP_PORTFOLIO_DETAIL_MATH100 : curRoute === 'slow-foot' ? process.env.VUE_APP_PORTFOLIO_DETAIL_SLOWFOOT : process.env.VUE_APP_PORTFOLIO_DETAIL_CLONETWITTER).then((entry)=>{
                    this.detailData = entry.fields;
                    loading = setTimeout(()=>{
                        this.isLoading = false;
                    }, 500);
                }).catch(console.error)
            } else {
                this.isLoading = false;
            }
        },
        beforeDestroy(){
            if(this.currentRoute != 'work-piece') {
                clearTimeout(loading);
            }
        }
    }
</script>
<style></style>