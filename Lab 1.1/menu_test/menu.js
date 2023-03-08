/* Set the width of the side navigation to 250px */
function openNav() {
	document.getElementsByClassName("menu")[0].style.marginLeft = "-100";
	document.getElementsByClassName("menu")[0].style.visibility = "hidden";
	document.getElementById("sideNav").style.width = "9%";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
	document.getElementsByClassName("menu")[0].style.marginLeft = "0";
	document.getElementsByClassName("menu")[0].style.visibility = "visible";
  document.getElementById("sideNav").style.width = "0";
}

var sideNav = document.createElement("div");
	sideNav.setAttribute("class", "sidenav");
	sideNav.setAttribute("id", "sideNav");

{/* <div id="mySidenav" class="sidenav">
<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a> */}

var sideNavCloseBtn = document.createElement("a");
	sideNavCloseBtn.setAttribute("class", "closebtn");
	sideNavCloseBtn.setAttribute("id", "closebtn");
	sideNavCloseBtn.setAttribute("href", "javascript:void(0)");
	sideNavCloseBtn.setAttribute("onclick", "closeNav()");


	var menuButton = document.createElement("span");
	menuButton.setAttribute("class", "menu");
	menuButton.setAttribute("onclick", "openNav()");


var menuImg = document.createElement("img")
	menuImg.src = "../res/menu.svg";


var div = document.createElement("div");
div.appendChild(menuButton);
document.body.appendChild(div);


menuButton.appendChild(menuImg);


document.body.appendChild(sideNav);
sideNav.appendChild(sideNavCloseBtn);

var closebtn = document.getElementById("closebtn");

closebtn.textContent = "×";

var div = document.body.appendChild(menuButton);


var dir = ['1.1', '1.2', '1.3', '2.1', '2.2', '2.3', '2.4', '3.1', '3.2', '5.1', '5.2', '5.3', '6.1', '6.2', '7.1', '7.2', '7.3', '8.1', '8.2'];

for (var i = 0; i < dir.length; i++){

	var url = "https://j-frances.github.io/COS30045-Data-Visualisation/Lab%20" + dir[i] + "/lab" + dir[i] + ".html";

	var link = document.createElement("a");
	link.setAttribute("href", url);
	link.setAttribute("id", dir[i]);
	link.setAttribute("class", "navBarLinks");

	var linkHeader = document.createElement("h3");
	linkHeader.setAttribute("id", "linkHeader");

	var div = document.createElement("div");

	div.appendChild(linkHeader);
	div.appendChild(link);
	sideNav.appendChild(div);

	linkHeader = document.getElementById("linkHeader");
	link = document.getElementById("" + dir[i] + "");

	linkHeader.textContent = "Labs"
	link.textContent = "Lab " + dir[i];

	linkHeader.style.paddingLeft = "25px";
	link.style.paddingLeft = "50px";
}
