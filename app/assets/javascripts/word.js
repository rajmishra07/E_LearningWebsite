$(document).ready(function () {
    const searchButton = $("#search-button");
    const searchText = $("#search-text");
    const synonymsList = $("#synonyms-list");
    const antonymsList = $("#antonyms-list");
    const resultRow = $("#result-row");
    const clearIcon = $("#clear-icon");

    // Event listener for the search button
    searchButton.on("click", performSearch);

    // Event listener for pressing the Enter key in the search text input
    searchText.on("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchButton.click();
            searchButton.addClass('enter-pressed');
            setTimeout(() => {
                searchButton.removeClass('enter-pressed');
            }, 100);
        }
    });

    // Function to perform the search
    function performSearch() {
        const query = searchText.val();

        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/thesaurus?word=' + query,
            headers: {
                'X-Api-Key': 'uzNuZpwf/9RPACgMIUfTdQ==i6ycBTOh6y7Se64O'
            },
            contentType: 'application/json',
            success: function (result) {
                if ((result.synonyms && result.synonyms.length > 0) ||
                    (result.antonyms && result.antonyms.length > 0)) {
                    displayResult(result);
                    resultRow.css("display", "flex");
                } else {
                    alert('Meaning of word not found!');
                    resultRow.css("display", "none");
                }
            },
            error: function () {
                console.error('Error fetching data.');
                alert('Meaning of word not found!');
                resultRow.css("display", "none");
            }
        });
    }

    // Function to display the results in the cards
    function displayResult(result) {
        synonymsList.empty();
        antonymsList.empty();

        if (result.synonyms && result.synonyms.length > 0) {
            for (let i = 0; i < Math.min(10, result.synonyms.length); i++) {
                const listItem = $("<li>").text(result.synonyms[i]);
                synonymsList.append(listItem);
            }
        }

        if (result.antonyms && result.antonyms.length > 0) {
            for (let i = 0; i < Math.min(10, result.antonyms.length); i++) {
                const listItem = $("<li>").text(result.antonyms[i]);
                antonymsList.append(listItem);
            }
        }
    }

    // Event listener for the clear icon
    clearIcon.on("click", function () {
        searchText.val("");
        searchText.focus();
    });
});
