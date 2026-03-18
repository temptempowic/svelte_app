<script>
  let count = 0;
  
  function increment() {
    count += 1;
  }
</script>

<button on:click={increment}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<style>
  button { background: #ff3e00; color: white; border: none; padding: 10px 20px; cursor: pointer; }
</style>