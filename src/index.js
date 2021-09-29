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

// fade up when scrolled into view
let elementsToFade = [];
for(let i=0; i < $('.will-fade').length; i++){
    elementsToFade.push($(`.will-fade:eq(${i})`).offset().top);
}

fadeUpElements();
function fadeUpElements(){
    let viewportBottom20 = $(window).scrollTop() + ($(window).height() * 0.8);
    
    elementsToFade.forEach((elementOffset, index)=> {
        if(elementOffset < viewportBottom20 ){
            $(`.will-fade:eq(${index})`).addClass('fade-up')
        }
    })
}
$(document).on('scroll', fadeUpElements)

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
        let $viewportMiddle = $(window).scrollTop() + ($(window).height() * 0.5);
        
        if($('.home').height() > $viewportMiddle){
            $('.underline-menu-items').css({opacity: '0'});
        } else if( ($viewportMiddle > $('.about').offset().top) && ( $viewportMiddle < $('.projects').offset().top)){
            $('.underline-menu-items').css({left: $('.about-nav-link').position().left, width: $('.about-nav-link').width(), opacity: '1'});
            
        } else if($('.projects').offset().top < $viewportMiddle && !($('.contact').offset().top < $viewportMiddle)){
            $('.underline-menu-items').css({left: $('.projects-nav-link').position().left, width: $('.projects-nav-link').width(), opacity: '1'});
            
        } else if($('.contact').offset().top < $viewportMiddle){
            $('.underline-menu-items').css({left: $('.contact-nav-link').position().left, width: $('.contact-nav-link').width(), opacity: '1'});
        }
        timeOutRefractory = false;
    }, ($('.underline-menu-items').css('opacity') == 0) ? 400 : 100)
}
console.log($('.contact-nav-link').position().left)

// handle nav option click
$('.nav-link').on('click', linkScrolling)

function linkScrolling(){

    let $linkDestination =  $($(this).data('link')).offset().top ;
    $(window).scrollTop($linkDestination);

    underlineNavOption()
}

// about section js
$('.view-cv-link').on('click', openCvOptions);

function openCvOptions(){
    
}

// project section js
let buttonPercentBackground = 0;
let buttonBackgroundSlideUp;
let buttonBackgroundSlideDown;
$('.project-follow-link-button').on({
    mouseenter: function(){
        clearInterval(buttonBackgroundSlideDown)

        buttonBackgroundSlideUp = setInterval(() => {
            buttonPercentBackground += 3;
            $(this).css({background: `linear-gradient(90deg, rgb(238, 238, 238) ${buttonPercentBackground}%, rgb(12, 12, 12) 0%)`});
            if(buttonPercentBackground >= 100){
                clearInterval(buttonBackgroundSlideUp)
            }
        }, 1);
    },
    mouseleave: function(){
        clearInterval(buttonBackgroundSlideUp)

        buttonBackgroundSlideDown = setInterval(() => {
            buttonPercentBackground -= 3;
            $(this).css({background: `linear-gradient(90deg, rgb(238, 238, 238) ${buttonPercentBackground}%, rgb(12, 12, 12) 0%)`});
            if(buttonPercentBackground <= 0){
                clearInterval(buttonBackgroundSlideDown)
            }
        }, 1);
    }
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

// nav 


// back to top button 
$('.scroll-top-arrow-container').on('click', function(){
    $(window).scrollTop(0);
})

$(function(){
    $('.logo-inner-container').addClass('on-load-expand');
})