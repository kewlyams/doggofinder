<script lang="ts">
    import type { QueryParams } from "$lib/QueryParams";

    export let getDogs: () => void;
    export let query_params: QueryParams;
    export let query_total: number;
    export let home_page: HTMLDivElement;
    export let current_page: number;

    const goNextPage = () => {
        if(0 < query_total - query_params.from) {
            query_params.from = query_params.from + 29
            current_page++;

            getDogs();
        }
        home_page.scrollIntoView();
    }

    const goPrevPage = () => {
        if(current_page > 1){
            query_params.from = query_params.from - 29
            current_page--;

            getDogs();
        }
        home_page.scrollIntoView();
    }
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
        margin-right: 8em;
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