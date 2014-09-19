//premiere version
//devra privatiser les champs plutar et ajouter des getter et setter !
// Global VARs to be encapsulated within  a module 

INIT_BALL_SCALE_VALUE = 1.5;
BALL_AND_STICK_SCALE_VALUE = 3.5;

BALL_VIEW_MODE  = 0;
BALL_AND_STICK_VIEW_MODE =1 ;

Molecule = function(name, type, position, scene) {

    //temp def mol
    var molsdef = {
        Caffeine: {
            label: "C8H10N4O2",
            type: "Caffeine",
            nb: 24,
            atoms: [
                ['H', -3.3804130, -1.1272367, 0.5733036],
                ['N', 0.9668296, -1.0737425, -0.8198227],
                ['C', 0.0567293, 0.8527195, 0.3923156],
                ['N', -1.3751742, -1.0212243, -0.0570552],
                ['C', -1.2615018, 0.2590713, 0.5234135],
                ['C', -0.3068337, -1.6836331, -0.7169344],
                ['C', 1.1394235, 0.1874122, -0.2700900],
                ['N', 0.5602627, 2.0839095, 0.8251589],
                ['O', -0.4926797, -2.8180554, -1.2094732],
                ['C', -2.6328073, -1.7303959, -0.0060953],
                ['O', -2.2301338, 0.7988624, 1.0899730],
                ['H', 2.5496990, 2.9734977, 0.6229590],
                ['C', 2.0527432, -1.7360887, -1.4931279],
                ['H', -2.4807715, -2.7269528, 0.4882631],
                ['H', -3.0089039, -1.9025254, -1.0498023],
                ['H', 2.9176101, -1.8481516, -0.7857866],
                ['H', 2.3787863, -1.1211917, -2.3743655],
                ['H', 1.7189877, -2.7489920, -1.8439205],
                ['C', -0.1518450, 3.0970046, 1.5348347],
                ['C', 1.8934096, 2.1181245, 0.4193193],
                ['N', 2.2861252, 0.9968439, -0.2440298],
                ['H', -0.1687028, 4.0436553, 0.9301094],
                ['H', 0.3535322, 3.2979060, 2.5177747],
                ['H', -1.2074498, 2.7537592, 1.7203047]
            ]
        },

        Ethanol: {
            label: "C2H6O",
            type: "Ethanol",
            nb: 9,
            atoms: [
                ['H', -2.0801425360, 0.4329727646, 0.0722817289],
                ['C', -1.2129704155, -0.2295285634, -0.0097156258],
                ['H', -1.2655910941, -0.9539857247, 0.8097953440],
                ['C', 0.0849758188, 0.5590385475, 0.0510545434],
                ['O', 1.2322305822, -0.2731895077, -0.1276123902],
                ['H', 0.1506137362, 1.1200249874, 0.9943015309],
                ['H', 1.2473876659, -0.8998737590, 0.6150681570],
                ['H', 0.1316093068, 1.2841805400, -0.7645223601],
                ['H', -1.2737541560, -0.7748626513, -0.9540587845]
            ],
            bounds: [
                [0, 1],
                [1, 2],
                [1, 3],
                [3, 4],
                [1, 8],
                [4, 6],
                [3, 7],
                [3, 5]
            ]
        },
        Caffeinek: {
            label: "C8H10N4O2",
            type: "Caffeinek",
            nb: 24,
            atoms: [
                ["N", 1.047, -0.000, -1.312],
                ["C", -0.208, -0.000, -1.790],
                ["C", 2.176, 0.000, -2.246],
                ["C", 1.285, -0.001, 0.016],
                ["N", -1.276, -0.000, -0.971],
                ["O", -0.384, 0.000, -2.993],
                ["C", -2.629, -0.000, -1.533],
                ["C", -1.098, -0.000, 0.402],
                ["C", 0.193, 0.005, 0.911],
                ["N", -1.934, -0.000, 1.444],
                ["O", 2.428, -0.000, 0.437],
                ["N", 0.068, -0.000, 2.286],
                ["C", -1.251, -0.000, 2.560],
                ["C", 1.161, -0.000, 3.261],
                ["H", 1.800, 0.001, -3.269],
                ["H", 2.783, 0.890, -2.082],
                ["H", 2.783, -0.889, -2.083],
                ["H", -2.570, -0.000, -2.622],
                ["H", -3.162, -0.890, -1.198],
                ["H", -3.162, 0.889, -1.198],
                ["H", -1.679, 0.000, 3.552],
                ["H", 1.432, -1.028, 3.503],
                ["H", 2.024, 0.513, 2.839],
                ["H", 0.839, 0.513, 4.167]
            ]
        },
        Eau: {
            label: "H2O",
            type: "Eau",
            nb: 3,
            atoms: [
                ['H', -2.0801425360, 0.4329727646, 0.0722817289],
                ['O', -1.2129704155, -0.2295285634, -0.0097156258],
                ['H', -1.2655910941, -0.9539857247, 0.8097953440]
            ],
            bounds: [
                [0, 1],
                [2, 1]
            ]

        }

    };

    this.moldata = molsdef[type];

    BABYLON.Mesh.call(this, "Molecule", scene);


    this.id = name;
    //this.name ="Molecules";
    this.position.x = position.x;
    this.position.z = position.y;
    this.position.y = position.z;
    this.label = this.moldata.label;
    this.type = this.moldata.type;
    this.nbAtom = this.moldata.nb;


    this.atoms = [];
    this.bounds = [];

    this.viewMode = BALL_VIEW_MODE;

    for (var i = 0; i < this.moldata.atoms.length; i++) {
        var atm = new Atom(this.type + ": " + this.moldata.atoms[i][0] + i, this.moldata.atoms[i][0], new BABYLON.Vector3(this.moldata.atoms[i][1], this.moldata.atoms[i][2], this.moldata.atoms[i][3]), scene);
        atm.parent = this;
        this.atoms.push(atm);

    };
    this.scaleUp(INIT_BALL_SCALE_VALUE);
    console.log(this.atoms.length);
};

