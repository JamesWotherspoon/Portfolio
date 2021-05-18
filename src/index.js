import html from './index.html';
import "./stylesheet.scss";
import $ from 'jquery';


$(function(){
    $(function animatedGreeting(){

        $(function messagePartTwo(){
            
            const msgPartTwo = `Hi, i'm a front-end web developer, based in london `;
            const messageArrayPartTwo = msgPartTwo.split('');
            let $partTwoCursor = $('.message-part-two .text-cursor');

            $partTwoCursor.delay(2100).queue(function(){
                $(this).append('|');
                const toggleCursor = setInterval(() => {
                    $partTwoCursor.toggle();
                }, 500);
                let i = 0;
                const printLettersPartTwo = setInterval(() => {
                    $('.message-part-two .message-letters').append(`${messageArrayPartTwo[i]}`);
                    i++;
                    if(i == messageArrayPartTwo.length){ 
                        clearInterval(printLettersPartTwo);
                        setTimeout(() => {
                            clearInterval(toggleCursor);
                            $partTwoCursor.empty();
                        }, 3000);
                    };
                }, 100);
            });
        })
    });

    $(function linkScrolling(){
        $('a[href^="#"]').on('click', function(){
            
            let $linkDestination = $( $(this).attr('href') );
            let $viewportHeight = $(window).height();

            if($linkDestination.parent().hasClass('in-viewport')){
                $('html').animate({
                    scrollTop: $linkDestination.offset().top 
                }, 500);
            } else {
                $('html').animate({
                    scrollTop: $linkDestination.offset().top - (0.1 * $viewportHeight)
                }, 500);
            }
            return false;
        });
    });
    $(window).on('scroll', function(){
        $('.scroll-in-viewport').each(function(){
            var topOfElement = $(this).offset().top + 100;
            var bottomOfScreen = $(window).scrollTop() + $(window).innerHeight();
            if ((bottomOfScreen > topOfElement) && !($(this).hasClass('in-viewport'))){
                $(this).addClass('in-viewport');
            };
        });

        $(window).scrollTop();
        let top = 0;
        $('.about').offset().top;
        $('.skills')
        $('.projects')
        $('.contact')
        let $bottomOfPage = $(document).length - window.innerHeight();
        
    });
    
    $('.scroll-ball').on('mousedown', function(event){
        let startPointY = event.pageY;
        let changeInPointY;
        let navBarMovement = setInterval(() => {
            $(document).on('mousemove', function(e){
                changeInPointY = e.pageY - startPointY;
                console.log(changeInPointY);
            });
            
        }, 100);
        $(document).on('mouseup', function(){
            clearInterval(navBarMovement);
        })    
    });

});


  
