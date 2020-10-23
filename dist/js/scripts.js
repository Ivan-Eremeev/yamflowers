/*!
 *
 * Ivan Eremeev - 2019
 * Skype: ivan.eremeev_1
 * Telegram: IvanMessage
 * Email: ivan.frontcoder@gmail.com
 *
 */

// Брэйкпоинты js
var	breakXl = 1441,
		breakLg = 1200,
		breakMd = 1024,
		breakSm = 769,
		breakXs = 426;

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

	// Блок с высотой окна браузера
	// screenHeight($('#full-height'));

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку.
	menuScroll($('#toUp'));

	// Загрузка SVG кодом в HTML
	// svg4everybody();

	// Stiky menu // Липкое меню. При прокрутке добавляем класс stiky.
	// stikyMenu($('#header'));

	// Inputmask.js // Маска для поля ввода телефона
	$('[name=tel]').inputmask("+7(999)999-99-99",{ showMaskOnHover: false });

	// Выводить лишние пункты меню табов в выпающий список
	tabsMenu($('.js-tabs-1'));
	tabsMenu($('.js-tabs-2'));

	// Табы
	tabs($('.js-tabs-1'));
	tabs($('.js-tabs-2'));

	// Аккордеон
	// accordeon($('#accordeon'));

	// matchHeight // Задание елементам одинаковой высоты
	$('.card_name').matchHeight();

	// Запуск видео
	videoPlay($('.js-video_img'))
	videoPlay($('.js-video_phone'))

	// Фильтр по цене
	filterPrice();

	// Autosize Изменение высоты текстового поля при добавлении контента
	// autosize($('textarea'));
	
	// Модальное окно
	// Задать кнопке, по которой открывается окно класс ".modal-trigger" и атрибут "data-modal", с id окна.
	// Пример <button>(class="modal-trigger" data-modal="#modal-1")</button>
	modal();

	// Открыть модальное окно
	modalShow($('#modal-1'));

	// Закрыть модальное окно
	modalHide($('#modal-1'));

	// Выпадайка в фильтре
	function drop() {
		var btn = $('.filter_title'),
				list = $('.filter_list'),
				label = $('.filter_label');
		btn.on('click', function() {
			if ($(window).width() <= breakLg) {
				list.stop().slideToggle();
			}
		});
		label.on('click', function() {
			if ($(window).width() <= breakLg) {
				list.slideUp();
			}
		});
		function widthCheck() {
			if ($(window).width() <= breakLg) {
				list.css('display','none');
			}else if ($(window).width() > breakLg) {
				list.css('display','flex');
			}
		}
		widthCheck();
		$(window).resize(function () {
			widthCheck();
		})
	}
	drop();

	// Слайдер на странице товара
	sliderProduct($('.slider-product-nav'),$('.slider-product-for'));

	// Текст печатная машинка
	// textPrint($('#text-print'));

	// Анимация увеличения значения числа
	// countNumber($(".count-number"));

	// Делает активным пункт меню при скролле до блока
	// menuItemActive($("#menu_list"));

	// Изменение textarea при получении фокуса
	// focusTextarea($('textarea'));

	// Изменение поля ввода при клике по его контейнеру
	// focusInput($('.block_input'));

	// Запуск и остановка видео html5
	// videoControll($('.video'));

	// Инициализация fancybox
	// fancybox($('.fancy'));

	// Программное включение fancybox по клику
	// fancyboxProgramm($('#fancy'));

	// Инициализация fullpage
	// fullpage($('#fullpage'));

	// Инициализация mmenu
	// mmenu($('#mmenu'));

	// Инициализация slick слайдера
	// slider($('.slider'),$('.slider-for'));

	// Инициализация tinyscrollbar
	// tinyscrollbar($('#scrollbar1'));

	// Инициализация tooltipster
	// tooltipster($('.tooltip'));

	// Инициализация Яндекс карты
	// ymaps.ready(initYandexMap);

	// Инициализация Google карты
	// initGoogleMap();

	// Инициализация стилизуемого скроллбара
	// $('#scrollbar').scrollbar();

	// 3d эффект вращения элемента при наведении
	// rotate($('.card3d'));

	// Показать еще новости
	// limitBlock($('#news'));

	// Ограничение выводимых символов в блоке текста
	// function textLimit(blockText);

	// Паралакс относительно курсора мыши
	// направление - data-direction="x или y или xy"
	// интенсивность - data-intensity="3"
	// скорость в мс - data-speed="100"
	// parallaxMove($('.parallax-move'));

	// Отслеживание скролла окна браузера
	// $(window).scroll(function() {
	// 	// countNumber($(".count-number")); // Анимация увеличния значения числа
	// });

	// Отслеживание изменения ширины окна браузера
	// var heightResized = false;
	// $(window).resize(function() {
	// 	var windowWidth = $(window).width();
	// 	if (heightResized == windowWidth) {
	// 		return;
	// 	}
	// 	heightResized = windowWidth;
	// 	// fontResize(); // Резиновый сайт
	// 	// screenHeight(); // Блок с высотой окна браузера
	// 	// tooltipDisable(); // Отключение всплывающей подсказки
	// 	// sliderReinstall(); // Реинициализация слайдеров
	// });

	// Калькулятор скидки
	discountCounter();

	// разбивка суммы на тысячные
	rank();
	
});

