// Брэйкпоинты js
var	breakXl = 1441,
		breakLg = 1200,
		breakMd = 1024,
		breakSm = 769,
		breakXs = 500;

		toggleOpenMenu = false;

$(document).ready(function () {			

	// Отмена перехода по ссылкам
	$('a[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Отложенная загрузка
	$('.lazy').Lazy();

	// Меню
	myMenu($('.js-headerMenu'), $('.js-headerMenuBtn'));
	myMenu($('.js-CityMenu'), $('.js-CityMenuBtn'));

	// Слайдер в банере утп
	slider($('.js-banner-slider'));
	// Слайдер в карточках
	sliderCard($('.js-card-slider'));
	// Слайдер в slider
	sliderSlider($('.js-slider'));

	// Стилизация селекта
	selectStyled();

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку.
	menuScroll($('#toUp'));

	// Inputmask.js // Маска для поля ввода телефона
	if ($('.phone-mask').length) {
		$('.phone-mask').inputmask("+7(999)999-99-99",{ showMaskOnHover: false });
	}

	// Маска для поля ввода времени в корзине
	if ($('.time-mask').length) {
		$('.time-mask').inputmask("99.99",{ showMaskOnHover: false });
	}

	// Выводить лишние пункты меню табов в выпающий список
	tabsMenu($('.js-tabs-1'));
	tabsMenu($('.js-tabs-2'));
	tabsMenu($('.js-tabs-3'));

	// Табы
	tabs($('.js-tabs-1'));
	tabs($('.js-tabs-2'));

	// Таб на странице товара
	tabs($('.js-productTabs'));

	// matchHeight // Задание елементам одинаковой высоты
	if ($('.card_name').length) {
		$('.card_name').matchHeight();
	};

	// Запуск видео
	videoPlay($('.js-video'));

	// Фильтр по цене
	filterPrice();
	
	// Модальное окно
	// Задать кнопке, по которой открывается окно класс ".modal-trigger" и атрибут "data-modal", с id окна.
	// Пример <button>(class="modal-trigger" data-modal="#modal-1")</button>
	modal();

	// Открыть модальное окно
	modalShow($('#modal-1'));

	// Закрыть модальное окно
	modalHide($('#modal-1'));

	// Слайдер на странице товара
	sliderProduct($('.slider-product-nav'),$('.slider-product-for'));

	// Инициализация стилизуемого скроллбара
	if ($('.js-scrollbar').length) {
		$('.js-scrollbar').scrollbar();
	}

	// Калькулятор скидки
	discountCounter();

	// разбивка суммы на тысячные
	rank();

	// Вставляет svg в html, позволяет управлять цветом через css 
	$('img[src$=".svg"]').each(function(){
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		$.get(imgURL, function(data) {
			var $svg = $(data).find('svg');
			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
			}
			$svg = $svg.removeAttr('xmlns:a');
			if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}
			$img.replaceWith($svg);
		}, 'xml');
	});

	// Блок оформления заказа
	function cartSteps() {
		var items = $('.cartSteps_item'),
				forms = $('.cartSteps_form'),
				btn = $('.cartSteps_btn'),
				time = 100;
		btn.on('click', function () {
			var data = $(this).data('id'),
					form = $(data),
					item = $('.cartSteps_item[data-id="' + data + '"]');
			forms.fadeOut(time, function() {
				forms.removeClass('show');
			});
			form.fadeIn(time, function () {
				form.addClass('show');
			});
			if ($(this).hasClass('cartSteps_btn--prev')) {
				item.next().removeClass('active');
			}else {
				item.addClass('active');
			}
		});
	}
	cartSteps();

	// Добавить убрать количество товара
	function inputCount() {
		var count = $('.cartItem_count');
		count.each(function () {
			var minus = $(this).find('.cartItem_arrow--minus'),
					input = $(this).find('.cartItem_result input'),
					plus = $(this).find('.cartItem_arrow--plus'),
					val = 0;
			minus.click(function() {
				if (val > 1) {
					val --;
					input.val(val);
				}
			});
			plus.click(function() {
				if (val < 999) {
					val ++;
					input.val(val);
				}
			});
		})
	};
	inputCount();

	// яндекс карта	
	if ($('.maps-block').length) {
		ymaps.ready(init_contact);
		function init_contact(){
			$('.maps-block').each(function(){
				var coords = JSON.parse('[' + $(this).data('coords-center') + ']'),
					name_dom = $(this).data('name'),
					link_json = $(this).data('link');
					zoom = $(this).data('zoom');
				var myMap = new ymaps.Map('raionMaps', {
					center: coords,
					zoom: zoom,
					controls: []
				}, {
					geolocationControlFloat: 'right',
					zoomControlSize: 'small',
					searchControlProvider: 'yandex#map',
				});
				myMap.controls.add(
					new ymaps.control.ZoomControl({
						options: { position: { right: 10, top: 200 }}
					}),
					new ymaps.control.SearchControl({
						noPlacemark: true
					})
				);
				myMap.behaviors.disable('scrollZoom'); 
				
				objectManager = new ymaps.ObjectManager({
					clusterize: false,
					gridSize: 35,
					clusterDisableClickZoom: false, // не увеличивать при клике
					clusterBalloonContentLayout: "cluster#balloonAccordion", // акардион в балуне
					clusterBalloonCycling: false,
					clusterOpenBalloonOnClick: true, // не открывать балун
					clusterBalloonAccordionShowIcons: false,  // не открывать иконку в балуне
					clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="clusterIcon">{{ properties.geoObjects.length }}</div>'),
					clusterIconShape: {
						type: 'Rectangle',
						coordinates: [[40, 40], [-20, -20]]
					},
				});
				objectManager.objects.options.set('preset', {
					iconImageHref: "/upload/map/house.png",
					iconLayout: "default#image", 
						iconImageSize: [50, 50],
						iconImageOffset: [-25, -50]
				});
				
				if (link_json !== ''){
					myMap.geoObjects.add(objectManager);
					$.ajax({
						url: link_json
					}).done(function(data) {
						objectManager.add(data);
					});
				}
				
				if (name_dom !== ''){
					myMap.geoObjects.add(new ymaps.Placemark(myMap.getCenter(), {
						balloonContent: '<div class="maps-wrap"><div class="mapsItem__name">' + name_dom + '</div></div>',
						//hintContent: 'Собственный значок метки',
					}, {
						iconLayout: 'default#image',
						iconImageHref: '/upload/map/house.png',
						iconImageSize: [50, 50],
						iconImageOffset: [-25, -50]
					}));
				}
				
			});
		};
	}

	// Выпадающий календарь в корзине
	if ($( "#datepicker" ).length) {
		$( "#datepicker" ).datepicker({
			buttonImageOnly: false,
			buttonImage: '../img/arrow.svg'
		});	
		$.datepicker.setDefaults( $.datepicker.regional[ "ru" ] );

		// Российская локализация календаря
		( function( factory ) {
			if ( typeof define === "function" && define.amd ) {

				// AMD. Register as an anonymous module.
				define( [ "../widgets/datepicker" ], factory );
			} else {

				// Browser globals
				factory( jQuery.datepicker );
			}
		}( function( datepicker ) {

		datepicker.regional.ru = {
			closeText: "Закрыть",
			prevText: "&#x3C;Пред",
			nextText: "След&#x3E;",
			currentText: "Сегодня",
			monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь",
			"Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
			monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн",
			"Июл","Авг","Сен","Окт","Ноя","Дек" ],
			dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
			dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
			dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
			weekHeader: "Нед",
			dateFormat: "dd.mm.yy",
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: "" };
		datepicker.setDefaults( datepicker.regional.ru );

		return datepicker.regional.ru;

		} ) );
	};

	// Поля в корзине
	function inputToggleActive() {
		var block = $('.cartSteps'),
				checkboxIm = block.find('#checkbox_0'),
				checkboxNot = block.find('#checkbox_1'),
				checkboxNotRow = block.find('#checkboxNotRow'),
				nameUp = block.find('#nameUp'),
				telUp = block.find('#telUp'),
				nameTo = block.find('#nameTo'),
				telTo = block.find('#telTo');
		checkboxIm.change(function () { 
			if ($(this).is(':checked')) {
				valEnter();
				checkboxNotRow.css('display','none');
			}else {
				valClear();
				checkboxNotRow.css('display','flex');
			}
		});
		checkboxNot.change(function () {
			if ($(this).is(':checked')) {
				telTo.val('').attr('disabled','');
			}else {
				telTo.removeAttr('disabled');
			}
		});
		function valEnter() {
			nameTo.val(nameUp.val()).attr('disabled','');
			telTo.val(telUp.val()).attr('disabled','');
		}
		function valClear() {
			nameTo.val('').removeAttr('disabled');
			telTo.val('').removeAttr('disabled');
		}
	}
	inputToggleActive();

	// Сделать скролл если много товара в корзине
	function cartScroll() {
		var block = $('.cartResult_storefront'),
				item = block.find('.cartItem'),
				itemLength = item.length,
				itemHeight = item.outerHeight(),
				remove = block.find('.cartItem_remove'),
				num = 3;
		inScroll();
		remove.click(function () {
			$(this).closest('.cartItem').remove();
			itemLength -= 1;
			inScroll();		
		});
		function inScroll() {
			if (itemLength > num) {
				block.css({
					'height': itemHeight * num,
					'overflow-y': 'scroll'
				});
			}else {
				block.css({
					'height': 'auto',
					'overflow-y': 'visible'
				});
			}
		}		
	}
	cartScroll();

});

