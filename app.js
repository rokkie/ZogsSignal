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
 * Zogs' Signaling server
 *
 * @returns {void}
 */
(function () {
    'use strict';

    // require dependencies
    var express = require('express'),
        app     = express(),
        http    = require('http').Server(app),
        io      = require('socket.io')(http),

        Channel = require('./lib/channel'),
        Room    = require('./lib/room');

    // -------------------------------------------------------------------------

    var fooChannel = new Channel(io, 'foo');
//    var myRoom     = fooChannel.addRoom('bar');









    // -------------------------------------------------------------------------

    // set host:port
    app.set('port', process.env.PORT || 3000);
    app.set('host', 'localhost');

    // start server
    var server = http.listen(app.get('port'), app.get('host'), function () {
        var addr   = server.address(),
            msgTpl = 'Signaling server listening on http://%s:%s';
        console.log(msgTpl, addr.address, addr.port);
    });
}());
