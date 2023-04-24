<script lang="ts">
    import { breedSearch } from "../utilities/breedSearch"
    import { onMount } from "svelte";

    import type { Doggo } from "../lib/Doggo";
    import type { QueryParams } from "../lib/QueryParams";
    import type { Sort } from "../lib/Sort";

    import Dogs from "./Dogs.svelte";
    import { dogSearch } from "../utilities/dogSearch";
    import { dogSearchById } from "../utilities/dogSearchById"
    import SortDogs from "./SortDogs.svelte";
    import SortAge from "./SortAge.svelte";
    import SortZip from "./SortZip.svelte";
    import SortBreed from "./SortBreed.svelte";
    import Navigation from "./Navigation.svelte";

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

    const addBreed = () => {

        if(!user_breeds.includes(selected_breed)){
            user_breeds = [...user_breeds, selected_breed];
            query_params.breeds = user_breeds;

            getDogs();
        }
        selected_breed = "";
    }

    const removeBreed = (removed_breed: string) => {
        user_breeds= user_breeds.filter(t => t != removed_breed)
        query_params.breeds = user_breeds;

        getDogs();
    }

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

    // const submitSort = () => {
    //     query_params.sort = selected;

    //     getDogs();
    // }

    const submitAge = () => {
        query_params.ageMin = selected_age_min;
        query_params.ageMax = selected_age_max;

        getDogs();
    }

    const goNextPage = () => {
        if(0 < query_total - query_params.from) {
            query_params.from = query_params.from + 29
            current_page++;

            getDogs();
        }
        home_page.scrollIntoView();
    }

    const goPrevPage = () => {
        if(current_page > 1){
            query_params.from = query_params.from - 29
            current_page--;

            getDogs();
        }
        home_page.scrollIntoView();
    }
</script>

<div class="home-page" bind:this={home_page}>
    <div class="search-options">

        <SortDogs getDogs={getDogs} bind:selected={selected} bind:query_params={query_params} list_of_sorts={list_of_sorts}></SortDogs>

        <SortAge submitAge={submitAge} bind:selected_age_min={selected_age_min} bind:selected_age_max={selected_age_max}></SortAge>

        <SortZip addZip={addZip} removeZip={removeZip} bind:selected_zip={selected_zip} bind:user_zip_codes={user_zip_codes}></SortZip>

        <SortBreed addBreed={addBreed} removeBreed={removeBreed} bind:selected_breed={selected_breed} bind:user_breeds={user_breeds} list_of_all_breeds={list_of_all_breeds}></SortBreed>

    </div>

    <Dogs doggos={dogs}></Dogs>

    <Navigation goNextPage={goNextPage} goPrevPage={goPrevPage} current_page={current_page}></Navigation>

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
</style>