// Меню
function myMenu(menu, menuBtn) {
	var	headerHeight = $('#header').outerHeight(),
			html = $('html'),
			link = menu.find('a'),
			documentWidth = parseInt(document.documentElement.clientWidth),
			windowsWidth = parseInt(window.innerWidth),
			scrollbarWidth = windowsWidth - documentWidth;
	menuBtn.on('click', function () {
		if (menu.hasClass('open')) {
			menuClose();
		}else if (toggleOpenMenu) {
			return false
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
	menu.css('padding-top',headerHeight + 20 + 'px');
	function menuOpen() {
		menuBtn.addClass('is-active');
		menu.fadeIn().addClass('open');
		html.addClass('lock');
		html.addClass('lock').css('padding-right',scrollbarWidth);
		toggleOpenMenu = true;
	}
	function menuClose() {
		menuBtn.removeClass('is-active');
		menu.fadeOut().removeClass('open');
		html.removeClass('lock');
		html.removeClass('lock').css('padding-right',0);
		toggleOpenMenu = false;
	}
};

// // Блок с высотой окна браузера
// function screenHeight(fullHeight) {
//   fullHeight.css({
//       minHeight: $(window).height() + 'px'
//   });
// };

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

// // Stiky menu // Липкое меню.
// function stikyMenu(header) {
// 	headerTop = header.offset().top;
// 	$(window).scroll(function(){
// 		if( $(window).scrollTop() > headerTop ) {
// 			header.addClass('stiky');
// 		} else {
// 			header.removeClass('stiky');
// 		}
// 	});
// };

// // Изменяет размер шрифта у тэга html взависимости от размера экрана (для резиновых страниц)(размеры должны быть в em)
// function fontResize() {
// 	var windowWidth = $(window).width();
// 		if (windowWidth >= breakSm) {
// 			var fontSize = windowWidth/19.05;
// 		} else if (windowWidth < breakSm) {
// 			// Без резины на мобилке
// 			var fontSize = 60;
// 			// С резиной на мобилке
// 			var fontSize = windowWidth/4.8;
// 	}
// 	$('body').css('fontSize', fontSize + '%');
// };

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

// Аккордеон
// function accordeon(accordeon, mobile) {
// 	var trigger = accordeon.find('.accordeon_trigger'),
// 			content = accordeon.find('.accordeon_content'),
// 			time = 300;
// 	if (!mobile) {
// 		mobile = false;
// 	};
// 	function contentDisplayNone() {
// 		if (mobile == true && $(window).width() < breakMd) {
// 			content.css({
// 				display: 'none'
// 			});
// 		}
// 		if (mobile == false) {
// 			content.css({
// 				display: 'none'
// 			});
// 		}
// 	};
// 	contentDisplayNone();
// 	$(window).resize(function() {
// 		contentDisplayNone();
// 	});
// 	trigger.on('click', function() {
// 		$this = $(this);
// 		if (mobile == true && $(window).width() < breakMd) {
// 			if (!$this.hasClass('active')) {
// 				trigger.removeClass('active');
// 				$this.addClass('active');
// 				content.stop().slideUp(time);
// 				$this.next('.accordeon_content').stop().slideDown(time).removeClass('hide');
// 			}else {
// 				$this.removeClass('active');
// 				$this.next('.accordeon_content').stop().slideUp(time).addClass('hide');
// 			}
// 		}
// 	});
// 	$(window).resize(function() {
// 		if (mobile == true && $(window).width() > breakMd) {
// 			trigger.removeClass('active');
// 			content.removeClass('hide')
// 				.attr('style', '');
// 		}
// 		else {
// 			content.addClass('hide')
// 		}
// 	});
// };

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
	html.addClass('lock').css('padding-right',scrollbarWidth);
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
	html.removeClass('lock').css('padding-right',0);
};

// Текст печатная машинка
// function textPrint(block) {
// 	var textPrint = block,
// 		a = textPrint.text(),
// 		j = 0,
// 		c = a.length,
// 		time = 50;
// 	textPrint.text('');
// 	setInterval(function () {
// 		if (j<c) {
// 			textPrint.text(textPrint.text() + a[j]);
// 			j++;
// 		}
// 	},time);
// };

// Анимация увеличения значения числа
// var	countNumberStatus = true;
// function countNumber (block) {
// 	var scrollEvent = ($(window).scrollTop() > (block.position().top - 400)),
// 			valUp = block.data('val-up'),
// 			valTo = block.data('val-to'),
// 			valDuration = block.data('duration');
// 	if(scrollEvent && countNumberStatus) {
// 		$({numberValue: valUp}).animate({numberValue: valTo}, {
// 			duration: valDuration,
// 			easing: "swing",
// 			step: function(val) {
// 				block.html(Math.ceil(val));
// 			}
// 		});
// 		countNumberStatus = false;
// 	}
// };

// // Делает активным пункт меню при скролле до блока
// function menuItemActive(menu) {
// 	var lastId,
//   topMenu = menu,
//   topMenuHeight = topMenu.outerHeight(),
//   menuItems = topMenu.find("a"),
//   scrollItems = menuItems.map(function(){
//     var item = $($(this).attr("href"));
//     if (item.length) { return item; }
//   });
// 	menuItems.click(function(e){
// 	  var href = $(this).attr("href"),
// 	      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
// 	  $('html, body').stop().animate({ 
// 	      scrollTop: offsetTop
// 	  }, 300);
// 	  e.preventDefault();
// 	});
// 	$(window).scroll(function(){
// 	  var fromTop = $(this).scrollTop()+topMenuHeight;
// 	  var cur = scrollItems.map(function(){
// 	    if ($(this).offset().top < fromTop)
// 	      return this;
// 	  });
// 	  cur = cur[cur.length-1];
// 	  var id = cur && cur.length ? cur[0].id : "";
// 	  if (lastId !== id) {
// 	      lastId = id;
// 	      menuItems
// 	        .parent().removeClass("active")
// 	        .end().filter("[href='#"+id+"']").parent().addClass("active");
// 	  }                   
// 	});
// };

// // Изменение textarea при получении фокуса
// function focusTextarea(texarea) {
// 	texarea
// 	.focus(function() {
// 		$(this).addClass('class_name');
// 	})
// 	.blur(function() {
// 		if ($(this)[0].value == '') {
// 			$(this).removeClass('active');
// 		}
// 	});
// };

// // Изменение поля ввода при клике по его контейнеру
// function focusInput(conteinerInput) {
// 	conteinerInput.click(function() {
// 		input = conteinerInput.find('input');
// 		div.addClass('active');
// 		$(document).mouseup(function (e){
// 			if (!conteinerInput.is(e.target)
// 			    && conteinerInput.has(e.target).length === 0 && input.val() == '') {
// 				conteinerInput.removeClass('active');
// 			}
// 		});
// 	});
// };

// // Запуск и остановка видео html5
// var playing = false;
// function videoControll(videoConteiner) {
// 	videoConteiner.click(function() {
// 		var video = videoConteiner.find('video'),
// 				img = videoConteiner.find('img');
// 		img.css({
// 			display: 'none'});
// 		if (playing == false) {
// 			video.trigger('play');
// 			playing = true;
// 		}
// 		else {
// 			video.trigger('pause');
// 			playing = false;
// 		}
// 	});
// };

// 3d эффект вращения элемента при наведении
// function rotate(element) {
// 	var card = element,
// 			cardItem = card.find('.card3d_item');
// 	card.css({
// 		perspective: '1000px',
// 		'transform-style': 'preserve-3d'
// 	});
// 	cardItem.mousemove(function(event) {
// 		var $this = $(this),
// 				coordinateX = event.offsetX,
// 				coordinateY = event.offsetY,
// 				halfHeight = ($this.outerHeight()/2),
// 				halfWidth = $this.outerWidth()/2;
// 				console.log(halfWidth);
// 		$this.css({
// 			transition: '0.2s',
// 			transform: 'rotateX('+((coordinateY-halfHeight)/10)*-1+'deg) rotateY('+(coordinateX-halfWidth)/10+'deg)'
// 		});
// 	});
// 	cardItem.mouseout(function() {
// 		cardItem.css({
// 			transform: 'rotate(0)'});
// 	});
// };

// Паралакс относительно курсора мыши
// function parallaxMove(parallax) {
// 	var $window = $(window),
// 			direction = parallax.data('direction'),
// 			intensity = parallax.data('intensity'),
// 			speed = parallax.data('speed');
// 	if (!direction) {
// 		direction = 'xy';
// 	}
// 	if (!intensity) {
// 		intensity = 3;
// 	}
// 	if (!speed) {
// 		speed = 100;
// 	}
// 	parallax.css({transition: (speed/1000)+'s'});
// 	$window.mousemove(function(event) {
// 		var left = event.clientX,
// 				top = event.clientY,
// 				windowWidth = $window.width(),
// 				windowHeight = $window.height(),
// 				moveX = ((left-windowWidth/2)*intensity/100).toFixed(),
// 				moveY = ((top-windowHeight/2)*intensity/100).toFixed();
// 		inVisible(parallax);
// 		function inVisible(element) {
// 			var topScroll = $(document).scrollTop(),
// 					screenHeight = $(window).height(),
// 					bottomScroll = topScroll + screenHeight,
// 					elementHeight = element.height(),
// 					elementTop = element.offset().top,
// 					elementBottom = elementTop + elementHeight;
// 			if (elementTop < bottomScroll && elementBottom > topScroll) {
// 				if (direction == 'xy') {
// 					parallax.css({transform: 'translateX('+moveX+'px) translateY('+moveY+'px)'});
// 				}
// 				else if (direction == 'x') {
// 					parallax.css({transform: 'translateX('+moveX+'px)'});
// 				}
// 				else if (direction == 'y') {
// 					parallax.css({transform: 'translateY('+moveY+'px)'});
// 				}
// 			}
// 		};
// 	});
// };

// Показать еще новости
// function limitBlock(wrap, newsNum) {
// 	if (!newsNum) {
// 		newsNum = 3
// 	}
// 	var news = wrap.find('.limit-block'),
// 			parent = news.parent(),
// 			newsLimit = news.slice(0, newsNum),
// 			btn = wrap.find('.show-btn'),
// 			btnShow = btn.text(),
// 			btnHide = 'Скрыть',
// 			heightResized = false;
// 	width();
// 	$(window).resize(function() {
// 		var windowWidth = $(window).width();
// 		if (heightResized == windowWidth) {
// 			return;
// 		}
// 		heightResized = windowWidth;
// 		width();
// 	});
// 	function width() {
// 		if ($(window).width() <= breakSm) {
// 			news.remove();
// 			parent.append(newsLimit);
// 			btn.text(btnShow)
// 				.removeClass('active');
// 		}else {
// 			parent.append(news);
// 			btn.text(btnHide)
// 				.addClass('active');
// 		}
// 	};
// 	btn.click(function() {
// 		if (!btn.hasClass('active')) {
// 			parent.append(news);
// 			btn.text(btnHide)
// 				.addClass('active');
// 		}else {
// 			news.remove();
// 			parent.append(newsLimit);
// 			btn.text(btnShow)
// 				.removeClass('active');
// 		}
// 	});
// };

// Ограничение выводимых символов в блоке текста
// function textLimit(blockText) {
// 	var size = 47,
// 			textButton = 'читать',
// 			arr = new Array();
//   blockText.each(function(index){
//     var $el = $(this),
//     		html = $el.html();
//     arr.push(html);
//   	if( html.length > size) {
//   		$el.html(html.slice(0,size) + '...<a href="#" class="read-more-button" data-index="'+index+'">'+textButton+'</a>');
//   	}
//   });
//   $('.read-more-button').click(function() {
//   	var index = $(this).data('index');
//   	$(this).parent().text(arr[index]);
//   });
// };

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

// Слайдер в банере утп
function slider(slider) {
  slider.slick({
    slidesToShow: 1, // Сколько слайдов показывать на экране
    slidesToScroll: 1, // Сколько слайдов пролистывать за раз
    // asNavFor: sliderFor, // Связь со слайдерами
    dots: true, // Пагинация
    arrows: false, // Стрелки
    // speed: 500, // Скорость перехода слайдов
    // autoplay: false, // Автопрокрутка
    // autoplaySpeed: 2000, // Скорость автопрокрутки
    // centerMode: false, // Задает класс .slick-center слайду в центре
    // focusOnSelect: true, // Выбрать слайд кликом
    infinite: true, // Зацикленное пролистывание
    // vertical: false, // Вертикальный слайдер
    // rtl: false, // Слайды листаются справа налево
    // centerPadding: '0px', // Отступы слева и справа чтоб увидеть часть крайних слайдов
    // adaptiveHeight: true, // Подгоняет высоту слайдера под элемент слайда
    // variableWidth: false, // Подгоняет ширину слайдов под размер элемента,
    // swipe: true, // Перелистывание пальцем
		// draggable: true, // Перелистывание мышью
		appendDots: $('.banner_dots'),
    // responsive: [ // Адаптация
    //   {
    //   breakpoint: 992,
    //     settings: {
    //       arrows: false,
    //     }
    //   },
    //   {
    //   breakpoint: 720,
    //     settings: {
    //       arrows: false,
    //     }
    //   }
    // ]
    // lazyLoad: 'ondemand', // Отложенная загрузка изображений. В тэг надо добавлять атрибут <img data-lazy="img/image.png"/>
  });
  
  // sliderFor.slick({
  //   slidesToShow: 1, // Сколько слайдов показывать на экране
  //   slidesToScroll: 1, // Сколько слайдов пролистывать за раз
  //   dots: false, // Пагинация
  //   arrows: false, // Стрелки
  //   fade: true, // Плавный переход (анимация исчезновения появления) В false будет листаться
  //   asNavFor: slider // Связь со слайдерами
  // });

  // Кастомные кнопки "вперед" "назад"
  $('.banner_arrow--prev').click(function() {
    slider.slick('slickPrev');
  });
  $('.banner_arrow--next').click(function() {
    slider.slick('slickNext');
  });
};

// Добавляем кастомную пагинацию в слайдер
// function addDotsInPagination(sliderB, sliderPagination) {
//   var sliderCount = sliderB.find('.js-slider-slide');
//   for (var i = 1; i < sliderCount.length + 1; i++) {
//     var dot = $('<div class="slider-pagination_dot"></div>');
//     dot.text(i);
//     sliderPagination.append(dot);
//   };
//   // Вызов слайдера нужно делать после добавления пагинации
//   slider();
// };

// Инициализация слайдеров на десктопе и мобилке
// function sliderReinstall() {
//   if (window.matchMedia("(max-width: 769px)").matches) {
//     $('.slick-initialized').slick('unslick');
//   }
//   else {
//     $('.slick-initialized').slick('unslick');
//     sliderInit($('.slider'), $('.slider-for'));
//   }
// }

// $('.your-slider').slick('unslick'); // Уничтожить слайдер

// Слайдер в карточках
function sliderCard(slider) {
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
};

// Слайдер в slider
function sliderSlider(slider) {
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
      // {
      // breakpoint: breakXl,
      //   settings: {
			// 		centerPadding: '200px',
      //   }
      // },
      // {
      // breakpoint: breakLg,
      //   settings: {
			// 		centerPadding: '200px',
      //   }
			// },
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
};

// Запуск видео
function videoPlay(videoImg) {
	videoImg.click(videoStart);
	function videoStart() {
		videoImg.css('display','none');
		videoImg.siblings('#video_play').css('display','none');
		videoImg.siblings('video').css('display','block')[0].play();
	}
}

// Выводить лишние пункты меню табов в выпающий список
function tabsMenu(tabs) {
	var numItem = 5, // сколько пунктов выводить
			tabsMenu = tabs.find('#tabs_triggers'), // меню
			tabsDropBtn = tabs.find('.tabsDrop'), // кнопка выпадайки
			tabsDropList = tabs.find('#tabsDrop_list'), // выпадайка
			items = tabs.find('.js-tabs-trigger'), // все пункты
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
		}else if ($(window).width() <= breakSm) {
			numItem = 0;
		}
	}
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
				fieldMin.val(ui.values[ 0 ]);
				fieldMax.val(ui.values[ 1 ]);
			},
		});
		fieldMin.on('input', function () {
			var val = $(this).val();
			range.slider( "values",0, val);
		});
		fieldMax.on('input', function () {
			var val = $(this).val();
			range.slider( "values",1, val);
		});
		$('.ui-slider-handle').html('<span class="handle-inner"></span>');
	}
}

// Слайдер на странице товара
function sliderProduct(slider,sliderFor) {
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
      breakpoint: breakMd,
        settings: {
          slidesToShow: 3,
        }
			},
			{
      breakpoint: breakXs,
        settings: {
					slidesToShow: 2,
					centerMode: false,
        }
			},
    ]
  });
  
  sliderFor.slick({
    slidesToShow: 1, // Сколько слайдов показывать на экране
    slidesToScroll: 1, // Сколько слайдов пролистывать за раз
    fade: true, // Плавный переход (анимация исчезновения появления) В false будет листаться
    asNavFor: slider // Связь со слайдерами
  });
};
//# sourceMappingURL=scripts.js.map