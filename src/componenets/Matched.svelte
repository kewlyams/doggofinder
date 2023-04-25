<script lang="ts">
    import type { Doggo } from "$lib/Doggo";
    import Dog from "./Dog.svelte";

    export let matched_doggo: Doggo;
    export let matched: number;
    $: matched = 1;

</script>

    <div class="matched-dog">
        <img alt="picture of a {matched_doggo.name}" class="m-dog-img" src={matched_doggo.img}>
        <div class="matched-dog-info">
            <Dog dog={matched_doggo}></Dog>
        </div>
    </div>

<style>

    .matched-dog {
        height: 42em;
        margin-top: 8em;
        margin-left: 20%;
    }

    .matched-dog-info {
        float: right;
        margin-right: 30%;
        margin-top: 18em;
        font-size: larger;
    }

    .m-dog-img {
        margin-top: 7em;
        margin-right: 2%;
        margin-left: 15%;
        object-fit: cover;
        width: 450px;
        height: 450px;
        border-radius: 5%;
    }

    @media(max-width: 1400px){
        .m-dog-img{
            margin-left: 5%;
        }
    }
</style>