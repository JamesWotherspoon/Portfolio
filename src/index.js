import html from './index.html';
import "./stylesheet.scss";
import $ from 'jquery';


$(function(){
    $(function animatedGreeting(){

        $(function messagePartTwo(){
            
            const message = `# a front-end web developer # based in london `;
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
                        }, 3000);
                    };
                }, 100);
            });
        })
    });
    
    $(function menu(){
        $('.burger-menu').on('click', function(){
            $('nav').toggleClass('menu-open');
            $('main').toggleClass('menu-open-push');
        });
        

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
    const alpha = function(){
        const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789#%*&£$';
        const alphaText = setInterval(() => {
            for(let i=0; i<7; i++){
                $(`._${[i]}`).empty().append(alpha[Math.floor(Math.random()*alpha.length)]) 
            };
        }, 100);
        setTimeout(() => {
            clearTimeout(alphaText);
        }, 2000);
    }


    $(function(){
        
        $(document).on('scroll', function(){
            $('main_1').addClass('in-view');
        })
        
    });

});


  
