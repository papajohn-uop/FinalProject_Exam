  
      var mymap
      var myMeasurements
  

  
//A function to get the gNodeBs from thr Elastix Serer
//To do that, the appropriate  API is called
//TODO: REAT API server should NOT be hardcoded
  function getMeasurements()
  {
      const url ='http://150.140.195.252:9299/5gcov/_search?pretty=true&q=*:*&size=1000'
  
      fetch(url)
      .then((resp) => resp.json())
      .then(function(data) {
        myMeasurements=data
     
      })
      .catch(function(error) {
      console.log(error);
    });
  }
  
  
  const delay = ms => new Promise(res => setTimeout(res, ms));

 //Create and add a layer on the map the presents the uplink speed available.
 //QnD: Should have one function with paremeters
  async function add_ul_Layer()
  {
      var ulLayer = new L.LayerGroup();
      ulLayer.addTo(mymap)
   
      getMeasurements();
      await delay(500)
      console.log(myMeasurements)
  
      console.log(myMeasurements['hits']['hits'].length)
      hits=myMeasurements['hits']['hits']
      for(let i=0;i<hits.length;i++)
      {
        hit=hits[i]
        data=hit._source
        console.log(data)
        console.log(data['alt'])
        console.log(data['latitude'])
        console.log(data['longitude'])
        //Get the lat,long and uplink speed from the json response
        lon=data['latitude']
        lat=data['longitude']
        ul=data['ul']
        
        console.log(lat*lon)
        if(lat*lon) //Make sure that we have lat/long values to add markers
        {
           console.log("DDD")
           measurement_marker = new L.circle([lon,lat],{color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.5,
              radius: ul/2,title:"SOME DETAILS"
                })
              .bindPopup("UL:"+ul+"mbps",)
              .addTo(ulLayer).on('click', onClick)
              .bindTooltip("UL:"+ul+"mbps", {permanent: false});
          }
        
      }
  }
  
 //Create and add a layer on the map the presents the downlink speed available.
  //QnD: Should have one function with paremeters
  async function add_dl_Layer()
  {
      var dlLayer = new L.LayerGroup();
      dlLayer.addTo(mymap)
   
      getMeasurements();
      await delay(500)
      console.log(myMeasurements)
      console.log(myMeasurements['hits']['hits'].length)
      hits=myMeasurements['hits']['hits']
      for(let i=0;i<hits.length;i++)
      {
        hit=hits[i]
        //console.log(hit)
        data=hit._source
        console.log(data)
        console.log(data['alt'])
        console.log(data['latitude'])
        console.log(data['longitude'])
        //Get the lat,long and uplink speed from the json response
        lon=data['latitude']
        lat=data['longitude']
        dl=data['dl']
        
        console.log(lat*lon)
        if(lat*lon) //Make sure that we have lat/long values to add markers
        {
           console.log("DDD")
           measurement_marker = new L.circle([lon,lat],{color: 'green',
              fillColor: '#f03',
              fillOpacity: 0.5,
              radius: dl/100,title:"SOME DETAILS"
                })
              .bindPopup("DL:"+dl+"mbps",)
              .addTo(dlLayer).on('click', onClick)
              .bindTooltip("DL:"+dl+"mbps", {permanent: false});
          }
        
      }
  }
  

 //Create and add a layer on the map the both uplink and downlink speed available.
  //QnD: Should have one function with paremeters
  async function add_both_Layer()
  {
      var bothlLayer = new L.LayerGroup();
      bothlLayer.addTo(mymap)
   
      getMeasurements();
      await delay(500)
      console.log(myMeasurements)
  
      //console.log(locations)
      console.log(myMeasurements['hits']['hits'].length)
      hits=myMeasurements['hits']['hits']
      for(let i=0;i<hits.length;i++)
      {
        hit=hits[i]
        data=hit._source
        console.log(data)
        console.log(data['alt'])
        console.log(data['latitude'])
        console.log(data['longitude'])
        //Get the lat,long and uplink speed from the json response
        lon=data['latitude']
        lat=data['longitude']
        dl=data['dl']
        ul=data['ul']
        console.log(lat*lon)
        if(lat*lon) //Make sure that we have lat/long values to add markers
        {
           console.log("DDD")
           measurement_marker = new L.circle([lon,lat],{color: 'blue',
              fillColor: '#f03',
              fillOpacity: 0.5,
              radius: 10,title:"SOME DETAILS"
                })
              .bindPopup("DL"+dl+"mbps, UL"+ul+"mbps",)
              .addTo(bothlLayer).on('click', onClick)
              .bindTooltip("DL:"+dl+"mbps, UL"+ul+"mbps", {permanent: false});
          }
        
      }
  }



 //Create and add a layer on the map that shows the latency measurements  available.
  //QnD: Should have one function with paremeters
  async function add_latency_Layer()
  {
      var latencylLayer = new L.LayerGroup();
      latencylLayer.addTo(mymap)
   
      getMeasurements();
      await delay(500)
      console.log(myMeasurements)
  
      //console.log(locations)
      console.log(myMeasurements['hits']['hits'].length)
      hits=myMeasurements['hits']['hits']
      for(let i=0;i<hits.length;i++)
      {
        hit=hits[i]
        //console.log(hit)
        data=hit._source
        console.log(data)
        console.log(data['alt'])
        console.log(data['latitude'])
        console.log(data['longitude'])
        //Get the lat,long and uplink speed from the json response
        lon=data['latitude']
        lat=data['longitude']
        dl=data['dl']
        ul=data['ul']
        latency=data['median']
        console.log(lat*lon)
        if(lat*lon) //Make sure that we have lat/long values to add markers
        {
           console.log("DDD")
           measurement_marker = new L.circle([lon,lat],{color: 'orange',
              fillColor: '#f03',
              fillOpacity: 0.5,
              radius: 10,title:"SOME DETAILS"
                })
              .bindPopup(latency+"msecs",)
              .addTo(latencylLayer).on('click', onClick)
              .bindTooltip(latency +"usecs", {permanent: false});
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
  
    if(myID=="ul" )
    {
      add_ul_Layer()
    }

    if(myID=="dl")
    {
      add_dl_Layer()
    }

    if(myID=="both")
    {
      add_both_Layer()
    }


    if(myID=="latency")
    {
      add_latency_Layer()
    }

  
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
