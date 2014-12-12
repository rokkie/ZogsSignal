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

/**
 * A channels namespace
 *
 * @class   Channel
 * @extends Base
 */
(function (module) {
    'use strict';

    require('./polyfills');

    // require dependencies
    var Server = require('socket.io'),
        utils  = require('./utils'),
        Base   = require('./base'),
        Room   = require('./room'),

    /**
     * @readonly
     * @private
     * @property {Namespace} nsp IO namespace
     */
    _nsp,

    /**
     * @readonly
     * @property {String} name Name of this channel
     */
    _name,

    /**
     * @readonly
     * @property {Room}[] rooms Rooms in this channel
     */
    _rooms = [];

    /**
     * @readonly
     * @property {Number} length Amount of rooms in this channel
     */

    /**
     * @readonly
     * @property {Object} info Information about this channel
     */

    /**
     * Fires when a room is added
     *
     * @event roomadd
     * @param {Room} room
     */

    /**
     * @constructor
     * @param   {Server} io     IO Server
     * @param   {String} name   Channel name
     * @returns {Channel}
     */
    function Channel (io, name) {
        // call parent constructor
        Base.apply(this, arguments);

        // define properties with accessors and mutators
        Object.defineProperties(this, {
            nsp: {
                get: function () {
                    return _nsp;
                }
            },
            name: {
                get: function () {
                    return _name;
                }
            },
            rooms: {
                get: function () {
                    return _rooms;
                }
            },
            length: {
                get: function () {
                    return _rooms.length;
                }
            },
            info: {
                get: function () {
                    return {
                        name : _name,
                        rooms: _rooms.map(function (room) {
                            return {
                                name: room.name
                            };
                        })
                    };
                }
            }
        });

        // manually check arguments
        if (!(io instanceof Server)) {
            throw new TypeError('Provided socket is not a Server');
        }
        if (!utils.isString(name)) {
            throw new TypeError('Name must me string');
        }
        if (!name.match(/[a-z0-9\-\_]{3,}/i)) {
            throw new Error('Name contains illegal characters');
        }

        // set properties
        _name = name.toLowerCase();
        _nsp  = io.of('/' + this.name);

        // register event listeners
        this.nsp.on('connection', this.onNamespaceConnection.bind(this));
    };

    // assign the prototype and constructor
    Channel.prototype = utils.copy({

        /**
         *
         * @param   {Socket} socket
         * @returns {void}
         */
        onNamespaceConnection: function (socket) {
            console.log('SOMEONE CONNECTED TO CHANNEL');

            socket.on('joinroom', this.onJoinRoom.bind(this, socket));

        },

        onJoinRoom: function (socket, name) {
            var room;

            if (!this.hasRoom(name)) {
                room = new Room(socket, name);
                this.rooms.push(room);

            }

        },

        /**
         * Add a new room to the channel if it does not already exist
         *
         * @param   {Room}  room Room or name
         * @returns {Room}
         */
//        addRoom: function (room) {
//            if (!(room instanceof Room)) {
//                room = new Room({ name: room });
//            }
//
//            if (!this.hasRoom(room)) {
//                this.rooms.push(room);
//                this.emit('roomadd', room);
//            }
//
//            return room;
//        },

        /**
         * Check if a room already exists
         *
         * @param   {Room} room Room instance or name
         * @returns {Room}
         */
        hasRoom: function (room) {
            var roomName = (room instanceof Room) ? room.name : room;

            return this.rooms.find(function (r) {
                return (r.name === roomName);
            });
        }
    }, Object.create(Base.prototype));

    // export the constructor
    module.exports = Channel;
}(module));
