
var myLatitude = 0;
var myLongitude = 0;
var map;
var request = new XMLHttpRequest;


function getMyLocation() {
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLatitude = position.coords.latitude;
			myLongitude = position.coords.longitude;
			initialize();
			
		});
	}
	else {
		alert("go away, you can't use geolocation!");
	}
}

function createMap() {
	var myLoc = new google.maps.LatLng(myLatitude, myLongitude);
	var myOptions = {
			zoom: 15,
			center: myLoc,
			mapTypeId:google.maps.MapTypeId.ROADMAP

		};

	map = new google.maps.Map(document.getElementById("map"), myOptions);
	parse();

}

function initialize(){

	var myData = "login=HOLLIS_MORROW&lat="+myLatitude+"&lng="+myLongitude;
	request.open("POST", "https://defense-in-derpth.herokuapp.com/sendLocation", true);

	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	request.send(myData);

	request.onreadystatechange = createMap;

}


function parse() {

	// create icons
	var my_icon = {
		url: "my_icon_cat.png",
		scaledSize: new google.maps.Size(30, 30)
	};

	var student_icon = {
		url: "student_icon_dog.png",
		scaledSize: new google.maps.Size(26, 26)

	};

	var landmark_icon = {
		url: "food_bowl.png",
		scaledSize: new google.maps.Size(32, 32)
	};

	// get/parse data 
	if (request.readyState == 4 && request.status == 200) {
		raw = request.responseText;
		data = JSON.parse(raw);
		
		// for loop to loop through people
		infowindow = new google.maps.InfoWindow();
		for (var i = 0; i < data.people.length; i++) {
			// create a marker for each person (google API)
			var people_pos = new google.maps.LatLng(data.people[i].lat,data.people[i].lng)
			marker = new google.maps.Marker({
				position: people_pos,
				title: data.people[i].login,
				map: map,
				icon: student_icon,
				content: data.people[i].login + "<br> distance from me: " +haversine(data.people[i].lat,data.people[i].lng, myLatitude, myLongitude)
				});

			google.maps.event.addListener(marker, 'click', function() {
    			infowindow.setContent(this.content);
   				infowindow.open(map,this);
			});
		}
		
		var closest_landmark = 1.0;
		var closest_index = 0;
		// for loop to loop through landmarks
		for (var i = 0; i < data.landmarks.length; i++) {
			// create a marker for each landmark
			var landmark_pos = new google.maps.LatLng(data.landmarks[i].geometry.coordinates[1],data.landmarks[i].geometry.coordinates[0])
			marker = new google.maps.Marker({
				position: landmark_pos,
				title: data.landmarks[i].properties.Location_Name,
				map: map,
				icon: landmark_icon,
				content: data.landmarks[i].properties.Details 
				});
			
			google.maps.event.addListener(marker, 'click', function() {
    			infowindow.setContent(this.content);
   				infowindow.open(map,this);
			});

			var distance_to_me = haversine(data.landmarks[i].geometry.coordinates[1],data.landmarks[i].geometry.coordinates[0], myLatitude, myLongitude)
			if (distance_to_me < closest_landmark) {
				closest_landmark = distance_to_me;
				closest_index = i;
			}

		}
		// my icon
		var my_pos = new google.maps.LatLng(myLatitude, myLongitude)
		marker = new google.maps.Marker({
			position: my_pos,
			title: "MEOW! IT'S ME!",
			map: map,
			icon: my_icon,
			content: "closest landmark: " + data.landmarks[closest_index].properties.Location_Name + "<br> distance from me: " + distance_to_me + " miles"
		});

		// my info window
		google.maps.event.addListener(marker, 'click', function() {
    			infowindow.setContent(this.content);
   				infowindow.open(map,this);
			});


		var myPath = [
			{lat: myLatitude, lng: myLongitude},
			{lat: data.landmarks[closest_index].geometry.coordinates[1], lng: data.landmarks[closest_index].geometry.coordinates[0]}
		];
		// create the polyline
		var line = new google.maps.Polyline({
				path: myPath,
    			geodesic: true,
    			strokeColor: '#FF00FF',
    			strokeOpacity: 1.0,
    			strokeWeight: 2,
    			map: map
		})
		
	}
	else if (request.readyState != 4 && request.status != 200) {
		 alert("Whoops, there is something wrong!"); 
	}
}

function haversine(lat1, lng1, lat2, lng2)
{
	Number.prototype.toRad = function() {
   		return this * Math.PI / 180;
	}

	var R = 6371; // km 
	
	var x1 = lat2-lat1;
	var dLat = x1.toRad();  
	var x2 = lng2-lng1;
	var dLon = x2.toRad();  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
	                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
	                Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; 

	return d * .621371; // convert to miles
}




