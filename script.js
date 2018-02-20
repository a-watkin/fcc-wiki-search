// tests the script is being loaded
alert('test');

$.noConflict();
jQuery(document).ready(function($){
   alert('jQuery is working');
}); 