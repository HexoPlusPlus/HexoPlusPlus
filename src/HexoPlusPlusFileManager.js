/**
 * demo.js
 * https://coidea.website
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, COIDEA
 * https://coidea.website
 */

  // masonry ====================
  var $grid = $('.grid').masonry({
    itemSelector: '.masonry__item'
  });
  $grid.imagesLoaded()
    .progress( function() {
      // init masonry grid
      $grid.masonry();
    })
    .done( function() {
      // hide loader
      $('.loader').addClass('is-loaded');
    });

  // find each first, second and third item in grid and give them special classes
  var classes = ['top', 'middle', 'bottom'];
  $('.masonry__item').each(function(index, element) {
    $(this).addClass(classes[index % 3]);
  });


  // call this function if "LIST" icon clicked
  function listLayout(element) {

    // init vars
    var masterTimeline = new TimelineMax({ paused: true }),
        topTimeline = new TimelineMax(),
        middleTimeline = new TimelineMax(),
        bottomTimeline = new TimelineMax(),
        topPosition = parseInt($(element).css('top')),
        topPositionSecond = topPosition+80,
        topPositionThird = topPosition+160;
    
    // update position: top for each item in grid 
    if( $(element).hasClass('top') ) { topTimeline.to(element, 1.05, { top: topPosition, ease: Expo.easeInOut }); }
    if( $(element).hasClass('middle') ) { middleTimeline.to(element, 1.05, { top: topPositionSecond, ease: Expo.easeInOut }); }
    if( $(element).hasClass('bottom') ) { bottomTimeline.to(element, 1.05, { top: topPositionThird, ease: Expo.easeInOut }); }
    
    // populate master timeline ...
    masterTimeline
      .to($(element).find('.date'), 0.35, { autoAlpha: 0, ease: Expo.easeInOut })
      .to($(element).find('.tags'), 0.35, { autoAlpha: 0, ease: Expo.easeInOut }, '-=0.35')
      .to(element, 0.35, { height: 80, ease: Expo.easeInOut })
      .add(topTimeline, -0.35)
      .add(middleTimeline, -0.35)
      .add(bottomTimeline, -0.35)
      .to(element, 0.35, { width: '100%', left: 0, ease: Expo.easeInOut })
      .to($(element).find('.date'), 0.35, { autoAlpha: 1, ease: Expo.easeInOut })
      .to($(element).find('.tags'), 0.35, { y: -24, autoAlpha: 1, ease: Expo.easeInOut }, '-=0.35');
      
    // ... and play it
    masterTimeline.play();
  }


  // call this function if "GRID" icon clicked
  function gridLayout(element){

    // init vars
    var masterTimeline = new TimelineMax({ paused: true }),
        topTimeline = new TimelineMax(),
        middleTimeline = new TimelineMax(),
        bottomTimeline = new TimelineMax(),
        topPosition = parseInt($(element).css('top')),
        topPositionSecond = topPosition-80,
        topPositionThird = topPosition-160;
      
    // update position: left ...  
    if( $(element).hasClass('top') ) { topTimeline.to(element, 1.05, { left: 0, ease: Expo.easeInOut }); }
    if( $(element).hasClass('middle') ) { middleTimeline.to(element, 1.05, { left: '33.3333%', ease: Expo.easeInOut }); }
    if( $(element).hasClass('bottom') ) { bottomTimeline.to(element, 1.05, { left: '66.6666%', ease: Expo.easeInOut }); }
    // .. then update position: top ( to prevent overlapping )
    if( $(element).hasClass('top') ) { topTimeline.to(element, 0.7, { top: topPosition, ease: Expo.easeInOut }); }
    if( $(element).hasClass('middle') ) { middleTimeline.to(element, 0.7, { top: topPositionSecond, ease: Expo.easeInOut }); }
    if( $(element).hasClass('bottom') ) { bottomTimeline.to(element, 0.7, { top: topPositionThird, ease: Expo.easeInOut }); }
    
    // populate master timeline ...
    masterTimeline
      .to($(element).find('.date'), 0.35, { autoAlpha: 0, ease: Expo.easeInOut })
      .to($(element).find('.tags'), 0.35, { autoAlpha: 0, ease: Expo.easeInOut }, '-=0.35')
      .to(element, 0.7, { width: '33.3333%', ease: Expo.easeInOut })
      .add(topTimeline, -0.35)
      .add(middleTimeline, -0.35)
      .add(bottomTimeline, -0.35)
      .to(element, 0.35, { height: 240, ease: Expo.easeInOut }, '-=0.5')
      .to($(element).find('.date'), 0.35, { autoAlpha: 1, ease: Expo.easeInOut })
      .to($(element).find('.tags'), 0.35, { y: 0, autoAlpha: 1, ease: Expo.easeInOut }, '-=0.35');
    // ... and play it
    masterTimeline.play();
  }


  // grid to list trigger
  $('.list-layout').on('click', function() {
    // add/remove active class
    $('.grid-layout').stop(true,true).removeClass('active', 0);
    $(this).stop(true,true).addClass('active', 0);
    // call list function
    $('.masonry__item').each(function(index, element) {
      listLayout(this);
    });
  });


  // list to grid trigger
  $('.grid-layout').on('click', function() {
    // add/remove active class
    $('.list-layout').stop(true,true).removeClass('active', 0);
    $(this).stop(true,true).addClass('active', 0);
    // call list function
    $('.masonry__item').each(function(index, element) {
      gridLayout(this);
    });
  });


  // EXTRAS - CLICK ON ITEM TO SHOW/HIDE TAGS 
  $('.tags').each(function(index, element) {
    $(this).find('a:eq(0)').addClass('active');
    $(this).find('a:eq(1)').addClass('active');
  });

  $('.more').on('click', function() {
    var thisLink = $(this),
        parent = $(this).closest('.tags');
    $(parent).find('a').each(function(index, element) {
      $(this).addClass('active');
    });
  });

  $('.more').on('click', function() {
    if($(this).attr('data-click-state') == 1) {
      $(this).attr('data-click-state', 0)
      $(this).text('-');
      var parent = $(this).closest('.tags');
      $(parent).find('a').each(function(index, element) {
        $(this).addClass('active');
      });
    } else {
      $(this).attr('data-click-state', 1)
      $(this).text('+');
      var parent = $(this).closest('.tags');
      $(parent).find('a').each(function(index, element) {
        if( index > 1 ) {
          $(this).removeClass('active');
        }
      });
    }
    
  });


  // EXTRAS - SMOOTH SCROLL
  $(function(){
    
    var $window = $(window);
    
    var scrollTime = 0.8;
    var scrollDistance = 240;
      
    $window.on("mousewheel DOMMouseScroll touchmove", function(event){
      
      event.preventDefault();	
                      
      var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
      var scrollTop = $window.scrollTop();
      var finalScroll = scrollTop - parseInt(delta*scrollDistance);
        
      TweenMax.to($window, scrollTime, {
        scrollTo : { y: finalScroll, autoKill:true },
          ease: Power4.easeOut,
          autoKill: true,
          overwrite: 5							
        });
            
    });
    
  });