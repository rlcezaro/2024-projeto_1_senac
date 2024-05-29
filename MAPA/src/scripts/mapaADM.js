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
  ajax.open("GET", "http://localhost:8081/ocorrencias")
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
    ajax.open("GET", "http://localhost:8081/ocorrencias")
    ajax.onreadystatechange = function () {
      if (ajax.readyState === XMLHttpRequest.DONE) {
          var obj = JSON.parse(ajax.responseText)
          obj.forEach((element) => {
            
            pegarEndereco(element.latitude, element.longitude).then((endereco) => {
                document.getElementById("ocorrencias").innerHTML +=  `<div id=`+element.id+`></div>`
                document.getElementById(element.id).innerHTML += "<hr/>"
                document.getElementById(element.id).innerHTML += "<p>Titulo:"+element.titulo+"</p>"
                document.getElementById(element.id).innerHTML += "<p>Descrição: "+element.descricao+"</p>"
                document.getElementById(element.id).innerHTML += "<p>Tipo: "+element.tipo+"</p>"
                document.getElementById(element.id).innerHTML += "<p>Endereço: " + endereco + "</p>"

                document.getElementById(element.id).innerHTML += "<p>Status:</p>"
                document.getElementById(element.id).innerHTML += `<select style="display:block" id="status">
                                                                    <option id="aberto" value="aberto">Aberto</option>
                                                                    <option id="emAndamento" value="emAndamento">Em andamento</option>
                                                                    <option id="encerrado" value="encerrado">Encerrado</option>
                                                                  </select>`
                document.getElementById(element.statusAndamento).setAttribute("selected", "selected")
                
                document.getElementById(element.id).innerHTML += "<p>Observação:</p>"
                document.getElementById(element.id).innerHTML += `<input type="text" id="observacao`+element.id+`" value="`+element.observacao+`">`
                document.getElementById(element.id).innerHTML += "<br/>"
                document.getElementById(element.id).innerHTML += "<br/>"
                document.getElementById(element.id).innerHTML += `<input type="button" onclick="initMap(`+element.latitude+`,`+element.longitude+`,17)" value="Ver no mapa">`
                document.getElementById(element.id).innerHTML += `<input type="button" onclick="attOcorrencia(`+element.id+`)" value="Salvar">`
                document.getElementById(element.id).innerHTML += `<input type="button" onclick="deletar(`+element.id+`)" value="Deletar">`
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

function attOcorrencia(id){
  var observacao = document.getElementById("observacao"+id).value
  var status = document.getElementById("status").value
  ajax = new XMLHttpRequest()
  ajax.open("PUT", "http://localhost:8081/attOcorrencia", true)
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  ajax.send("id="+id+"&status="+status+"&observacao="+observacao)

}

function deletar(id) {
  var ajax = new XMLHttpRequest()
  ajax.open("DELETE", "http://localhost:8081/deletar", true)
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  ajax.onreadystatechange = function () {
      if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
          verOcorrencias() 
      }
    initMap()
  }
  ajax.send("id=" + id)
}