Molecule.prototype = Object.create(BABYLON.Mesh.prototype);

// une autres ligne mystique
Molecule.prototype.constructor = Molecule;

// print the Graph of the mol in the  console
Molecule.prototype.printMolGraph = function() {
    this.atomsMapGraph.walkGraph(this.atoms, function(vertex, edgelist) {
        var adjString = vertex + ":";
        var currentNode =
            edgelist[vertex].head;
        while (currentNode) {
            adjString += " " + currentNode.value + "- ";
            currentNode = currentNode.next;
        }
        console.log(adjString);
        adjString = '';
    });
}

// walk the mol Graph and dilate atoms position to match the balls & Stick view
Molecule.prototype.dilateMolecule = function(atomsList) {
    this.atomsMapGraph.walkGraph(this.atoms, function(vertex, edgelist) {
        atomsList[vertex].view = "ball & stick";
        console.log(atomsList[vertex].label + ": " + atomsList[vertex].view);
        var currentNode =
            edgelist[vertex].head;
        while (currentNode) {
            if (!(atomsList[currentNode.value].view === "ball & stick")) {
                console.log("Processing : " + atomsList[currentNode.value].id + "for: " + atomsList[vertex].id);
                console.log(atomsList[vertex].label + ": " + atomsList[vertex].view);
                console.log(atomsList[currentNode.value].label + ": " + atomsList[currentNode.value].view);
                var v1 = getTranslationVect(atomsList[vertex].position, atomsList[currentNode.value].position);
                if (atomsList[currentNode.value].label === "O") {
                    atomsList[currentNode.value].translate(v1, 10, 0.1);
                }
                atomsList[currentNode.value].view = "ball & stick";
            }
            currentNode = currentNode.next;

        }
    });
}

Molecule.prototype.scaleUp = function(scaleValue) {
    // Scale up and shift everything
    var dims = ['x', 'y', 'z'];
    for (var d = 0; d < 3; d++) {
        // Find mean values for each dimension
        var meanValue = 0;
        var dimension = dims[d];
        for (i = 0; i < this.atoms.length; i++) {
            meanValue += this.atoms[i].position[dimension];
        }
        console.log("meanvalue :" + dimension + " -" + meanValue);
        meanValue /= this.atoms.length;
        console.log("meanvalueDiv :" + dimension + " -" + meanValue);

        for (i = 0; i < this.atoms.length; i++) {
            console.log("atoms: " + i + " dim: " + dimension + " - " + this.atoms[i].position[dimension]);
            this.atoms[i].position[dimension] = scaleValue * (this.atoms[i].position[dimension] - meanValue);
            console.log("scaleatoms: " + i + " dim: " + dimension + " - " + this.atoms[i].position[dimension]);
        }

        console.log(this.atoms.length);
    }
};

