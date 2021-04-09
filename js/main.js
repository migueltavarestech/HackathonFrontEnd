$(document).ready(() => {
    $("#root").load("snippets/landing.html");

    $(document).on("click", "#evil", (e) => {
        const data = fetchIdea("ADVENTURE");

        $("#root").load("snippets/idea.html");
        $("#idea-title").innerHTML = data.title;
        $("#idea-description").innerHTML = data.description;
        
    });
    $(document).on("click", "#good", (e) => {
        console.log('body');
    });
    $(document).on("click", "#adventure", (e) => {
        console.log('body');
    });
    $(document).on("click", "#normal", (e) => {
        console.log('body');
    });
})


const fetchIdea = (type) => {
    let data;
    $.ajax({
        url: "https://hackathon-backend2.herokuapp.com/api/idea/generate/" + type,
        type: "POST",
        data: JSON.stringify(data),
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        error: function (xhr) {
            alert("Error: " + xhr.statusText);
        },
        success: function () {
            data = fetchCustomers();
        },
    });
    return data;
}