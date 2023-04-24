<script>
    import { logout } from '../utilities/logout';

    const getLogout = () => {
        logout();
    }

</script>

<button on:click={getLogout}>Logout</button>

<style>
    button {
        background-color:rgb(182, 208, 255);
        box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 29px 0px;
        margin-top: .5em;
        margin-right: 3em;
        width: 6em;
        height: 2.5em;
        border-radius: 10%;
        border: 0;
    }

    button:hover{
        background-color:rgb(165, 196, 255);
        box-shadow: rgba(39, 39, 39, 0.24) 0px 3px 8px;
    }

</style>