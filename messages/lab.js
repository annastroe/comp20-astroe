// Your JavaScript goes here...

request = new XMLHttpRequest();

request.open("GET", "data.json", true);

request.onreadystatechange = myFunction;

request.send(null);

myFunction() {
	
	if (request.readyState == 4 && request.status == 200) {
				result = "";
				raw = request.responseText;
				data = JSON.parse(raw);
				elem = document.getElementById("1");
				for (count=0; count < data.length; count++){
					elem.innerHTML += "<p> data[i] </p>"
				}
				elem = document.getElementById("2");
				for (count=0; count < data.length; count++){
					elem.innerHTML += "<p> data[i] </p>"
				}
	}


}





request.send(null);