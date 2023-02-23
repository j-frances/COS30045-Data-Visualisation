/* Set the width of the side navigation to 250px */
function openNav() {
	document.getElementsByClassName("menu")[0].style.marginLeft = "-100";
	document.getElementsByClassName("menu")[0].style.visibility = "hidden";
	document.getElementById("mySidenav").style.width = "9%";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
	document.getElementsByClassName("menu")[0].style.marginLeft = "0";
	document.getElementsByClassName("menu")[0].style.visibility = "visible";
  document.getElementById("mySidenav").style.width = "0";
}
