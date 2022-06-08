//Global letiable
let markersURLArray = [];
let markersNameArray = [];
let assetsId = [];

for (let g = 1; g <= 1; g++) {
  let idName = "#asset-" + g;
  assetsId.push(idName);
}

AFRAME.registerComponent("markers_start", {
  init: function () {
    console.log("Add markers to the scene");

    let sceneEl = document.querySelector("a-scene");

    for (let i = 1; i <= 2; i++) {
      let url = "resources/markers/marker-" + i + ".patt";
      markersURLArray.push(url);
      markersNameArray.push("marker_" + i);
    }

    for (let k = 0; k < 1; k++) {
      let markerEl = document.createElement("a-marker");
      markerEl.setAttribute("type", "pattern");
      markerEl.setAttribute("url", markersURLArray[k]);
      markerEl.setAttribute("id", markersNameArray[k]);
      markerEl.setAttribute("preset", "custom");
      markerEl.setAttribute("registerevents", "");
      markerEl.setAttribute("emitevents", "true");

      sceneEl.appendChild(markerEl);

      let textEl = document.createElement("a-entity");
      textEl.setAttribute("id", "asset-model");
      textEl.setAttribute("animation-mixer", "loop: repeat");
      textEl.setAttribute("gltf-model", assetsId[k]);
      textEl.setAttribute("gesture-handler", "");
      textEl.setAttribute("position", {
        x: 0,
        y: -5,
        z: 0,
      });
      textEl.object3D.rotation.set(30, 0, 0);
      textEl.object3D.scale.set(0.6, 0.6, 0.6);
      markerEl.appendChild(textEl);
    }
  },
});

//Detect marker found and lost
AFRAME.registerComponent("registerevents", {
  init: function () {
    const marker = this.el;

    marker.addEventListener("markerFound", () => {
      let markerId = marker.id;
      console.log("Marker Found: ", markerId);
    });

    marker.addEventListener("markerLost", () => {
      let markerId = marker.id;
      console.log("Marker Lost: ", markerId);
    });
  },
});
