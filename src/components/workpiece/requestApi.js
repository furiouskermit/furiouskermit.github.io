export function requestApi(dataList, pageData, date, startPage, endPage) {
let xhr = new XMLHttpRequest();
let url = `http://openapi.seoul.go.kr:8088/${process.env.VUE_APP_OPEN_API_SEOUL}/json/tbCycleUseStatus/${startPage}/${endPage}/${date}`; /* URL */
xhr.open('GET', url);
xhr.onreadystatechange = function () {
if (this.readyState == xhr.DONE) {
if (xhr.status == 200 || xhr.status == 201) {
const jsonData = JSON.parse(this.responseText);
alert(typeof (jsonData));

dataList = jsonData.useStatus.row;

// 페이징 data
pageData.totalCnt = jsonData.useStatus.list_total_count;
pageData.totalPageGroupCnt = Math.ceil(pageData.totalCnt / 10);
}
}
};
xhr.send('');
}
