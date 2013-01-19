/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */

/***************************************************
 *                Avoid overview                   *
 *                                                 *
 * Avoids enabling Overview mode in gnome shell    *
 * when the last window in a virtual desktop is    *
 * closed.                                         *
 *                                                 *
 * Useful when using icons in the desktop          *
 *                                                 *
 * Created by rastersoft, and distributed under    *
 * GPLv2 or later license.                         *
 *                                                 *
 *                                                 *
 ***************************************************/

/* Versions:

    1: First public version

*/

const Main = imports.ui.main;

let defaultCheckWorkspacesFunction;
let defaultShowFunction;
let _checkingWorkspaces;

function enable() {

    defaultCheckWorkspacesFunction=Main._checkWorkspaces;
    defaultShowFunction=Main.overview.show;

    _checkingWorkspaces=false;

    Main.overview.show=function() {
        if(_checkingWorkspaces==false) {
            defaultShowFunction.call(Main.overview);
        }
    };

    Main._checkWorkspaces=function() {
        _checkingWorkspaces=true;
        defaultCheckWorkspacesFunction.call(Main);
        _checkingWorkspaces=false;
    };
}


function disable() {
    Main._checkWorkspaces=defaultCheckWorkspacesFunction;
    Main.overview.show=defaultShowFunction;
}

function init() {
    // Nothing to do
}

