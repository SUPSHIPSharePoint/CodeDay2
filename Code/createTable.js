var dom =  (function() {
    function createTableFromJSON(json, propsToDisplay) {
        // creates a <table> element and a <tbody> element
        var table = document.createElement("table");
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        // Create Column Headers
        var tr = document.createElement("tr");
        propsToDisplay.forEach(
            function(prop) { 
                var th = document.createElement("th");
                var textNode = document.createTextNode(prop);
                th.appendChild(textNode);
                tr.appendChild(th);    
            }
        );
        thead.appendChild(tr);

        // creating all cells
        json.forEach(function(quote) {

            // creates a table row
            var tr = document.createElement("tr");

            propsToDisplay.forEach(
                function(prop) { 
                    var td = document.createElement("td");
                    var textNode = document.createTextNode(quote[prop]);
                    td.appendChild(textNode);
                    tr.appendChild(td);    
                }
            );

            // add the row to the end of the table body
            tbody.appendChild(tr);
        });

        // put the <thead> and <tbody> in the <table>
        table.appendChild(thead);
        table.appendChild(tbody);

        // sets the border attribute of table
        table.setAttribute("class", "display");
        table.setAttribute("id", "table_id");   

        return table;
    } 

    return { createTableFromJSON: createTableFromJSON }
}());