function submitPoints() {
    console.log("hi dweebteam");
    var poi = document.getElementById('poi').value;
    localStorage.setItem("poi", poi);

    var fareList = JSON.parse(localStorage["fare"]);

    if (fareList[0]) {
        $.ajax({
            type: 'post',
            url: '../php/yelp.php',
            data: {term: "breakfast", location: localStorage["poi"]},
            success: function(response) {
                content.html(response);
            }
        });
    }
    if (fareList[1]) {
        $.ajax({
            type: 'post',
            url: '../php/yelp.php',
            data: {term: "coffee", location: localStorage["poi"]},
            success: function(response) {
                content.html(response);
            }
        });
    }
    if (fareList[2]) {
        $.ajax({
            type: 'post',
            url: '../php/yelp.php',
            data: {term: "lunch", location: localStorage["poi"]},
            success: function(response) {
                content.html(response);
            }
        });
    }
    if (fareList[3]) {
        $.ajax({
            type: 'post',
            url: '../php/yelp.php',
            data: {term: "high tea", location: localStorage["poi"]},
            success: function(response) {
                content.html(response);
            }
        });
    }
if (fareList[4]) {
        $.ajax({
            type: 'post',
            url: '../php/yelp.php',
            data: {term: "dinner", location: localStorage["poi"]},
            success: function(response) {
                content.html(response);
            }
        });
    }
if (fareList[5]) {
        $.ajax({
            type: 'post',
            url: '../php/yelp.php',
            data: {term: "dessert", location: localStorage["poi"]},
            success: function(response) {
                content.html(response);
            }
        });
    }



    // there must be a more efficient way to to do this with like kvps :$

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