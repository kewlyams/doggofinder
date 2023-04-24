<script lang="ts">
    export let addBreed: () => void;
    export let removeBreed: (breed: string) => void;
    export let selected_breed: string;
    export let list_of_all_breeds: string[];
    export let user_breeds: string[];
</script>

<form on:change|preventDefault={addBreed}>

    <div class="feature">
        <label class="feature-label" for="breed">Add breeds to search for</label>
        <input class="user-input" list="breeds" type="text" id="breed" bind:value={selected_breed}/>
        <datalist id="breeds">
            {#each list_of_all_breeds as breed}
                <option value="{breed}">
            {/each}
          </datalist>
    </div>
</form>

<div class="breed-items">
    {#each user_breeds as breed (breed)}
        <button class="delete-btn" on:click={() => removeBreed(breed)}>x {breed}</button>
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

    .breed-items {
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
        margin-right:1em;
    }

</style>