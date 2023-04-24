<script lang="ts">
    import type { Doggo } from "$lib/Doggo";

    export let dog: Doggo
</script>

<p id="name">{dog.name}</p>
<p id="breed">{dog.breed}</p>
<p id="age"><b>Age: </b>{dog.age}</p>
<p id="zip"><b>Zipcode: </b>{dog.zip_code}</p>

<style>

    #name {
        font-size: larger;
        font-weight: bold;
        color:rgb(77, 77, 77)
    }

    #breed {
        margin-bottom: 1.5em;
    }

    p {
        margin: 0;
        padding: 0;
        color: rgb(91, 91, 91);
    }

    b {
        font-weight: bold;
    }
</style>