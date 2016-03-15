
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
			console.log("in loop")
			// create a marker for each person (google API)
			var people_pos = new google.maps.LatLng(data.people[i].lat,data.people[i].lng)
			marker = new google.maps.Marker({
				position: people_pos,
				title: data.people[i].login,
				map: map,
				icon: student_icon,
				content: data.people[i].login
				});

			google.maps.event.addListener(marker, 'click', function() {
    			infowindow.setContent(this.content);
   				infowindow.open(map,this);
			});
		}
		
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

		}
		// my icon
		var my_pos = new google.maps.LatLng(myLatitude, myLongitude)
		marker = new google.maps.Marker({
			position: my_pos,
			title: "MEOW! IT'S ME!",
			map: map,
			icon: my_icon,
			content: "test"
		});

		// my info window
		google.maps.event.addListener(marker, 'click', function() {
    			infowindow.setContent(this.content);
   				infowindow.open(map,this);
			});

		console.log(data);
		
		
	}
	else if (request.readyState != 4 && request.status != 200) {
		 alert("Whoops, there is something wrong!"); 
	}
}

function addInfoWindow() {
	infowindow = new google.maps.InfoWindow
}

// open info window

//  find closest landmark
//  haversine formula


			/*renderMap();
		});
	}
	else {
			alert("Geolocation is not supported by your web browser");
	}
}

function renderMap()
	{
		me = new google.maps.LatLng(myLat, myLng);
		
		// Update map and go there...
		map.panTo(me);

		// Create a marker
		marker = new google.maps.Marker({
			position: me,
			title: "Here I Am!"
		});
		marker.setMap(map);
			
		// Open info window on click of marker
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(marker.title);
			infowindow.open(map, marker);
		});
	}
*/

