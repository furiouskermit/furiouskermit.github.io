<template>
    <div>
        <div class="word-keep work-piece-troubleshooting-list">
            <slot />
        </div>
    </div>
</template>
<script></script>
<style scoped>
    .work-piece-troubleshooting-list {
        padding: 50px 0 70px;
    }
    .work-piece-troubleshooting-item:not(:last-child) {
        margin: 0 0 35px;
    }
    .work-piece-troubleshooting-title {
        display: block;
        margin: 0 0 15px;
        padding: 10px;
        border-radius: var(--border-radius);
        background-color: rgba(var(--point-secondary-rgb), 0.1);
    }
    .work-piece-troubleshooting-content {
        padding: 0 10px;
        line-height: 1.45em;
        font-size: 16px;
    }
    .work-piece-troubleshooting-result-img-list {
        margin: 15px 0 0;
    }
    .work-piece-troubleshooting-result-img img {
        border: 1px solid var(--border-color);
        border-radius: 20px;
    }
    .work-piece-troubleshooting-result-img span {
        padding: 0 10px;
    }
</style>