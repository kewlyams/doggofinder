<script lang="ts">
    import { onMount } from "svelte";

    import SortDogs from "../../componenets/SortDogs.svelte";
    import SortAge from "../../componenets/SortAge.svelte";
    import SortZip from "../../componenets/SortZip.svelte";
    import SortBreed from "../../componenets/SortBreed.svelte";
    import Navigation from "../../componenets/Navigation.svelte";
    import DogList from "../../componenets/DogList.svelte";
    import Matched from "../../componenets/Matched.svelte";

    import { dogSearch } from "../../utilities/dogSearch";
    import { dogSearchById } from "../../utilities/dogSearchById"
    import { breedSearch } from "../../utilities/breedSearch";

    import type { Doggo } from "../../lib/Doggo";
    import type { QueryParams } from "../../lib/QueryParams";
    import type { Sort } from "../../lib/Sort";
    import MatchOption from "../../componenets/MatchOption.svelte";

    let home_page: HTMLDivElement;

    let list_of_all_breeds: string[] = [];
    let user_breeds: string[] = [];
    let user_zip_codes: string[] = [];
    let ids: string[];
    let dogs: Doggo[];
    let matched_doggo: Doggo;
    let list_of_favorites: Doggo[] = [];

    let selected: string;

    let selected_zip: string;
    let selected_breed: string;
    let selected_age_min: string = "0";
    let selected_age_max: string = "max";
    let query_total: number;

    $: matched = 0;
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
        getDogs();
        getDogsById();
        getBreeds();
	});

    const getDogs = () => {
        dogSearch(query_params).then((data) => {
            ids = data.resultIds
            query_total = data.total
            getDogsById();
        })
    }

    const getDogsById = () => {
        dogSearchById(ids).then((data) => {
            dogs = data;
        })
    }

    const getBreeds = () => {
        breedSearch().then((list:string[]) => {
            list_of_all_breeds = list;
        });
    }

</script>

<div class="home-page" bind:this={home_page}>
    <div class="search-options">
        <SortDogs getDogs={getDogs} bind:selected={selected} bind:query_params={query_params} list_of_sorts={list_of_sorts}></SortDogs>
        <SortAge getDogs={getDogs} bind:query_params={query_params} bind:selected_age_min={selected_age_min} bind:selected_age_max={selected_age_max}></SortAge>
        <SortZip getDogs={getDogs} bind:query_params={query_params} bind:selected_zip={selected_zip} bind:user_zip_codes={user_zip_codes}></SortZip>
        <SortBreed getDogs={getDogs} bind:query_params={query_params} bind:selected_breed={selected_breed} bind:user_breeds={user_breeds} list_of_all_breeds={list_of_all_breeds}></SortBreed>
        <MatchOption bind:list_of_favorites={list_of_favorites} bind:matched={matched} bind:matched_doggo={matched_doggo}></MatchOption>
    </div>

    {#if matched == 0}
        <DogList bind:list_of_favorites={list_of_favorites} bind:matched={matched} doggos={dogs}></DogList>
        <Navigation getDogs={getDogs} bind:query_params={query_params} bind:query_total={query_total} home_page={home_page} bind:current_page={current_page}></Navigation>
    {:else}
        <div class="matched">
            <Matched matched={matched} matched_doggo={matched_doggo}></Matched>
            <button class="retry-btn" on:click={() => matched = 0}>Retry</button>
        </div>
    {/if}
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

    .retry-btn {
        background-color:rgb(182, 208, 255);
        box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 29px 0px;
        width: 20em;
        height: 3em;
        border-radius: 10%;
        border: 0;
        margin-left: 50em;
    }

    .retry-btn:hover {
        background-color:rgb(165, 196, 255);
        box-shadow: rgba(39, 39, 39, 0.24) 0px 3px 8px;
    }
</style>