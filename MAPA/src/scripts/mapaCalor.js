async function initMap(tipo) {
  const { Map } = await google.maps.importLibrary("maps")
  const positionMap = { lat: -30.035229878185845, lng: -51.226468536689104 }

  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: positionMap,
    gestureHandling: "greedy",
  })
  var ajax = new XMLHttpRequest()
  if(tipo == "todos"){
    ajax.open("GET", "http://localhost:8081/ocorrencias")
  } else{
    ajax.open("GET", "http://localhost:8081/ocorrenciasTipo?tipo="+tipo)
  }
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

