async function initMap() {
  const {Map} = await google.maps.importLibrary("maps")
  const {AdvancedMarkerView, PinElement} = await google.maps.importLibrary("marker")

  var lat = -30.035229878185845
  var lng = -51.23005590224684
  var zoomLvl = 14
  
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
  //ajax.open("GET", "http://localhost:8081/ocorrenciasUsuario?usuario=" + 1)
  ajax.open("GET", "http://52.14.161.176:3000/ocorrenciasUsuario?usuario=" + 1)
  ajax.onreadystatechange = function () {
    if (ajax.readyState === XMLHttpRequest.DONE) {
      var obj = JSON.parse(ajax.responseText)
      obj.forEach((ocorrencia) => {
        const infowindow = new google.maps.InfoWindow({
          content: "<h1>"+ocorrencia.titulo+"</h1>"+ocorrencia.descricao,
          ariaLabel: ocorrencia.titulo,
        })
      
        const marker = new AdvancedMarkerView({
          map: map,
          position: { lat: ocorrencia.latitude, lng: ocorrencia.longitude },
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


async function verNoMapa(lat,lng,id) {
  const {Map} = await google.maps.importLibrary("maps")
  const {AdvancedMarkerView, PinElement} = await google.maps.importLibrary("marker")

  var positionMap = { lat: Number(lat), lng: Number(lng) }
  var zoomLvl = 18

  map = new Map(document.getElementById("map"), {
    zoom: zoomLvl,
    center: positionMap,
    mapId: "MAP",
    disableDefaultUI: true, 
    zoomControl: true,
    gestureHandling: "greedy",   
  })

  var ajax = new XMLHttpRequest()
  //ajax.open("GET", "http://localhost:8081/ocorrenciasUsuario?usuario=" + 1)
  ajax.open("GET", "http://52.14.161.176:3000/ocorrenciasUsuario?usuario=" + 1)
  ajax.onreadystatechange = function () {
    if (ajax.readyState === XMLHttpRequest.DONE) {
      var obj = JSON.parse(ajax.responseText)
      obj.forEach((ocorrencia) => {
        const infowindow = new google.maps.InfoWindow({
          content: "<h1>"+ocorrencia.titulo+"</h1>"+ocorrencia.descricao,
          ariaLabel: ocorrencia.titulo,
        })
        
        const isTarget = ocorrencia.id === id
        const color = new PinElement({
          background: isTarget ? "#93afe4" : "",
          borderColor: isTarget ? "#327da8" : "",
          glyphColor: isTarget ? "#098a9c" : "",
        })
      
        const marker = new AdvancedMarkerView({
          map: map,
          position: { lat: ocorrencia.latitude, lng: ocorrencia.longitude },
          content: color.element,
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
  //ajax.open("GET", "http://localhost:8081/ocorrenciasUsuario?usuario=" + 1)
  ajax.open("GET", "http://52.14.161.176:3000/ocorrenciasUsuario?usuario=" + 1)
  ajax.onreadystatechange = function () {
    if (ajax.readyState === XMLHttpRequest.DONE) {
      var obj = JSON.parse(ajax.responseText)
      obj.forEach((ocorrencia) => {
        //pegarEndereco(ocorrencia.latitude, ocorrencia.longitude).then((endereco) => {
        document.getElementById("ocorrencias").innerHTML += "<div id="+ocorrencia.id+"></div>"
        divOcorrencia = document.getElementById(ocorrencia.id)


        divOcorrencia.innerHTML += "<hr/>"
        divOcorrencia.innerHTML += "<p>Titulo: "+ocorrencia.titulo+"</p>"
        divOcorrencia.innerHTML += "<p>Descrição: "+ocorrencia.descricao+"</p>"
        divOcorrencia.innerHTML += "<p>Tipo: "+ocorrencia.tipo+"</p>"
        //divOcorrencia.innerHTML += "<p>Endereço: " + endereco + "</p>"
        divOcorrencia.innerHTML += "<p>Endereço: " + ocorrencia.endereco + "</p>"
        divOcorrencia.innerHTML += "<p>Data e Hora: " + ocorrencia.dataHora + "</p>"
        divOcorrencia.innerHTML += "<p>Status: "+ocorrencia.statusAndamento+"</p>"
        if(ocorrencia.observacao != "null" && ocorrencia.observacao != null && ocorrencia.observacao != ""){
          divOcorrencia.innerHTML += "<p>Observação: "+ocorrencia.observacao+"</p>"
        }
        divOcorrencia.innerHTML +=  `<input type="button" onclick="verNoMapa(`+ocorrencia.latitude+`,`+ocorrencia.longitude+`,`+ocorrencia.id+`)" value="Ver no mapa">`
        //})
      })
    }
    initMap()
  }
  ajax.send()
}



//function pegarEndereco(lat, lng) {
//  return new Promise((resolve) => {
//    var ajax = new XMLHttpRequest()
//    ajax.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="
//              +lat+","+lng+"&key=AIzaSyDHwCPBIbCBF_DC6KKYY04TsI6qgyTd-J8")
//
//    ajax.onreadystatechange = function () {
//      if (ajax.readyState === XMLHttpRequest.DONE) {
//        if (ajax.status === 200) {
//          var obj = JSON.parse(ajax.responseText)
//          if (obj.results && obj.results.length > 0) {
//            resolve(obj.results[0].formatted_address)
//          }
//        } 
//      }
//    }
//    ajax.send()
//  })
//}