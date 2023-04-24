<script lang="ts">
    import { login } from '../utilities/login';
    
    let name: string;
    let email: string;
    
    const getLogin = () => {
        login(name, email);
    }
    
</script>
    
    <form on:submit|preventDefault={getLogin}>
        <div class="loginForm">
    
            <h3>Login</h3>
            <div class="inputField">
    
                <label for="name">Name</label>
                <input type="text" id="name" bind:value={name}/>
    
            </div>
            <div class="inputField">
    
                <label for="email">Email</label>
                <input type="text" id="email" bind:value={email}/>
    
            </div>
            <button type='submit'>Login</button>

        </div>
    </form>
    
<style>
    
    .loginForm {
        display: inline-block;
        margin-top: 15em;
        border: .4em solid rgb(223, 234, 255);
        border-radius: 2%;
        height: 30em;
        width: 22em;
            
    }
    
    .inputField {
        margin: 2em;
    }
    
    h3 {
        font-size: 1.8em;
        margin-top: 1.5em;
        margin-left: 1em;
        margin-bottom: 2em;
    }
    
    input {
        display: block;
        width: 20em;
        height: 3em;
    }
    
    button {
        height:3em;
        width: 10em;
        background-color: rgb(175, 201, 250);
        border-radius: 3%;
        font-weight: bold;
        border: none;
        margin:0 auto;
        margin-top: 5em;
        margin-bottom: 5em;
        display:block;
    }
    
    button:hover {
        background-color:rgb(147, 181, 243);
    }
    
</style>