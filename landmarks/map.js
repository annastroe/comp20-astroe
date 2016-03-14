

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


function initialize(){

	var myData = "login=HOLLIS_MORROW&lat="+myLatitude+"&lng="+myLongitude;
	request.open("POST", "https://defense-in-derpth.herokuapp.com/sendLocation", true);

	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	request.send(myData);

	request.onreadystatechange = createMap;
}

function createMap() {

	var myLoc = new google.maps.LatLng(myLatitude, myLongitude);
	var myOptions = {
			zoom: 10,
			center: myLoc,
			/*mapTypeId: google.maps.mapTypeId.ROADMAP */

		};

	map = new google.maps.Map(document.getElementById("map"), myOptions);
	parse();

}

// create icons



function parse() {

	if (request.readyState == 4 && request.status == 200) {
		raw = request.responseText;
		data = JSON.parse(raw);
		
		// for loop to loop through people
		for (int i = 0; i < data.people.length; i++) {
			// create a marker for each person (google API)
			marker = new google.maps.Marker({
				position: LatLng,
				title: data.people[i].login,
				map: map
				// ANYTHING ELSE????????? 
				})

			marker.setPosition(new google.maps.LatLng(lat, lng));
		}
		// for loop to loop through landmarks
		for (int i = 0; i < data.landmarks.length; i++) {
			// create a marker for each landmark
			marker = new google.maps.Marker({
				position: LatLng,
				title: //TITLE??????????,
				map: map
				})

			//map: map,
			}
		console.log(data);
		
	}
	else if (request.readyState != 4 && request.status != 200) {
		elem.innerHTML = "<h2> Whoops, there is something wrong! </h2>"; 
	}
}


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

