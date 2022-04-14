function onClick() {
    let clStyles = document.querySelector("#checklist");
    let galleryStyles = document.querySelector(".gallery");
    let submitStyles = document.querySelector("#submitHeader");
    let emailBoxStyles = document.querySelector("#emailBox");
    let tabLabel = document.querySelector(".tab");

    if (clStyles.style.display == "block") {
        clStyles.style.display = "none";
        galleryStyles.classList.remove("hiddenGallery");
        submitStyles.style.display = "block";
        emailBoxStyles.style.display = "block";
        tabLabel.textContent = "Manager Site";
        console.log("Style is now none");
    } else {
        clStyles.style.display = "block";
        galleryStyles.classList.add("hiddenGallery");
        submitStyles.style.display = "none";
        emailBoxStyles.style.display = "none";
        tabLabel.textContent = "Return to Gallery";
        console.log("Style is now block");
    }

}

(function (window) {
    'use strict';

    const FORM_SELECTOR = '[data-store-order="form"]';
    const CHECKLIST_SELECTOR = '[data-store-order="checklist"]';
    const SERVER_URL = 'http://saturn.rochesterschools.org:8080/json';
    // to view server contents go here --> https://saturn.rochesterschools.org/python/JS-remote-datastore/data.json

    let App = window.App;
    let Truck = App.Truck;
    let RemoteDataStore = App.RemoteDataStore;
    let FormHandler = App.FormHandler;
    let CheckList = App.CheckList;
    let Validation = App.Validation;

    let remoteDS = new RemoteDataStore(SERVER_URL);

    let myTruck = new Truck('The Roadrunner', remoteDS);
    window.myTruck = myTruck;

    remoteDS.getAll(function (orders) {

        // go thru the orders with a loop
        // figure out if this order belongs to you
        // if it does, create a new order then call

        Object.entries(orders).forEach((entry) => {
            const [key, value] = entry;
            console.log('** ${key}: ${value} **');
            Object.entries(value).forEach((field) => {
                const [k, v] = field;
                console.log('----- ${k}: ${v}');
            });
        });
    });
    
    let formHandler = new FormHandler(FORM_SELECTOR);

    let checkList = new CheckList(CHECKLIST_SELECTOR);

    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

    formHandler.addSubmitHandler(function (data) {
        myTruck.createOrder.call(myTruck, data);
        checkList.addRow.call(checkList, data);
    });

    formHandler.addInputHandler(Validation.isCompanyEmail)
    
    console.log(formHandler);

    window.myTruck = myTruck;
    
})(window);
