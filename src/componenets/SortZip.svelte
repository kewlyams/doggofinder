<script lang="ts">
    import type { QueryParams } from "$lib/QueryParams";

    export let getDogs: () => void;
    export let query_params: QueryParams;
    export let selected_zip: string;
    export let user_zip_codes: string[];

    const addZip = () => {
        if(!user_zip_codes.includes(selected_zip)){
            user_zip_codes = [...user_zip_codes, selected_zip];
            query_params.zipCodes = user_zip_codes;

            getDogs();
        }
        selected_zip = "";
    }

    const removeZip = (removed_zip: string) => {
        user_zip_codes= user_zip_codes.filter(t => t != removed_zip)
        query_params.zipCodes = user_zip_codes;

        getDogs();
    }

</script>

<form on:change|preventDefault={addZip}>
    <div class="feature">
        <label class="feature-label" for="zip">Zipcode</label>
        <input class="user-input" type="text" id="zip" bind:value={selected_zip}/>
    </div>
</form>
<div class="zip-items">
    {#each user_zip_codes as zip (zip)}
        <button class="delete-btn" on:click={() => removeZip(zip)}>x {zip}</button>
    {/each}
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

    .zip-items {
        display: flex;
        flex-wrap: wrap;
        width: 15em;
        text-align: center;
        margin-left: 1.7em;
    }

    .delete-btn{
        background-color: rgb(238, 238, 238);
        border-radius: 20%;
        margin-top: 1em;
        margin-right: 1em;
        border: none;
        height: 2em;
        width: auto;
    }

    .delete-btn:hover {
        background-color: rgb(223, 223, 223);
    }

    .delete-btn::first-letter {
        font-weight: bold ;
        margin-right: 1em;
        float: left;
    }
</style>