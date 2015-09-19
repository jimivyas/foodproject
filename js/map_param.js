function submitPoints() {
    console.log("hi dweebteam");
    var startPoint = document.getElementById('startPoint').value;
    var endPoint = document.getElementById('endPoint').value;
    var poi = document.getElementById('poi').value;
    localStorage.setItem("start", startPoint);
    localStorage.setItem("end", endPoint);
    localStorage.setItem("poi", poi);
    window.location.href = "/map.html";
    return true;
}

function setGuide(guideStatus) {
    localStorage.setItem("guide", guideStatus);
    console.log(guideStatus);
}

function setFare(fareIndex) {
    var fareList = localStorage.getItem("fare");
    console.log(fareIndex);
    fareList[fareIndex] = !fareList[fareIndex];
    localStorage.setItem("fare", fareList);
    console.log("Updated: " + fareList);
}

function loadFunctionIndex() {
    var fares = [false, false, false, false, false, false];
    localStorage.setItem("fare", fares);
    console.log("Fares" + fares);
}

function loadFunctionMap() {
    console.log(localStorage.getItem("start"));
    
//    placeholder for start and end points
    document.getElementById("initial-start").innerHTML = "<div class='input-group'><span class='input-group-addon' id='basic-addon1'>start</span><input type='text' id='startparam' class='form-control' placeholder='" +
        localStorage.getItem("start") + 
        "' aria-describedby='basic-addon1'></div>"
    
    document.getElementById("initial-end").innerHTML = "<div class='input-group'><span class='input-group-addon' id='basic-addon1'>end</span><input type='text' id='startparam' class='form-control' placeholder='" +
    localStorage.getItem("end") + 
    "' aria-describedby='basic-addon1'></div>"
    
}