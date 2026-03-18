<script>
  let email = "";
  let password = "";

  function handleLogin() {
    // Logic to connect to 'better-auth' will go here later
    alert(`Logging in with ${email}`);
  }
</script>

<div class="login-container">
  <h1>Login</h1>
  <form on:submit|preventDefault={handleLogin}>
    <input 
      type="text" 
      placeholder="Username" 
      bind:value={email} 
    />
    <input 
      type="password" 
      placeholder="Password" 
      bind:value={password} 
    />
    <button type="submit">Sign In</button>
  </form>
</div>

<style>
  .login-container { max-width: 300px; margin: 50px auto; }
  input { display: block; width: 100%; padding: 10px; margin-bottom: 10px; }
  button { width: 100%; padding: 10px; background: #333; color: white; border: none; cursor: pointer; }
</style>