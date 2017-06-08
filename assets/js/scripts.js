Highcharts.chart('eff-frontier', {
    chart: {
        plotBackgroundColor: null,
        backgroundColor: null,
        type: 'spline',
        inverted: true,
        style: {
            fontFamily: 'roboto'
        }
    },
    credits: {
    enabled: false
    },
    exporting: { enabled: false 
    },
    title: {
        text: 'Efficient Frontier'
    },
    xAxis: {
        min: 1.5,
        max: 3.5,
        reversed: false,
        title: {
            enabled: true,
            text: 'Monthly Return'
        },
        labels: {
            formatter: function () {
                return this.value + '%';
            }
        },
        maxPadding: 0.05,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Risk'
        },
        labels: {
            formatter: function () {
                return this.value + '%';
            }
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x}% return vs. {point.y}% risk'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
        name: 'Return vs. Risk',
        data: [[2.01, 11.94], [2.37, 10.12], [2.78,12.53],[2.97, 15.29], [3.11, 18.57],
            [3.18, 22.50]]
    }]
});

var annReturn = 10;
//[10, 21, 33.1, 46.41, 61, 77.16, 94.87, 114.35, 135.79, 159.4];

var returnArr = function(annRet) {
    var arr = [];
    for(var i = 0; i < 10; i++) {
        if (i === 0) {
            arr.push(annRet);
        }
        else {
            arr.push(Math.round(arr[i-1] +(annRet*(Math.pow(1+(annRet/100),i)))));
        }
    }
    return arr;
};

function sliderChange(val) {
    donut.series[0].setData([['Stocks',60 + parseInt(val)],
        ['Bonds', 110 - parseInt(val)],
        ['Cryptocurrency', 15 + parseInt(val)*0.5]]);
    returnsChart.series[0].setData(returnArr(parseInt(val)/10 + 3));
}


var donut = new Highcharts.chart('pct-distribution', {
    chart: {
        plotBackgroundColor: null,
        backgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        type: 'pie',
        style: {
            fontFamily: 'roboto'
        }
    },
    credits: {
        enabled: false
    },
    exporting: { 
        enabled: false 
    },
    title: {
        text: 'Portfolio Distribution'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            innerSize: '60%',
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
 
    series: [{
        name: 'Distribution',
        colorByPoint: true,
        data: [['Stocks',130],['Bonds',40],['Cryptocurrency',50]]
    }]
});

var returnsChart = new Highcharts.chart('returns', {
    chart: {

        plotBackgroundColor: null,
        backgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        style: {
            fontFamily: 'roboto'
        }
    },
    credits: {
        enabled: false
    },
    exporting: {
        enabled: false 
    },
    title: {
        text: 'Annualized Return'
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Year'
        }
    },
    yAxis: {
        title: {
            enabled: true,
            text: 'Compounded Return ( % )'
        }
    },
    tooltip: {
        split: true,
        pointFormat: '{point.y}%'
    },
    plotOptions: {
        series: {
            pointStart: 2017
        }
    },
    series: [{
        name: 'Selected Risk Level',
        //showInLegend: false,
        zIndex: 1,
        data: returnArr(annReturn)
    }, {
        name: 'High Risk',
        data: returnArr(annReturn + 4)
    }, {
        name: 'Low Risk',
        data: returnArr(2)
    }
    ]
});

var monthlyBudget = new Highcharts.chart('monthlyBudget', {
    chart: {
        type: 'column',
        plotBackgroundColor: null,
        backgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        style: {
            fontFamily: 'roboto'
        }
    },
    credits: {
        enabled: false
    },
    exporting: {
        enabled: false 
    },
    title: {
        text: 'Monthly Budget'
    },
    xAxis: {
        categories: ['Savings','Rent','Food','Entertainment','Investment'],
        title: {
            enabled: true,
            text: 'Expense'
        }
    },
    yAxis: {

        title: {
            enabled: true,
            text: 'Percent of Expenses'
        }
    },
    tooltip: {
        pointFormat: '{point.y}%'
    },
    plotOptions: {
        series: {
            pointPadding: 0,
            groupPadding: 0.1,
            allowPointSelect: false
        }
    },
    series: [{
        name: null,
        showInLegend: false,
        colorByPoint: true,
        data: [25,20,5.9,3.5,3.0]
            // ['Savings',25], 
            // ['Rent',20],
            // ['Food',5.9],
            // ['Entertainment',3.5],
            // ['Investment',3.0]]
    }]
});



