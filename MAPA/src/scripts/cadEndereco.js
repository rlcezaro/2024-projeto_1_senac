var lat, lng

async function initMap() {
  const {Map} = await google.maps.importLibrary("maps")
  const {AdvancedMarkerView} = await google.maps.importLibrary("marker")
  if (lat == undefined & lng == undefined){
    lat = -30.035229878185845
    lng = -51.226468536689104
    var positionMarker
    var zoomLvl = 10
  } else {
    var zoomLvl = 15
    var positionMarker = {lat: lat, lng: lng}
  }
  var positionMap = {lat: lat, lng: lng}
  
  
  map = new Map(document.getElementById("map"), {
    zoom: zoomLvl,
    center: positionMap,
    mapId: "MAP",
    disableDefaultUI: true, 
    zoomControl: true,
    gestureHandling: "greedy",   
  })

  const marker = new AdvancedMarkerView({
    map: map,
    position: positionMarker,
  })

  map.addListener("click", (e) => {
    marker.position = e.latLng
    lng = marker.position.lng
    lat = marker.position.lat
  })
}

function cadastrar(){
  const ajax = new XMLHttpRequest()
  const titulo = document.getElementById("titulo").value
  const descricao = document.getElementById("descricao").value
  const tipo = document.getElementById("tipo").value

  const estado = document.getElementById("estado").value
  const cidade = document.getElementById("cidade").value
  const bairro = document.getElementById("bairro").value
  const rua = document.getElementById("rua").value
  const numero = document.getElementById("numero").value

  var latitude = lat
  var longitude = lng
  if (latitude === -30.035229878185845 && longitude === -51.226468536689104){
    latitude = -30.035229878185845
    longitude = -51.2264685366891
  }

  const endereco = rua + ", " + numero + " - " + bairro + ", " + cidade + " - " + estado + ", Brasil"
  const dataHora = document.getElementById("dataHora").value

  ajax.open("POST", "http://localhost:8081/cadastrar", true)
  ajax.setRequestHeader("Content-Type", "application/json")

  const jsonData = JSON.stringify({
    titulo: titulo,
    descricao: descricao,
    tipo: tipo,
    latitude: latitude,
    longitude: longitude,
    endereco: endereco,
    dataHora: dataHora
  })
  ajax.send(jsonData)
}


function LatLng() {
  var ajax = new XMLHttpRequest()
  var pais = "Brasil"
  //var pais = document.getElementById("pais").value
  var estado = document.getElementById("estado").value
  var cidade = document.getElementById("cidade").value
  var bairro = document.getElementById("bairro").value
  var rua = document.getElementById("rua").value
  var numero = document.getElementById("numero").value

  ajax.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address="+ 
            bairro +"+"+ rua +"+"+ numero +","+ cidade +"+"+ estado +","+"+"+ pais 
            +"&key=AIzaSyDHwCPBIbCBF_DC6KKYY04TsI6qgyTd-J8")

  ajax.onreadystatechange = function () {
    if (ajax.readyState === XMLHttpRequest.DONE) {
      if (ajax.status === 200) {
        var obj = JSON.parse(ajax.responseText)
        if (obj.results && obj.results.length > 0) {
          var location = obj.results[0].geometry.location
          lat = location.lat
          lng = location.lng
          initMap()
        } 
      }
    }
  }
  ajax.send()
  
}