function closeMenu(e) {
    $("#side-menu").css("left", "-100%");
    $("main").css("filter", "brightness(100%)");
}

function openMenu(e) {
    $("#side-menu").css("left", "0");
    $("main").css("filter", "brightness(30%)");
}