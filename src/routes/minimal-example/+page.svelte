<script lang="ts">
  import { ToastView, raiseToast, candy as theme } from '$lib/index.js';

  function giveBlessing() {
    raiseToast({
      topic: 'May your troubles be less, and your blessings be more',
      body: [
        'May your troubles be less, and your blessings be more.',
        'And nothing but happiness come through your door.',
      ],
      status: {
        expanded: 'An Irish blessing',
      },
    });
  }
</script>

<ToastView {theme} />
<button on:click={giveBlessing}>Raise Toast!</button>