// Меню
function myMenu(menu, menuBtn) {
	var	header = $('#header'),
			headerHeight = header.outerHeight(),
			content = $('.content'),
			allMenu = $('.js-menu'),
			allMenuBtn = $('.js-menuBtn'),
			html = $('html'),
			link = menu.find('a'),
			documentWidth = parseInt(document.documentElement.clientWidth),
			windowsWidth = parseInt(window.innerWidth),
			scrollbarWidth = windowsWidth - documentWidth;
	menuBtn.on('click', function () {
		if (menu.hasClass('open')) {
			menuClose();
		}else if (toggleOpenMenu) {
			allMenu.fadeOut().removeClass('open');
			allMenuBtn.removeClass('is-active');
			menuOpen();
		}else {
			menuOpen();
		}
	});
	link.on('click', function () {
		if ($(this).closest('.menu').hasClass('js-CityMenu')) {
			menuBtn.text($(this).text());
			menuClose();
		}
	})
	menu.css('padding-top',headerHeight + 10 + 'px');
	function menuOpen() {
		menuBtn.addClass('is-active');
		menu.fadeIn().addClass('open');
		// html.addClass('lock').css('padding-right',scrollbarWidth);
		header.addClass('stiky');
		content.css('margin-top',headerHeight);
		toggleOpenMenu = true;
	}
	function menuClose() {
		menuBtn.removeClass('is-active');
		menu.fadeOut().removeClass('open');
		// html.removeClass('lock').css('padding-right',0);
		header.removeClass('stiky');
		content.css('margin-top',0);
		toggleOpenMenu = false;
	}
};

// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку.
function menuScroll(menuItem) {
	menuItem.find('a[href^="#"]').click( function(){
		var scroll_el = $(this).attr('href'),
				time = 500;
		if ($(scroll_el).length != 0) {
		$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, time);
			$(this).addClass('active');
		}
		return false;
	});
};

// Табы
function tabs(tabs) {
	var trigger = tabs.find('.js-tabs-trigger'),
			content = tabs.find('#tabs_content').children();
	trigger.click(function() {
		var $this = $(this),
				index = $this.data('trigger');
		if (!$this.hasClass('active')) {
			trigger.removeClass('active');
			$this.addClass('active');
			content.removeClass('show');
			content.eq(index).addClass('show').find('.js-card-slider').slick('setPosition');
		}else {
			return false
		}
	});
};

// Модальное окно
function modal() {
	$('.modal-trigger').on('click', function() {
		var $this = $(this),
				data = $this.data('modal'),
				thisModal = $(data);
		modalShow(thisModal);
	});
};
// Открытие модального окна
function modalShow(thisModal) {
	var html = $('html'),
			modalClose = thisModal.find($('.modal_close')),
			documentWidth = parseInt(document.documentElement.clientWidth),
			windowsWidth = parseInt(window.innerWidth),
			scrollbarWidth = windowsWidth - documentWidth;
	thisModal.show(0, function() {
		setTimeout(thisModal.addClass('open'),500);
	});
	// html.addClass('lock').css('padding-right',scrollbarWidth);
	modalClose.on('click', function() {
		modalHide(thisModal);
	});
	thisModal.on('click', function(e) {
		if (thisModal.has(e.target).length === 0) {
			modalHide(thisModal);
		}
	});
};
// Закрытие модального окна
function modalHide(thisModal) {
	var html = $('html');
	thisModal.removeClass('open');
	thisModal.hide();
	// html.removeClass('lock').css('padding-right',0);
};

