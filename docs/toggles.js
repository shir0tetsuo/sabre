function seeOn() {
  var div = document.getElementById("check");
  if (document.getElementById("toggle").checked == true) {
    div.style.display = "block";
  }
  if (document.getElementById("toggle").checked == false) {
    div.style.display = "none";
  }
}
function imgView() {
  var divB = document.getElementById("imgViewDIV")
  divB.style.display = "block"
}
function imgViewX() {
  var divB = document.getElementById("imgViewDIV")
  divB.style.display = "none"
}
