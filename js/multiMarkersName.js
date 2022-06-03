//Multi Markers WebAR-AR.js and Aframe - Playing the Archive - Connected Environment CASA-UCL

//Global letiable
let markersURLArray = [];
let markersNameArray = [];
let animationIds = [];

for (let g = 1; g < 3; g++) {
  let idName = "#animated-" + g;
  animationIds.push(idName);
  console.log(idName);
}

AFRAME.registerComponent("markers_start", {
  init: function () {
    console.log("Add markers to the scene");

    let sceneEl = document.querySelector("a-scene");

    for (let i = 1; i < 3; i++) {
      let url = "resources/markers/marker-" + i + ".patt";
      markersURLArray.push(url);
      markersNameArray.push("Marker_" + i);
    }

    for (let k = 0; k < 2; k++) {
      let markerEl = document.createElement("a-marker");
      markerEl.setAttribute("type", "pattern");
      markerEl.setAttribute("url", markersURLArray[k]);
      markerEl.setAttribute("id", markersNameArray[k]);
      markerEl.setAttribute("preset", "custom");
      markerEl.setAttribute("registerevents", "");
      markerEl.setAttribute("emitevents", "true");

      sceneEl.appendChild(markerEl);

      let textEl = document.createElement("a-entity");

      textEl.setAttribute("id", "animated-model");
      textEl.setAttribute("animation-mixer", "loop: repeat");
      textEl.setAttribute("gltf-model", animationIds[k]);
      textEl.setAttribute("gesture-handler", "");
      textEl.object3D.rotation.set(0, 0, 0);
      textEl.object3D.scale.set(0.5, 0.5, 0.5);
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

const toggleFullScreen = () => {
  console.log("make full screen");

  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;
  var cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
};

toggleFullScreen();
