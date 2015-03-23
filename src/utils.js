/*
utils.js: Utilities functions.
Don't mind Globals !

 */

// Globals (To avoid)

INIT_BALL_SCALE_VALUE = 1.5;
BALL_AND_STICK_SCALE_VALUE = 3.5;

BALL_VIEW_MODE  = 0;
BALL_AND_STICK_VIEW_MODE =1 ;


//Bound: the molecular bound between 2 atoms.
//This create a cylinder between 2 given 3D vectors (spheres)
//Thanks to David Catuhe (@deltakosh) for his priceless help :-)
Bound = function(name, vstart, vend, scene) {
    var distance = BABYLON.Vector3.Distance(vstart, vend);

    BABYLON.Mesh.call(this, "Bound", scene);
    var vd = BABYLON.VertexData.CreateCylinder(distance, 1, 1, 36);

    vd.applyToMesh(this, false);

    this.id = name;

    this.material = new BABYLON.StandardMaterial("kosh", scene);
    this.material.diffuseColor = new BABYLON.Color3(1, 1, 1);

    // First of all we have to set the pivot not in the center of the cylinder:
    this.setPivotMatrix(BABYLON.Matrix.Translation(0, -distance / 2, 0));

    // Then move the cylinder to last sphere
    this.position = vend;

    // Then find the vector between spheres
    var v1 = vend.subtract(vstart);
    v1.normalize();
    var v2 = new BABYLON.Vector3(0, 1, 0);

    // Using cross we will have a vector perpendicular to both vectors
    var axis = BABYLON.Vector3.Cross(v1, v2);
    axis.normalize();
    console.log(axis);

    // Angle between vectors
    var angle = BABYLON.Vector3.Dot(v1, v2);
    console.log("angle: " +angle);

    // Then using axis rotation the result is obvious
    this.rotationQuaternion = BABYLON.Quaternion.RotationAxis(axis, -Math.PI / 2 + angle);

    // Movement attributes
    this.speed = 3;
    this.moveLeft = false;
    this.moveRight = false;

    this._initMovement();

};

Bound.prototype = Object.create(BABYLON.Mesh.prototype);
Bound.prototype.constructor = Bound;


Bound.prototype._initMovement = function() {
    var onKeyDown = function(evt) {
        console.log(evt.keyCode);
        if (evt.keyCode == 37) {
            Bound.moveLeft = true;
            Bound.moveRight = false;
        } else if (evt.keyCode == 39) {
            Bound.moveRight = true;
            Bound.moveLeft = false;
        }
    };

    var onKeyUp = function(evt) {
        Bound.moveRight = false;
        Bound.moveLeft = false;
    };

    // Register events
    BABYLON.Tools.RegisterTopRootEvents([{
        name: "keydown",
        handler: onKeyDown
    }, {
        name: "keyup",
        handler: onKeyUp
    }]);
};

Bound.prototype.move = function() {
    if (Bound.moveRight) {
        Bound.position.x += 1;
    }
    if (Bound.moveLeft) {
        Bound.position.x += -1;
    }
};

// Get the translation vect between 2 vectors
getTranslationVect = function(vstart, vend) {
    var distance = BABYLON.Vector3.Distance(vstart, vend);
    v1 = vstart.subtract(vend);
    v1.normalize();
    return v1;
}
