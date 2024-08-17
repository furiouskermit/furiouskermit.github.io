<template>
    <div id="tdCycleUse">
        <div class="td-cycle-use-container">
            <div class="d-flex align-items-center justify-content-between td-cycle-use-top">
                <strong class="d-block fz-20">따릉이 이용 정보</strong>
                <!-- search -->
                <form class="d-flex align-items-center gap-1" @submit.prevent="searchTdCycleUse">
                    <div class="input-group">
                        <label for="startDate" class="input-group-title">날짜</label>    
                        <input type="date" class="form-input" id="startDate" ref="startDate" v-model="searchData.date" />
                    </div>
                    <button class="bg-point input-btn btn-w-sm"><i class="ri-search-line"></i> 검색</button>
               </form>
            </div>

           <div class="td-cycle-use-bottom">
                <template v-if="dataList.length > 0">
                    <!-- list -->
                    <table class="w-100 text-center table-list">
                        <thead>
                            <tr>
                                <th>위치</th>
                                <th class="text-start">대여소</th>
                                <th>날짜</th>
                                <th>대여건수</th>
                                <th>반납건수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="info in dataList" :key="'tdCycleUse'+ info.RNUM">
                                <td>{{ info.STA_LOC }}</td>
                                <td class="text-start">{{ info.RENT_NM }}</td>
                                <td>{{ info.STAT_DATA }}</td>
                                <td>{{ info.RENT_CNT }}</td>
                                <td>{{ info.RTN_CNT }}</td>
                            </tr>
                        </tbody>
                    </table>
    
                    <!-- page -->
                    <div class="d-flex justify-content-center align-items-center gap-1  pagination">
                        <button type="button"
                            @click="movePrevPage"
                            :class="'btn-page-prev ' + (pageData.currentPageGroup > 0 ? 'active' : '')"
                        ><i class="ri-arrow-left-s-line"></i></button>
                        <div class="d-flex align-items-center gap-1">
                            <button type="button"
                                v-for="num in 10"
                                :class="'btn-page-num ' + (pageData.currentPageNumber === pageData.currentPageGroup * 10 + num ? 'active' : '')"
                                @click="movePageNumber"
                            >
                                {{ pageData.currentPageGroup * 10 + num }}
                            </button>
                        </div>
                        <template>
                            <button type="button"
                                :class="'btn-page-next ' + ((pageData.totalPageGroupCnt > 0 && pageData.currentPageGroup < pageData.totalPageGroupCnt) ? 'active' : '')"
                                @click="moveNextPage"
                            ><i class="ri-arrow-right-s-line"></i></button>
                        </template>
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

    const today = new Date();
    const defaultDate = `${today.getFullYear()}-${addPrefixToNumber(today.getMonth()+1)}-${addPrefixToNumber(today.getDate())}`;

    

    

    function addPrefixToNumber(number){
        if(number < 10) {
            return `0${number}`
        } else {
            return `${number}`
        }
    }

    export default {
        components: {
            EmptyData,
        },
        data(){
            return {
                searchData: {
                    date: '',
                },
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
                    this.searchData.date = defaultDate;
                    this.requestApi(this.searchData.date, 1, 10);
                }
            }
        },
        methods: {
            requestApi(date, startPage, endPage){
                let xhr = new XMLHttpRequest();
                let url = `http://openapi.seoul.go.kr:8088/${process.env.VUE_APP_OPEN_API_SEOUL}/json/tbCycleUseStatus/${startPage}/${endPage}/${date}`;

                xhr.open('GET', url);
                xhr.onreadystatechange = (response) => {
                    if(response.currentTarget.readyState == xhr.DONE) {
                        if(xhr.status == 200 || xhr.status == 201) {
                            const jsonData = JSON.parse(response.currentTarget.responseText);

                            if(jsonData.useStatus) {
                                this.dataList = jsonData.useStatus.row;

                                // 페이징
                                this.pageData.totalCnt = jsonData.useStatus.list_total_count;
                                this.pageData.totalPageGroupCnt = Math.ceil(this.pageData.totalCnt / 10);
                            }
                        }
                    }
                }

                xhr.send('');
            },
            searchTdCycleUse(){
                const startDateValue = this.$refs.startDate.value;
                this.searchData.date = startDateValue === '' ? defaultDate : startDateValue;
                this.resetPageData(); // pageData reset
                this.requestApi(this.searchData.date, 1, 10)
            },
            movePrevPage(){
                this.pageData.currentPageGroup --;
                this.pageData.currentPageNumber = this.pageData.currentPageGroup * 10 + 10;

                this.requestApi(this.searchData.date, this.pageData.currentPageNumber * 10 - 9, this.pageData.currentPageNumber * 10);
            },
            moveNextPage(){
                // 현재 선택한 페이지 그룹에 +1
                this.pageData.currentPageGroup ++; 

                // 현재 페이지 번호(11, 21, 31, ...)
                this.pageData.currentPageNumber = this.pageData.currentPageGroup * 10 + 1;

                this.requestApi(this.searchData.date, this.pageData.currentPageNumber * 10 + 1, this.pageData.currentPageNumber * 10 + 10);
            },
            movePageNumber(e){
                this.pageData.currentPageNumber = Number(e.target.innerText);

                // 1페이지: 1 ~ 10, 2페이지: 11 ~ 20, ...
                this.requestApi(this.searchData.date, (this.pageData.currentPageNumber - 1) * 10 + 1, (this.pageData.currentPageNumber - 1) * 10 + 10);
            },
            resetPageData(){
                this.pageData.totalPageGroupCnt = 0;
                this.pageData.currentPageGroup = 0;
                this.pageData.currentPageNumber = 1;
            }
        },
        mounted(){
            this.searchData.date = defaultDate;
            this.requestApi(this.searchData.date, 1, 10);
        },
    }
</script>
<style scoped>
    .td-cycle-use-container {
        padding: 18px 0 0;
        border-radius: 14px;
        background: #ffffff;
        box-shadow:  18px 18px 36px #e6e6e6,
             -18px -18px 36px #ffffff;
    }
    .td-cycle-use-top {
        margin: 0 0 14px;
        padding: 0 14px;
    }

    /* ### search ### */
    #startDate {
        width: 150px;
    }

    /* ### list ### */
    .table-list :is(th, td) {
        width: 120px;
    }
    .table-list :is(th, td):nth-child(1) {
        width: 90px;
    }
    .table-list :is(th, td):nth-child(2) {
        width: calc(100% - calc(90px + calc(120px * 3)));
    }
</style>