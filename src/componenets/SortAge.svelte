<script lang="ts">
    import type { QueryParams } from "$lib/QueryParams";

    export let getDogs: () => void;
    export let query_params: QueryParams
    export let selected_age_min: string;
    export let selected_age_max: string;

    const submitAge = () => {
        query_params.ageMin = selected_age_min;
        query_params.ageMax = selected_age_max;

        getDogs();
    }
</script>

<div class="feature">
    <form on:change={submitAge}>
            <label class="feature-label" for="age-min">Min Age</label>
            <input class="user-input" id="age-min" type="text" bind:value={selected_age_min}>

            <label class="feature-label" for="age-max">Max Age</label>
            <input class="user-input"id="age-max" type="text" bind:value={selected_age_max}>
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