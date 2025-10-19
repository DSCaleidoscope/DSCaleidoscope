/**
 * 
 * Functions file, created by D. S. Caleidoscope on January, 2025.
 **/

//visuals
var collapsed = [];
var currStep = 0;
var maxStep = 3;

//helpers & redefines
function g(id) { return document.getElementById(id); }

//marking elements
function markSteps() {
  let elements = document.getElementsByClassName("step");
  let toc = [];
  let tocl = [];
  let toct = '';
  let msi = 0;
  //section counter
  let x = 0;

  //content counter
  let y = 0;

  //childs of content
  let z = 0;

  for (; msi < elements.length; msi++) {
    //set unique ID for later pagination
    if (elements[msi].classList.contains("section")) {
      //intentional! We want to start with 1
      x++;
      elements[msi].id = 'step' + x + 'Section';

      //add event for collapse
      elements[msi].addEventListener("click", function (e) { collapse('step' + x, x); });

      //set title
      elements[msi].innerHTML = 'Paso ' + x;
    }

    if (elements[msi].classList.contains("masterContent")) {
      //intentional! We want to start with 1
      y++;

      elements[msi].id = 'step' + y + 'Content';

      let childs = elements[msi].children;

      for (z = 0; z < childs.length; z++) {
        //Title! move it to Table Of Contents for further analysis
        if (childs[z].classList.contains("whatIsTitle")) {
          toc.push(childs[z]);
          tocl.push(x);
        }
      }
    }
  }

  //now, run on each section to print & hide
  for (msi = 1; msi < x + 1; msi++) {
    collapse('step' + msi, msi);
    collapse('step' + msi, msi);
    g('step' + msi + 'Content').classList.add("invisible");
    g('step' + msi + 'Section').classList.add("invisible");
  }

  //finally, set ToC
  toct = '<ul class="whatIsList">';

  for (msi = 0; msi < toc.length; msi++) {
    toct += '<li class="noSel" onclick="setStep(' + tocl[msi] + ')">' + toc[msi].innerHTML + '</li>'
  }

  toct += '</ul>';

  //attach it
  g('toc').innerHTML = toct;

  //set max items
  maxStep = x;

  //now create the Table Of Content
}

//visuals
function collapse(id, offset) {
  //Assuming "else" values (less code!)
  let visibility = "hidden";
  let height = "0";
  let borderBottom = "3px solid #A7A392";
  let borderRadius = "25px 25px 25px 25px";

  if (collapsed[offset]) {
    //it's collapsed, it will expand
    visibility = "initial";
    height = "initial";
    borderBottom = "none";
    borderRadius = "25px 25px 0px 0px";
    collapsed[offset] = false;
  } else {
    //it's expanded, let's collapse it
    collapsed[offset] = true;
  }

  g(id + "Content").style.visibility = visibility;
  g(id + "Content").style.height = height;
  g(id + "Section").style.borderBottom = borderBottom;
  g(id + "Section").style.borderRadius = borderRadius;
}

function moveLeft() {
  if(currStep > 1)
    setStep(currStep - 1);
}

function moveRight() {
  if(currStep < maxStep)
    setStep(currStep + 1);
}

function setStep(stepNumber) {
  if (currStep > 0) {
    //hide current step
    g('step' + currStep + 'Content').classList.add("invisible");
    g('step' + currStep + 'Section').classList.add("invisible");
  }

  //show desired step
  g('step' + stepNumber + 'Content').classList.remove("invisible");
  g('step' + stepNumber + 'Section').classList.remove("invisible");

  //fix value;
  currStep = stepNumber;

  //numberOf
  g('numberOf').innerHTML = currStep;

  //numberTot
  g('numberTot').innerHTML = maxStep;
}
