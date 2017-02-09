import $ from 'jquery';

var forEach = function(arr, func){
    for(var i = 0 ; i < arr.length; i++){
        func(arr[i], i, arr)
    }
}

    function makeActive(currentRoute){
    	var before = document.querySelector('[class="click active"]');
    	before.classList.remove('active');

    	var after = document.querySelector(`[data-route="${currentRoute}"]`);
    	after.classList.add('active');
    }

function current(){
  var request = document.querySelector('.pulled-content');
  var currentHash = window.location.hash.slice(1);
    if(currentHash.length === 0){
    currentHash = 'home';
    }
  makeActive(currentHash)

      if(currentHash === 'concerts'){
        $.getJSON('http://apis.is/concerts').then(function(serverRes){
        var results = serverRes.results;
        request.innerHTML = concertsConstructor(results);
        })
        return;
        }

      if(currentHash === 'flights'){
        var finalStr = `<div class="pink"><h3>Flights</h3></div>`;
        request.innerHTML = finalStr;

        $.getJSON('http://apis.is/flight?language=en&type=arrivals').then(function(serverRes){
          var results = serverRes.results;
          request.innerHTML += arrivalConstructor(results);
        })
        $.getJSON('http://apis.is/flight?language=en&type=departures').then(function(serverRes){
          var results = serverRes.results;
          request.innerHTML += departureContstructor(results);
        })
        return;
        }

      if(currentHash === 'carpool'){
        $.getJSON('http://apis.is/rides/samferda-drivers/').then(function(serverRes){
          var results = serverRes.results;
          request.innerHTML = carpoolConstructor(results);
          })
        return;
        }

      if(currentHash === 'home' || currentHash === ''){
          request.innerHTML = `<div class="pink"><h3>The Basic Facts</h3></div>` + homeStr;
          return;
        }

}

var homeStr = `<div class="panel panel-default">
                <table class="table">
                 <tr><td>Native Name</td><td>Island</td></tr>
                 <tr><td>Demonym</td><td>Icelander</td></tr>
                 <tr><td>Area(m2)</td><td>103000</td></tr>
                 <tr><td>Calling Code</td><td>352</td></tr>
                </table>
              </div>`;

function concertsConstructor(dataArray){
  var finalStr = '';
  forEach(dataArray, function(listEl){
    finalStr += `
          <div class="col-md-4">
            <div class="thumbnail">
                <img src="${listEl.imageSource}"/>
              <div class="caption">
                <h4>${listEl.eventDateName}</h4>
                <p>Venue: ${listEl.eventHallName}</p>
                <p>${listEl.dateOfShow}</p>
              </div>
           </div>
         </div>`
  })
  return `<div class="pink"><h3>Concerts</h3></div>` + `<div class="row">` + finalStr;
};

function arrivalConstructor(dataArray){
  var arrivalStr = `<div class="twoTables">
                    <h3 class="blue">Arrivals</h3>
                    <table class="table">
                    <tr><th>Date</th><th>Arrival Time</th><th>Origin</th><th>Airline</th></tr>`;
  forEach(dataArray, function(listEl){
    arrivalStr += `<tr><td>${listEl.date}</td><td>${listEl.plannedArrival}</td>
                   <td>${listEl.from}</td><td>${listEl.airline}</td></tr>`;
                    })
  return arrivalStr + `</table></div>`;
};

function departureContstructor(dataArray){
  var departureStr = `<div class="twoTables">
                      <h3 class="blue">Departures</h3>
                      <table class="table">
                      <tr><th>Date</th><th>Departure Time</th><th>Destination</th><th>Airline</th></tr>`;
  forEach(dataArray, function(listEl){
    departureStr += `<tr><td>${listEl.date}</td><td>${listEl.plannedArrival}</td>
                     <td>${listEl.to}</td><td>${listEl.airline}</td></tr>`;
  })
  return departureStr + `</table></div>`;
};

function carpoolConstructor(dataArray){
  var finalStr = `<div class="panel panel-default">
                  <table class="table">
                  <tr><th>Time of Departure</th><th>From</th><th>To</th></tr>`;
  forEach(dataArray, function(listEl){
    finalStr += `<tr><td>${listEl.time}</td><td>${listEl.from}</td><td>${listEl.to}</td></tr>`;

  })
  return `<div class="pink"><h3>Carpools</h3></div>` + finalStr + `</table></div>`;
};

window.addEventListener('hashchange', current);
current();
