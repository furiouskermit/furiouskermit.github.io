<template>
    <div id="wordRelay" class="portfolio-game-container">
        <strong class="d-block fz-xl">Word Relay</strong>
        <div class="fz-18 portfolio-game-question">{{ wordRelayText }}</div>
        <div class="d-flex align-items-center justify-content-center gap-1">
            <form class="d-flex align-items-center gap-1" @submit.prevent="onSubmitForm">
                <input type="text" class="form-input" ref="wordRelayInput" maxlength="4" v-model="value" placeholder="Type a word." @keyup="onKeyupEvent" />
                <button class="btn-w-sm input-btn bg-point">Enter</button>
            </form>
            <button type="button" class="btn-w-sm input-btn bg-plain" @click="resetWordRelay">Reset</button>
        </div>
        <div class="font-16 portfolio-game-memo">
            <span>Death Count: </span>
            <span class="text-warning">{{ deathCount }}</span>
        </div>

        <!-- alert modal -->
        <alert-modal></alert-modal>
    </div>
</template>
<script>
    import AlertModal from '@/components/modal/AlertModal';

    let answers = [];
    let count = 5;

    export default {
        components: {
            AlertModal,
        },
        props: ['currentTab'],
        data(){
            return {
                wordRelayText: '',
                value: '',
                deathCount: '♥♥♥♥♥',
            }
        },
        methods: {
            onSubmitForm(){
                let wordValue = this.value;
                if(wordValue.length > 0) {
                    if(answers.length > 0) {
                        let lastAnswer = answers[answers.length - 1];
                        if(answers.includes(wordValue)) { // 똑같은 단어를 중복해서 입력할 경우
                            this.countDeath('이미 입력한 단어입니다');
                            return;
                        } else {
                            if(lastAnswer[lastAnswer.length - 1] === wordValue[0]) { // 이전에 입력한 글자의 마지막 철자와 새로 입력한 글자의 첫 철자가 같을 경우
                                this.setWord();
                            } else {
                                this.countDeath('올바른 단어를 입력해주세요');
                                return;
                            }
                        }
                    } else { // 처음 입력하는 경우
                        this.setWord();
                    }
                } else { // 아무 글자도 입력하지 않았을 때
                    this.$store.commit('alertStore/OPEN_ALERT_MODAL', { text: '단어를 입력해주세요', type: 'warning' });
                    return;
                }
            },
            setWord(){ // 입력한 단어 반영
                let wordValue = this.value;
                answers.push(wordValue);
                this.wordRelayText = wordValue;
                this.value = '';
            },
            onKeyupEvent(e){ // 한글 maxlength check
                this.$checkMaxLength(e.target, 4);
            },
            countDeath(alertText){ // 목숨 계산
                count = count - 1;
                let hearts = ''
                for(let i = 0; i < 5; i++) {
                    if(i < count) {
                        hearts += '♥';
                    } else {
                        hearts += '♡';
                    }
                }
                this.deathCount = hearts;

                // alert
                this.$store.commit('alertStore/OPEN_ALERT_MODAL', { text: count > 0 ? alertText : '목숨을 전부 소진하여 게임을 다시 시작합니다', type: 'warning' });

                // input 초기화
                this.value = '';
                
                // 목숨 다 소진한 경우
                if(count < 1) {
                    this.resetWordRelay();
                }
            },
            resetWordRelay(){ // 게임 초기화
                answers = [];
                count = 5;
                this.wordRelayText = '';
                this.value = '';
                this.deathCount = '♥♥♥♥♥';
            }
        },
        watch: {
            currentTab(val, oldVal){
                if(val != oldVal){
                    this.resetWordRelay();
                }
            }
        }
    }
</script>
<style scoped>
    #wordRelay :is(form, .form-input) {
        width: calc(100% - calc(var(--btn-w-sm) + var(--gap)));
    }
    .portfolio-game-container {
        max-width: 350px;
        margin: 0 auto;
        text-align: center;
    }
    .portfolio-game-question {
        height: var(--input-height);
        line-height: var(--input-height);
        margin: 30px 0 10px;
        background: #fafbfc;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
    }
    .portfolio-game-memo {
        margin: 15px 0 0;
    }
</style>