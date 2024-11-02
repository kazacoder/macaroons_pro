$(document).ready(function () {
    // Input Mask applying for phone
    $('#phone').inputmask({"mask": "+7 (999) 999-9999"});


    const order = $('#order')[0]
    const products = $('#products')[0]

    $('#menu-order').on('click', function () {
        order.scrollIntoView({behavior: 'smooth'});
    })

    $('#menu-about').on('click', function () {
        $('#about')[0].scrollIntoView({behavior: 'smooth'});
    })

    $('#menu-products').on('click', function () {
        products.scrollIntoView({behavior: 'smooth'});
    })

    $('#main-order').on('click', function () {
        products.scrollIntoView({behavior: 'smooth'});
    })

    const menu = $('#menu')
    const menuClose = $('#menu__close')
    const burger = $('#burger')

    burger.on('click', function () {
        menu.addClass('open')
        menuClose.addClass('rotated')
        burger.addClass('pressed')
    })

    menu.on('click', function () {
        menu.removeClass('open')
        menuClose.removeClass('rotated')
        burger.removeClass('pressed')
    })

    $('.product__btn').on('click', function () {
        let chosen_product = $(this).parent().parent().parent().find('.product__title').text();
        console.log(chosen_product);
        $('#choice').val(chosen_product);
        order.scrollIntoView({behavior: 'smooth'});
        $('#name')[0].focus({preventScroll: true});
    })

    // form validation and sending and handling
    let inputs = $('form input')
    const phonePattern = /\+7 \(\d{3}\) \d{3}-\d{4}/;
    let loader = $('.loader')

    $('form').on('submit', function (e) {
        e.preventDefault();
        $('form .invalid-feedback').hide().text('Необходимо ввести ')
        inputs.removeClass('invalid-value');
        let hasError = false;
        inputs.each(function (idx, elem) {
            let jqElem = $(elem);
            let invalidFeedback = jqElem.next('.invalid-feedback')
            if (elem.value === '') {
                invalidFeedback.text(`${invalidFeedback.text()} ${elem.title}`)
                invalidFeedback.show()
                jqElem.addClass('invalid-value')
                hasError = true
            } else if (!phonePattern.test(this.value) && elem.id === 'phone') {
                invalidFeedback.text(`${invalidFeedback.text()} ${elem.title}`)
                jqElem.addClass('invalid-value')
                invalidFeedback.show()
                hasError = true;
            }
        });
        if (!hasError) {
            loader.css('display', 'flex');
            let formData = {};
            inputs.each(function (idx, elem) {
                formData[elem.name] = elem.value
            })
            const url = 'https://testologia.ru/checkout'

            // таймер для имитации ожидания ответа от сервера, чтобы увидеть лоадер

            setTimeout(function(){
                $.ajax({
                    method: 'POST',
                    url: url,
                    data: formData,
                }).done(function (response) {

                    if (response.success) {
                        $('.order__wrapper').css('opacity', 0);
                        $('.order__success').css({'opacity': 1, 'z-index': 1});
                        loader.hide()
                    } else {
                        $('#error-popup').text('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                        $.magnificPopup.open({
                            items: {
                                src: '#error-popup'
                            },
                            type: 'inline',
                            fixedContentPos: true,
                        });
                        loader.hide()
                    }
                })
            }, 1200);

        }
    })

    // check validity inputs during typing
    inputs.on('input', function () {
        if (this.id === 'phone') {
            if (phonePattern.test(this.value)) {
                $(this).removeClass('invalid-value').next('.invalid-feedback').hide();
            }
        } else if (this.value) {
            $(this).removeClass('invalid-value').next('.invalid-feedback').hide();
        }
    })

})

