var tipo = "todos"
var escopo = "geral"

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps")
  const positionMap = { lat: -30.034482386461136, lng: -51.23005590224684 }

  map = new Map(document.getElementById("map"), {
    zoom: 14,
    center: positionMap,
    gestureHandling: "greedy",
  })
  var ajax = new XMLHttpRequest()
  ajax.open("GET", "http://localhost:8081/ocorrenciasMapaCalor?tipo="+tipo+"&data="+escopo)

  ajax.onreadystatechange = function () {
    if (ajax.readyState === XMLHttpRequest.DONE) {
      var obj = JSON.parse(ajax.responseText)
      var heatmapData = []
      obj.forEach((element) => {
        heatmapData.push({location: new google.maps.LatLng(element.latitude, element.longitude), weight: 1})
      })
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
      })
      heatmap.setMap(map)
    }
  }
  ajax.send()
}

function mudaData() {
  escopo = document.getElementById("data").value
  initMap()
}

function mudaTipo(valor) {
  var botaoAnterior = document.getElementById(tipo);
  botaoAnterior.style.backgroundColor = "#f0f0f0"; // Cor de fundo padrão do botão anterior
  botaoAnterior.style.color = "#000000"; // Cor do texto padrão do botão anterior
  
  tipo = valor;
  
  var novoBotao = document.getElementById(valor);
  novoBotao.style.backgroundColor = "#005f99"; // Nova cor de fundo do botão atual
  novoBotao.style.color = "#ffffff"; // Nova cor do texto do botão atual
  
  initMap();
}
