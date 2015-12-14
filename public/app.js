;(function () {
  'use strict';

  // GLOBALS

  var global = this; // window

  var angular = global.angular; // Angular
  var _ = global._;   // Lodash
  var Rx = global.Rx; // RxJS
  var io = global.io; // socket.io

  var app = angular.module('RealtimeTracker', []);

  app.directive('dsTrack', [
    'RealtimeTrackingService',
    function trackDirective(Service) {

      return {
        restrict: 'EAC',
        link: function trackLinker(scope, element, attrs) {

          element.on('click', function (evt) {

            console.log('clicked', evt);
            Service.notify(evt);
          });

        }
      };

    }
  ]);

  app.service('RealtimeTrackingService', function RealtimeTrackingService() {
    var self = this;
    var socket = io();

    global.RealtimeService = this;

    self.notify = function notify(evt) {

      socket.emit('user event', {
        event: {
          type: evt.type,
          timestamp: evt.timeStamp
        }
      });
    };

  });

}.call(this));