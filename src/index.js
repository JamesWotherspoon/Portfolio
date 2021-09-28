import html from './index.html';
import "./stylesheet.scss";
import $ from 'jquery';


$(function animatedGreeting(){
    $(function messagePartTwo(){
        
        const message = `A Front-end developer #Based in London`;
        const messageArray = message.split('');
        let $cursor = $('.greeting .text-cursor');

        $cursor.delay(100).queue(function(){
            $(this).append('|');

            const toggleCursor = setInterval(() => {
                $cursor.toggle();
            }, 500);
            let i = 0;

            const printLetters = setInterval(() => {
                if(messageArray[i] == '#'){
                    messageArray[i] = '<br> <br>'
                };
                $('.greeting .message').append(`${messageArray[i]}`);
                i++;
                if(i == messageArray.length){ 
                    clearInterval(printLetters);
                    setTimeout(() => {
                        clearInterval(toggleCursor);
                        $cursor.empty();
                    }, 2000);
                };
            }, 60);
        });
    })
});

// next page scroll arrow 
$('.scroll-arrow-container').on('mouseenter', triggerHover)
function triggerHover(){
    if( $('.scroll-arrow-container').hasClass('hover') ) return 
    $('.scroll-arrow-container').addClass('hover');
    $('.scroll-arrow-container').on('mouseleave', removeHover);
}
function removeHover(){
    $('.scroll-arrow-container').removeClass('hover');
}
setTimeout( () => {
    if($(window).scrollTop() === 0){
        triggerHover()
        setTimeout( () => removeHover(), 10000);
    } 
}, 4000);
// click on scroll arrow trigger scroll
$('.scroll-arrow-container').on('click', function(){
    $('html').animate({
        scrollTop: $('#about').offset().top 
    }, 500);
})

// nav display different when document scrolled

determineSearchBarExtended(true);

$(document).on('scroll', () => determineSearchBarExtended(false));

function determineSearchBarExtended(onLoad){
    
  if($(window).scrollTop() !== 0 && (!$('nav').hasClass('offset-top'))){
    if(onLoad){

        $('nav').addClass('disable-transition').addClass('offset-top');
        setTimeout(()=> {
            $('nav').removeClass('disable-transition');
        }, 400)
        return
    }
    $('nav').addClass('offset-top');
    return
  }
  if($(window).scrollTop() === 0 ){
    $('nav').removeClass('offset-top');
  }
}

// underline current nav option

let timeOutRefractory = false;
$(document).on('scroll', underlineNavOption);

setTimeout(() => {
    underlineNavOption();
}, 400)

function underlineNavOption(){
    if(timeOutRefractory) return 
    timeOutRefractory = true;
    setTimeout(()=> {
        let $viewportMiddle = $(window).scrollTop() + $(window).height()/1.7;
        
        if($('.home').height() > $viewportMiddle){
            $('.underline-menu-items').css({opacity: '0'});
        } else if( ($viewportMiddle > $('.about').offset().top) && ( $viewportMiddle < $('.projects').offset().top)){
            $('.underline-menu-items').css({left: $('.about-nav-link').offset().left, width: $('.about-nav-link').width(), opacity: '1'});
            
        } else if($('.projects').offset().top < $viewportMiddle && !($('.contact').offset().top < $viewportMiddle)){
            $('.underline-menu-items').css({left: $('.projects-nav-link').offset().left, width: $('.projects-nav-link').width()});
            
        } else if($('.contact').offset().top < $viewportMiddle){
            $('.underline-menu-items').css({left: $('.contact-nav-link').offset().left, width: $('.contact-nav-link').width()});
            
        }
        timeOutRefractory = false;
    }, ($('.underline-menu-items').css('opacity') == 0) ? 400 : 100)
}


// handle nav option click
$('a[href^="#"]').on('click', linkScrolling)

function linkScrolling(){

    let $linkDestination = $( $(this).attr('href') );
    $(window).scrollTop($linkDestination.offset().top);
    underlineNavOption()
}


$(document).on('scroll', function(){
    let $viewportMiddle = $(window).scrollTop() + $(window).height()/2;

    if($('.about').offset().top < $viewportMiddle){
        $('.about').addClass('slide-in');
    }
    if($('.projects').offset().top < $viewportMiddle){
        $('.projects').addClass('slide-in');
    }
    if($('.contact').offset().top < $viewportMiddle){
        $('.contact').addClass('slide-in');
    }
});

// about section js
$('.view-cv-link').on('click', openCvOptions);

function openCvOptions(){
    
}

// project section js 
$('.project-follow-link-button').on('mouseenter', function(){
    console.log('hiver')
    $(this).addClass('hover');
});

$('.project-one-image-container').on('click', projectOneOpen);
$('.project-one-title').on('click', projectOneOpen);

function projectOneOpen(){
    window.open('https://jameswotherspoon.github.io/dashboard/');
}

$('.project-two-image-container').on('click', projectTwoOpen)
$('.project-two-title').on('click', projectTwoOpen);

function projectTwoOpen(){
    window.open('https://jameswotherspoon.github.io/airbnb_clone/');
}


$('.feedback-form').on('submit', (event) => {
    event.preventDefault();    
    console.log('ajax triggered')
    let emailValue = $('#email').val()
    let companyValue = $('#company').val()
    let skillsToImprove = $('input[type=checkbox]:checked').map(() => {
        return $(this).val()
        })
    let feedbackValue = $('#feedback-textarea').val()

    $.ajax({
        url: "https://formsubmit.co/ajax/baf6f2f077f9f8497948a7d66fd2092e",
        method: "POST",
        dataType: "json",
        data: {
            email: emailValue,
            company: companyValue,
            skillsToImprove: skillsToImprove,
            moreFeedback: feedbackValue
        },
        success: (data) => console.log(data),
        error: (err) => console.log(err)
    })
})

// determine icon color 
$(document).on('scroll', function(){
    let iconThreeBottom = $('.icon-3').offset().top;
    let iconTwoBottom = $('.icon-2').offset().top;
    let iconOneBottom = $('.icon-1').offset().top;

    let homeBottom = $('.home').offset().top + $('.home').height();
    let aboutTechTop = $('.about-tech-article').offset().top;
    let footerTop = ($(window).scrollTop() + $(window).height()) - $('footer').offset().top;


    if(iconThreeBottom < homeBottom){
        $('.icon-3').css({ color: 'white'});
    }
    if(iconTwoBottom < homeBottom){
        $('.icon-2').css({ color: 'white'});
    }
    if(iconOneBottom < homeBottom){
        $('.icon-1').css({ color: 'white'});
    }

    if(iconThreeBottom > homeBottom){
        $('.icon-3').css({ color: 'black'});
    }
    if(iconTwoBottom > homeBottom){
        $('.icon-2').css({ color: 'black'});
    }
    if(iconOneBottom > homeBottom){
        $('.icon-1').css({ color: 'black'});
    }

    if(iconThreeBottom > aboutTechTop){
        $('.icon-3').css({ color: 'white'});
    }
    if(iconTwoBottom > aboutTechTop){
        $('.icon-2').css({ color: 'white'});
    }
    if(iconOneBottom > aboutTechTop){
        $('.icon-1').css({ color: 'white'});
    }

    if(footerTop > 0){
        $('.resource-icons').css({position: 'absolute'})
    }
    if(footerTop < 0){
        $('.resource-icons').css({position: 'fixed'})
    }


})

// back to top button 
$('.scroll-top-arrow-container').on('click', function(){
    $(window).scrollTop(0);
})