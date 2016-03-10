// Your JavaScript goes here...

request = new XMLHttpRequest();

request.open("GET", "data.json", true);

request.onreadystatechange = parse;

request.send(null);

function parse() {
	
	if (request.readyState == 4 && request.status == 200) {
				raw = request.responseText;
				data = JSON.parse(raw);
				elem = document.getElementById("messages");
				
				elem.innerHTML = "<h2>" + data[0]["content"]+"</h2><p> -" +data[0]["username"]+"</p>"+"<h2>"+ data[1]["content"]+"</h2><p> -"+ data[1]["username"]+"</p>"; 

				
	}
	else if (request.readyState != 4 && request.status != 200) {
		elem.innerHTML = "<h2> Whoops, there is something missing! </h2>"; 
	}
};

