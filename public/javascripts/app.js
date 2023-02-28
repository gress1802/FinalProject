const { json } = require("express");

authenticatedUser = null;

/*
 * This is a function that is envoked when the user click the login button
 * It will get the username and password from the form and send it to the server to authenticate the user
 * The server will either respond with a 401 error or a 200 ok with the user object
*/
function login() {
    let emailInput = $('#defaultForm-email').val();
    let passwordInput = $('#defaultForm-pass').val();
    let bodyData = JSON.stringify({ email: emailInput, password: passwordInput });
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyData
    }).then(res => {
        if(res.ok) {
            return res.json();
        }else if (res.status == 401){
            throw new Error('Invalid credentials');
        }else{
            throw new Error('Server error ' + res.status);
        }
    }).then(user => {
        authenticatedUser = user;
        $('#loginError').text('Valid Credentials');
        $('#modalLoginForm').modal('hide');
        console.log(user);
        $('#userDisplay').text(user.first);
        $('#userDisplay').css('color', 'white');
        $('#userDisplay').css('font-weight', 'bold');
        addProgramOption();
        //do more in here with javascript
    }).catch(err => {
        console.log('error');
        $('#loginError').text('Invalid credentials');
        $('loginError').css('color', 'red');
    })
}
/*
 * This is a function that is envoked when the program constainer is loaded on the main page
 * It will send a request to the server to get a list of programs (/api/v1/programs)
 * Additionally, this function will build the program cards and add them to the program container
 * There will be a max of 9 programs
*/
function loadPrograms(){
    fetch('/api/v1/programs')
        .then(res => res.json())
        .then(array => {
            populatePrograms(array);
        });//body is just a place holder for the return object from '/programs'
}

