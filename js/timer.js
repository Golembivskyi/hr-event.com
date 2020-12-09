function updater(d, h, m, s) {
  // День сброса - 27 сентября 2015 года (и далее каждые три дня)
  var baseTime = new Date(2018, 3, 11, 9);
  // Период сброса — 60 дней
  var period = 60*24*60*60*1000;

  function update() {
    var cur = new Date();
    // сколько осталось миллисекунд
    var diff = period - (cur - baseTime) % period;
    // сколько миллисекунд до конца секунды
    var millis = diff % 1000;
    diff = Math.floor(diff/1000);
    // сколько секунд до конца минуты
    var sec = diff % 60;
    if(sec < 10) sec = "0"+sec;
    diff = Math.floor(diff/60);
    // сколько минут до конца часа
    var min = diff % 60;
    if(min < 10) min = "0"+min;
    diff = Math.floor(diff/60);
    // сколько часов до конца дня
    var hours = diff % 24;
    if(hours < 10) hours = "0"+hours;
    var days = Math.floor(diff / 24);
    d.innerHTML = days;
    h.innerHTML = hours;
    m.innerHTML = min;
    s.innerHTML = sec;
  
    // следующий раз вызываем себя, когда закончится текущая секунда
    setTimeout(update, millis);
  }
  setTimeout(update, 0);
}

updater(document.getElementById("days"),
 document.getElementById("hours"), document.getElementById("minutes"),
 document.getElementById("seconds"));



var regData = {};

function buyTicket()
{
	var data = {
        name : $('#name').val().trim(),
        email : $('#email').val().trim(),
        phone : $('#phone').val().trim()
    };
	
	if( !validateEmail(data.email) ){
		return alert('Перевірте коректність вказаної електронної пошти');
	}
	
	if( !validatePhone(data.phone) ){
		return alert('Поле "телефон" має містити лиш числа (1-0).');
	}
	
	for(var p in data){
		if(data[p] === ''){
			return alert('Всі поля мають бути заповнені!');
		}
	}
    regData = data;
	$('#register-modal').addClass('shown');
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    var re = /^[\d-\s]+$/;
    return re.test(String(phone).toLowerCase());
}


function registerAsCompany()
{
	var regData = {};
    regData.ticketType = $('#ticket-type').val();
    regData.paymentType = $('#payment-type').val();
    regData.secondPersonName = $('#second-visitor-name').val().trim();
    regData.comment = $('#comment').val().trim();
    regData.promoCode = $('#promo-code').val().trim();
	regData.name = $('#name').val().trim();
	regData.phone = $('#phone').val().trim();
	regData.email = $('#email').val().trim();
	regData.linkSource = $('#link-source').val().trim();


    for(var p in regData){
		if( regData[p] === ''  && regData.ticketType === 'one-plus-one' && p === 'secondPersonName'){
			console.log(p);
			return alert('Всі поля мають бути заповнені!');
		}else if(regData[p] === '' && p !== 'promoCode' && p !== 'linkSource' && p !== 'secondPersonName'){
			console.log(p);
			return alert('Всі поля мають бути заповнені!');
        }
    }

    $.ajax({
        url : '/actions/register.php',
        data : regData
    }).done(function (response) {
        if(response === ''){
            $('#register-modal').removeClass('shown');
            $('#success-modal').addClass('shown');
        }
    });
}



function loadPaymentButton()
{
	var regData = {};
	regData.ticketType = $('#ticket-type').val();
    regData.paymentType = $('#payment-type').val();
    regData.secondPersonName = $('#second-visitor-name').val().trim();
    regData.comment = $('#comment').val().trim();
    regData.promoCode = $('#promo-code').val().trim();
	regData.name = $('#name').val().trim();
	regData.phone = $('#phone').val().trim();
	regData.email = $('#email').val().trim();
	regData.linkSource = $('#link-source').val().trim();


	if(regData.paymentType === 'company'){
		$('#comment').show();
		$('#pay-button').hide();
		$('#pay-company-button').show();
		
	}else{
		$('#comment').hide();
		$('#pay-button').show();
		$('#pay-company-button').hide();
	}
	
	if(regData.ticketType === '' || regData.paymentType === '' || regData.phone === '') {
		$('#pay-button').html('');
		return;
	}
	
	
	
	$.ajax({
		url : '/actions/get-payment-button.php',
		method : 'GET',
		data : regData
	}).done(function(response){
		if(response !== ''){
			$('#pay-button').html(response);
		}
	});
}


function sendEmail()
{
	var regData = {};
	regData.ticketType = $('#ticket-type').val();
    regData.paymentType = $('#payment-type').val();
    regData.secondPersonName = $('#second-visitor-name').val().trim();
    regData.comment = $('#comment').val().trim();
    regData.promoCode = $('#promo-code').val().trim();
	regData.name = $('#name').val().trim();
	regData.phone = $('#phone').val().trim();
	regData.email = $('#email').val().trim();
	regData.linkSource = $('#link-source').val().trim();


	$.ajax({
		url : '/actions/send-email.php',
		method : 'GET',
		data : regData
	}).done(function(response){

	});
}


// Partners logo slider
    $(document).ready(function(){
        $('.customer-logos').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: true,
            autoplaySpeed: 6000,
            arrows: true,
            dots: false,
            pauseOnHover: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    });


// Accordeon menu
    $(document).ready(function(){

      var allPanels = $('.section_para').hide();

      $('.section_header').click(function() {
          $(this).next().slideToggle();
          allPanels.not($(this).next()).slideUp();
      });
    });


// SlideShow
(function($){
  const $slides = jQuery( '#slides' );
  const options = {
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    dots: false,
    pauseOnHover: true,
  };
  $slides.slick( options );
  
  $slides.on( 'afterChange', function( event, slick ) {
    console.log( slick );
    const
      currentSlide = slick.currentSlide,
      $currentSlide = slick.$slides[currentSlide],
      $currentSlideLi = $currentSlide.querySelector( 'li' ),
      delay = parseInt( $currentSlideLi.getAttribute( 'data-delay' ) ) || 1000;
    
    $slides.slick( 'setOption', 'autoplaySpeed', delay );
    
  });
})(jQuery);



function subscribe()
{
	var email = $('#subscribe-email').val().trim();
	if(email === '') return;
	$.ajax({
		url : '/actions/subscribe.php',
		method: 'POST',
		data : {
			email : email,
		}
	});
	$('#subscribe-email').val('');
	alert('Спасиб за интерес к форуму. Мы будем информировать о всех последних событиях.');
}












