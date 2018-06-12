var actionHarvest = require('action.harvest');

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            actionHarvest.nearest(creep);
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION 
                             || structure.structureType == STRUCTURE_SPAWN) 
                             && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#88ff88'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;