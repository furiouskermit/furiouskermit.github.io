<template>
    <div id="openApi">
        <div class="open-api-container">
           <div class="">
                <template v-if="dataList.length > 0">
                    <!-- list -->
                    <div class="overflow-h table-list-wrap">
                        <table class="w-100 text-center table-list">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>제목</th>
                                    <th>날짜</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="notice in dataList"
                                    :key="notice.notice_id"
                                >
                                    <td>{{ notice.notice_id }}</td>
                                    <td class="text-start"><strong class="text-elps-1">{{ notice.title }}</strong></td>
                                    <td>{{ notice.date }}</td>
                                    <td>
                                        <a class="d-inline-block search-btn bg-secondary-light" :href="notice.url" target="_blank"><i class="ri-share-forward-fill"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
    
                    <!-- page -->
                    <div class="d-flex justify-content-center align-items-center gap-1  pagination">
                        <button type="button"
                            @click="movePrevPage"
                            :class="'btn-page-prev ' + (pageData.currentPageGroup > 0 ? 'active' : '')"
                        ><i class="ri-arrow-left-s-line"></i></button>
                        <div class="d-flex align-items-center gap-1">
                            <template v-for="num in 10">
                                <button type="button"
                                    v-if="num <= pageData.totalPageGroupCnt"
                                    :class="'btn-page-num ' + (pageData.currentPageNumber === pageData.currentPageGroup * 10 + num ? 'active' : '')"
                                    @click="movePageNumber"
                                >
                                    {{ pageData.currentPageGroup * 10 + num }}
                                </button>    
                            </template>
                        </div>
                        <button type="button"
                            :class="'btn-page-next ' + ((pageData.totalPageGroupCnt > 10 && pageData.currentPageGroup < pageData.totalPageGroupCnt) ? 'active' : '')"
                            @click="moveNextPage"
                        ><i class="ri-arrow-right-s-line"></i></button>
                    </div>
                </template>

                <template v-else>
                    <empty-data :text="'데이터가 없습니다'"></empty-data>
                </template>

            </div>
        </div>
    </div>
</template>
<script>
    import EmptyData from '@/components/EmptyData';

    export default {
        components: {
            EmptyData,
        },
        data(){
            return {
                dataList: [],
                pageData: {
                    totalCnt: 0,
                    totalPageGroupCnt: 0,
                    currentPageGroup: 0,
                    currentPageNumber: 1,
                },
            }
        },
        props: ['currentTab'],
        watch: {
            currentTab(val, oldVal){
                if(val != oldVal) {
                    this.resetPageData(); // pageData reset
                    this.requestOpenApi(1, 10);
                }
            }
        },
        methods: {
            requestOpenApi(startNoticeNum, endNoticeNum){
                const url = 'https://open.api.nexon.com/maplestory/v1/notice'
                const answer = fetch(url, {
                    headers: {
                        "x-nxopen-api-key": process.env.VUE_APP_OPEN_API_NEXON
                    }
                }).then(response => response.json()).then(data => {
                    let arrayForNoticeList = [];
                    let noticeList = data.notice;
                    
                    for(let i = startNoticeNum; i <= endNoticeNum; i++) {
                        if(noticeList[i+1]) {
                            noticeList[i+1].date = noticeList[i+1].date.split('T')[0];
                            arrayForNoticeList.push(noticeList[i+1]);
                        }
                    }
                    this.dataList = arrayForNoticeList;

                    // pageData
                    this.pageData.totalCnt = noticeList.length / 10;
                    this.pageData.totalPageGroupCnt = Math.ceil(this.pageData.totalCnt);
                }).catch(error => console.log(error))
            },
            movePrevPage(){
                this.pageData.currentPageGroup --;
                this.pageData.currentPageNumber = this.pageData.currentPageGroup * 10 + 10;

                this.requestOpenApi(this.pageData.currentPageNumber * 10 - 9, this.pageData.currentPageNumber * 10);
            },
            moveNextPage(){
                // 현재 선택한 페이지 그룹에 +1
                this.pageData.currentPageGroup ++; 

                // 현재 페이지 번호(11, 21, 31, ...)
                this.pageData.currentPageNumber = this.pageData.currentPageGroup * 10 + 1;

                this.requestOpenApi(this.pageData.currentPageNumber * 10 + 1, this.pageData.currentPageNumber * 10 + 10)
            },
            movePageNumber(e){
                this.pageData.currentPageNumber = Number(e.target.innerText);

                // 1페이지: 1 ~ 10, 2페이지: 11 ~ 20, ...
                this.requestOpenApi((this.pageData.currentPageNumber - 1) * 10 + 1, (this.pageData.currentPageNumber - 1) * 10 + 10)
                console.log(this.dataList)
            },
            resetPageData(){
                this.pageData.totalPageGroupCnt = 0;
                this.pageData.currentPageGroup = 0;
                this.pageData.currentPageNumber = 1;
            }
        },
        mounted(){
            this.requestOpenApi(1, 10)
        },
    }
</script>
<style scoped>
    .open-api-container {
        border-radius: 14px;
        background: #ffffff;
        box-shadow:  18px 18px 36px #e6e6e6,
             -18px -18px 36px #ffffff;
    }

    /* ### list ### */
    .table-list-wrap {
        min-height: calc(46px + 64px * 10);
        border-radius: 14px;
    }
    .table-list :is(th, td) {
        width: 120px;
    }
    .table-list :is(th, td):nth-child(1) {
        width: 90px;
    }
    .table-list :is(th, td):nth-child(4) {
        width: 75px;
    }
    .table-list :is(th, td):nth-child(2) {
        width: calc(100% - calc(120px + 90px + 75px));
    }
    .table-list thead th {
        background-color: #f2f3f5;
    }
    .table-list .search-btn {
        width: 45px;
    }
</style>