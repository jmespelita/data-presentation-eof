
$(document).ready(function () {
    $('#submit-file').on("click", function (e) {
        e.preventDefault();
        $('#files').parse({
            config: {
                delimiter: "auto",
                complete: displayHTMLTable
            },
            before: function (file, inputElem)
            {
                $('#three').waitMe({
                    effect: 'bounce',
                    text: 'Loading..',
                    bg: 'rgba(255,255,255,0.7)',
                    color: '#6cc091',
                    waitTime: -1,
                    source: '',
                    textPos: 'vertical',
                    fontSize: '',
                    onClose: function () {}

                });
            },
            error: function (err, file)
            {
                //console.log("ERROR:", err, file);
            },
            complete: function ()
            {
                drawContinentvsCategoryChart(getChartDataRegion_Cat());
                drawGendervsCategoryChart(getChartDataGender_Cat());
                drawSelectionvsCategoryChart(getChartDataSelection_Cat());
                drawAgevsCategoryChart(getChartDataAge_Cat());
                $('#three').waitMe('hide');
                console.log("Done with all files");
            }
        });
    });
});

function drawContinentvsCategoryChart(chartData) {
    Highcharts.chart('continent_vs_cat', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Region distribution'
        },
        xAxis: {
            categories: chartData[0]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of participants'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }, column: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
                name: 'Researcher',
                data: chartData[1]
            }, {
                name: 'Changemaker',
                data: chartData[2]
            }, {
                name: 'Business',
                data: chartData[3]
            }],
        exporting: {
            showTable: true
        }
    });
}
function drawGendervsCategoryChart(chartData) {
    Highcharts.chart('gender_vs_cat', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Gender distribution'
        },
        xAxis: {
            categories: chartData[0]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of participants'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
                name: 'Researcher',
                data: chartData[1]
            }, {
                name: 'Changemaker',
                data: chartData[2]
            }, {
                name: 'Business',
                data: chartData[3]
            }],
        exporting: {
            showTable: true
        }
    });
}
function drawSelectionvsCategoryChart(chartData) {
    Highcharts.chart('selection_vs_cat', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Category distribution'
        },
        xAxis: {
            categories: chartData[0]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of participants'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }, bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
                name: 'Researcher',
                data: chartData[1]
            }, {
                name: 'Changemaker',
                data: chartData[2]
            }, {
                name: 'Business',
                data: chartData[3]
            }],
        exporting: {
            showTable: true
        }
    });
}
function drawAgevsCategoryChart(chartData) {
    Highcharts.chart('age_vs_cat', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Age distribution'
        },
        xAxis: {
            categories: chartData[0]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of participants'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }, bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
                name: 'Researcher',
                data: chartData[1]
            }, {
                name: 'Changemaker',
                data: chartData[2]
            }, {
                name: 'Business',
                data: chartData[3]
            }],
        exporting: {
            showTable: true
        }
    });
}

function getChartDataGender_Cat() {
    var chartData = [];
    var gender = ["M", "F", ""];
    var rowR = [];
    var rowCM = [];
    var rowB = [];

    $(gender).each(function (e) {
        var countR = 0;
        var countCM = 0;
        var countB = 0;
        $("#parsed_csv_list tbody tr").each(function () {
            var gen = $(this).find("td:eq(8)").text();
            console.log("GEN:" + gen);
            if (gender[e] === gen) {
                console.log("CATEGORY: " + $(this).find("td:eq(2)").text());
                if ($(this).find("td:eq(2)").text() === 'RESEARCH') {
                    countR++;
                } else if ($(this).find("td:eq(2)").text() === 'CHANGEMAKER') {
                    countCM++;
                } else if ($(this).find("td:eq(2)").text() === 'BUSINESS') {
                    countB++;
                }
            }
        });
        rowR.push(countR);
        rowCM.push(countCM);
        rowB.push(countB);
    });

    chartData = [["Male", "Female", "Undefined"], rowR, rowCM, rowB];
    return(chartData);
}

