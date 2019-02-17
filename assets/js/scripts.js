function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function handleForm() {
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
}

function handleCarousel() {
    var carousels = document.querySelectorAll('.js-carousel');

    carousels.forEach(function(carousel) {
        new Glider(carousel.querySelector('ul'), {
            slidesToShow: 1,
            arrows: {
                prev: carousel.querySelector('.arrow-left'),
                next: carousel.querySelector('.arrow-right')
              }
        });
    });
}

function handleScrollToForm() {
    var body = document.scrollingElement || document.documentElement;
    var items = document.querySelectorAll('.js-scroll-to-form');
    var form = document.querySelector('#contact-me');
    var time = 1000;

    items.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            var from = body.scrollTop;
            var offset = form.getBoundingClientRect().top;
            var start = new Date().getTime();

            window.requestAnimationFrame(scrollAnimation);

            function scrollAnimation() {
                var step = Math.min(1, (new Date().getTime() - start) / time);
                body.scrollTop = from + (step * offset);

                if (step !== 1) {
                    window.requestAnimationFrame(scrollAnimation);
                }
            }

        });
    });
}


window.onload = function() {
    handleForm();
    handleCarousel();
    handleScrollToForm();
};