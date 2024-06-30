<script lang="ts">
  import ErrorIcon from './icons/error-icon.svelte';
  import InformationIcon from './icons/information-icon.svelte';
  import SuccessIcon from './icons/success-icon.svelte';
  import WarningIcon from './icons/warning-icon.svelte';

  export let category: string | undefined;
</script>

{#if category === 'success'}
  <SuccessIcon />
{:else if category === 'info' || category === 'information'}
  <InformationIcon />
{:else if category === 'warn' || category === 'warning'}
  <WarningIcon />
{:else if category === 'error'}
  <ErrorIcon />
{/if}
