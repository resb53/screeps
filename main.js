var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

HARVESTERS_WANTED = 1;
UPGRADERS_WANTED = 1;

module.exports.loop = function () {
    //Garbage collection
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: ', name);
        }
    }

    // Rationalise these building blocks?
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < HARVESTERS_WANTED) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'harvester'}});
    }

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if (upgraders.length < UPGRADERS_WANTED) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
    }

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️ ' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8}
        );
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch(creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
            case 'upgrader':
                roleUpgrader.run(creep);
        }
    }
}