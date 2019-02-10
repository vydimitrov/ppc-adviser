function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


window.onload = function() {
    var inputs = document.querySelectorAll('.js-input');
    var submitButton = document.querySelector('#js-submit-button');

    var isFormValide = function() {
        var valideInputs = 0;
        inputs.forEach(function(input) {
            if (input.type === 'email') {
                var isValide = validateEmail(input.value);
                if (!isValide) {
                    return false;
                }
            } else if (input.value === '') {
                return false;
            }

            valideInputs += 1;
        });

        return valideInputs === inputs.length;
    };

    inputs.forEach(function(input) {
        input.oninput = function() {
            var isField = input.classList.value.indexOf('input-field') > -1;
            if (input.value !== '' && !isField) {
                input.classList.add('input-field');
            } else if (input.value === '' && isField) {
                input.classList.remove('input-field');
            }

            var isValideForm = isFormValide();
            if (isValideForm) {
                submitButton.classList.remove('disabled');
            } else {
                submitButton.classList.add('disabled');
            }
        };
    });
};