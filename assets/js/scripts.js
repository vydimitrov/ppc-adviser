function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var isFormValide = function(inputs) {
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

function handleForm() {
    var inputs = document.querySelectorAll('.js-input');
    var submitButton = document.querySelector('#js-submit-button');

    inputs.forEach(function(input) {
        input.oninput = function() {
            var isField = input.classList.value.indexOf('input-field') > -1;
            if (input.value !== '' && !isField) {
                input.classList.add('input-field');
            } else if (input.value === '' && isField) {
                input.classList.remove('input-field');
            }

            var isValideForm = isFormValide(inputs);
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

function handleScrollTo() {
    var body = document.scrollingElement || document.documentElement;
    var anchors = document.querySelectorAll('a');

    anchors.forEach(function(anchor) {
        var href = anchor.getAttribute('href');
        var hashTagIndex = href.indexOf('#');
        if (hashTagIndex === -1 || hashTagIndex !== 0) {
            return;
        }

        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var scrollToElement = document.querySelector(href);

            if (!scrollToElement) {
                return;
            }
            
            var from = body.scrollTop;
            var offset = scrollToElement.getBoundingClientRect().top;
            var start = new Date().getTime();

            var time = 1000;
            if (offset < 700) {
                time = 300;
            } else if (offset < 2000) {
                time = 500;
            } else if (offset < 4000) {
                time = 700;
            }


            window.requestAnimationFrame(scrollAnimation);

            function scrollAnimation() {
                var step = Math.min(1, (new Date().getTime() - start) / time);
                body.scrollTop = from + (step * offset);

                if (step !== 1) {
                    window.requestAnimationFrame(scrollAnimation);
                } else {
                    window.location.hash = href.substring(1);
                    if (href.indexOf('contact-me') > -1) {
                        setTimeout(function() {
                            var firstInput = document.querySelector('form input');
                            firstInput.focus();

                            var isFreeAudit = anchor.getAttribute('data-free-audit');
                            if (isFreeAudit === 'true') {
                                var checkbox = document.querySelector('form .checkbox input');
                                checkbox.checked = true;
                            }
                        }, 200);
                    }
                }
            }

        });
    });
}

function handleFormSubmit() {
    var form = document.querySelector('#js-contact-me-form');
    var submitButton = document.querySelector('#js-submit-button');
    var sendText = document.querySelector('.js-send-text');
    var formContainer = document.querySelector('.form-container');
    var inputs = document.querySelectorAll('.js-input');
    var isLaoding = false;

    var submitForm = function(e) {
        e.preventDefault();

        var isValideForm = isFormValide(inputs);
        if (isLaoding || !isValideForm) {
            return;
        }

        isLaoding = true;
        var submitButton = document.querySelector('#js-submit-button');
        submitButton.classList.add('is-loading');
        sendText.innerHTML = 'sending';

        var request = new XMLHttpRequest();
        
        request.onreadystatechange = function() {
            if (request.readyState !== 4) {
              return;
            }
            if (request.status === 0) {
              return;
            }
            if (request.status !== 200) {
                console.log('Error');
                return;
            }

            formContainer.classList.add('form-submitted');
        };

        request.onerror = function(error) {
            console.log(error)
        };

        var formData = new FormData(form);
        
        request.open('POST', '/api/send-mail.php', true);
        request.send(formData);
    };

    submitButton.addEventListener('click', submitForm);
    form.addEventListener('submit', submitForm);
}

function loadImages() {
    var attr = 'data-src';
    document.querySelectorAll('img').forEach(function(img) {
        var dataSrc = img.getAttribute(attr);
        
        if (!dataSrc) {
            return;
        }

        img.setAttribute('src', dataSrc);
        img.removeAttribute(attr);
    });
}

function cookiePolicy() {
    document.querySelector('.js-btn-coookie').addEventListener('click', function() {
        document.querySelector('.cookie-policy').classList.add('hidden');
    });
}

function stickyHeader() {
    var header =  document.querySelector('.js-sticky-header');
    var headerTrigger =  document.querySelector('.js-sticky-header-trigger');


    if ('matchMedia' in window && window.matchMedia('(max-width: 767px)').matches) {
        return;
    }

    new Waypoint({
        element: headerTrigger,
        handler: function(direction) {
            if (direction === 'down') {
                header.classList.add('visible');
            } else {
                header.classList.remove('visible');
            }
        }
    });

    new Waypoint({
        element: header,
        handler: function(direction) {
            if (direction === 'down') {
                header.classList.add('fixed');
            } else {
                header.classList.remove('fixed');
            }
        },
        offset: function () {
            return -(this.adapter.outerHeight() + 100);
        }
    });
}


window.onload = function() {
    handleForm();
    handleFormSubmit();
    handleCarousel();
    handleScrollTo();
    loadImages();
    cookiePolicy();
    stickyHeader();
};