$(document).ready(() => {
    $("#root").load("snippets/landing.html");

    $(document).on("click", "#evil", (e) => {
        fetchIdea("EVIL_GENIUS");
    });
    $(document).on("click", "#good", (e) => {
        fetchIdea("GOOD_HEART");
    });
    $(document).on("click", "#adventure", (e) => {
        fetchIdea("ADVENTURE");
    });
    $(document).on("click", "#normal", (e) => {
        fetchIdea("NORMAL");
    });
})

const fetchIdea = (type) => {
    $.ajax({
        url: "https://hackathon-backend2.herokuapp.com/api/idea/generate/" + type,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        error: function (xhr) {
            alert("Error: " + xhr.statusText);
        },
        success: function (res) {
            console.log(res);
            $("#root").load("idea.html", () => {
                $("#idea-title").html(res.title);
                $("#idea-description").html(res.description);
            });
        },
    });
}