// Слайдер в банере утп
function slider(slider) {
	if (slider.length) {
		slider.slick({
    	slidesToShow: 1, // Сколько слайдов показывать на экране
			slidesToScroll: 1, // Сколько слайдов пролистывать за раз
			dots: true, // Пагинация
			arrows: false, // Стрелки
			appendDots: $('.banner_dots'),
			fade: true, // Плавный переход (анимация исчезновения появления) В false будет листаться
		});

		// Кастомные кнопки "вперед" "назад"
		$('.banner_arrow--prev').click(function() {
			slider.slick('slickPrev');
		});
		$('.banner_arrow--next').click(function() {
			slider.slick('slickNext');
		});
	}
};

// Слайдер в карточках
function sliderCard(slider) {
	if (slider.length) {
		slider.slick({
			slidesToShow: 1, // Сколько слайдов показывать на экране
			slidesToScroll: 1, // Сколько слайдов пролистывать за раз
			dots: false, // Пагинация
			arrows: false, // Стрелки
			infinite: true, // Зацикленное пролистывание
		});
		// Кастомные кнопки "вперед" "назад"
		$('.card_arrow--prev').click(function() {
			$(this).siblings('.js-card-slider').slick('slickPrev');
		});
		$('.card_arrow--next').click(function() {
			$(this).siblings('.js-card-slider').slick('slickNext');
		});
	}
};

// Слайдер в slider
function sliderSlider(slider) {
	if (slider.length) {
		slider.slick({
			slidesToShow: 1, // Сколько слайдов показывать на экране
			slidesToScroll: 1, // Сколько слайдов пролистывать за раз
			dots: false, // Пагинация
			arrows: false, // Стрелки
			infinite: true, // Зацикленное пролистывание
			centerMode: true, // Задает класс .slick-center слайду в центре
			centerPadding: '450px', // Отступы слева и справа чтоб увидеть часть крайних слайдов
			adaptiveHeight: false, // Подгоняет высоту слайдера под элемент слайда
			variableWidth: false, // Подгоняет ширину слайдов под размер элемента,
			appendDots: $('.banner_dots'),
			variableWidth: true,
			responsive: [ // Адаптация
				{
				breakpoint: breakMd,
					settings: {
						centerMode: false,
						// centerPadding: '100px',
						variableWidth: false,
					}
				},
				{
				breakpoint: breakSm,
					settings: {
						centerMode: false,
						variableWidth: false,
					}
				},
				{
				breakpoint: breakXs,
					settings: {
						centerMode: false,
						variableWidth: false,
					}
				},
			]
		});
		// Кастомные кнопки "вперед" "назад"
		$('.slider_arrow--prev').click(function() {
			slider.slick('slickPrev');
		});
		$('.slider_arrow--next').click(function() {
			slider.slick('slickNext');
		});
	}
};

// Запуск видео
function videoPlay(video) {
	video.each(function () {
		var img = $(this).find('#videoImg'),
				play = $(this).find('#play'),
				video = $(this).find('video');
		img.click(videoStart);
		play.click(videoStart);
		function videoStart() {
			img.css('display','none');
			play.css('display','none');
			video.css('display','block')[0].play();
		}
	})
}

// Выводить лишние пункты меню табов в выпающий список
function tabsMenu(tabs) {
	tabs.each(function () {
		var numItem = 5, // сколько пунктов выводить
				tabsMenu = $(this).find('#tabs_triggers'), // меню
				tabsDropBtn = $(this).find('.tabsDrop'), // кнопка выпадайки
				tabsDropList = $(this).find('#tabsDrop_list'), // выпадайка
				items = $(this).find('.js-tabs-trigger'), // все пункты
				countItems = items.length; // общее колличество пунктов
		windowResizeInitFunc();
		itemsSlice();
		dropMenu();
		$(window).resize(function () {
			windowResizeInitFunc();
			itemsSlice();
			dropMenu();
		})
		function dropMenu() { // появление выпадайки при клике на кнопку
			tabsDropBtn.on('click', function () {
				tabsDropList.stop().slideToggle(300);
			})
		}
		function itemsSlice() { // распределение пунктов по менюшкам
			if (countItems > numItem) {
				tabsMenu.html(items.slice(0,numItem)).append(tabsDropBtn);
				tabsDropBtn.css('display','block');
				tabsDropList.html(items.slice(numItem));
			}else {
				tabsMenu.html(items.slice(0,numItem)).append(tabsDropBtn);
				tabsDropBtn.css('display','none');
				tabsDropList.html(items.slice(numItem));
			}
		}
		function windowResizeInitFunc() { // условия для разных размеров экрана
			if ($(window).width() > breakMd) {
				numItem = 5;
			}else if ($(window).width() <= breakMd && $(window).width() > breakSm) {
				numItem = 3;
			}else if ($(window).width() <= breakSm && $(window).width() > breakXs) {
				numItem = 2;
			}else if ($(window).width() <= breakXs) {
				numItem = 0;
			}
		}
	})
}

