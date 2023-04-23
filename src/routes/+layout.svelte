<script>
    import Logout from "../componenets/Logout.svelte";

</script>

<div class="nav-bar">
    <h2>doggofinder</h2>
    <Logout></Logout>
</div>

<div class="main-content">
    <slot></slot>
</div>

<style>
    
    :global(body) {
        margin: 0;
	    padding: 0;
        background-color: white;
    }

    * {
        font-size: 100%;
	    font: inherit;
	    vertical-align: baseline;
    }

    .main-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .nav-bar {
        background-color: rgb(245, 247, 254);
        box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 29px 0px;
        display : flex;
        position: fixed;
        align-items : center;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 5em;
    }

    .nav-bar h2 {
        padding: 0;
        margin: 0;
        width: 100%;
        font-size: 2em;
        margin-left: 1em;
        color: rgb(123, 165, 243);
    }

    .nav-bar h2::first-letter {
        color: rgb(142, 179, 246);
    }
</style>