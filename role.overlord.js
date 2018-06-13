/// <reference path=".\ScreepsAutocomplete\_references.js" />
var actionHarvest = require('action.harvest');
var currentOrders = require('current.orders');

var roleOverlord = {
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
            // Use energy if none left in room?
            actionHarvest.nearest(creep);
        }
        else {
            // Personally see to the continuous upgrade of the controller
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#88ff88'}});
            }
        }
        
        // Observe state of room and command minions

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
            currentOrders.set('energise', energise[0]);
        }
        else if (builds.length) {
            currentOrders.set('build', builds[0]);
        }
        else {
            currentOrders.set('upgrade', creep.room.controller);
        }
    }
};

module.exports = roleOverlord;
