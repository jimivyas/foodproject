function submitPoints() {
    console.log("hi dweebteam");
    var startPoint = document.getElementById('startPoint').value;
    var endTime = document.getElementById('endPoint').value;
    localStorage.setItem("start", startPoint);
    localStorage.setItem("end", endPoint);
    onsole.log(localStorage.getItem("start"));
    window.location.href = "/foodproject/map.html";
}

function loadFunction() {
    console.log(localStorage.getItem("start"));
    document.getElementById("initial-start").innerHTML = localStorage.getItem("start");   
}