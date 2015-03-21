﻿/*
main.js: Rendering function.
 */

window.onload = function(){
    var canvas = document.getElementById("renderCanvas");

    var controlPanel = document.getElementById("controlPanel");
    var cameraPanel = document.getElementById("cameraPanel");
    var divFps = document.getElementById("fps");
    var divProp = document.getElementById("objPropTitle");
    var ballStick = document.getElementById("ballstick");
    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
    } else {
        // Babylon
        var engine = new BABYLON.Engine(canvas, true);

        //Creating scene
        scene = createSceneTuto(engine);
        scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.3);

        scene.activeCamera.attachControl(canvas);

        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
              divFps.innerHTML = BABYLON.Tools.GetFps().toFixed() + " fps";
            scene.render();
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    }

   var panelIsClosed = true;
    var cameraPanelIsClosed = true;
    document.getElementById("clickableTag").addEventListener("click", function () {
        if (panelIsClosed) {
            panelIsClosed = false;
            controlPanel.style.webkitTransform = "translateY(0px)";
            controlPanel.style.transform = "translateY(0px)";
        } else {
                hideControlPanel();
        }
    });

    document.getElementById("cameraClickableTag").addEventListener("click", function () {
        if (cameraPanelIsClosed) {
            cameraPanelIsClosed = false;
            cameraPanel.style.webkitTransform = "translateX(0px)";
            cameraPanel.style.transform = "translateX(0px)";
        } else {
            hideCameraPanel();
        }
    });

    ballstick.addEventListener("click", function () {
        if (scene) {
           var meshes = scene.getActiveMeshes();
           console.log("Scene meshes: " + meshes.length);
           console.log("meshes: " + meshes.data[0].id);
            for (var i = 0; i < meshes.length; i++) {
                console.log("meshes " + i + ": " + meshes.data[i].name);
                      if(meshes.data[i].name ==="Molecule"){
                      meshes.data[i].fromBallToStickBall(BALL_AND_STICK_SCALE_VALUE, scene);
                      }
                  };
              }
    });

      ball.addEventListener("click", function () {
        if (scene) {
          var meshes = scene.getActiveMeshes();
           console.log("Scene meshes: " + meshes.length);
           console.log("meshes: " + meshes.data[0].id);
            for (var i = 0; i < meshes.length; i++) {
                console.log("meshes " + i + ": " + meshes.data[i].name);
                      if(meshes.data[i].name ==="Molecule"){
                      meshes.data[i].fromStickBallToBall(BALL_AND_STICK_SCALE_VALUE, scene);
                      }
                  };
              }
    });

       var hideCameraPanel = function () {
        cameraPanelIsClosed = true;
        cameraPanel.style.webkitTransform = "translateX(17em)";
        cameraPanel.style.transform = "translateX(17em)";
        divProp.innerHTML = "Proprietes";
    };

        var hideControlPanel = function(){
            panelIsClosed = true;
            controlPanel.style.webkitTransform = "translateY(250px)";
            controlPanel.style.transform = "translateY(250px)";
        };

    canvas.addEventListener("dblclick", function(evt){

      var pickResult = scene.pick(evt.clientX, evt.clientY);
      if(pickResult.hit && pickResult.pickedMesh && (pickResult.pickedMesh.name !== "Bound")){
        // alert(pickResult.pickedMesh.label + " mol: "+ pickResult.pickedMesh.parent.label);
          divProp.innerHTML = "Atome: " + pickResult.pickedMesh.label;
      }
    })
};
