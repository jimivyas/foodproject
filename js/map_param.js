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
    var fareList = JSON.parse(localStorage["fare"]);
    fareList[fareIndex] = !fareList[fareIndex];
    localStorage["fare"] = JSON.stringify(fareList);
    console.log("update!!!!" + fareList);
}

function setDifficulty(difficultyLevel) {
    localStorage.setItem("difficulty", difficultyLevel);
    console.log(difficultyLevel);
}

function autoComplete() {
    var input = /** @type {~HTMLInputElement} */(document.getElementById('startPoint'));
    var autocomplete = new google.maps.placesAutocomplete(input);
    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        var place = autocomplete.getPlace();
    }
    
}

function loadFunctionIndex() {
    console.log("INITIAL PAGE LOAD");
    var fares = [false, false, false, false, false, false];
    localStorage["fare"] = JSON.stringify(fares);
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