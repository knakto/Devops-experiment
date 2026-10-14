$(function () {
  let tasks = loadTasks();
  render();

  // Add task with a popup
  $("#new").on("click", function () {
    let text = prompt("New task:");     // returns the text, or null on Cancel
    if (text === null) return;          // Cancel
    if (text === "") return;            // empty
    tasks.unshift(text);                // add to the top
    saveTasks();
    render();
  });

  // Show tasks; click one to remove it
  function render() {
    let $list = $("#list").empty();
    tasks.forEach(function (text, i) {
      $("<div>")
        .text(text)
        .on("click", function () {
          if (confirm("Delete this task?\n\n" + text)) {   // OK = true, Cancel = false
            tasks.splice(i, 1);
            saveTasks();
            render();
          }
        })
        .appendTo($list);
    });
  }

  // Save the task list as JSON in a cookie (kept 1 year)
  function saveTasks() {
    let value = encodeURIComponent(JSON.stringify(tasks));
    document.cookie = "tasks=" + value + "; max-age=31536000; path=/";
  }

  // Read the JSON list back from the cookie
  function loadTasks() {
    let match = document.cookie.match(/(?:^|; )tasks=([^;]*)/);
    if (!match) return [];
    try {
      return JSON.parse(decodeURIComponent(match[1]));
    } catch (e) {
      return [];
    }
  }
});
