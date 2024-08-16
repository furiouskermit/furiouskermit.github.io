<template>
    <div id="workPiece">
        <template v-if="isLoading"><loading></loading></template>
        <template v-else>
            <div class="container-inner">
                <div class="work-piece-top">
                    <!-- tab -->
                    <ul class="tab d-flex align-items-center justify-content-center">
                        <li class="tab-item" v-for="(tab, idx) in tabList" :key="tab.id">
                            <button type="button" :class="'tab-btn '+(currentTab === tab.id ? 'active' : '')" :data-id="tab.id" @click="onClickTab">{{ tab.name }}</button>
                        </li>
                    </ul>
        
                    <!-- tab contents -->
                    <div class="tab-contents">
                        <div v-if="currentTab === tabList[0].id" class="'tab-pane'"><word-relay :current-tab="currentTab"></word-relay></div>
                        <div v-if="currentTab === tabList[1].id" class="'tab-pane'"><td-cycle-use :current-tab="currentTab"></td-cycle-use></div>
                        <div v-if="currentTab === tabList[2].id" class="'tab-pane'"><meme-maker :current-tab="currentTab"></meme-maker></div>
                    </div>
                </div>
                <div class="work-piece-bottom">
                    <troubleshooting-form>
                        <div class="work-piece-troubleshooting-item">
                            <strong class="work-piece-troubleshooting-title">🌧️ Situation</strong>
                            <div class="work-piece-troubleshooting-content">{{ currentData.situation }}</div>
                        </div>
                        <div class="work-piece-troubleshooting-item">
                            <strong class="work-piece-troubleshooting-title">📌 Task</strong>
                            <div class="work-piece-troubleshooting-content">{{ currentData.task }}</div>
                        </div>
                        <div class="work-piece-troubleshooting-item">
                            <strong class="work-piece-troubleshooting-title">✍️ Action</strong>
                            <div class="work-piece-troubleshooting-content">{{ currentData.action }}</div>
                        </div>
                        <div class="work-piece-troubleshooting-item">
                            <strong class="work-piece-troubleshooting-title">✨ Result</strong>
                            <div class="work-piece-troubleshooting-content">
                                <span class="d-block work-piece-troubleshooting-result">{{ currentData.result }}</span>
                                <template v-if="currentData.resultImg">
                                    <ul class="work-piece-troubleshooting-result-img-list">
                                        <li v-for="img in currentData.resultImg"  class="work-piece-troubleshooting-result-img">
                                            <img class="d-block w-100" :src="img.fields.file.url" :alt="img.fields.title" />
                                            <span class="text-muted fz-13">{{ img.fields.title }}</span>
                                        </li>
                                    </ul>
                                </template>
                            </div>
                        </div>
                    </troubleshooting-form>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    import Loading from '@/components/Loading';
    import WordRelay from '@/components/workpiece/WordRelay';
    import TdCycleUse from '@/components/workpiece/TdCycleUse';
    import MemeMaker from '@/components/workpiece/MemeMaker';
    import TroubleshootingForm from '@/components/workpiece/TroubleshootingForm';

    let loading;

    export default {
        components: {
            Loading,
            WordRelay,
            TdCycleUse,
            MemeMaker,
            TroubleshootingForm,
        },
        data(){
            return {
                isLoading: true,
                tabList: [
                    {name: '끝말잇기', id: 'wordRelay'},
                    {name: '따릉이 이용 정보', id: 'tdCycleUse'},
                    {name: '네이버 지식인 밈 생성기', id: 'memeMaker'},
                ],
                currentTab: 'wordRelay',
                currentDataId: process.env.VUE_APP_WORK_PIECE_CUSTOM_MODAL,
                currentData: {},
            }
        },
        methods: {
            onClickTab(event){
                const { target } = event;
                this.currentTab = target.getAttribute('data-id');
            },
            getEntry(isMounted){
                const client = this.$getContentfulClient();
                client.getEntry(this.currentDataId).then((entry) => {
                    this.currentData = entry.fields;

                    if(isMounted) {
                        loading = setTimeout(()=>{
                            this.isLoading = false;
                        }, 500)
                    }
                }).catch(console.error)
            }
        },
        watch: {
            currentTab(val, oldVal) {
                if(val != oldVal) {
                    if(val === 'wordRelay') {
                        this.currentDataId = process.env.VUE_APP_WORK_PIECE_CUSTOM_MODAL;
                    } else if(val === 'memeMaker') {
                        this.currentDataId = process.env.VUE_APP_WORK_PIECE_MEME_MAKER;
                    } else if(val === 'tdCycleUse') {
                        this.currentDataId = process.env.VUE_APP_WORK_PIECE_TD_CYCLE_USE;
                    }

                    this.getEntry(false);
                }
            }
        },
        mounted(){
            this.getEntry(true);
        },
        beforeDestroy(){
            clearTimeout(loading);
        },
    }
</script>
<style scoped>
    .tab {
        margin: 20px 0 40px;
    }

    /* ### Meme Maker ### */
    .work-piece-troubleshooting-result-img-list {
        display: grid;
        grid-template-columns: repeat(2, calc(calc(100% - 30px) / 2));
        grid-gap: 30px;
    }
</style>