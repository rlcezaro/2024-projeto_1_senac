async function initMap() {
  const {Map} = await google.maps.importLibrary("maps")
  const {AdvancedMarkerView, PinElement} = await google.maps.importLibrary("marker")

  var lat = -30.035229878185845
  var lng = -51.226468536689104
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
  //ajax.open("GET", "http://localhost:8081/ocorrencias")
  ajax.open("GET", "http://52.14.161.176:3000/ocorrencias")
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
  //ajax.open("GET", "http://localhost:8081/ocorrencias")
  ajax.open("GET", "http://52.14.161.176:3000/ocorrencias")
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
    //ajax.open("GET", "http://localhost:8081/ocorrencias")
    ajax.open("GET", "http://52.14.161.176:3000/ocorrencias")
    ajax.onreadystatechange = function () {
      if (ajax.readyState === XMLHttpRequest.DONE) {
        var obj = JSON.parse(ajax.responseText)
        obj.forEach((ocorrencia) => {
          pegarEndereco(ocorrencia.latitude, ocorrencia.longitude).then((endereco) => {
            document.getElementById("ocorrencias").innerHTML +=  "<div id="+ocorrencia.id+"></div>"
            divOcorrencia = document.getElementById(ocorrencia.id)

            divOcorrencia.innerHTML += "<hr/>"
            divOcorrencia.innerHTML += "<p>Titulo:"+ocorrencia.titulo+"</p>"
            divOcorrencia.innerHTML += "<p>Descrição: "+ocorrencia.descricao+"</p>"
            divOcorrencia.innerHTML += "<p>Tipo: "+ocorrencia.tipo+"</p>"
            divOcorrencia.innerHTML += "<p>Endereço(Coordenadas): " + endereco + "</p>"
            divOcorrencia.innerHTML += "<p>Endereço(Usuário): " + ocorrencia.endereco + "</p>"
            divOcorrencia.innerHTML += "<p>Data e Hora: " + ocorrencia.dataHora + "</p>"

            divOcorrencia.innerHTML += "<p>Status:</p>"
            divOcorrencia.innerHTML += `<select style="display:block" id="status">
                                          <option id="aberto" value="aberto">Aberto</option>
                                          <option id="emAndamento" value="emAndamento">Em andamento</option>
                                          <option id="encerrado" value="encerrado">Encerrado</option>
                                        </select>`
            document.getElementById(ocorrencia.statusAndamento).setAttribute("selected", "selected")
                
            divOcorrencia.innerHTML += "<p>Observação:</p>"
            divOcorrencia.innerHTML += `<input type="text" id="observacao`+ocorrencia.id+`" value="`+ocorrencia.observacao+`">`
            divOcorrencia.innerHTML += "<br/>"
            divOcorrencia.innerHTML += "<br/>"
            divOcorrencia.innerHTML += `<input type="button" onclick="verNoMapa(`+ocorrencia.latitude+`,`+ocorrencia.longitude+`,`+ocorrencia.id+`)" value="Ver no mapa">`
            divOcorrencia.innerHTML += `<input type="button" onclick="attOcorrencia(`+ocorrencia.id+`)" value="Salvar">`
            divOcorrencia.innerHTML += `<input type="button" onclick="deletar(`+ocorrencia.id+`)" value="Deletar">`
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
    ajax.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyDHwCPBIbCBF_DC6KKYY04TsI6qgyTd-J8")
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

function attOcorrencia(id){
  var observacao = document.getElementById("observacao"+id).value
  var status = document.getElementById("status").value
  ajax = new XMLHttpRequest()
  //ajax.open("PUT", "http://localhost:8081/attOcorrencia", true)
  ajax.open("PUT", "http://52.14.161.176:3000/attOcorrencia", true)
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  ajax.send("id="+id+"&status="+status+"&observacao="+observacao)
  
}

function deletar(id) {
  var ajax = new XMLHttpRequest()
  //ajax.open("DELETE", "http://localhost:8081/deletar", true)
  ajax.open("DELETE", "http://52.14.161.176:3000/deletar", true)
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  ajax.onreadystatechange = function () {
    if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
      verOcorrencias() 
    }
    initMap()
  }
  ajax.send("id=" + id)
}