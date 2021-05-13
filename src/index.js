import html from './index.html';
import "./stylesheet.scss";
import $ from 'jquery';

$('aside').css('width', '100vw');
setTimeout(foldAway, 2000);

function foldAway(){
    
    $('aside').animate({width: '30vw'}, 500);
}




  
