$(function () {

    var vehicleArray = [];
    const el_welcome = $('#welcome');
    const el_vehicle = $('#filtered');
    const el_confirm = $('#confirm');
    const el_banner = $('#banner');
    var fuelPrice = 2;
    var event = new Object();

    var image = document.getElementsByClassName('hero-banner__image');
    new simpleParallax(image);

    function init() {
        $.getJSON('json/vehicles.json', function (data) {
            vehicleArray = data.vehicles;
            displayVehicles(vehicleArray);
        });

        addSubmitListener();
        el_vehicle.hide();
        el_confirm.hide();
        el_banner.hide();

    };

    //---EVENT LISTENERS----------------------------------------------------------

    //---COLLECT INPUT DATA-------------------------------------------------------

    function addSubmitListener() {
        $('#submit_button').click(function () {
            event.name = $('#name').val();
            event.email = $('#email').val();
            event.people = $('#people').val();
            event.days = $('#days').val();
            event.estimatedDistance = $('#estimated-distance').val();

            getVehicleByNumberOfPeople(vehicleArray)

            $(document).scrollTop(0)

            el_banner.empty();
            el_banner.append("<h1 class = title > Tourism New Zealand </h1>");
            el_banner.append("<h3 class = welcome > Hello " + event.name + "</h3>");

            el_welcome.hide();
            el_vehicle.show();
            el_banner.show();

        });
    };

    function addAcceptListener() {
        $('.vehicle__submit').click(function () {
            event.title = $(this).data('title');
            event.cost = $(this).data('daily-cost');
            event.fuel = $(this).data('fuel');
            event.totalFuel = event.fuel * event.estimatedDistance;
            event.totalCost = event.cost * event.days;
            
            
            console.log(event);

            let html = '';
            html += makeConfirmationHTML()
            el_confirm.html(html);
            addCompleteListener();

            $('body,html').css('overflow','hidden');
            $(document).scrollTop(0)
            el_confirm.show();
            
        });
    };

    function addCompleteListener(){
        $('#complete-button').click(function() {
            el_confirm.hide();
            el_vehicle.hide();
            el_banner.hide();
            el_welcome.show();



            $('body,html').css('overflow','scroll');
            $(document).scrollTop(0)
        });
    };

    //---FILTER OUTPUT RESULTS----------------------------------------------------

    function getVehicleByNumberOfPeople(vehicleArray){
        let matches = [];

        for (var i = 0; i < vehicleArray.length; i++){
            if (vehicleArray[i].minParty <= event.people && vehicleArray[i].maxParty >= event.people){
                if (vehicleArray[i].minDays <= event.days && vehicleArray[i].maxDays >= event.days){
                matches.push(vehicleArray[i]);
                }
            }
        }
        console.log(matches);
        displayVehicles(matches);
    }

    //---DISPLAY OUTPUT DATA------------------------------------------------------

    function displayVehicles(vehicle) {
        let html = '';

        for (var i = 0; i < vehicle.length; i++) {
            html += makeVehicleHTML(vehicle[i]);
        }
        el_vehicle.html(html);
        addAcceptListener();
    };

    function makeVehicleHTML(vehicle) {
        return `
        <div class="vehicle">
            <div class="vehicle__thumbnail">
                <img src="images/${vehicle.id}_LARGE.jpg" alt="${vehicle.title}">

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
                        <p id="cost">$${vehicle.dailyCost}</p>
                        <p id="total-cost">$${vehicle.dailyCost * event.days}</p>
                        <p id="fuel">${vehicle.fuelConsumption}L</p>
                        <p id="total-fuel">$${(((event.estimatedDistance / 100) * vehicle.fuelConsumption) * fuelPrice).toFixed(2)}</p>
                    </div>
                </div>
                
                <div class="submit-div">
                    <input class="vehicle__submit" id="accept_button" type="button" value="Accept" data-daily-cost="${vehicle.dailyCost}" data-fuel="${vehicle.fuelConsumption}" data-title="${vehicle.title}">
                </div>
                
            </div>
        </div>
        
    `
    };

    function makeConfirmationHTML() {

        return `
        <div class="confirm__box">
            <h3 class="confirm__head" >Booking Confirmed</h3>
            <p class="confirm__para" >Thank you ${event.name} for booking a ${event.title}</p>
            <p class="confirm__para" >More information has been sent to your email</p>
            <p class="confirm__para" >Enjoy New Zealand!</p>

            <div class="submit-div">
                <input class="vehicle__submit" id="complete-button" type="button" value="Accept">
            </div>
        </div>
        `
    };


    init();

});