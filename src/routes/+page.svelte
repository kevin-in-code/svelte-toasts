<script lang="ts">
	import type { ToastContext } from '$lib/context.js';
	import { marker as theme } from '$lib/themes.js';
	import ToastContextProvider from '$lib/toast-context-provider.svelte';
	import ToastView from '$lib/toast-view.svelte';
  let context: ToastContext;

  let categoryOption: 'Success' | 'Information' | 'Warning' | 'Error' = 'Information';
  let customTitleOption: 'None' | 'Default' | 'Custom' = 'Default';

  $: {
    if (context) {
      context.raise(
        {
          category: 'error',
          topic: 'Your app status is buried in console.log!',
          body: 'You could surface the information in a toast.',
          duration: 5000,
        },
      );
      context.raise(
        {
          category: 'warning',
          topic: 'Creating toast functionality from scratch may shift your focus',
          duration: 5000,
        },
      );
      context.raise(
        {
          category: 'information',
          topic: 'Good toast libraries already exist',
          body: [ 'Consider using this one.', 'It has some nice features. For example, it\'s themes are nice, and they work well on both light and dark pages.' ],
          duration: 5000,
        },
      );
      context.raise(
        {
          category: 'success',
          topic: 'Your app status is now clear to your users',
          duration: 5000,
        },
      );
    }
  }
</script>

<ToastContextProvider bind:context defaultPosition="center" theme={theme}>
  <div class="panel" class:dark={false}>
  <div>
      <ToastView />
  </div>
  <!-- <div>
    <ToastView />
  </div> -->

<!-- <div class="controls">
  <fieldset>
    <legend>Category</legend>

    <label>
      <input type="radio" id="success-category" name="category" value="success" checked />
      Success
    </label>

    <label>
      <input type="radio" id="info-category" name="category" value="info" />
      Information
    </label>

    <label>
      <input type="radio" id="warning-category" name="category" value="warning" />
      Warning
    </label>

    <label>
      <input type="radio" id="error-category" name="category" value="error" />
      Error
    </label>
  </fieldset>

  <fieldset>
    <legend>Title</legend>

    <label>
      <input type="radio" id="title-none" name="title" value="None" bind:group={customTitleOption} />
      None
    </label>

    <label>
      <input type="radio" id="title-default" name="title" value="Default" bind:group={customTitleOption} />
      Default
    </label>

    <label>
      <input type="radio" id="title-custom" name="title" value="Custom" bind:group={customTitleOption} />
      Custom
    </label>

    <div>
      <input type="text" id="title-custom-text" placeholder="Custom title text..." disabled={customTitleOption !== 'Custom'} />
    </div>
  </fieldset>
</div> -->

<div class="controls">
  <!-- <fieldset role="group">
    <legend>Category</legend> -->
    <div role="group" class="row">
      <button class:outline={categoryOption !== 'Success'} on:click={() => categoryOption = 'Success'}>Success</button>
      <button class:outline={categoryOption !== 'Information'} on:click={() => categoryOption = 'Information'}>Information</button>
      <button class:outline={categoryOption !== 'Warning'} on:click={() => categoryOption = 'Warning'}>Warning</button>
      <button class:outline={categoryOption !== 'Error'} on:click={() => categoryOption = 'Error'}>Error</button>
      <label><input type="checkbox" />abc</label>
      <!-- <label for="success-category">
        <input type="radio" id="success-category" name="category" value="success" checked />
        Success
      </label>

      <input type="radio" id="info-category" name="category" value="info" />
      <label for="info-category">Information</label>

      <input type="radio" id="warning-category" name="category" value="warning" />
      <label for="warning-category">Warning</label>

      <input type="radio" id="error-category" name="category" value="error" />
      <label for="error-category">Error</label> -->
    </div>
  <!-- </fieldset> -->
  <fieldset>
    <legend>Title</legend>
    <div class="row">
      <input type="radio" id="title-none" name="title" value="None" bind:group={customTitleOption} />
      <label for="title-none">None</label>

      <input type="radio" id="title-default" name="title" value="Default" bind:group={customTitleOption} />
      <label for="title-default">Default</label>

      <input type="radio" id="title-custom" name="title" value="Custom" bind:group={customTitleOption} />
      <label for="title-custom">Custom</label>

      <input type="text" id="title-custom-text" placeholder="Custom title text..." disabled={customTitleOption !== 'Custom'} />
    </div>
  </fieldset>
</div>
</div>
</ToastContextProvider>

<style>
	:global(:root) {
		font-size: 16px;
	}

  .panel {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: stretch;
  }

  .panel > * {
    flex: 1;
    min-height: 600px;
    display: flex;
  }

  .dark {
    background-color: rgb(36, 60, 66);
  }

  fieldset {
    border: 0.0625em solid #1F497D;
    background: #ddd;
    border-radius: 0.25em;
    padding: 1em;
    margin: 1em;
    width: unset;
    min-height: initial;
    flex: initial;
    display: initial;
  }

  fieldset > legend {
    background: #1F497D;
    color: #fff;
    padding: 0.125em 0.5em;
    font-size: 1.5em;
    border-radius: 0.167em;
    box-shadow: 0 0 0 0.167em #ddd;
    margin-left: 0.25em;
  }

  .row > * + input {
    margin-left: 0.5em;
  }

  input[type=text] {
    flex: 1 1 5em;
  }

  /* .controls {
    position: absolute;
    bottom: 0;
    width: 100%;
    flex-direction: row;
    justify-content: center;
  }

  .controls > * {
    width: auto;
    padding: 1em;
  } */

  .row {
    display: flex;
    align-items: baseline;
  }

  .row > * {
    flex: 0 0 auto;
  }

  fieldset {
    margin: 1em;
  }
</style>
