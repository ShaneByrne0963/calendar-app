<script lang="ts">
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<div id="calendar-container">
  <div id="calendar-header">
    <div id="calendar-view-panel"></div>
    <div id="calendar-navigation">
      <button aria-label="previous-month">
        <svg
          class="h-6 w-6 fill-current md:h-8 md:w-8"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          ><path
            d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
          ></path></svg
        >
      </button>
      <div id="date-label"></div>
      <button aria-label="next-month">
        <svg
          class="h-6 w-6 fill-current md:h-8 md:w-8"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          ><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
          ></path></svg
        >
      </button>
    </div>
    <div id="date-headings" class="border-1 border-blue-300 bg-blue-200">
      {#each days as day}
        <div>{day}</div>
      {/each}
    </div>
  </div>
  <slot />
</div>

<style>
  #calendar-container {
    height: calc(100vh - 1.5em);
    display: grid;
    grid-template-rows: 6.6em 1fr;
  }

  #calendar-header {
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  #date-headings {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  #calendar-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #date-label {
    min-width: 30%;
  }
</style>