/*
 * This is a function that adds another option under programs if the user is an admin
 * This option is a modal popup that allows the user to add a new program
*/
function addProgramOption(){
    programDropdown = $('#programDropdown');
    if(authenticatedUser && authenticatedUser.admin){
        programDropdown.append('<a class="dropdown-item" href="#" data-toggle="modal" data-target="#addProgramModal">Add Program</a>');
        //build the modal
        let modal = $('<div>', {class: 'modal fade', id: 'addProgramModal', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true'});
        let modalDialog = $('<div>', {class: 'modal-dialog', role: 'document'});
        let modalContent = $('<div>', {class: 'modal-content'});
        let modalHeader = $('<div>', {class: 'modal-header'});
        let modalTitle = $('<h5>', {class: 'modal-title', id: 'exampleModalLabel', text: 'Add Program'});
        let modalClose = $('<button>', {type: 'button', class: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close'});
        let modalCloseSpan = $('<span>', {'aria-hidden': 'true', text: 'x'});
        let modalBody = $('<div>', {class: 'modal-body'});
        let modalFooter = $('<div>', {class: 'modal-footer'});
        let modalFooterButton = $('<button>', {type: 'button', class: 'btn btn-secondary', 'data-dismiss': 'modal', text: 'Close'});

        //program form fields
        let firstForm = $('<div>', {class: 'md-form mb-5'});
        let firstFormInput = $('<input>', {type: 'text', id: 'programName', class: 'form-control validate'});
        let firstFormLabel = $('<label>', {for: 'programName', text: 'Program Name'});
        let secondForm = $('<div>', {class: 'md-form mb-5'});
        let secondFormInput = $('<input>', {type: 'text', id: 'programDescription', class: 'form-control validate'});
        let secondFormLabel = $('<label>', {for: 'programDescription', text: 'Program Description'});
        let thirdForm = $('<div>', {class: 'md-form mb-5'});
        let thirdFormInput = $('<input>', {type: 'text', id: 'programLocation', class: 'form-control validate'});
        let thirdFormLabel = $('<label>', {for: 'programLocation', text: 'Program Location'});
        let fourthForm = $('<div>', {class: 'md-form mb-5'});
        let fourthFormInput = $('<input>', {type: 'text', id: 'programPrice', class: 'form-control validate'});
        let fourthFormLabel = $('<label>', {for: 'programPrice', text: 'Program Price'});
        let fifthForm = $('<div>', {class: 'md-form mb-5'});
        let fifthFormInput = $('<input>', {type: 'text', id: 'programTime', class: 'form-control validate'});
        let fifthFormLabel = $('<label>', {for: 'programTime', text: 'Program Time'});
        let sixthForm = $('<div>', {class: 'md-form mb-5'});
        let sixthFormInput = $('<input>', {type: 'text', id: 'programParticipants', class: 'form-control validate'});
        let sixthFormLabel = $('<label>', {for: 'programParticipants', text: 'Number of Participants'});
        let seventhForm = $('<div>', {class: 'md-form mb-5'});
        let seventhFormInput = $('<input>', {type: 'text', id: 'programDuration', class: 'form-control validate'});
        let seventhFormLabel = $('<label>', {for: 'programDuration', text: 'Program Duration'});
        let submitButton = $('<button>', {type: 'button', class: 'btn btn-primary', text: 'Submit', onclick:'addProgram()'});
        
        modalClose.append(modalCloseSpan);
        modalHeader.append(modalTitle);
        modalHeader.append(modalClose);
        modalFooter.append(modalFooterButton);
        modalContent.append(modalHeader);

        //start of forms
        //First form (program name)
        firstForm.append(firstFormInput);
        firstForm.append(firstFormLabel);
        modalBody.append(firstForm);
        //Second form (program description)
        secondForm.append(secondFormInput);
        secondForm.append(secondFormLabel);
        modalBody.append(secondForm);
        //Third form (location)
        thirdForm.append(thirdFormInput);
        thirdForm.append(thirdFormLabel);
        modalBody.append(thirdForm);
        //Fourth form (price)
        fourthForm.append(fourthFormInput);
        fourthForm.append(fourthFormLabel);
        modalBody.append(fourthForm);
        //Fifth form (time)
        fifthForm.append(fifthFormInput);
        fifthForm.append(fifthFormLabel);
        modalBody.append(fifthForm);
        //Sixth form (Number of Participants)
        sixthForm.append(sixthFormInput);
        sixthForm.append(sixthFormLabel);
        modalBody.append(sixthForm);
        //Seventh form (Duration)
        seventhForm.append(seventhFormInput);
        seventhForm.append(seventhFormLabel);
        modalBody.append(seventhForm);
        modalFooter.append(submitButton);
        //end of forms

        modalContent.append(modalBody);
        modalContent.append(modalFooter);
        modalDialog.append(modalContent);
        modal.append(modalDialog);
        $('body').append(modal);
    }
}

//Throwing an error
/*
 * This function adds all programs to the table.
 */
function populatePrograms(programList){
    let programContainer = $('#programContainer');
    programContainer.empty();
    console.log(programList);
    let i=0;
    while(i<9 && i<programList.length){
        let row = document.createElement('div');
        row.className = "row";
        for(let j=0;j<programList.length;j++){
            console.log(programList[i]);
            let program = createProgram(programList[i],i+1);
            row.appendChild(program);
            i++;
        }
        console.log(programContainer);
        console.log(row);
        programContainer.append(row);
        console.log(programContainer);
    }
}

//CHANGE (simplified with jQuery)
//This function creates a program card
//It takes in a program object and a number
function createProgram(program, num) {
    //populate the card
    let thisProgram = $("<div>", { class: "col programCard", id: "p" + num });
    let card = $("<div>", { class: "card", style: "width: 18rem;" });
    let cardBody = $("<div>", { class: "card-body" });
    let cardTitle = $("<h5>", { class: "card-title", text: program.name });
    let cardText = $("<p>", { class: "card-text", text: program.description });
    let button = $("<button>", { type: "button", class: "btn btn-primary", text: "Visit Program", "data-toggle": "modal", "data-target": "#exampleModal" + num });

    cardBody.append(cardTitle, cardText, button);
    card.append(cardBody);
    thisProgram.append(card);

    //populate the modal
    let modal = $("<div>", { class: "modal fade", id: "exampleModal" + num });
    let modalDialog = $("<div>", { class: "modal-dialog", });
    let modalContent = $("<div>", { class: "modal-content" });
    let modalHeader = $("<div>", { class: "modal-header" });
    let modalTitle = $("<h5>", { class: "modal-title", id: "exampleModalLabel", text: program.name });
    let modalClose = $("<button>", { type: "button", class: "close", "data-dismiss": "modal" });
    let modalCloseSpan = $("<span>", { text: "x" });
    modalClose.append(modalCloseSpan);
    modalHeader.append(modalTitle, modalClose);
    let modalBody = $("<div>", { class: "modal-body" });
    let modalBodyText = $("<p>", { text: "Description: "+program.description });
    modalBody.append(modalBodyText);

    //create a sign up button at the bottom of the modal
    let modalFooter = $("<div>", { class: "modal-footer" });
    let modalFooterButton = $("<button>", { type: "button", class: "btn btn-primary", text: "Sign Up", "data-toggle": "modal", "data-target": "#signUpModal" + num, "data-dismiss": "modal" });
    modalFooter.append(modalFooterButton);
    //add another modal to the page that is activated when the sign up button is clicked
    let signUpModal = $("<div>", { class: "modal fade", id: "signUpModal" + num });
    let signUpModalDialog = $("<div>", { class: "modal-dialog" });
    let signUpModalContent = $("<div>", { class: "modal-content" });
    let signUpModalHeader = $("<div>", { class: "modal-header" });
    let signUpModalTitle = $("<h5>", { class: "modal-title", id: "signUpModalLabel", text: "Sign Up" });
    let signUpModalClose = $("<button>", { type: "button", class: "close", "data-dismiss": "modal" });
    let signUpModalCloseSpan = $("<span>", { text: "x" });
    signUpModalClose.append(signUpModalCloseSpan);
    signUpModalHeader.append(signUpModalTitle, signUpModalClose);
    let signUpModalBody = $("<div>", { class: "modal-body" });
    //labels and inputs
    let signUpModalBodyNameInput = $('<input>', {type: 'text', id: 'signUpName'+num, class: 'form-control validate'});
    let signUpModalBodyNameLabel = $('<label>', {for: 'signUpName'+num, text: 'Program Name'});
    let signUpModalBodyAnswerLabel = $("<label>", { for: "answer"+num, text: "Answer to the question:" });
    let signUpModalBodyAnswerInput = $("<input>", { type: "text", id: "answer"+num, class: 'form-control validate' });
    //end
    let signUpModalBodyText = $("<p>", { text: "Sign up for: " + program.name + " | " + "if you are logged in hit 'Sign up" });
    signUpModalBody.append(signUpModalBodyNameLabel, signUpModalBodyNameInput, signUpModalBodyAnswerLabel, signUpModalBodyAnswerInput, signUpModalBodyText);
    let signUpModalFooter = $("<div>", { class: "modal-footer" });
    let signUpModalFooterButton = $("<button>", { type: "button", class: "btn btn-primary", "data-dismiss": "modal", text: "Close" });
    signUpModalFooter.append(signUpModalFooterButton);
    signUpModalContent.append(signUpModalHeader, signUpModalBody, signUpModalFooter);
    signUpModalDialog.append(signUpModalContent);
    signUpModal.append(signUpModalDialog);
    $('body').append(signUpModal);

    //add a final sign up button to the sign up modal
    let signUpModalBodyButton = $("<button>", { type: "button", class: "btn btn-primary", text: "Sign Up", "data-dismiss": "modal", onclick: "signUp("+program.name+")" });
    signUpModalFooter.append(signUpModalBodyButton);

    //add the author duration location name num participants price and time to the modal
    let author = program.author;
    let duration = program.duration;
    let location = program.location;
    let name = program.name;
    let numParticipants = program.maxParticipants;
    let price = program.price;
    let time = program.time;
    let authorText = $("<p>", { text: "Author: " + author });
    let durationText = $("<p>", { text: "Duration: " + duration });
    let locationText = $("<p>", { text: "Location: " + location });
    let nameText = $("<p>", { text: "Name: " + name });
    let numParticipantsText = $("<p>", { text: "Number of Participants: " + numParticipants });
    let priceText = $("<p>", { text: "Price: " + price });
    let timeText = $("<p>", { text: "Time: " + time });
    modalBody.append(authorText, durationText, locationText, nameText, numParticipantsText, priceText, timeText);

    modalFooter.append(modalFooterButton);
    modalContent.append(modalHeader, modalBody, modalFooter);
    modalDialog.append(modalContent);
    modal.append(modalDialog);
    $('body').append(modal);

    //return DOM element in the jQuery object
    return thisProgram[0];
}

/*
 * This is a function that is envoked when the user signs up for a program
 * It will send a POST request to /api/v1/programs/:programName
*/
function signUp(programName){
    console.log("asdasdasd");
    let answer = $('#answer').val();
    let name = $('#signUpName').val();
    let signUpData = { answer: answer, name: name };
    fetch('/api/v1/programs/'+programName, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(signUpData),
        credentials: 'include'
    }).then(res => res.json())
    .then(data => { console.log(data); });
}

/*
 * This function adds a program to the table.
 * It will extract the data from the program modal and send it in the body of a POST request to /api/v1/admin/programs
*/
function addProgram(){
    let programName = $('#programName').val();
    let programDescription = $('#programDescription').val();
    let programLocation = $('#programLocation').val();
    let programPrice = $('#programPrice').val();
    let programTime = $('#programTime').val();
    let programParticipants = $('#programParticipants').val();
    let programDuration = $('#programDuration').val();
    let programData = { name: programName, description: programDescription, location: programLocation, price: programPrice, time: programTime, maxParticipants: programParticipants, duration: programDuration };
    fetch('/api/v1/admin/programs', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(programData),
        credentials: 'include'
    }).then(() => {
        //refresh the page
        loadPrograms();
    })
    .finally(() => {
        //reset all the fields
        $('#programName').val('');
        $('#programDescription').val('');
        $('#programLocation').val('');
        $('#programPrice').val('');
        $('#programTime').val('');
        $('#programParticipants').val('');
        $('#programDuration').val('');
    });
}


