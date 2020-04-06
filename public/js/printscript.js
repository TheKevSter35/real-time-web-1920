let printsheet = document.getElementById("printsheet")
    printsheet.addEventListener("click", printSheet);

    function printSheet(){
        window.print();
    }