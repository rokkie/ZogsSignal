/*
 * Copyright (C) 2014 rocco
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function (module) {
    'use strict';

    // require dependencies
    var Server = require('socket.io'),
        utils  = require('./utils'),
        Base   = require('./base'),

    /**
     * @readonly
     * @private
     * @property {Server} socket IO socket
     */
    _socket,

    /**
     * @readonly
     * @property {String} name Name of this channel
     */
    _name;

    /**
     * @constructor
     * @param   {Server} socket
     * @param   {String} name   Room name
     * @returns {Room}
     */
    function Room (/*socket, */name) {
        // call parent constructor
        Base.apply(this, arguments);

        // define properties with accessors and mutators
        Object.defineProperties(this, {
            socket: {
                get: function () {
                    return _socket;
                }
            },
            name: {
                get: function () {
                    return _name;
                }
            }
        });

        // manually check arguments
        if (!(socket instanceof Server)) {
            throw new TypeError('Provided socket is not a Server');
        }
        if (!utils.isString(name)) {
            throw new TypeError('Name must me string');
        }
        if (!name.match(/[a-z0-9\-\_]{3,}/i)) {
            throw new Error('Name contains illegal characters');
        }

        // set properties
        _socket = socket;
        _name   = name.toLowerCase();
    };

    // assign the prototype and constructor
    Room.prototype = utils.copy({

    }, Object.create(Base.prototype));
    Room.prototype.constructor = Room;

    // export the constructor
    module.exports = Room;
}(module));
