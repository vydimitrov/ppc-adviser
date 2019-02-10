window.onload = function() {
    var inputs = document.querySelectorAll('.js-input');

    var valideInputs = 0;
    inputs.forEach(function(input) {
        input.oninput = function() {
            var isField = input.classList.value.indexOf('input-field') > -1;
            if (input.value !== '' && !isField) {
                input.classList.add('input-field');
            } else if (input.value === '' && isField) {
                input.classList.remove('input-field');
            }
        };
    });
};