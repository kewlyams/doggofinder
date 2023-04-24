
<script lang="ts">
    import { getMatchedDog } from "../utilities/matchDog";
    
    import type { Doggo } from "../lib/Doggo";

    import Matched from "./Matched.svelte";
    import Dog from "./Dog.svelte";

    export let doggos: Doggo[] = [];

    let matched_doggo: Doggo;
    let list_of_favorites: Doggo[] = [];

    $: matched = 0;

    let favorite_display = {
        add: "Add to Favorites",
        remove: "Remove from Favorites"
    }

    const matchDog = () => {
        if(list_of_favorites.length > 0){
            getMatchedDog(list_of_favorites).then((data) => {
                matched = 1;
                matched_doggo = list_of_favorites.find(t => t.id == data.match) as Doggo;
            })
        }
    }

    const addFavorite = (dog: Doggo) => {
        list_of_favorites = [...list_of_favorites, dog];
    }

    const removeFavorite = (dog: Doggo) => {
        list_of_favorites = list_of_favorites.filter(t => t != dog)
    }

</script>

{#if matched == 0}
    <div class="dog-container">
        <button class="match-dog" on:click={matchDog}>Match me with a dog!</button>
        {#each doggos as dog (dog)}
            <div class="dog">
                <img alt="picture of a {dog.breed}" class="card-img" src={dog.img}>
                <div class="dog-info" >
                    <Dog dog={dog}></Dog>
                </div>
                {#if list_of_favorites.includes(dog)}
                    <button class="favorite-btn" on:click={() => removeFavorite(dog)}>{favorite_display.remove}</button>
                {:else}
                    <button class="favorite-btn" on:click={() => addFavorite(dog)}>{favorite_display.add}</button>
                {/if}
            </div>
        {/each}
    </div>

{:else}

    <div class="matched">
        <Matched matched_doggo={matched_doggo}></Matched>
        <button class="retry-btn" on:click={() => matched = 0}>Retry</button>
    </div>

{/if}

<style>

    .match-dog {
        background-color:rgb(182, 208, 255);
        color:rgb(68, 68, 68);
        box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 29px 0px;
        margin-bottom: 1em;
        margin-left: 1.5em;
        width: 68.5em;
        height: 2.5em;
        border-radius: 5%;
        border: 0;
        font-weight: normal;
        font-size: large;
    }

    .match-dog:hover {
            background-color:rgb(165, 196, 255);
            box-shadow: rgba(39, 39, 39, 0.24) 0px 3px 8px;
    }

    .matched {
        margin-top: 8em;
        margin-left: 17em;
        width: 80em;
        height: 70em;
    }

    .retry-btn {
        background-color:rgb(182, 208, 255);
        box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 29px 0px;
        width: 20em;
        height: 2.5em;
        border-radius: 10%;
        border: 0;
        margin-left: 35em;
        margin-top: 2em;
    }

    .retry-btn:hover {
        background-color:rgb(165, 196, 255);
        box-shadow: rgba(39, 39, 39, 0.24) 0px 3px 8px;
    }

    .dog-container {
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        margin-top: 6.5em;
        margin-left: 17em;
        width: 80em;
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