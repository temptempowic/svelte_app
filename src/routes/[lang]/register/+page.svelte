<script lang="ts">
    import { authClient } from '$lib/client/auth-client';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    $: lang = $page.params.lang;

    let name = '';
    let email = '';
    let password = '';
    let error = '';
    let loading = false;

    async function handleRegister() {
        loading = true;
        error = '';
        
        const res = await authClient.signUp.email({
            email,
            password,
            name // Passing name to Better Auth
        });

        loading = false;

        if (res.error) {
            error = res.error.message;
        } else {
            goto(`/${lang}/dashboard`);
        }
    }
</script>

<div class="login-container">
    <h1>Create Account</h1>
    
    {#if error}
        <p class="error">{error}</p>
    {/if}

    <form on:submit|preventDefault={handleRegister}>
        <input 
            type="text" 
            placeholder="Name" 
            bind:value={name} 
            required 
        />
        <input 
            type="email" 
            placeholder="Email" 
            bind:value={email} 
            required 
        />
        <input 
            type="password" 
            placeholder="Password" 
            bind:value={password} 
            required 
        />
        <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
        </button>
    </form>
    <p>Already have an account? <a href="/{lang}/login">Login</a></p>
</div>

<style>
    .login-container { max-width: 300px; margin: 50px auto; }
    input { display: block; width: 100%; padding: 10px; margin-bottom: 10px; box-sizing: border-box; }
    button { width: 100%; padding: 10px; background: #ff3e00; color: white; border: none; cursor: pointer; }
    .error { color: red; font-size: 14px; }
</style>