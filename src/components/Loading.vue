<template>
    <div>
        <div class="loading">
            <div class="d-flex align-items-center justify-content-center h-100 loading-inner">
                <div id="spinner"></div>
                <div class="loading-text">Now loading...</div>
            </div>
        </div>
    </div>
</template>
<script></script>
<style scoped>
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0,0,0,0.75);
        z-index: 105;
    }
    #spinner {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        background-color: transparent;
        border: 3px dotted transparent;
        border-top-color: var(--point-color);        
        animation: animation 1s infinite linear;
    }
    .loading-text {
        margin-left: 16px;
        font-size: 30px;
        color: #fff;
    }
    @keyframes animation {
        100% {
            transform: rotate(360deg);
        }
    }
</style>