var lastType = "";

$(document).ready(() => {
    $("#root").load("snippets/landing.html", () => colorMyPencils());

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
    lastType = type;
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
                reshuffle();
            });
        },
    });
}


const randomizeColors = () => {
    const colors = ['#00b25a', '#00549d', '#fa981d', '#f2674a'];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    return shuffleArray(colors);
}

const colorMyPencils = () => {
    const colors = randomizeColors();
    
    $("#evil").css("border-color", colors[0]);
    $("#good").css("border-color", colors[1]);
    $("#adventure").css("border-color", colors[2]);
    $("#normal").css("border-color", colors[3]);
    $("body").css("border-right-color", colors[3]);
    $("body").css("border-left-color", colors[1]);
}

const reshuffle = () => { $("#reshuffle-button").click(function(event){
    $.ajax({
        url: "https://hackathon-backend2.herokuapp.com/api/idea/generate/" + lastType,
        type: "GET",
        contentType: "application/json; charset=utl-8",
        success: function(result) {
            console.log(result);
            $("#idea-title").html(result.title);
            $("#idea-description").html(result.description);
            $("#reshuffle-button").attr("hidden", true);
        }
    })
})};