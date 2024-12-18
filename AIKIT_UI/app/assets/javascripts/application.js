//= require jquery
//  require jquery.turbolinks
//= require jquery_ujs
//= require jquery-ui
//= require autocomplete-rails
//  require jquery-fileupload
//  require jquery-fileupload/basic
//  require jquery-fileupload/vendor/tmpl
//= require dataTables/jquery.dataTables
//= require turbolinks
//  require openlayers-rails
//  require local_time

//= require scatter

//  require apexcharts

//  require_tree .


function dataTablesInit(){
    $('.dataTable').dataTable({
        "bJQueryUI": true,
        "pagingType": "full_numbers"
    });
}

$(function(){
    dataTablesInit();
});
