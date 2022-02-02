<script>
    import CreatePageButton from "$lib/components/CreatePageButton.svelte";
</script>
    <div style="margin: auto;
    text-align: center;
    display: block;
    margin-top: 50px;">
    <a href="/" style="display: inline-block; margin-right: 30px;">Explore</a>
    <a href="/about" style="display: inline-block; margin-right: 30px;">About</a>
    <CreatePageButton></CreatePageButton>
    </div>
    <div class="content">
    <slot></slot>
    </div>
    <style>
            /* .content{padding:0 10px;font:18px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";} */
            h1,h2,h3{line-height:1.2}@media (prefers-color-scheme: light){.main{color: #444}} @media (prefers-color-scheme: dark){body{color:#ccc !important;background:black}a:link{color:#5bf}a:visited{color:#ccf}}
    </style>