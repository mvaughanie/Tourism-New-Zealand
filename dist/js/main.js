$(function () {

var vehicleArray = [];
const el_welcome = $('#welcome');
const el_vehicle = $('#filtered');
var event = new Object();

function init() {
    $.getJSON('json/vehicles.json', function (data) {
        vehicleArray = data.vehicles;
        displayVehicles(vehicleArray);
    });

    addSubmitListener();
    el_vehicle.hide();
}

//---EVENT LISTENERS----------------------------------------------------------

//---COLLECT INPUT DATA-------------------------------------------------------

function addSubmitListener() {
    $('#submit_button').click(function () {
        event.name = $('#name').val();
        event.email = $('#email').val();
        event.people = $('#people').val();
        event.days = $('#days').val();
        event.estimatedDistance = $('#estimated-distance').val();

        displayVehicles(vehicleArray);
        addAcceptListener();
        el_welcome.hide();
        el_vehicle.show();
        
    });
};

function addAcceptListener() {
    $('#accept_button').click(function () {
        let totalFuel = this.estimatedDistance * this.fuelConsumption;
        event.totalFuel = totalFuel;
        console.log(this.estimatedDistance);
        el_vehicle.hide();
    })
}


//---DISPLAY OUTPUT DATA------------------------------------------------------

function displayVehicles(vehicle) {
    let html = '';

    for (var i =0; i < vehicle.length; i++){
        html += makeVehicleHTML(vehicle[i]);
    }
    el_vehicle.html(html);
    // addAcceptListener();
}

function makeVehicleHTML(vehicle){
    return `
    <div class="vehicle">
            <div class="vehicle__thumbnail">
                <!-- <img src="images/small.jpg" alt=""> -->

            </div>
            <div class="vehicle__information">
                <h3 id="make">${vehicle.title}</h3>

                <div class="vehicle__grid">
                    <div class="vehicle__details">
                        <p id="cost">Cost per Day:</p>
                        <p id="total-cost">Total Cost for Trip:</p>
                        <p id="fuel">Fuel per 100km:</p>
                        <p id="total-fuel">Total Estimated Fuel Cost:</p>
                    </div>
                    
                    <div class="vehicle__figures">
                        <p id="cost">${vehicle.dailyCost}</p>
                        <p id="total-cost">$${vehicle.dailyCost * event.days}</p>
                        <p id="fuel">${vehicle.fuelConsumption}</p>
                        <p id="total-fuel">$${event.estimatedDistance}</p>
                    </div>
                </div>
                
                <div class="submit-div">
                    <input class="vehicle__submit" id="accept_button" type="button" value="Accept">
                </div>
                
            </div>
        </div>
        
    `
}






init();

});