angular
  .module('walletApp')
  .directive('minEntropy', minEntropy);

function minEntropy (MyWalletHelpers) {
  const directive = {
    restrict: 'A',
    require: 'ngModel',
    link: link
  };
  return directive;

  function link (scope, elem, attrs, ctrl) {
    let minimum = parseFloat(attrs.minEntropy);
    let scorePassword;

    MyWalletHelpers.then((helpers) => {
      scorePassword = helpers.scorePassword;
    });

    let checkEntropy = (viewValue) => {
      let score = scorePassword(viewValue);
      ctrl.$setValidity('minEntropy', score > minimum);
      return viewValue;
    };

    ctrl.$parsers.push(checkEntropy);
  }
}