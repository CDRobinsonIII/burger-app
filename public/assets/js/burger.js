// AJAX calls for onclick and submit events.

// Put AJAX calls in a load on ready function.
$(function () {
    $(".create.form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#newburger")
                .val()
                .trim(),
            devoured: 0
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("Added new burger");

                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".eatburger").on("click", function (event) {
        event.preventDefault();

        var id = $(this).data("id");
        var devouredState = {
            // This on click event sets devoured to true.
            devoured: 1
        }

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredState
        }).then (function () {
            console.log("Burger has been devoured.")
            location.reload();
        });
    });

    $(".trashburger").on("click", function (event) {
        event.preventDefault();

        var id = $(this).data("id");
     
        // Send the delete request.
        $.ajax({
            type: "DELETE",
            url: "/api/burgers/" +id
        }).then (function () {
            location.reload();
        });
    });
});
