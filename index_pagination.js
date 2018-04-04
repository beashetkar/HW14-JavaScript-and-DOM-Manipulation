// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");

var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");

var $searchBtn = document.querySelector("#search");
var $resetBtn = document.querySelector("#reset");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener('click', handleSearchButtonClick);

// Add an event listener to the resetButton, call handleResetButtonClick when clicked
$resetBtn.addEventListener('click', handleResetButtonClick);

// Set filteredData to dataSet initially. dataSet comes from the Data.js file
var filteredData = dataSet;

// renderTable renders the filteredData to the tbody
function renderTable() {
  $tbody.innerHTML = '';

  // get the table element
  var $table = document.getElementById('myTable'),
  // number of rows per page
  $n = 20,
  // number of rows of the table
  $rowCount = $table.rows.length,
  // get the first cell's tag name (in the first row)
  $firstRow = $table.rows[0].firstElementChild.tagname,
  // boolean var to check if table has a head row
  $hasHead = ($firstRow === "TH"),
  // an array to hold each row
  $tr = [],
  // loop counters, to start count front rows[1] (2nd row) if the first row has a head tag
  $i,$ii,$j = ($hasHead)?1:0,
  // holds the first row if it has a (<TH>) & nothing if (<TD>)
  $th = ($hasHead?$table.rows[(0)].outerHTML:"");
  // count the number of pages
  var $pageCount = Math.ceil($rowCount / $n);

  if ($pageCount > 1) {

    for ($i = $j, $ii = 0; $i < $rowCount; $i++, $ii++) 
      $tr[$ii] = $table.rows[$i].outerHTML;
    
    // create a div block to hold the buttons
    $table.insertAdjacentElement("afterend","<div id='buttons'></div>");
    // the first sort, default page is the first one
    sort(1);
  }  

    // Get the current sightings objects and its fields
    var sighting = filteredData[i];
    var fields = Object.keys(sighting);

    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {

      // For every field in the sighting object, create a new cell at set its inner text to be the current value at the current sighting's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sighting[field];
    }
  }
}

function handleSearchButtonClick() {
  // go through search items with formatted user's search terms by removing leading and trailing whitespace, lowercase the string

  var filterDate = $dateInput.value.trim();
  if (filterDate != ""){
    filteredData = dataSet.filter(function(sighting){
      var sightingDate = sighting.datetime;
      return sightingDate === filterDate;
    });
  };

  var filterCity = $cityInput.value.trim().toLowerCase();
  if (filterCity != ""){
    filteredData = dataSet.filter(function(sighting){
      var sightingCity = sighting.city;
      return sightingCity === filterCity;
    });
  };

  var filterState = $stateInput.value.trim().toLowerCase();
  if (filterState != ""){
    filteredData = dataSet.filter(function(sighting){
      var sightingState = sighting.state;
      return sightingState === filterState;
    });
  };

  var filterCountry = $countryInput.value.trim().toLowerCase();
  if (filterCountry != ""){
    filteredData = dataSet.filter(function(sighting){
      var sightingCountry = sighting.country;
      return sightingCountry === filterCountry;
    });
  };

  var filterShape = $shapeInput.value.trim().toLowerCase();
  if (filterShape != ""){
    filteredData = dataSet.filter(function(sighting){
      var sightingShape = sighting.shape;
      return sightingShape === filterShape;
    });
  };

  renderTable();
}

// Reset the data and search form after a searh
function handleResetButtonClick(){
  filteredData = dataSet;
  $dateInput.value = "";
  $cityInput.value = "";
  $stateInput.value = "";
  $countryInput.value = "";
  $shapeInput.value = "";
}

// Render the table for the first time on page load
renderTable();
