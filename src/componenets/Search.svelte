<script lang="ts">
    import { auth } from "../utilities/auth";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    import type { Doggo } from "../lib/Doggo";
    import type { QueryParams } from "../lib/QueryParams";
    import type { Sort } from "../lib/Sort";

    import Dogs from "./Dogs.svelte";

    let home_page: HTMLDivElement;

    let list_of_all_breeds: string[] = [];
    let user_breeds: string[] = [];
    let user_zip_codes: string[] = [];
    let ids: string[];
    let dogs: Doggo[];

    let selected: string;

    let selected_zip: string;
    let selected_breed: string;
    let selected_age_min: string = "0";
    let selected_age_max: string = "max";
    let query_total: number;

    $: current_page = 1;

    let list_of_sorts: Sort[] = [
        {name: "default", query: "breed:asc"},
        {name: "Z-A breed", query: "breed:desc"},
        {name: "Z-A name", query: "name:desc"},
        {name: "A-Z name", query: "name:asc"},
        {name: "oldest first", query: "age:desc"},
        {name: "youngest first", query: "age:asc"},
    ]

    let query_params: QueryParams = {
            breeds: user_breeds,
            ageMin: "0",
            ageMax: "",
            sort: "breed:asc",
            from: 0,
            size: 28,
            zipCodes: user_zip_codes
    }

    onMount(async () => {
        dogSearch();
        getDogBreeds();
	});

    const dogSearch = () => {
        return auth()
        .get("/dogs/search", 
            {params: query_params,})
        .then((res) => {
            if(res.status = 200){
                ids = res.data.resultIds
                query_total = res.data.total
                getDogsById();
            }
        })
        .catch((error) => {
            console.log(error)
            if (error.status = 401){
                goto("/");
            }
        });
    }

    const getDogsById = () => {
        return auth()
        .post("/dogs", ids)
        .then((res) => {
            if(res.status = 200){
                dogs = res.data;
                return {
                    props: {
                    dogs,
                    }
                }
            }
        })
        .catch((error) => {
            console.log(error)
            if (error.status = 401){
                goto("/");
            }
        });
    }

    const getDogBreeds = () => {
        return auth()
        .get("/dogs/breeds")
        .then((res) => {
            if(res.status = 200){
                list_of_all_breeds = res.data;
            }
        })
        .catch((error) => {
            console.log(error)
            if (error.status = 401){
                goto("/");
            }
        });
    }

    const addBreed = () => {

        if(!user_breeds.includes(selected_breed)){
            user_breeds = [...user_breeds, selected_breed];
            query_params.breeds = user_breeds;

            dogSearch();
        }
        selected_breed = "";
    }

    const removeBreed = (removed_breed: string) => {
        user_breeds= user_breeds.filter(t => t != removed_breed)
        query_params.breeds = user_breeds;

        dogSearch();
    }

    const addZip = () => {
        if(!user_zip_codes.includes(selected_zip)){
            user_zip_codes = [...user_zip_codes, selected_zip];
            query_params.zipCodes = user_zip_codes;

            dogSearch();
        }
        selected_zip = "";
    }

    const removeZip = (removed_zip: string) => {
        user_zip_codes= user_zip_codes.filter(t => t != removed_zip)
        query_params.zipCodes = user_zip_codes;

        dogSearch();
    }

    const submitSort = () => {
        query_params.sort = selected;

        dogSearch();
    }

    const submitAge = () => {
        query_params.ageMin = selected_age_min;
        query_params.ageMax = selected_age_max;

        dogSearch();
    }

    const goNextPage = () => {
        if(0 < query_total - query_params.from) {
            query_params.from = query_params.from + 29
            current_page++;

            dogSearch();
        }
        home_page.scrollIntoView();
    }

    const goPrevPage = () => {
        if(current_page > 1){
            query_params.from = query_params.from - 29
            current_page--;
            home_page.scrollIntoView();

            dogSearch();
        }
    }
</script>

<div class="home-page" bind:this={home_page}>
    <div class="search-options">
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

        <div class="feature">
            <form on:change={submitAge}>
                    <label class="feature-label" for="age-min">Min Age</label>
                    <input class="user-input" id="age-min" type="text" bind:value={selected_age_min}>

                    <label class="feature-label" for="age-max">Max Age</label>
                    <input class="user-input"id="age-max" type="text" bind:value={selected_age_max}>
            </form>
        </div>

        <form on:change|preventDefault={addZip}>
            <div class="feature">
                <label class="feature-label" for="zip">Zipcode</label>
                <input class="user-input" type="text" id="zip" bind:value={selected_zip}/>
            </div>
        </form>
        <div class="breed-items">
            {#each user_zip_codes as zip (zip)}
                <button class="delete" on:click={() => removeZip(zip)}>x {zip}</button>
            {/each}
        </div>

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

    </div>

    <Dogs doggos={dogs}></Dogs>

    <div class="navigation">
        <button on:click={goPrevPage}>Prev Page</button>
        <p>{current_page}</p>
        <button on:click={goNextPage}>Next Page</button>
    </div>

</div>

<style>

    .home-page {
        padding:0;
        margin: 0;
    }

    .search-options {
        position: fixed;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 29px 0px;
        background-color: white;
        width: 18em;
        height: 100%;
        margin: 0;
        padding: 0;
        left:0;
        top: 5em;
    }

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

    .navigation {
        float: right;
        clear: right;
        margin-top: 2em;
        margin-bottom: 3em;
        margin-right: 2em;
    }

    .navigation button {
        display: inline-block;
        background-color: white;
        border-radius: 10%;
        border:none;
        width: 6em;
        height:3em;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 29px 0px;
    }

    .navigation button:hover {
        box-shadow: rgba(39, 39, 39, 0.24) 0px 3px 8px;
    }

    .navigation p {
        display: inline-block;
        margin: 1em;
        font-weight: bold;
    }
</style>