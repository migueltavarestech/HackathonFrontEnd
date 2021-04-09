var lastType = "";
var isLogged = false;

$(document).ready(() => {
    init();
})

const init = () => {
    $("#root").load("snippets/landing.html", () => {
        $(document).on("click", "#main-logo", init);
        colorMyPencils()
        attachIdeasEventListeners();
        if (!isLogged) {
            $("#sign-in").load("snippets/loginButton.html", () => {
                $(document).on("click", "#sign-up-btn", (e) => {
                    e.preventDefault();
                    $("#root").load("/snippets/signup.html", () => {
                        attachSignupEventListener();
                        $(document).on("click", "#main-logo", init);
                    });
                })
            });
        }
    });

};

const attachLoginEventListener = () => {
    
    $(document).on("click", "#sign-in-btn", (e) => {
        e.preventDefault();

        var data = {
            email: $("#email").val(),
            password: $("#password").val(),
        };

        $.ajax({
            url: "https://hackathon-backend2.herokuapp.com/api/signin",
            type: "POST",
            data: JSON.stringify(data),
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            error: function (xhr) {
                console.log("Error: " + xhr.statusText);
            },
            success: function () {
                isLogged = true;
                init();
            },
        });
    })   
    
}

const attachSignupEventListener = () => {
    
    $(document).on("click", "#sign-up-btn", (e) => {
        e.preventDefault();

        var data = {
            email: $("#email").val(),
            password: $("#password").val(),
        };

        $.ajax({
            url: "https://hackathon-backend2.herokuapp.com/api/signup",
            type: "POST",
            data: JSON.stringify(data),
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            error: function (xhr) {
                console.log("Error: " + xhr.statusText);
            },
            success: function () {
                isLogged = true;
                init();
            },
        });
    })   
    
}
const attachIdeasEventListeners = () => {
    
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
    $(document).on("click", "#sign-in-btn", (e) => {
        $("#root").load("snippets/login.html", () => {
            $(document).on("click", "#main-logo", init);
            attachLoginEventListener();
        });
    })
}

// const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

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
            breakingNut(res);    
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
            $("#reshuffle-button").attr("hidden", true);
            breakingNut(result);
        }
    })
})};

function breakingNut(res) {
    var seconds = 5;
    $("#sign-in").hide();
    $("main").html('<img src="img/cracker2.gif"/>');
    $("#idea-main").html('<img src="img/cracker2.gif" class="container-fluid mt-3"/>');
    setInterval(function () {
        seconds--;
        if (seconds == 0) {
            $("#root").load("idea.html", () => {
                $("#idea-title").html(res.title);
                $("#idea-description").html(res.description);
                $(document).on("click", "#back-arrow", init);
                reshuffle();
            });
        }
    }, 600);
}