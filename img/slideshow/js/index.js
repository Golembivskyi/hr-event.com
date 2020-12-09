(function($){
  const $slides = jQuery( '#slides' );
  const options = {
    autoplay: true,
    autoplaySpeed: 1000,
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