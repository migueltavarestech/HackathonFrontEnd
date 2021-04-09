$(document).ready(() => {
    $("#root").load("snippets/landing.html");

    $(document).on("click", "#evil", (e) => {
        $("#root").load("snippets/evil.html");
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

