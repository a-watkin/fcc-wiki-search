$(document).ready(function() {
  var apiUrl = "https://en.wikipedia.org/w/api.php?";
  var wikiPageLink = "https://en.wikipedia.org/?curid=";

  function getWikiValues(input) {
    var apiUrl = "https://en.wikipedia.org/w/api.php";
    $.ajax({
      url: apiUrl,
      dataType: "jsonp",
      jsonp: "callback",
      data: {
        action: "query",
        format: "json",
        list: "search|alllinks",
        allimit: 10,
        srsearch: input,
        format: "json"
      },
      success: function(response) {
        if (response.query.searchinfo.totalhits == 0) {
          $("#error-message").html(
            '<div class="alert alert-danger" role="alert">' +
              "No results found, please check your spelling or enter a different search result and try again." +
              "</div>"
          );
        } else {
          // clear any warnings
          $("#error-message").html("");

          for (var i = 0; i < response.query.search.length; i++) {
            var title = response.query.search[i].title;
            var link = wikiPageLink + response.query.search[i].pageid;
            var snippet = response.query.search[i].snippet + "...";

            console.log(title + " " + link + " " + snippet);
            $("#results").append(
              "<a id='result-links' target='_blank' href=" +
                link +
                "><h3>" +
                title +
                "</h3></a>" +
                "<p>" +
                snippet +
                "</p>"
            );
          }
        }
      }
    });
  }

  function getRandomPage() {
    $.ajax({
      url: apiUrl,
      dataType: "jsonp",
      jsonp: "callback",
      data: {
        action: "query",
        list: "random",
        rnnamespace: "0",
        format: "json"
      },
      success: function(response) {
        // console.log(response.query.random[0].id);
        var randomId = response.query.random[0].id;
        var win = window.open(wikiPageLink + randomId, "_blank");

        if (win) {
          win.focus();
        }
      },
      error: function(error, response) {
        console.log("error", error, response);
      }
    });
  }

  $("#search-button").on("click", function() {
    var input = $("#search-box").val();
    // clear search results
    $("#results").html("");
    if (input.length > 0) {
      getWikiValues(input);
    } else {
      $("#error-message").html(
        '<div class="alert alert-danger" role="alert">' +
          "You need to enter something to search." +
          "</div>"
      );
    }
  });

  $("#search-box").keyup(function(event) {
    if (event.key == "Enter") {
      console.log(event.key);
      $("#search-button").click();
    }
  });

  $("#random-page").on("click", function() {
    // make sure the error message is clear
    $("#error-message").html("");
    getRandomPage();
  });
});