Molecule.prototype.scaleDown = function(scaleValue) {
    // Scale Down and shift everything
    var dims = ['x', 'y', 'z'];
    for (var d = 0; d < 3; d++) {
        // Find mean values for each dimension
        var meanValue = 0;
        var dimension = dims[d];
        for (i = 0; i < this.atoms.length; i++) {
            meanValue += this.atoms[i].position[dimension];
        }
        console.log("meanvalue :" + dimension + " -" + meanValue);
        meanValue /= this.atoms.length;
        console.log("meanvalueDiv :" + dimension + " -" + meanValue);

        for (i = 0; i < this.atoms.length; i++) {
            console.log("atoms: " + i + " dim: " + dimension + " - " + this.atoms[i][dimension]);
            this.atoms[i].position[dimension] = (this.atoms[i].position[dimension] / scaleValue) + meanValue;
            console.log("scaleatoms: " + i + " dim: " + dimension + " - " + this.atoms[i][dimension]);
        }
        console.log(this.atoms.length);
    }
};

Molecule.prototype.fromBallToStickBall = function(scaleValue, scene) {
    // Build the Stick & Ball view from a Ball view
    if ((this.viewMode != BALL_VIEW_MODE) || scaleValue != BALL_AND_STICK_SCALE_VALUE) {
        console.log("fromBallToStickBall: you passed a wrong scaleValue or scaling from a wong viewMode");
        return ; // please, consider throwing an exception instead ! :)
    };

    this.scaleUp(scaleValue) ;
    console.log("=======");
    console.log(this.atoms.length);
    console.log(this.moldata.bounds.length);
   // console.log(this.atoms[0].positin.x);
    console.log(this.moldata.bounds[0][0]);
   // console.log(this.atoms[this.moldata.bounds[0][0]].positin);
    for (var i = 0; i < this.moldata.bounds.length; i++) {
        var vstart = new BABYLON.Vector3(this.atoms[this.moldata.bounds[i][0]].position.x, this.atoms[this.moldata.bounds[i][0]].position.y, this.atoms[this.moldata.bounds[i][0]].position.z);
        var vend   = new BABYLON.Vector3(this.atoms[this.moldata.bounds[i][1]].position.x, this.atoms[this.moldata.bounds[i][1]].position.y, this.atoms[this.moldata.bounds[i][1]].position.z);
        var bds = new Bound(this.type + ": " + this.atoms[this.moldata.bounds[i][0]] + "-" +this.atoms[this.moldata.bounds[i][1]], vstart, vend, scene);
        bds.parent = this;
        this.bounds.push(bds);
    };
    this.viewMode = BALL_AND_STICK_VIEW_MODE;


};


Molecule.prototype.fromStickBallToBall = function(scaleValue, scene) {
    // Build the Stick & Ball view from a Ball view
    if ((this.viewMode != BALL_AND_STICK_VIEW_MODE ) || scaleValue != BALL_AND_STICK_SCALE_VALUE) {
        console.log("fromBallToStickBall: you passed a wrong scaleValue or scaling from a wong viewMode");
        return ; // please, consider throwing an exception instead ! :)
    };

    console.log("bounds before deletion: " + this.bounds.length);

    for (var i = 0; i < this.bounds.length; i++) {
    this.bounds[i].dispose() ;
    };

    this.bounds = [] ;
    console.log("deleted bound length: " + this.bounds.length);

    this.scaleDown(scaleValue) ;
    this.viewMode = BALL_VIEW_MODE ;

};


Molecule.prototype._initMovement = function() {

    var onKeyDown = function(evt) {
        console.log(evt.keyCode);
        if (evt.keyCode == 37) {
            Molecule.moveLeft = true;
            Molecule.moveRight = false;
        } else if (evt.keyCode == 39) {
            Molecule.moveRight = true;
            Molecule.moveLeft = false;
        }
    };

    var onKeyUp = function(evt) {
        Molecule.moveRight = false;
        Molecule.moveLeft = false;
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

Molecule.prototype.move = function() {
    if (Molecule.moveRight) {
        Molecule.position.x += 1;
    }
    if (Molecule.moveLeft) {
        Molecule.position.x += -1;
    }
};