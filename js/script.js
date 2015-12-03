var app = angular.module('terminal', []);
app.controller('Main',['$scope', function ($scope) {
  $scope.console_field = '';
  $scope.console_messages = [];
  $scope.body = $('body');
  $scope.available_commands = {
    "clear": function() {
      $scope.console_messages = [];
    }
    , "help": function() {
      $scope.addMessage("Available Commands:");
      $scope.addMessage("clear - clears the console window");
      $scope.addMessage("help - lists all commands");
      $scope.addMessage("shake - go fucking crazy");

    }
    , "shake": function() {
      $scope.addMessage("AHHHHHHHHHHHH", 'always-crazy');
    }
  };
  $scope.interpretKeypress = function(e) {
    if (e.which === 13) {
      var message = $scope.console_field;
      $scope.addMessage('User$ ' + message);
      $scope.interpretCommand(message);
      $scope.console_field = ''
    }
  };
  $scope.interpretCommand = function(command) {
    if ($scope.available_commands[command]) {
      $scope.available_commands[command]();
    }
  };
  $scope.addMessage = function(message, klass) {
    klass = klass || ''
    $scope.console_messages.push({ text: message, klass: klass });

    window.setTimeout(function() {
      jQuery("html, body").scrollTop(jQuery(document).height()) 
    }, 10);
  };
}]);
app.directive('terInput', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.focus();
    }
  };
});
app.directive('terFocusInput', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('click', function() {
        jQuery("#console-input").focus();
      });
    }
  };
});