// button Eventlistener to listen to save button
var btn = document.getElementById("save");
btn.onclick = function save() {
    event.preventDefault();

    //getting the value/content of text area
    var content = document.querySelector("#text").value;
    //take the options from user
    var card = document.getElementById("format");
    if (card.selectedIndex == 0) {
        alert('select one answer');
        cleanFields();
        return;
    } else {
        var selectedText = card.options[card.selectedIndex].text;
        // alert(selectedText);
        var formatType;
        if (selectedText === "PDF") {
            formatType = 'application/pdf';
        } else if (selectedText === "DOCX") {
            formatType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        } else if (selectedText === "JSON") {
            formatType = 'application/json';
        } else {
            formatType = "text/plain";
        }
    }

    //Blob object which is a kind of data type holding the data to store in a file
    //it is responsible for holding data
    var blob = new Blob([content], { type: `${formatType}` });

    //I guess its the url of the page i.e the text file of the content :)
    var saveUrl = window.URL.createObjectURL(blob);

    //getting the file name fro the text field
    var fileName = document.getElementById("flname").value;


    //Check that the file name field is not empty
    if (fileName === '') {
        alert('You must upload a name for the file');
        return;
    }

    //Link Creation for the download opeartion (Not Sure)
    var downloadEle = document.createElement('a');
    downloadEle.download = fileName;
    downloadEle.innerHTML = "Download FIle";
    downloadEle.href = saveUrl;
    downloadEle.onclick = destroyClickedElement;
    downloadEle.style.display = "none";
    document.body.appendChild(downloadEle);
    downloadEle.click();
    cleanFields();
}



function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

//Clean fields
var btn3 = document.getElementById('clean');
btn3.addEventListener('click', () => {
    cleanFields();
});

//Function Clean fields
function cleanFields() {
    document.querySelector("#format").value = document.querySelector("#format")[0].value;
    document.querySelector("#text").value = "";
    document.getElementById('fileLoad').value = [];
    document.getElementById('flname').value = "";
}

//button for selecting the file to open from local device/machine

var btn2 = document.querySelector('#open');
btn2.onclick = function fileOpen() {

    //getting the file to read
    var fileToRead = document.getElementById('fileLoad').files[0];
    var fileReader = new FileReader();

    //valid if I select the file
    if (!fileToRead) {
        alert('You must select a file to open it');
        return;
    }

    //the file reader
    fileReader.onload = function(event) {

        //geting the text content 
        var filetext = event.target.result;

        //storing/displaying the textarea 
        document.getElementById("text").value = filetext;


    };

    fileReader.readAsText(fileToRead, "UTF-8");
}