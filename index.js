console.log("Post hero");
//utility functions
function getElmentFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;

  return div.firstElementChild;
}
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

let jsonRadio = document.getElementById("jsonRadio");
let paramsRadio = document.getElementById("paramsRadio");
//to hide request json box
paramsRadio.addEventListener("click", () => {
  let requestJsonBox = document.getElementById("requestJsonBox");
  requestJsonBox.style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});
//to hide parameters box
jsonRadio.addEventListener("click", () => {
  let requestJsonBox = document.getElementById("requestJsonBox");
  requestJsonBox.style.display = "block";
  document.getElementById("parametersBox").style.display = "none";
});
//Initialize number of parameters
let paramscount = 0;
let addparams = document.getElementById("addparams");
addparams.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = ` <div class="form-row my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${
                  paramscount + 2
                }</label>
               <div class=" col-md-4">
                <input type="email" class="form-control" id="parameterkey ${
                  paramscount + 2
                }" placeholder="Enter parameter ${paramscount + 2} key">
                </div>
               <div class=" col-md-4">
               <input type="text" class="form-control" id="parametervalue ${
                 paramscount + 2
               }" placeholder="Enter parameter ${paramscount + 2} value">
               </div>
               <button class="btn btn-primary deleteParam">-</button>
               </div>`;
  //convert string element to Dom node
  let paramElement = getElmentFromString(string);
  console.log(paramElement);
  params.appendChild(paramElement);
  //add an event listner to remove a parameter on clicking - button
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      //add a confirmation box to ask for permission to delete
       result = confirm("Are you sure?");
      if(result == true)
      {
      e.target.parentElement.remove();
      }
    });
  }
  paramscount++;
});
//if the user clicks on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  //show please wait in reposnse box to request patience from user
  document.getElementById("responsePrism").value =
    "Please wait. . . . Fetching response";
  //fetch all the values user has entered
  let url = document.getElementById("urlBox").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector("input[name='ctype']:checked").value;

  //if a user select params instead of json then,collect all the parameters in a object
  if (contentType == "params") {
    data = {};
    for (let i = 0; i < paramscount + 1; i++) {
      if (document.getElementById("parameterkey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterkey" + (i + 1)).value;
        let value = document.getElementById("parametervalue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("RequestJsonText").value;
  }
  //log all the values in console for debugging
  console.log("Url is", url);
  console.log("Request Type is", requestType);
  console.log("Content Type is", contentType);
  console.log("Data is", data);
  //if the request type is get ,invoke fetch api to create post request
  if (requestType == 'GET') {
    fetch(url, {
        method: "GET",
      })
        .then(response=> response.text())
        .then((text) => {
          //document.getElementById("ResponseJsonText").value = text;
          document.getElementById("responsePrism").innerHTML = text;
          Prism.highlightAll();

        });
  }
  else{
    fetch(url, {
        method: "POST",
        body:data,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
      })
        .then(response=> response.text())
        .then((text) => {
          document.getElementById("responsePrism").innerHTML = text;
          Prism.highlightAll();
        });
  }
});
