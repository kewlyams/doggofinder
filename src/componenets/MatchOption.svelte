<script lang="ts">
    import type { Doggo } from "$lib/Doggo";
    import { getMatchedDog } from "../utilities/matchDog";

    export let list_of_favorites:Doggo[]
    export let matched_doggo: Doggo;
    export let matched: number;

    const matchDog = () => {
        if(list_of_favorites.length > 0){
            getMatchedDog(list_of_favorites).then((data) => {
                matched = 1;
                matched_doggo = list_of_favorites.find(t => t.id == data.match) as Doggo;
            })
        }
    }

</script>

<div class="match-options">
    <button on:click={matchDog}>Match</button>
    <button on:click={() => list_of_favorites = []}>Reset Favorites</button>
</div>

<style>
    
    .match-options {
        position: absolute;
        width: 15em;
        height: 8em;
        bottom: 5em;
        left: 1.5em;
    }

    button {
        background-color:rgb(182, 208, 255);
        color:rgb(68, 68, 68);
        box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 29px 0px;
        border: none;
        border-radius: 5%;
        margin-top: 1em;
        width: 18em;
        height: 3em;
    }

    button:hover {
            background-color:rgb(165, 196, 255);
            box-shadow: rgba(39, 39, 39, 0.24) 0px 3px 8px;
    }
</style>