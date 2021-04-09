$("#reshuffle-button").click(function(event){

    var type = "EVIL_GENIUS";

    $.ajax({
        url: "https://hackathon-backend2.herokuapp.com/api/idea/generate/" + type,
        type: "GET",
        contentType: "application/json; charset=utl-8",
        success: function(result) {
            console.log(result);
            $("#idea-title").html(result.title);
            $("#idea-description").html(result.description);
            $("#reshuffle-button").attr("hidden", true);
        }
    })
});