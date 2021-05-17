import html from './index.html';
import "./stylesheet.scss";
import $ from 'jquery';


$(function(){
    $(function animatedGreeting(){

        $('.message-part-two').hide();
        $(function messagePartTwo(){
            $('.message-part-two').fadeIn();
            const msgPartTwo = `Hi, i'm a front-end web developer, based just outside london `;
            const messageArrayPartTwo = msgPartTwo.split('');
            let $partTwoCursor = $('.message-part-two .text-cursor');
            $partTwoCursor.delay(2100).queue(function(){
                $(this).append('|');
            });
            setInterval(() => {
                $partTwoCursor.toggle();
            }, 500);
            let i = 0;
            const printLettersPartTwo = setInterval(() => {
                $('.message-part-two .message-letters').append(`${messageArrayPartTwo[i]}`);
                i++;
                if(i == messageArrayPartTwo.length ){ 
                    clearInterval(printLettersPartTwo);
                    setTimeout(() => {
                        $partTwoCursor.empty();
                    }, 3000);
                };
            }, 100);

        })
    });
    
    $(function linkScrolling(){
        $('a[href^="#"]').on('click', function(){
            $('html').animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top
            }, 500);
            return false;
        });
    })

})


  
