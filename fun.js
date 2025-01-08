/**
 * 
 * Functions file, created by D. S. Caleidoscope on January, 2025.
 **/

//visuals
var Wcollapsed = false;

//helpers & redefines
function g(id) { return document.getElementById(id); }

//visuals
function collapseWhat(id) {
  if (Wcollapsed) {
    //it's collapsed, it will expand
    g(id).style.visibility = "initial";
    g(id).style.height = "initial";
    g("whatSection").style.borderBottom = "none";
    g("whatSection").style.borderRadius = "25px 25px 0px 0px";
    Wcollapsed = false;
  } else {
    //it's expanded, let's collapse it
    g(id).style.visibility = "hidden";
    g(id).style.height = "0";
    g("whatSection").style.borderBottom = "3px solid #A7A392";
    g("whatSection").style.borderRadius = "25px 25px 25px 25px";
    Wcollapsed = true;
  }
}
