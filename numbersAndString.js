/**
 * Created by tamir302 on 25/07/15.
 */
angular.
    directive('digitsAndString', function() {
    return {
        require: 'ngModel',
        link: function(scope, elem, attr, ngModelCtrl) {
            var gbString = ' ' + attr.digitsAndString;
            var isStringProgramiticallyAdded = false;
            // add a string to the model value and display it
            ngModelCtrl.$formatters.push(function(modelValue) {
                return modelValue + gbString;
            });
            ngModelCtrl.$render();

            // When input focused, remove string and raise a flag that it's editing mode
            elem.on('focus', function() {
                isStringProgramiticallyAdded = false;
                ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue);
                ngModelCtrl.$render();
            });
            // When blurred, add the string for display purposes and raise a flag that we added a string
            elem.on('blur', function() {
                isStringProgramiticallyAdded = true;
                ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue + gbString);
                ngModelCtrl.$render();
            });

            ngModelCtrl.$parsers.push(function(vieValue) {
                if (vieValue == undefined) return '';
                // remove non-numbers
                var transformedInput = vieValue.replace(/[^0-9]/g, '');
                // only remove non-numbers when typing and in focus state. When blurred and a string was added, don't do anything
                if (transformedInput != vieValue && !isStringProgramiticallyAdded) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return vieValue.replace(gbString, '');
            });


        }
    }
});
