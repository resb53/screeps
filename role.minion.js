var actionHarvest = require('action.harvest');
var currentOrders = require('current.orders');

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
            // Use energy if none left in room?
            actionHarvest.nearest(creep);
        }
        else {
            // Follow overlord's command
            var orders = currentOrders.get();
            
            if(orders = 'energise') {
                if(creep.transfer(energise[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energise[0], {visualizePathStyle: {stroke: '#88ff88'}});
                }
            }
            else if (orders = 'build') {
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
