var lat
var lng

async function initMap() {
  const {Map} = await google.maps.importLibrary("maps")
  const {AdvancedMarkerView} = await google.maps.importLibrary("marker")
  var htmlLat = document.getElementById("lat").value
  var htmlLng = document.getElementById("lng").value
  if (htmlLat == "" & htmlLng == ""){
    lat = -30.035229878185845
    lng = -51.226468536689104
    var positionMarker
    var zoomLvl = 10
    var positionMap = { lat: Number(lat), lng: Number(lng) }
  } else {
    lat = htmlLat
    lng = htmlLng
    var zoomLvl = 15
    var positionMarker = { lat: Number(lat), lng: Number(lng) }
    var positionMap = { lat: Number(lat), lng: Number(lng) }
  }

  

  map = new Map(document.getElementById("map"), {
    zoom: zoomLvl,
    center: positionMap,
    mapId: "MAP",
    disableDefaultUI: true, 
    zoomControl: true,
    gestureHandling: "greedy",   
  })

  //const marcador = document.createElement("img")
  //marcador.src = ""

  const marker = new AdvancedMarkerView({
    map: map,
    position: positionMarker,
    //content: marcador,
  })

  map.addListener("click", (e) => {
    marker.position = e.latLng
    lng = marker.position.lng
    lat = marker.position.lat
    document.getElementById("lng").value = lng
    document.getElementById("lat").value = lat

  })
}



function cadastrar(){
  const ajax = new XMLHttpRequest()
  const titulo = document.getElementById("titulo").value
  const descricao = document.getElementById("descricao").value
  const tipo = document.getElementById("tipo").value
  const latitude = lat
  const longitude = lng
  const dataHora = document.getElementById("dataHora").value

  ajax.open("POST", "http://localhost:8081/cadastrar", true)
  ajax.setRequestHeader("Content-Type", "application/json")

  const jsonData = JSON.stringify({
    titulo: titulo,
    descricao: descricao,
    tipo: tipo,
    latitude: latitude,
    longitude: longitude,
    dataHora: dataHora
  })
  ajax.send(jsonData)
}

