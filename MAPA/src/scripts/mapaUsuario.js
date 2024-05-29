async function initMap(lat, lng, zoomLvl) {
  const {Map} = await google.maps.importLibrary("maps")
  const {AdvancedMarkerView} = await google.maps.importLibrary("marker")

  if (lat == undefined && lng == undefined){
    lat = -30.035229878185845
    lng = -51.226468536689104
    zoomLvl = 15
  }
  
  var positionMap = { lat: Number(lat), lng: Number(lng) }

  map = new Map(document.getElementById("map"), {
    zoom: zoomLvl,
    center: positionMap,
    mapId: "MAP",
    disableDefaultUI: true, 
    zoomControl: true,
    gestureHandling: "greedy",   
  })

  var ajax = new XMLHttpRequest()
  ajax.open("GET", "http://localhost:8081/ocorrenciasUsuario?usuario=" + 1)
  ajax.onreadystatechange = function () {
    if (ajax.readyState === XMLHttpRequest.DONE) {
        var obj = JSON.parse(ajax.responseText)
        obj.forEach((element) => {
            const infowindow = new google.maps.InfoWindow({
                content: "<h1>"+element.titulo+"</h1>"+element.descricao,
                ariaLabel: element.titulo,
            })
            const marker = new AdvancedMarkerView({
                map: map,
                position: { lat: element.latitude, lng: element.longitude },
            })
            marker.addListener("gmp-click", () => {
            //marker.addListener("click", () => {
                infowindow.open({
                  anchor: marker,
                  map,
                })
              })
        })
    }
  }
  ajax.send()
}




function verOcorrencias() {
    document.getElementById("ocorrencias").innerHTML = ""
    var ajax = new XMLHttpRequest()
    ajax.open("GET", "http://localhost:8081/ocorrenciasUsuario?usuario=" + 1)
    ajax.onreadystatechange = function () {
      if (ajax.readyState === XMLHttpRequest.DONE) {
          var obj = JSON.parse(ajax.responseText)
          obj.forEach((element) => {
            
            pegarEndereco(element.latitude, element.longitude).then((endereco) => {
                document.getElementById("ocorrencias").innerHTML +=  "<hr/>"
                document.getElementById("ocorrencias").innerHTML +=  `<p id= ""`+element.id+`">Titulo: `+element.titulo+`</p>`
                document.getElementById("ocorrencias").innerHTML +=  "<p>Descrição: "+element.descricao+"</p>"
                document.getElementById("ocorrencias").innerHTML +=  "<p>Tipo: "+element.tipo+"</p>"
                document.getElementById("ocorrencias").innerHTML += "<p>Endereço: " + endereco + "</p>"
                document.getElementById("ocorrencias").innerHTML +=  "<p>Status: "+element.statusAndamento+"</p>"
                if(element.observacao != null){
                  document.getElementById("ocorrencias").innerHTML +=  "<p>Observação: "+element.observacao+"</p>"
                }
                document.getElementById("ocorrencias").innerHTML +=  `<input type="button" onclick="initMap(`+element.latitude+`,`+element.longitude+`,17)" value="Ver no mapa">`
            })
        })
      }
      initMap()
    }
    ajax.send()
  }



function pegarEndereco(lat, lng) {
    return new Promise((resolve) => {
        var ajax = new XMLHttpRequest()
        ajax.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="
        +lat+","+lng+"&key=AIzaSyDHwCPBIbCBF_DC6KKYY04TsI6qgyTd-J8")

        ajax.onreadystatechange = function () {
            if (ajax.readyState === XMLHttpRequest.DONE) {
                if (ajax.status === 200) {
                    var obj = JSON.parse(ajax.responseText)
                    if (obj.results && obj.results.length > 0) {
                        resolve(obj.results[0].formatted_address)
                    }
                } 
            }
        }
        ajax.send()
    })
}