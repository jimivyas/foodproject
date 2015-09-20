    var destinations = [];
    var images = [];
    var names = [];
    var urls = [];
    var n = 0;
    var radius = 8000*5*(1+parseInt(localStorage["difficulty"]));
    console.log(radius);

    var fareList = JSON.parse(localStorage["fare"]);

    var pois = ['breakfast','coffee','lunch','high tea','dinner','dessert'];

    var geocoder = new google.maps.Geocoder();
    var poi = localStorage["poi"];
        geocoder.geocode({'address': poi}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            poi = results[0].geometry.location;
            destinations.push([poi["H"], poi["L"]]);
            n++;
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });

    for(var i=0;i<6;i++){
        console.log(fareList[i]);
        if (fareList[i]) {
            $.ajax({
                type: 'post',
                url: 'php/yelp.php',
                data: {term: pois[i], location: localStorage["poi"], radius_filter: radius},
                success: function(response) {
                    console.log(response);
                    var json = JSON.parse(response);
                    if(json['location']){
                        console.log(json);
                        images.push(json['image_url']);
                        names.push(json['name']);
                        urls.push(json['mobile_url']);
                        destinations.push([json['location']['coordinate']['latitude'],json['location']['coordinate']['longitude']]);
                        n++;
                    }
                }
            });
        };
    };

    USGSOverlay.prototype = new google.maps.OverlayView();

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var waypts = [];
        for (var i = 0; i < n-1; i++) {
            waypts.push({
                location: new google.maps.LatLng(destinations[i][0], destinations[i][1]),
                stopover: true
            });
        };
        directionsService.route({
            origin: new google.maps.LatLng(destinations[0][0], destinations[0][1]),
            destination: new google.maps.LatLng(destinations[n-1][0], destinations[n-1][1]),
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.WALKING
        }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: {
                lat: destinations[0][0],
                lng: destinations[0][1]
            },
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.MAP,
            disableDoubleClickZoom: true
        });

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(destinations[0][0], destinations[0][1]),
                map: map,
                title: 'START!'
            });

        var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(destinations[0][0], destinations[0][1]),
            new google.maps.LatLng(destinations[0][0], destinations[0][1]));

        // The photograph is courtesy of the U.S. Geological Survey.
        var srcImage = 'https://developers.google.com/maps/documentation/' +
            'javascript/examples/full/images/talkeetna.png';

        for (var i = 1; i < n; i++) {
            var locationcenter = new google.maps.LatLng(destinations[i][0], destinations[i][1]);
            var overlay = new USGSOverlay(bounds, srcImage, map, locationcenter, i);
        }

        directionsDisplay.setMap(map);
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    }

    function USGSOverlay(bounds, image, map, locationcenter, index) {

        // Initialize all properties.
        this.bounds_ = bounds;
        this.locationcenter_ = locationcenter;
        this.image_ = image;
        this.map_ = map;
        this.index_ = index;
        console.log(this.index_);

        this.div_ = null;

        this.setMap(map);
    }

    USGSOverlay.prototype.onAdd = function() {

        //wrapepr
        var parentdiv = document.createElement('div');
        parentdiv.style.position = 'absolute';

        var number = document.createElement('div');
        number.style.zIndex = '10';
        number.style.width = '20px';
        number.style.height = '20px';
        number.style.borderRadius = '100px';
        number.style.background = '#1e88e5';
        number.style.position = 'absolute';
        number.style.top = '-2px';
        number.style.left = '-2px';
        number.style.color = 'white';
        number.style.textAlign = 'center';
        number.style.webkitFontSmoothing = 'antialiased';
        number.style.paddingTop = '3px';
        number.innerHTML = this.index_ + 1;
        parentdiv.appendChild(number);

        //image
        var div = document.createElement('div');
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '2px';
        div.style.borderColor = 'white';
        div.style.position = 'absolute';
        div.style.left = '0';
        div.style.top = '0';
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.background = "url("+images[this.index_-1]+")";
        div.style.backgroundSize = 'cover';
        div.style.borderRadius = '2000px';
        div.style.boxShadow = '0px 1px 2px rgba(0,0,0,0.5), 0px 0px 1px rgba(0,0,0,0.25)';
        div.style.cursor = 'pointer';
        div.style.zIndex = '2';
        parentdiv.appendChild(div);

        //content
        var content = document.createElement('div');
        content.id = 'content';
        content.style.zIndex = '1';
        content.style.borderRadius = '2px';
        content.style.boxShadow = '0px 1px 2px rgba(0,0,0,0.5), 0px 0px 1px rgba(0,0,0,0.25)';
        content.style.position = 'absolute';
        content.style.width = '150px';
        content.style.height = '40px';
        content.style.left = '25px';
        content.style.top = '6px';
        content.style.background = 'white';
        content.style.display = 'none';
        content.innerHTML = '<div class="content-title"><a href="'+urls[this.index_-1]+'">'+names[this.index_-1]+'</a></div><div class="content-content">'+pois[this.index_-1]+'</div>';
        parentdiv.appendChild(content);

        this.div_ = parentdiv;

        var panes = this.getPanes();
        panes.floatPane.appendChild(parentdiv);

        google.maps.event.addDomListener(div, 'click', function() {
            if (content.style.display == 'none') {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            };
        });
    };

    USGSOverlay.prototype.draw = function() {

        var overlayProjection = this.getProjection(); //viewport projection

        var pix = overlayProjection.fromLatLngToDivPixel(this.locationcenter_);

        // Resize the image's div to fit the indicated dimensions.
        var div = this.div_;
        div.style.left = pix.x - 25 + 'px';
        div.style.top = pix.y - 25 + 'px';
        div.style.width = '50px'
        div.style.height = '50px'
    };

    USGSOverlay.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    };
    // [END region_removal]

    google.maps.event.addDomListener(window, 'load', initMap);
