function createSceneTuto(engine) {
    //test atomdata to be remove later
    //Creation of the scene
    var scene = new BABYLON.Scene(engine);

    // Adding light and camera
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(10, 50, 50), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 40, new BABYLON.Vector3(0,0,0), scene);

    // Adding new Ethanol molecule
    var ethanol = new Molecule ("ethanol", "Ethanol", new BABYLON.Vector3(10,0,0), scene);
    ethanol.position = new BABYLON.Vector3(0,0,0);

    scene.registerBeforeRender(function () {

    // lIGHT from camera anytime !
        light.position = camera.position;

        //animate the mesh
        ethanol.rotation.x += 0.01;
        ethanol.rotation.z += 0.02;
    });

return scene;

}