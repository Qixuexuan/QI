mapChart = $(function () {
    $('#Data').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '园区各区案件总量'
        },
        subtitle: {
            text: '2015年统计结果'
        },
        xAxis: {
            categories: [
                '湖西社工委',
                '科教创新区社工委',
                '唯亭街道',
                '东沙湖社工委',
                '湖东社工委',
                '胜浦街道',
                '国际商务区',
                '阳澄半岛',
                '独墅湖',
                '娄葑街道',
                '斜塘街道',
                '金鸡湖'
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: '数量 (件)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} 件</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '园区各区案件统计',
            data: [148, 136, 139, 241, 147, 158, 119, 162, 135, 121,51,63]
        }
        ]
    });


}).highcharts();