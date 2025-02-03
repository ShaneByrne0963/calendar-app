<div id="calendar-container">
  <div id="calendar-header">
    <div id="calendar-view-panel"></div>
    <div id="calendar-navigation"></div>
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
</style>
