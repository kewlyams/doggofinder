<script lang="ts">
    import type { QueryParams } from "$lib/QueryParams";
    import type { Sort } from "$lib/Sort";

    export let getDogs: () => void;
    export let query_params: QueryParams;
    export let selected: string;
    export let list_of_sorts: Sort[];

    const submitSort = () => {
        query_params.sort = selected;

        getDogs();
    }

</script>

<div class="feature">
    <form on:change={submitSort}>
            <label class="feature-label" for="sort-by">Sort by:</label>
            <select class="user-input" id="sort-by" bind:value={selected}>
                {#each list_of_sorts as sort (sort)}
                     <option value={sort.query}>
                        {sort.name}
                    </option>
                {/each}
            </select>
    </form>
</div>

<style>

    .feature {
        margin-left:1.5em;
        margin-top: 2em;
        width: 15em;
    }

    .feature-label {
        display: block;
        color: rgb(128, 128, 128);
        padding-top:.5em;
    }

    .user-input {
        border: 1px solid silver;
        display: block;
        margin-top: .5em;
        width: 12em;
        height: 2em;
    }

</style>