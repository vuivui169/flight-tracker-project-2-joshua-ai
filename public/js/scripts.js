// front-end JS
// save reference to important DOM elements
var timeDisplayEl = $('#time-display');
var projectDisplayEl = $('#project-display');
var projectFormEl = $('#project-form');
var projectNameInputEl = $('#project-name-input');
var projectTypeInputEl = $('#project-type-input');
var projectDateInputEl = $('#project-date-input');
var returnDateInputEl = $('#return-date-input');


//adding for now
// Access toggle switch HTML element
var themeSwitcher = document.querySelector("#theme-switcher");
var container = document.querySelector(".container-fluid");

// Set default mode to dark
var mode = "dark";

// Listen for a click event on toggle switch
themeSwitcher.addEventListener("click", function() {
  // If mode is dark, apply light background
  console.log(mode)
  if (mode === "dark") {
    mode = "light";
    container.setAttribute("class", "light");
  }
  // If mode is light, apply dark background 
  else {
    mode = "dark";
    container.setAttribute("class", "dark");
  }
});
//adding for now

// handle displaying the time
function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY');
  timeDisplayEl.text(rightNow);
}

// Reads projects from local storage and returns array of project objects.
// Returns an empty array ([]) if there aren't any projects.
function readProjectsFromStorage() {
  var projects = localStorage.getItem('projects');
  if (projects) {
    projects = JSON.parse(projects);
  } else {
    projects = [];
  }
  return projects;
}

// Takes an array of projects and saves them in localStorage.
function saveProjectsToStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

// Gets project data from local storage and displays it
function printProjectData() {
  // clear current projects on the page
  projectDisplayEl.empty();

  // get projects from localStorage
  var projects = readProjectsFromStorage();

  // loop through each project and create a row
  for (var i = 0; i < projects.length; i += 1) {
    var project = projects[i];
    var projectDate = dayjs(project.date);
    // get date/time for start of today
    var returnDate = dayjs(project.returnDate);
    var today = dayjs().startOf('day');

    // Create row and columns for project
    var rowEl = $('<tr>');
    var nameEL = $('<td>').text(project.name);
    var typeEl = $('<td>').text(project.type);
    var dateEl = $('<td>').text(projectDate.format('MM/DD/YYYY'));
    var returnDateEl = $('<td>').text(returnDate.format('MM/DD/YYYY'));

    // Save the index of the project as a data-* attribute on the button. This
    // will be used when removing the project from the array.
    var deleteEl = $(
      '<td><button class="btn btn-sm btn-delete-project" data-index="' +
        i +
        '">X</button></td>'
    );

    // add class to row by comparing project date to today's date
    if (projectDate.isBefore(today)) {
      rowEl.addClass('project-late');
    } else if (projectDate.isSame(today)) {
      rowEl.addClass('project-today');
    }

    // append elements to DOM to display them
    rowEl.append(nameEL, typeEl, dateEl, returnDateEl, deleteEl);
    projectDisplayEl.append(rowEl);
  }
}

// Removes a project from local storage and prints the project data
function handleDeleteProject() {
  var projectIndex = parseInt($(this).attr('data-index'));
  var projects = readProjectsFromStorage();
  // remove project from the array
  projects.splice(projectIndex, 1);
  saveProjectsToStorage(projects);

  // print projects
  printProjectData();
}

// Adds a project to local storage and prints the project data
function handleProjectFormSubmit(event) {
  event.preventDefault();

  // read user input from the form
  var projectName = projectNameInputEl.val().trim();
  var projectType = projectTypeInputEl.val(); // don't need to trim select input
  var projectDate = projectDateInputEl.val(); // yyyy-mm-dd format
  var returnDate = returnDateInputEl.val();

  var newProject = {
    name: projectName,
    type: projectType,
    date: projectDate,
    returnDate: returnDate,
  };

  // add project to local storage
  var projects = readProjectsFromStorage();
  projects.push(newProject);
  saveProjectsToStorage(projects);

  // print project data
  printProjectData();

  // clear the form inputs
  projectNameInputEl.val('');
  projectTypeInputEl.val('');
  projectDateInputEl.val('');
  returnDateInputEl.val('');
}

projectFormEl.on('submit', handleProjectFormSubmit);

//adding for now table sort
function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  //adding value to var table by ID.
  table = document.getElementById("myTable");
  switching = true;
  //swiches on during looping, off when not looping.
  while (switching) {
    // Start by off first but checking all rows.
    switching = false;
    rows = table.rows;
    //loop through all table rows except first row.
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      //sort the list by comparing alphabet of current row and next.
      x = rows[i].getElementsByTagName("td")[0];
      y = rows[i + 1].getElementsByTagName("td")[0];
      // sort the current row and next row if needed.
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        // If done, change the switch now done for the function.
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      //check each row if its marked sorting or not.
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

// Use jQuery event delegation to listen for clicks on dynamically added delete
// buttons.
projectDisplayEl.on('click', '.btn-delete-project', handleDeleteProject);

displayTime();
setInterval(displayTime, 3600);

printProjectData();

project = readProjectsFromStorage();

module.exports = projects;
