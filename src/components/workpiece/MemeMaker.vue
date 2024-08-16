<template>
    <div id="memeMaker" class="d-flex align-items-start justify-content-center">
        <div class="meme-maker-left">
            <strong class="d-block">미리보기</strong>
            <div ref="capture" class="meme-preview">
                <div class="meme-preview-top">
                    <div class="meme-preview-head">
                        <strong class="d-block">
                            <span class="text-success">Q.</span>
                            <span class="meme-preview-title">{{ title }}</span>
                            <span v-show="scoreShow === 'show' && score.length > 0" class="meme-preview-score">{{ score }}</span>
                        </strong>
                        <div class="fz-13 text-muted">
                            <span>{{ userName }}</span>
                            <span>채택률 <span class="text-success">{{ selectedRate }}%</span></span>
                            <span>마감률 <span class="text-success">{{ closedRate }}%</span></span>
                        </div>
                    </div>
                    <pre class="meme-preview-content">{{ question }}</pre>
                    <div v-show="tag.length > 0" class="meme-preview-tag">
                        <span v-for="(t, idx) in splitTag" class="meme-preview-tag-item">#{{ t }}</span>
                    </div>
                </div>
                <div class="meme-preview-bottom">
                    <div class="d-flex align-items-center gap-2">
                        <div class="meme-preview-user-thumbnail">
                            <img :src="imgSrc === '' ? require('@/assets/defaultUser.jpg') : imgSrc" alt="" class="w-100 h-100" />
                        </div>
                        <div class="meme-preview-head">
                            <strong class="d-block">{{ responder }}님 답변</strong>
                            <div class="fz-13 text-muted">
                                <span class="text-success">{{ responderLevel }}</span>
                                <span>채택 답변 수 <span>{{ selectedAnswers }}</span></span>
                            </div>
                        </div>
                    </div>
                    <pre class="meme-preview-content">{{ respond }}</pre>
                </div>
            </div>
        </div>
        <div class="meme-maker-right">
            <form class="meme-form">
                <div>
                    <div class="meme-form-item">
                        <span>제목</span>
                        <input type="text" class="form-input" v-model="title" placeholder="제목 입력" maxlength="100" />
                    </div>
                    <div class="meme-form-item">
                        <span>내공</span>
                        <div class="d-flex align-items-center gap-1">
                            <select class="form-select" v-model="scoreShow" @change="resetInputValue('score')">
                                <option value="show">공개</option>
                                <option value="hide">비공개</option>
                            </select>
                            <input type="number" class="form-input" v-model="score" :readonly="scoreShow != 'show'" placeholder="내공 입력" />
                        </div>
                    </div>
                    <div class="meme-form-item">
                        <span>사용자</span>
                        <div class="d-flex align-items-center gap-1">
                            <select class="form-select" v-model="userShow" @change="resetInputValue('user')">
                                <option value="show">공개</option>
                                <option value="hide">비공개</option>
                            </select>
                            <input type="text" class="form-input" v-model="user" :readonly="userShow != 'show'" placeholder="사용자 입력" />
                        </div>
                    </div>
                    <div class="meme-form-item">
                        <span>채택률</span>
                        <input type="number" class="form-input" v-model="selectedRate" placeholder="채택률 입력" />
                    </div>
                    <div class="meme-form-item">
                        <span>마감률</span>
                        <input type="number" class="form-input" v-model="closedRate" placeholder="마감률 입력" />
                    </div>
                    <div class="meme-form-item align-items-start">
                        <span>질문</span>
                        <textarea class="form-textarea" v-model="question" placeholder="질문 입력"></textarea>
                    </div>
                    <div class="meme-form-item">
                        <span>
                            태그
                            <span class="guide-wrap">
                                <span class="guide-icon"><i class="ri-information-line"></i></span>
                                <span class="guide-content">쉼표를 입력하여 태그를 등록할 수 있습니다.</span>
                            </span>
                        </span>
                        <input type="text" class="form-input" v-model="tag" placeholder="태그 입력" />
                    </div>
                    <div class="meme-form-item">
                        <span>프로필 사진</span>
                        <div class="d-flex align-items-center gap-1 meme-form-item-thumbnail">
                            <input type="file" id="userThumbnail" class="d-none" @change="onChangeThumbnail" />
                            <input type="text" id="userThumbnailFileName" class="form-input" v-model="imgName" readonly>
                            <label for="userThumbnail" class="input-btn bg-point text-center cursor-pointer">파일 선택</label>
                            <button type="button" class="input-btn btn-w-sm bg-plain" @click="resetThumbnail">초기화</button>
                        </div>
                    </div>
                    <div class="meme-form-item">
                        <span>답변자</span>
                        <input type="text" class="form-input" v-model="responder" placeholder="답변자 입력" />
                    </div>
                    <div class="meme-form-item">
                        <span>레벨</span>
                        <input type="text" class="form-input" v-model="responderLevel" placeholder="레벨 입력" />
                    </div>
                    <div class="meme-form-item">
                        <span>채택답변수</span>
                        <input type="number" class="form-input" v-model="selectedAnswers" placeholder="채택답변수 입력" />
                    </div>
                    <div class="meme-form-item align-items-start">
                        <span>답변</span>
                        <textarea class="form-textarea" v-model="respond" placeholder="답변 입력"></textarea>
                    </div>
                </div>
                <button type="button" class="w-100 input-btn bg-point" @click="downloadBtn">생성하기</button>
            </form>
        </div>
    </div>
