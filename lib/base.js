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
 * Base class
 *
 * @class   Base
 * @extends {Observable}
 */
(function (module) {
    'use strict';

    // require dependencies
    var events = require('events'),
        utils  = require('./utils'),

    /**
     * @readonly
     * @private
     * @property {EventEmitter} emitter Event emitter
     */
    _emitter = new events.EventEmitter();

    /**
     * @constructor
     * @returns {Base}
     */
    function Base () {

        // define properties with accessors and mutators
        Object.defineProperties(this, {
            emitter: {
                get: function () {
                    return _emitter;
                }
            }
        });
    };

    // assign the prototype and constructor
    Base.prototype = utils.copy({
        /**
         * Adds a listener to the end of the listeners array for the specified event
         *
         * @chainable
         * @param  {String}     event    Event name
         * @param  {Function}   listener Callback
         * @return {Observable} Provides fluent interface
         */
        on: function (event, listener) {
            this.emitter.on(event, listener);
            return this;
        },

        /**
         * Execute each of the listeners in order with the supplied arguments
         *
         * @param  {String}    event The event to emit
         * @param  {Object...} args
         * @return {Boolean}   TRUE is the event had listeners, FALSE otherwise
         */
        emit: function (event) {
            return this.emitter.emit.apply(this.emitter, arguments);
        }
    }, Object.create(Object.prototype));
    Base.prototype.constructor = Base;

    // export the constructor
    module.exports = Base;
} (module));
