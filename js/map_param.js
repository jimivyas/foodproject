function submitPoints() {
    console.log("hi dweebteam");
    var startPoint = document.getElementById('startPoint').value;
    var endPoint = document.getElementById('endPoint').value;
    localStorage.setItem("start", startPoint);
    localStorage.setItem("end", endPoint);
    console.log(localStorage.getItem("start"));
    window.location.href = "/map.html";
    return true;
}

function loadFunction() {
    console.log(localStorage.getItem("start"));
    
//    placeholder for start and end points
    document.getElementById("initial-start").innerHTML = "<div class='input-group'><span class='input-group-addon' id='basic-addon1'>start</span><input type='text' id='startparam' class='form-control' placeholder='" +
        localStorage.getItem("start") + 
        "' aria-describedby='basic-addon1'></div>"
    
    document.getElementById("initial-end").innerHTML = "<div class='input-group'><span class='input-group-addon' id='basic-addon1'>end</span><input type='text' id='startparam' class='form-control' placeholder='" +
    localStorage.getItem("end") + 
    "' aria-describedby='basic-addon1'></div>"

}