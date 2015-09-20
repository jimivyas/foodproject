
$(document).ready(function() {
    $(".btn").click(function() {

//        check if already selected
        console.log("class =" + $(this).attr('class'));
        if ($(this).attr('class') == "btn-warning"){
            console.log("ALREADY SELECTED");
        } else if ($(this).attr('id') == "hipster" || $(this).attr('id') == "tourist") {
            console.log("HIPSTER OR TOURIST");
            $("#hipster").attr("class", "btn");
            $("#tourist").attr("class", "btn");

        } else if ($(this).attr('id') == "lev0" || $(this).attr('id') == "lev1" || $(this).attr('id') == "lev2") {
            console.log("DIFFICULTY");
            $("#lev0").attr("class", "btn");
            $("#lev1").attr("class", "btn");
            $("#lev2").attr("class", "btn");
        } else {
         console.log("fare");

        }

        $(this).toggleClass("btn-warning");
    })
});



$('.menu>li').on('click',function(e){
    $('.container>.'+ e.target.classList[0]).show().siblings().hide();
});



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

function setDifficulty(difficultyLevel) {
    localStorage.setItem("difficulty", difficultyLevel);
    console.log(difficultyLevel);
}

function autoComplete() {
    var input = document.getElementById('poi');
    autocomplete = new google.maps.places.Autocomplete(input);
}

function loadFunctionIndex() {
    autoComplete();
    console.log("INITIAL PAGE LOAD");
    var fares = [false, false, false, false, false, false];
    localStorage["fare"] = JSON.stringify(fares);
}

function loadFunctionMap() {
    localStorage["selections"] = "";
    poidisplay = localStorage.getItem("poi");
    document.getElementById("mappoi").innerHTML = poidisplay;
    mealsorder = {0: "Breakfast", 1: "Coffee", 2: "Lunch", 3: "High Tea", 4: "Dinner", 5: "Dessert"};
    var fareList = JSON.parse(localStorage["fare"]);
    for (index = 0; index < fareList.length ; ++index) {
      if(fareList[index]) {
        if (fareList[index] !== 0) {
        localStorage["selections"] = localStorage["selections"] + " | " + mealsorder[index];
        }
      };
    };
    localStorage
    console.log(localStorage["selections"]);
    mealdisplay = localStorage.getItem("selections");
    document.getElementById("selections").innerHTML = mealdisplay + " | " ;
    document.getElementById("guide").innerHTML = localStorage["guide"];
}


