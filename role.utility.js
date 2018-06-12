var actionHarvest = require('action.harvest');

var roleUtility = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // Check fuel
        if(creep.carry.energy == 0) {
            creep.memory.refil = true;
        }
        else if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.refil = false;
        }

        // If set to refil
        if(creep.memory.refil) {
            actionHarvest.nearest(creep);
        }
        else {
            //Better to not have every creep think of all of this? Have one 'overseer' that tasks the utilities?
            // Look for energising structures
            var energise = creep.room.find(FIND_STRUCTURES, { filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION 
                     || structure.structureType == STRUCTURE_SPAWN) 
                     && structure.energy < structure.energyCapacity;
                }
            });
            // Prioritise building sites
            var builds = creep.room.find(FIND_CONSTRUCTION_SITES);
            //Order building priority purely on closest to completion
            builds.sort(function(a, b){return (a.progressTotal - a.progress) - (b.progressTotal - b.progress)});

            // Operate based on priority Energise > Build > Upgrade
            if(energise.length) {
                if(creep.transfer(energise[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energise[0], {visualizePathStyle: {stroke: '#88ff88'}});
                }
            }
            else if (builds.length) {
                if (creep.build(builds[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(builds[0], {visualizePathStyle: {stroke: '#88ff88'}});
                }
            }
            else {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#88ff88'}});
                }
            }
        }         
    }
};

module.exports = roleUtility;
