
//Global variables used to set markes on map 
var mymap
var data
var my_gNodeBs
var my_cores
var my_devID


//Define icon for operational device
var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//Define icon for stopped device
var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//A small delay to make sure that the fetch completes.
//No check is performed though, so it could be dangreous
const delay = ms => new Promise(res => setTimeout(res, ms));


//A function to get the gNodeBs from the database
//To do that, the appropriate backend API is called
//TODO: REAT API server should NOT be hardcoded
  function getgNodeBs()
  {
      const url = 'http://150.140.195.214:3000/devices/getgNodeBs/admie';
      fetch(url,)
      .then((resp) => resp.json())
      .then(function(resp) {
        my_gNodeBs=resp
     
      })
      .catch(function(error) {
      console.log(error);
    });
  }

gNB_markers=[]

//Create and add a layer on the map the presents the gNodeB devices available.3
//TODO: Move to common.js file
async function addgNodeBLayer()
{
  var gNodeBLayer = new L.LayerGroup();
  gNodeBLayer.addTo(mymap)

  getgNodeBs();
  await delay(500)
  console.log(my_gNodeBs)

  for (var i = 0; i < my_gNodeBs.length; i++) 
  {
      lat=my_gNodeBs[i]['locationLat']
      lon=my_gNodeBs[i]['locationLong']
      user=my_gNodeBs[i]['userName']
      details=my_gNodeBs[i]['typeDetails']
      parameters=my_gNodeBs[i]['typeParameters']
      device=my_gNodeBs[i]['deviceName']
      type=my_gNodeBs[i]['type']
      my_devID=my_gNodeBs[i]['deviceID']

      //The database also includes dummy entries which are represented as cirrles on the map.
      //In production system this should not be present
      if(details=="VIRTUAL")
      {
        gNB_markers[i] = new L.circle([lat,lon],
          {
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 100.5,
              radius: 10, 
          })
          .addTo(gNodeBLayer)/*.on('click', onClick)*/
          .bindTooltip(details+" "+user, {permanent: false});
        }
        else //The actual Markers, with handlers to start/stop device
        {
            gNB_markers[i] = new L.marker([lat,lon],{icon: greenIcon, title:"Click to toggle on/off" , contextmenu: true,
        })
        .addTo(gNodeBLayer).on('click', toggleOnOff)
        .bindTooltip(parameters+ ", "+type+" for " + user, {permanent: false});
        }
  }
}

//A function to get the specific users gNodeBs from the database
//To do that, the appropriate backend API is called
//TODO: REST API server should NOT be hardcoded
//TODO: HAve one function with parameters
function getCores()
{
    const url = 'http://150.140.195.214:3000/devices/getCores/admie';
    fetch(url,)
    .then((resp) => resp.json())
    .then(function(resp) {
      my_cores=resp

    })
    .catch(function(error) {
    console.log(error);
    });
}

//Create and ad a layer on the map the presents the core devices available.
//TODO: Move to common.js file
async function addCore5GLayer()
{
  var coreLayer = new L.LayerGroup();
  coreLayer.addTo(mymap)

  getCores();
  await delay(500)
  console.log(my_cores)

    for (var i = 0; i < my_cores.length; i++) 
    {
      lat=my_cores[i]['locationLat']
      lon=my_cores[i]['locationLong']
      user=my_cores[i]['userName']
      details=my_cores[i]['typeDetails']
      device=my_cores[i]['deviceName']
      type=my_cores[i]['type']
      my_devID=my_cores[i]['deviceID']

      //The database also includes dummy entries which are represented as cirrles on the map.
      //In production system this should not be present
      if(details=="VIRTUAL")
      {
        core_marker = new L.circle([lat,lon],
          {
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 100.5,
              radius: 10, 
          })
          .addTo(coreLayer)/*.on('click', onClick)*/
          .bindTooltip(details+ " "+ user, {permanent: false});
        }
        else
        {
              gNB_markers[i] = new L.marker([lat,lon],{icon: greenIcon, title:"Click to toggle on/off" , contextmenu: true,
          })
          .addTo(coreLayer).on('click', toggleOnOff)
          .bindTooltip(parameters+ ", "+type+" for " + user, {permanent: false});
          }

    
   }

}

//Init the map
//We focus on University of Patras
//For the map part of the Frontend:  https://leafletjs.com/ has been used (alng with some of the eaxamples provided)
function initMap(myID)
{
  myObj=document.getElementById(myID)
  mymap = L.map(myObj, {
    center: [38.2878, 21.7894],
    zoom: 17,
  });

  L.tileLayer('https://api.mapbox.com/styles/v1/n-alathba/cj2fzxjgl00bl2rqno6mtb9wg/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibi1hbGF0aGJhIiwiYSI6ImNqMmZ6bTQ2cDAwNDIyeW8wY2hidjFxdjUifQ.TyQ2WNEMtCO3Q84PYXlAEA', {
    attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
    maxZoom: 18,
    minZoom: 1,
  }).addTo(mymap);

  //Little trick to allow auto loading of the map when changing tabs withou need of user interaction
  //Solution taken from stackoverflow:  https://stackoverflow.com/questions/36246815/data-toggle-tab-does-not-download-leaflet-map/36257493#36257493
 const resizeObserver = new ResizeObserver(() => {
    mymap.invalidateSize();
  });
  resizeObserver.observe(myObj);
}

//Entry point from html when a tab is selected
function handleMap(myID)
{
  //make sure we have exactly one map
  if (mymap != undefined) 
    mymap.remove();
  
  initMap(myID)

  //gNodeBs are shown for gNodeB and Both tabs
  if(myID=="gNodeB" || myID=="allDevices")
  {
    addgNodeBLayer()
  }
  
  //cores are shown for cores and Both tabs
  if(myID=="Cores5G" || myID=="allDevices")
  {
    addCore5GLayer()
  }

}


//A function to get the actually configure the device as requested by the user (start/stop)
//To do that, the appropriate backend API is called
//TODO: REST API server should NOT be hardcoded

  function config(dev_id)
  {
      const url = 'http://150.140.195.214:3000/config/'+dev_id;
      fetch(url,)
      .then((resp) => resp.json())
      .then(function(resp) {
        console.log("CONFIG OK")
        console.log(url) 
	console.log(resp)
	alert(resp["message"])
      })
      .catch(function(error) {
        console.log("CONFIG NOT OK")
      console.log(error);
    });
  }


function toggleOnOff(e) 
{
  myVar=this.getLatLng()
  console.log(e.target._icon)
  console.log(e.target._icon.currentSrc)
  //At this point we should hit the apprpriate APIs to config the radio
  //For security reasons (tere exists a live production radio ) this step is ommited  
  console.log(my_devID)
  config(my_devID)	
  if( e.target._icon.currentSrc.includes("green"))
    e.target.setIcon(redIcon);
  else if( e.target._icon.currentSrc.includes("red"))
    e.target.setIcon(greenIcon);
 else
  console.log("FFFFFFFFFFFF")
}


//Code to handle the tabs in html
//Taken from example in: https://www.w3schools.com/howto/howto_js_tabs.asp
function handleTab(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";


  handleMap(cityName)
}
