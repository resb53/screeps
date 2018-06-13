var roleMinion = require('role.minion');
var roleOverlord = require('role.overlord');
var actionSpawn = require('action.spawn');

module.exports.loop = function () {
    //Garbage collection
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: ' + name);
        }
    }

    actionSpawn.run();

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch(creep.memory.role) {
            case 'minion':
                roleMinion.run(creep);
                break;
            case 'overlord':
                roleOverlord.run(creep);
                break;
            default:
                console.log("No AI applied to creep with role: ", creep.memory.role);
        }
    }
}