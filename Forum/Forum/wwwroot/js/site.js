// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


function function1() {
    document.getElementById("size").innerHTML = "Filter by Topic";
    let element = document.getElementById("centers");
    element.removeAttribute("hidden");

    let el = document.getElementById("i1");
    let ell = document.getElementById("i2");
    let elll = document.getElementById("change_4");
    el.removeAttribute("hidden");
    ell.setAttribute("hidden", "hidden");
    elll.setAttribute("hidden", "hidden");
}

function function2() {

    document.getElementById("size").innerHTML = "Filter by Member";
    let element = document.getElementById("centers");
    element.removeAttribute("hidden");

    let el = document.getElementById("i1");
    let ell = document.getElementById("i2");
    let elll = document.getElementById("change_4");
    ell.removeAttribute("hidden");
    el.setAttribute("hidden", "hidden");
    elll.setAttribute("hidden", "hidden");

    
}

function function3() {

    document.getElementById("size").innerHTML = "Filter by Date";
    let element = document.getElementById("centers");
    element.removeAttribute("hidden");

    let el = document.getElementById("i1");
    let ell = document.getElementById("i2");
    let elll = document.getElementById("change_4");
    el.setAttribute("hidden", "hidden");
    ell.setAttribute("hidden", "hidden");
    elll.removeAttribute("hidden");


}

document.getElementById("button1").addEventListener("mousedown", function1);
document.getElementById("button2").addEventListener("mousedown", function2);
document.getElementById("button3").addEventListener("mousedown", function3);

