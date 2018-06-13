/// <reference path=".\ScreepsAutocomplete\_references.js" />

var currentOrders = {
    orders: ['energise', Game.spawns['Spawn1']], //'build','upgrade'
    get: function() {
        return this.orders;
    },
    /** @param {String} command 
     *  @param {Structure} target **/
    set: function(command, target) {
        if (this.orders[0] != command) {
            console.log("New orders have been issued by the Overlord: " + command);
        }
        this.orders = [command, target];
    }
};

module.exports = currentOrders;