function getChartDataRegion_Cat() {
    var chartData = [];
    var countries = [];
    $("#parsed_csv_list tbody td:nth-child(5)").each(function () {
        var country = $(this).text();
        if (!countries.includes(country)) {
            countries.push(country);
        }
    });

    var rowR = [];
    var rowCM = [];
    var rowB = [];
    $(countries).each(function (e) {
        var countR = 0;
        var countCM = 0;
        var countB = 0;
        $("#parsed_csv_list tbody tr").each(function () {
            var country = $(this).find("td:eq(4)").text();
            console.log(country);
            if (countries[e] === country) {
                console.log($(this).find("td:eq(2)").text());
                if ($(this).find("td:eq(2)").text() === 'RESEARCH') {
                    countR++;
                } else if ($(this).find("td:eq(2)").text() === 'CHANGEMAKER') {
                    countCM++;
                } else if ($(this).find("td:eq(2)").text() === 'BUSINESS') {
                    countB++;
                }
            }
        });
        rowR.push(countR);
        rowCM.push(countCM);
        rowB.push(countB);
    });

    chartData = [countries, rowR, rowCM, rowB];
    return(chartData);
}

function getChartDataSelection_Cat() {
    var chartData = [];
    var selection_type = ['500', '2000'];

    var rowR = [];
    var rowCM = [];
    var rowB = [];
    $(selection_type).each(function (e) {
        var countR = 0;
        var countCM = 0;
        var countB = 0;
        $("#parsed_csv_list tbody tr").each(function () {
            var selection = $(this).find("td:eq(0)").text();
            console.log(selection);
            if (selection.includes('2000')) {
                selection = '2000';
            }
            if (selection_type[e] === selection) {
                console.log($(this).find("td:eq(2)").text());
                if ($(this).find("td:eq(2)").text() === 'RESEARCH') {
                    countR++;
                } else if ($(this).find("td:eq(2)").text() === 'CHANGEMAKER') {
                    countCM++;
                } else if ($(this).find("td:eq(2)").text() === 'BUSINESS') {
                    countB++;
                }
            }
        });
        rowR.push(countR);
        rowCM.push(countCM);
        rowB.push(countB);
    });

    chartData = [selection_type, rowR, rowCM, rowB];
    return(chartData);
}
function getChartDataAge_Cat() {
    var chartData = [];
    var age_bracket = ['<18', '19-23', '24-30', '31-36'];

    var rowR = [];
    var rowCM = [];
    var rowB = [];
    $(age_bracket).each(function (e) {
        var countR = 0;
        var countCM = 0;
        var countB = 0;
        $("#parsed_csv_list tbody tr").each(function () {
            var age = Number($(this).find("td:eq(9)").text());
            console.log(age);
            var bracket;
            if (age < 18) {
                bracket = '<18';
            } else if (age <= 23 && age >= 19) {
                bracket = '19-23';
            } else if (age > 28) {
                bracket = '31-36';
            } else {
                bracket = '24-30';
            }

            if (age_bracket[e] === bracket) {
                console.log($(this).find("td:eq(2)").text());
                if ($(this).find("td:eq(2)").text() === 'RESEARCH') {
                    countR++;
                } else if ($(this).find("td:eq(2)").text() === 'CHANGEMAKER') {
                    countCM++;
                } else if ($(this).find("td:eq(2)").text() === 'BUSINESS') {
                    countB++;
                }
            }
        });
        rowR.push(countR);
        rowCM.push(countCM);
        rowB.push(countB);
    });

    chartData = [age_bracket, rowR, rowCM, rowB];
    return(chartData);
}


function displayHTMLTable(results) {
    var table = "<table class='table hideMe'>";
    var data = results.data;


    for (i = 0; i < data.length; i++) {
        var row = data[i];
        var cells = row.join(",").split(",");
        if (i === 0) {
            table += "<thead><tr>";
            for (j = 0; j < cells.length; j++) {
                table += "<th>";
                table += cells[j];
                table += "</th>";
            }
            table += "</tr></thead>";
        } else {
            table += "<tr>";
            for (j = 0; j < cells.length; j++) {
                table += "<td>";
                table += cells[j];
                table += "</td>";
            }
            table += "</tr>";
        }
    }
    table += "</table>";
    $("#parsed_csv_list").html(table);
}


function buildConfig() {
    return {
        delimiter: "",
        header: "",
        preview: 0,
        step: undefined,
        encoding: ""
    };
}


