
<script lang="ts">
    import type { Doggo } from "../lib/Doggo";

    import Dog from "./Dog.svelte";

    export let doggos: Doggo[] = [];
    export let list_of_favorites: Doggo[] = [];
    export let matched: number;
    $: matched = 0;

    let favorite_display = {
        add: "Add to Favorites",
        remove: "Remove from Favorites"
    }

    const addFavorite = (dog: Doggo) => {
        list_of_favorites = [...list_of_favorites, dog];
    }

    const removeFavorite = (dog: Doggo) => {
        list_of_favorites = list_of_favorites.filter((doggo) => doggo.id != dog.id)
    }

</script>
    <div class="dog-container">
        {#each doggos as dog (dog)}
            <div class="dog">
                <img alt="picture of a {dog.breed}" class="card-img" src={dog.img}>
                <div class="dog-info" >
                    <Dog dog={dog}></Dog>
                </div>
                {#if list_of_favorites.some(({id}) => id == dog.id)}
                    <button class="favorite-btn" on:click={() => removeFavorite(dog)}>{favorite_display.remove}</button>
                {:else}
                    <button class="favorite-btn" on:click={() => addFavorite(dog)}>{favorite_display.add}</button>
                {/if}
            </div>
        {/each}
    </div>

<style>

    .dog-container {
        display: flex;
        flex-wrap: wrap;
        margin-top: 6.5em;
        margin-left: 22em;
        margin-right: 5em;
        width: 75%;
    }

    .dog {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        border-radius: 3%;
        margin: 1em;
        height: 30em;
        width: 18em;
        text-align: center;
        flex: 1;
        
    }
    
    .dog:hover {
        box-shadow: rgba(39, 39, 39, 0.24) 0px 3px 8px;
    }

    .dog-info {
        text-align: center;
        margin-top:1em;
    }

    .favorite-btn {
        border: none;
        color: rgb(185, 185, 185);
        background-color: rgba(255, 255, 255, 0);
        padding-bottom: .1em;
        border-bottom: 1px solid;
        border-left: 1px solid;
        border-right: 1px solid;
        border-radius: 5%;
        margin-top: 2em;
        height: 5em;
        width: 20em;
        text-align: center;
    }

    .card-img {
        object-fit: cover;
        width: 230px;
        height: 230px;
        margin-top: 1em;
        padding: .5em;
        margin-left: auto;
        margin-right: auto;
        display: block;
        border-radius: 5%;
    }

</style>