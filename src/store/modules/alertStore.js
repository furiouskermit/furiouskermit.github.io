
const alertStore = {
    namespaced: true,
    state: {
        alertMessage: '',
        alertType: '',
        isOpened: false,
    },
    getters: {},
    mutations: {
        OPEN_ALERT_MODAL(state, {text, type}){
            state.alertMessage = text;
            state.alertType = type;
            state.isOpened = true;

            // input 값 입력후 키보드 엔터로 모달 창 띄운 경우 input에 포커스가 남아있어서 이를 해제
            let input = document.querySelectorAll('input');
            if(input.length > 0) {
                input.forEach(item => {
                    item.blur()
                })
            }
        },
        CLOSE_ALERT_MODAL(state){
            state.isOpened = false;
        },
    },
    actions: {

    }
};

export default alertStore;