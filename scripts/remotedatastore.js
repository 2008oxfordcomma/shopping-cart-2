(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    function RemoteDataStore(url) {
        if (!url) {
            throw new Error('No remote URL supplied.');
        }
        this.serverUrl = url;
    }

    RemoteDataStore.prototype.add = function (val) {
        $.post(this.serverUrl, val, function (serverResponse) {
            console.log(serverResponse);
        });
    };

    App.RemoteDataStore = RemoteDataStore;

    RemoteDataStore.prototype.getAll = function (func) {
        $.get(this.serverUrl, function (serverResponse) {
            console.log(serverResponse);
            func(serverResponse);
        });
    };

    RemoteDataStore.prototype.get = function (key, func) {
        $.get(this.serverUrl + '?emailAddress=' + key, function (serverResponse) {
            console.log(serverResponse);
            func(serverResponse);
        });
    };

    RemoteDataStore.prototype.remove = function (key) {
        $.ajax(this.serverUrl + '?emailAddress=' + key, {type: 'DELETE'});
    };

    window.App = App;
})(window);