</template>
<script>
    import html2canvas from "html2canvas";

    export default {
        props: ['currentTab'],
        data(){
            return {
                title: '',
                scoreShow: 'show',
                score: '',
                userShow: 'show',
                user: '',
                selectedRate: '',
                closedRate: '',
                question: '',
                tag: '',
                responder: '',
                responderLevel: '',
                selectedAnswers: '',
                respond: '',
                imgName: '',
                imgSrc: '',
            }
        },
        computed: {
            userName(){
                let user = this.user;
                let editedUser = '';
                if(user.length > 0) {
                    if(user.length > 3) {
                        let asterisk = '';
                        for(let i = 3; i < user.length; i++){
                            asterisk += '*'
                        }
                        editedUser = user.slice(0, 3) + asterisk
                    } else {
                        editedUser = user.slice(0, user.length - 1) + '*';
                    }
                }

                return this.userShow === 'show' ? editedUser : '비공개'
            },
            splitTag(){
                return this.tag.split(',');
            }
        },
        methods: {
            resetInputValue(item){
                // ~Show data의 값 변경될 때마다 근처에 있는 input value 초기화
                if(item === 'score') {
                    this.score = '-';
                } else if(item === 'user') {
                    this.user = '';
                }
            },
            onChangeThumbnail(e){
                const file = e.target.files[0];
                const imgUrl = URL.createObjectURL(file);
                this.imgName = file.name;
                this.imgSrc = imgUrl;
            },
            resetThumbnail(){
                this.imgName = '';
                this.imgSrc = '';
            },
            downloadBtn(){
                let captureDiv = this.$refs.capture
                html2canvas(captureDiv).then(canvas => {
                    this.saveImg(canvas.toDataURL('image/jpg'), 'memeMaker.jpg');
                })
            },
            saveImg(uri, filename){
                let link = document.createElement('a');
                document.body.appendChild(link);
                link.href = uri;
                link.download = filename;
                link.click();
                document.body.removeChild(link);
            }
        },
        watch: {
            currentTab(val, oldVal) {
                if(val != oldVal) {
                    // data 초기화
                    this.title = '';
                    this.scoreShow = 'show';
                    this.score = '';
                    this.userShow = 'show';
                    this.user = '';
                    this.selectedRate = '';
                    this.closedRate = '';
                    this.question = '';
                    this.tag = '';
                    this.tagList = [];
                    this.responder = '';
                    this.responderLevel = '';
                    this.selectedAnswers = '';
                    this.respond = '';
                    this.imgName = '';
                    this.imgSrc = '';
                }
            },
        }
    }
</script>
<style scoped>
    /* ### layout ### */
    #memeMaker {
        gap: 50px;
    }
    .meme-maker-left, .meme-maker-right {
        width: calc(calc(100% - 50px) / 2);
    }

    /* ### meme preview ### */
    .meme-maker-left {
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
    }
    .meme-maker-left > strong {
        padding: 14px;
        border-bottom: 1px solid var(--border-color);
    }
    .meme-preview {
        padding: 14px;
    }
    .meme-preview-bottom {
        margin: 20px 0 0;
    }
    .meme-preview-user-thumbnail {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background-color: var(--text-muted);
        overflow: hidden;
    }
    .meme-preview-head {
        
        font-size: 26px;
    }
    .meme-preview-head strong {
        font-weight: 600;
    }
    .meme-preview-head > .text-muted {
        margin: 4px 0 0;
    }
    .meme-preview-head > .text-muted > span:not(:last-child):after {
        content: '·';
        padding: 0 4px;
    }
    .meme-preview-content {
        margin: 12px 0 0;
        line-height: 1.4em;
        font-size: 18px;
        white-space: pre-wrap;
    }

    /* --- score(내공) --- */
    .meme-preview-score {
        display: inline-block;
        padding: 4px 5px 4px 4px;
        background-color: var(--text-muted);
        border-radius: 2px;
        font-size: 14px;
        color: #fff;
    }

    /* --- tag --- */
    .meme-preview-tag {
        margin: 10px 0 5px;
    }
    .meme-preview-tag-item {
        display: inline-block;
        padding: 4px;
        background-color: #f2f2f2;
        color: var(--point-color);
    }
    .meme-preview-tag-item:not(:last-child) {
        margin-right: 4px;
    }

    /* ### meme form ### */
    .meme-form > .input-btn {
        margin: 20px 0 0;
    }
    .meme-form-item {
        display: flex;
        align-items: center;
        gap: var(--gap);
    }
    .meme-form-item:not(:last-child) {
        margin: 0 0 7px;
    }
    .meme-form-item > span {
        min-width: 90px;
        font-weight: 700;
        color: var(--point-secondary);
    }
    .meme-form-item > span + * {
        width: calc(100% - calc(90px + var(--gap)));
    }
    .meme-form-item > span + .d-flex .form-select {
        width: 85px;
    }
    .meme-form-item > span + .d-flex .form-input {
        width: calc(100% - calc(85px + var(--gap)));
    }
    .meme-form-item .form-textarea {
        min-height: 60px;
    }

    /* --- thumbnail --- */
    .meme-form-item-thumbnail {}
    #userThumbnail {}
    #userThumbnailFileName {
        width: calc(100% - calc(90px + var(--btn-w-sm) + calc(var(--gap) * 2)));
    }
    label[for="userThumbnail"] {
        width: 90px;
    }
</style>