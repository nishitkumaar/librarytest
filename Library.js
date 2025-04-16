let searchResults = document.getElementById("searchResults");
let inputEl = document.getElementById("searchInput");
let Heading = document.getElementById("resultsPartHeading");
let spinnerEl = document.getElementById("spinnerContainer");

function appendAndDisplay(eachResult) {
    let resultContainer = document.createElement("div");
    resultContainer.classList.add("col-6", "text-center", "mb-3");

    let imageElement = document.createElement("img");
    imageElement.src = eachResult.imageLink;
    resultContainer.appendChild(imageElement);

    let authorEl = document.createElement("p");
    authorEl.textContent = eachResult.author;
    resultContainer.appendChild(authorEl);

    searchResults.appendChild(resultContainer);
}

function getResults(search_results) {
    Heading.textContent = "Popular Books";
    for (let eachResult of search_results) {
        appendAndDisplay(eachResult);
    }
    spinnerEl.classList.toggle("d-none");
}

function getData(inputText) {
    let options = {
        method: "GET"
    };
    let url = "https://apis.ccbp.in/book-store?title=" + inputText;
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            let {
                search_results,
                total
            } = jsonData;
            if (total === 0) {
                console.log("hiii");
                Heading.textContent = "No Results Found";
                Heading.classList.add("text-center");
                spinnerEl.classList.toggle("d-none");
            } else {
                getResults(search_results);
            }
        });
}

inputEl.addEventListener("keydown", function(event) {
    let inputText = inputEl.value;
    if (inputText !== "") {
        if (event.key === "Enter") {
            spinnerEl.classList.toggle("d-none");
            searchResults.textContent = "";
            getData(inputText);
            inputEl.value = "";
        }
    } else {
        Heading.textContent = "";
        searchResults.textContent = "";
    }
})