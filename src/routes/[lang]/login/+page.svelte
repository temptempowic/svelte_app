<script lang="ts">
    import { authClient } from '$lib/client/auth-client';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    // Get current language from URL (e.g., 'en')
    $: lang = $page.params.lang;

    let email = '';
    let password = '';
    let error = '';
    let loading = false;

    async function handleLogin() {
        loading = true;
        error = '';
        
        const res = await authClient.signIn.email({
            email,
            password
        });

        loading = false;

        if (res.error) {
            error = res.error.message;
        } else {
            // Redirect to dashboard after login
            goto(`/${lang}/dashboard`);
        }
    }
</script>

<div class="login-container">
    <h1>Sign In</h1>
    
    {#if error}
        <p class="error">{error}</p>
    {/if}

    <form on:submit|preventDefault={handleLogin}>
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
            {loading ? 'Loading...' : 'Login'}
        </button>
    </form>

    <p>Don't have an account? <a href="/{lang}/register">Register</a></p>
</div>

<style>
    .login-container { max-width: 300px; margin: 50px auto; }
    input { display: block; width: 100%; padding: 10px; margin-bottom: 10px; box-sizing: border-box; }
    button { width: 100%; padding: 10px; background: #333; color: white; border: none; cursor: pointer; }
    button:disabled { background: #ccc; }
    .error { color: red; font-size: 14px; }
</style>