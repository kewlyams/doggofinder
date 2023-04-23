<script lang="ts">
    import type { Doggo } from "$lib/Doggo";

    export let matched_doggo: Doggo;
</script>

    <div class="matched-dog">
        <img alt="picture of a {matched_doggo.name}" class="m-dog-img" src={matched_doggo.img}>
        <div class="matched-dog-info">
            <p id="name">{matched_doggo.name}</p>
            <p id="breed">{matched_doggo.breed}</p>
            <p id="age"><b>Age: </b>{matched_doggo.age}</p>
            <p id="zip"><b>Zipcode: </b>{matched_doggo.zip_code}</p>
        </div>
    </div>

<style>

    .matched-dog {
        height: 42em;
        margin-top: 2em;
    }

    .matched-dog-info {
        float: right;
        margin-right: 22em;
        margin-top: 18em;
        font-size: larger;
    }

    .m-dog-img {
        margin-top: 7em;
        margin-left: 12em;
        object-fit: cover;
        width: 450px;
        height: 450px;
    }

    #name {
        font-size: xx-large;
        font-weight: bold;
    }

</style>