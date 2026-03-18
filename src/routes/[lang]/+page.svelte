<script>
  // We can import components from the $lib folder easily
  import Counter from '$lib/Counter.svelte'; 
</script>

<svelte:head>
  <title>My SvelteKit App</title>
</svelte:head>

<main>
  <h1>Welcome to SvelteKit</h1>
  <p>This is the main page.</p>
  
  <a href="/demo/better-auth/login">Go to Login →</a>
  
  <!-- Reusable component example -->
  <div class="card">
    <Counter />
  </div>
</main>

<style>
  main { text-align: center; padding: 2rem; }
  .card { padding: 1rem; margin-top: 2rem; background: #f4f4f4; border-radius: 8px; display: inline-block; }
  a { color: #ff3e00; font-weight: bold; }
</style>