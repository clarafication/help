

var req = new XMLHttpRequest();
req.open("GET", "/get-data", true);
req.setRequestHeader('Content-Type', 'application/json');
req.addEventListener('load',function(){
  if(req.status >= 200 && req.status < 400){
    createTable(JSON.parse(req.responseText));
  }
 });


 
function createTable(insert){
    var body1 = true;
    var count = 0;
    var num = 0;
    var array = ['Name', 'Date', 'Reps', 'Weight', 'Unit'];
    var main = document.getElementById("main");
    var tbl = document.createElement("table");
    tbl.setAttribute("border", "1");
    var tb = document.createElement("tb");
    var head = document.createElement("tr");
    var cell1 = document.createElement("th");
    cell1.innerText = array[0];
    head.appendChild(cell1);
    var cell2 = document.createElement("th");
    cell2.innerText = array[1];
    head.appendChild(cell2);
    var cell3 = document.createElement("th");
    cell3.innerText = array[2];
    head.appendChild(cell3);
    var cell4 = document.createElement("th");
    cell4.innerText = array[3];
    head.appendChild(cell4);
    var cell5 = document.createElement("th");
    cell5.innerText = array[4];
    head.appendChild(cell5);
    insert.forEach(function(row){ 
        var row = document.createElement("tr");
        var name = document.createElement("td");
        name.innerText = row["name"];
        row.appendChild(name);
        row.setAttribute("border", "1");
        var date = document.createElement("td");
        row.appendChild(date);
        row.setAttribute("border", "1");
        var rep= document.createElement("td");
        rep.innerText = row["reps"];
        row.appendChild(rep);
        row.setAttribute("border", "1");
        var weight = document.createElement("td");
        weight.innerText = row["weight"];
        row.appendChild(weight);
        row.setAttribute("border", "1");
        var units = document.createElement("td");
        row.appendChild(units);
        row.setAttribute("border", "1");
    });
}
    

function deleteRow(){
    var id = this.parentElement.lastElementChild.id;
    var req = new XMLHttpRequest();
    var update = empty;
    url = "/removeID?id=" + id;
    req.open("GET", url, true);
    var item = this.parentElement.parentElement.parentElement;
    if (url == true){
        update = true;
    }
    req.addEventListener("load", function(){
        item.parentElement.removeChild(item);
        req.addEventListener("load", function(){
            var response = JSON.parse(req.responseText);
            var response = JSON.parse(response.results);
            var updatedTable = buildTable(response);
            body.removeChild(document.getElementById("tbl"));
            updatedTable.id = "tbl";
            body.appendChild(updatedTable);
        }); 
    });
    req.send(null);
}
 
function updateRow() {
    var id = this.parentElement.lastElementChild.id;
    var req = new XMLHttpRequest();
    var update = empty;
    var updateURL = createQueryURL("/update");
    updateURL += "id=" + id;
    req.open("GET", updateURL, true);
    var item = this.parentElement.parentElement.parentElement;
    if (updateURL == true){
        update = true;
    }
    req.addEventListener("load", function(){
        req.addEventListener("load", function(){
            var response = JSON.parse(req.responseText);
            var response = JSON.parse(response.results);
            var updatedTable = buildTable(response);
            body.removeChild(document.getElementById("tbl"));
            updatedTable.id = "tbl";
            body.appendChild(updatedTable);
        });
    });
    req.send(null);
}
