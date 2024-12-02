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
                        <div v-if="currentTab === tabList[1].id" class="'tab-pane'"><open-api :current-tab="currentTab"></open-api></div>
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
import MemeMaker from '@/components/workpiece/MemeMaker';
import OpenApi from '@/components/workpiece/OpenApi';
import TroubleshootingForm from '@/components/workpiece/TroubleshootingForm';
import WordRelay from '@/components/workpiece/WordRelay';

    let loading;

    export default {
        components: {
            Loading,
            WordRelay,
            OpenApi,
            MemeMaker,
            TroubleshootingForm,
        },
        data(){
            return {
                isLoading: true,
                tabList: [
                    {name: 'Word Relay', id: 'wordRelay'},
                    {name: 'Notice Board', id: 'openApi'},
                    {name: 'Meme Generator', id: 'memeMaker'},
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
                    } else if(val === 'openApi') {
                        this.currentDataId = process.env.VUE_APP_WORK_PIECE_OPEN_API;
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

    /* ### RESPONSIVE ### */
    @media (max-width: 768px) {
        .tab {
            margin-bottom: 20px;
            gap: calc(var(--gap) * 2);
        }
        .tab-btn {
            height: unset;
            padding: 10px;
            word-break: keep-all;
            line-height: 1.35em;
            font-size: 15px;
        }
    }
</style>