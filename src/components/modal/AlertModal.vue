<template>
    <div id="alertModal" :style="modalStyle" :class="'modal '+modalType">
        <div class="modal-bg"></div>
        <div class="modal-content">
            <span class="alert-modal-icon">
                <template v-if="modalType === 'warning'">
                    <i class="ri-error-warning-line"></i>
                </template>
                <template v-if="modalType === 'fail'">
                    <i class="ri-close-line"></i>
                </template>
                <template v-if="modalType === 'success'">
                    <i class="ri-check-line"></i>
                </template>
            </span>
            <p>{{ modalAlertMessage }}</p>
            <button type="button" class="close-modal" @click="closeModal">닫기</button>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    
    export default {
        name: 'AlertModal',
        computed: {
            ...mapState(['alertMessage', 'isOpened', 'alertType']),
            modalStyle(state) {
                // isOpened === true -> show modal / isOpened === false -> hide modal
                let isOpened = this.$store.state.alertStore.isOpened;
                if(isOpened) {
                    return {
                        display: 'block',
                        position: 'fixed'
                    }
                } else {
                    return {
                        display: 'none'
                    }
                }
            },
            modalAlertMessage(state){
                return this.$store.state.alertStore.alertMessage;
            },
            modalType(state){
                return this.$store.state.alertStore.alertType;
            }
        },
        methods: {
            closeModal(){
                this.$store.commit('alertStore/CLOSE_ALERT_MODAL')
            }
        },
    }
</script>
<style scoped>
    .alert-modal-icon {
        display: block;
        width: 50px;
        height: 50px;
        margin: 0 auto 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        font-size: 18px;
    }
    .close-modal {
        display: block;
        width: 120px;
        height: 45px;
        line-height: 45px;
        margin: 30px auto 0;
        border-radius: 7px;
        background-color: var(--point-color);
        color: #fff;
        transition: 0.2s;
    }

    /* ### css based on modal type ### */
    /* --- alert modal icon --- */
    #alertModal.warning .alert-modal-icon {
        background-color: rgba(var(--point-warning-rgb), 0.1);
        color: var(--point-warning);
    }
    #alertModal.success .alert-modal-icon {
        background-color: rgba(var(--point-success-rgb), 0.1);
        color: var(--point-success);
    }

    /* --- close modal btn --- */
    #alertModal.warning .close-modal {
        background-color: var(--point-warning);
    }
    #alertModal.warning .close-modal:hover {
        background-color: var(--point-warning-dark);
    }
    #alertModal.success .close-modal {
        background-color: var(--point-success);
    }
    #alertModal.success .close-modal:hover {
        background-color: var(--point-success-dark);
    }
</style>