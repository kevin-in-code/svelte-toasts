<script lang="ts">
  export let category: string | undefined;
</script>

{#if category === 'success'}
  Success
{:else if category === 'info' || category === 'information'}
  Information
{:else if category === 'warn' || category === 'warning'}
  Warning
{:else if category === 'error'}
  Error
{/if}
