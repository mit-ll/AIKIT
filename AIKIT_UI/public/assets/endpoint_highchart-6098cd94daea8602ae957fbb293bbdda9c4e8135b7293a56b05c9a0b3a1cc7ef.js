function highchartInit(){
    //highcharts options
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    new Highcharts.HighChart({
 
            tooltip: {
                crosshairs: [{
                    color: 'black',
                    dashStyle: 'Dot',
                    width: 1
                }],
                pointFormat: '<span style="color:{point.x}">{point.y}</span>: <b>{point.y}</b><br/>',
                valueDecimals: 2
            },
    );
}

$(function(){
    highchartInit();
});