// разбивка суммы на тысячные
function rank(){
  $('.rank').each(function(){
    var rank = $(this).text();
    var rank_val = $(this).val();
    $(this).text(rank.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    $(this).val(rank_val.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
  });
};

// Калькулятор скидки
function discountCounter() {
	$('.card_prices').each(function(){
		var price = parseInt($(this).find('.card_price').text());
		var price_old = parseInt($(this).find('.card_old-price').text());
		var discont = price_old - price;
		$(this).find('.card_discount-price').text('-' + discont + ' ₽');
	});	
}

// Стилизация селекта
function selectStyled() {
	$('.select').each(function() {
    const _this = $(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
				duration = 300; // длительность анимации 

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $('<div>', {
        class: 'new-select',
        text: selectedOption.text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
        class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 0; i < selectOptionLength; i++) {
        $('<div>', {
            class: 'new-select__item',
            html: $('<span>', {
                text: selectOption.eq(i).text()
            })
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function() {
        if ( !$(this).hasClass('on') ) {
            $(this).addClass('on');
            selectList.slideDown(duration);

            selectItem.on('click', function() {
                let chooseItem = $(this).data('value');

                $('select').val(chooseItem).attr('selected', 'selected');
                selectHead.text( $(this).find('span').text() );

                selectList.slideUp(duration);
                selectHead.removeClass('on');
            });

        } else {
            $(this).removeClass('on');
            selectList.slideUp(duration);
        }
    });
	});	
}

// Фильтр по цене
function filterPrice() {
	var filter = $('.filter_slider'),
			range = filter.find('.filter_range'),
			fieldMin = filter.find('#rangeMin'),
			fieldMax = filter.find('#rangeMax');
	if (range.length > 0) {
		range.slider({
			animate: "slow",
			range: true,
			min: 0,
			max: 10000, 
			values: [0,10000],
			slide: function(event, ui) {
				fieldMin.val(ui.values[ 0 ] + ' ₽');
				fieldMax.val(ui.values[ 1 ] + ' ₽');
			},
		});
		fieldMin.on('input', function () {
			var val = parseInt($(this).val());
			range.slider( "values",0, val);
		});
		fieldMax.on('input', function () {
			var val = parseInt($(this).val());
			range.slider( "values",1, val);
		});
		$('.ui-slider-handle').html('<span class="handle-inner"></span>');
	}
}

// Слайдер на странице товара
function sliderProduct(slider,sliderFor) {
	if (slider.length) {
		slider.slick({
			slidesToShow: 5, // Сколько слайдов показывать на экране
			slidesToScroll: 1, // Сколько слайдов пролистывать за раз
			asNavFor: sliderFor, // Связь со слайдерами
			arrows: false, // Стрелки
			centerMode: true, // Задает класс .slick-center слайду в центре
			focusOnSelect: true, // Выбрать слайд кликом
			infinite: true, // Зацикленное пролистывание
			centerPadding: '0px', // Отступы слева и справа чтоб увидеть часть крайних слайдов
			swipe: true, // Перелистывание пальцем
			draggable: true, // Перелистывание мышью
			responsive: [ // Адаптация
				{
				breakpoint: breakXl,
					settings: {
						slidesToShow: 4,
					}
				},
				{
				breakpoint: breakXs,
					settings: {
						slidesToShow: 3,
					}
				},
			]
		});
	}
	
	if (sliderFor.length) {
		sliderFor.slick({
			slidesToShow: 1, // Сколько слайдов показывать на экране
			slidesToScroll: 1, // Сколько слайдов пролистывать за раз
			fade: true, // Плавный переход (анимация исчезновения появления) В false будет листаться
			asNavFor: slider, // Связь со слайдерами
			prevArrow: '<div class="slider-product-for_arrow slider-product-for_arrow--prev"><img src="img/arrow.svg"></div>',
			nextArrow: '<div class="slider-product-for_arrow slider-product-for_arrow--next"><img src="img/arrow.svg"></div>',
		});
	}
};