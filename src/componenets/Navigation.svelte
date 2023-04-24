<script lang="ts">
    export let goNextPage: () => void;
    export let goPrevPage: () => void;
    export let current_page: number;
</script>


<div class="navigation">
    <button on:click={goPrevPage}>Prev Page</button>
    <p>{current_page}</p>
    <button on:click={goNextPage}>Next Page</button>
</div>

<style>
    .navigation {
        float: right;
        clear: right;
        margin-top: 2em;
        margin-bottom: 3em;
        margin-right: 2em;
    }

    .navigation button {
        display: inline-block;
        background-color: white;
        border-radius: 10%;
        border:none;
        width: 6em;
        height:3em;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 29px 0px;
    }

    .navigation button:hover {
        box-shadow: rgba(39, 39, 39, 0.24) 0px 3px 8px;
    }

    .navigation p {
        display: inline-block;
        margin: 1em;
        font-weight: bold;
    }
</style>