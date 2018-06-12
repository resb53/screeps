var actionHarvest = require('action.harvest');

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            //Order building priority purely on closest to completion
            targets.sort(function(a, b){return (a.progressTotal - a.progress) - (b.progressTotal - b.progress)});
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#88ff88'}});
                }
            }
        }
        else {
            actionHarvest.nearest(creep);
        }
    }
};

module.exports = roleBuilder;
