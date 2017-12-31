
var this_js_script = $('script[src*=dash]'); // or better regexp to get the file name..

var prjid = this_js_script.attr('data-prjid');   
var readkey = this_js_script.attr('data-readkey');   

var client = new Keen({
 projectId: prjid,
 readKey: readkey
});



const ACQUA_DAILY_EXPECTD = 1500;
const PASSI_DAILY_EXPECTD = 10000;

Keen.ready(function(){

  // Denti Jasmine
  //==================================================================
  // var query01 =new Keen.Query("count", {
  //   eventCollection: "trackme_denti",
  //   groupBy: "denti",
  //   maxAge: 100,
  // });
  // client.draw(query01, document.getElementById("chart01"), {
  //   // Custom configuration here
  //   title: " ",
  //   height: 120,
  //   width: "auto",
  //   is3D: true,
  //   pieSliceText: "value",
  // });


  // Denti Jasmine
  //==================================================================
  // var query02 =new Keen.Query("count", {
  //   eventCollection: "trackme_denti",
  //   timeframe: "this_year",
  //   interval: "monthly",
  //   groupBy: "denti",
  //   maxAge: 100,
  // });
  // client.draw(query02, document.getElementById("chart02"), {
  //   // Custom configuration here
  //   chartType: "columnchart",
  //   title: " ",
  //   height: 120,
  //   width: "auto",
  //   chartOptions: {
  //     isStacked: false,
  //     chartArea: {
  //       width: "100%"
  //     },
  //   },
  //   legend: { position: 'none' },
  // });

//Acqua Day
// ==================================================================
var acqua_day = new Keen.Query("sum", {
    eventCollection: "trackme_acqua",
    interval: "daily",
    targetProperty: "acqua",
    timeframe: "this_30_days",
    timezone: "UTC"
  });

  client.draw(acqua_day, document.getElementById("acqua_day"), {
    // Custom configuration here
    chartType: "columnchart",
    title: " ",
    height: 120,
    width: "auto",
    vAxis: {maxValue: 2500},
    chartOptions: {
      chartArea: {
        width: "75%",
        height: "85%"
      },
    },
  });

//Acqua Day Target
// ==================================================================
var acqua_day_target = new Keen.Query("sum", {
    eventCollection: "trackme_acqua",
    targetProperty: "acqua",
    timeframe: "this_1_days",
    timezone: "UTC"
  });

client.run(acqua_day_target, function(err, res){ // run the queries
  var expected = ACQUA_DAILY_EXPECTD;
  var result = res.result;
  var percent = Math.round(result/expected * 100); 
  console.log("result acqua taregt::" + result + ' ==' + percent);
  target_html = document.getElementById("acqua_day_target");
  target_html.innerHTML=percent+"%";
});

//Acqua Week
// ==================================================================
  var acqua_week = new Keen.Query("sum", {
    eventCollection: "trackme_acqua",
    interval: "weekly",
    targetProperty: "acqua",
    timeframe: "this_30_days",
    timezone: "UTC"
  });

client.draw(acqua_week, document.getElementById("acqua_week"), {
    // Custom configuration here
    chartType: "columnchart",
    title: " ",
    height: 120,
    width: "auto",
    vAxis: {maxValue: 12000},
    chartOptions: {
      chartArea: {
        width: "75%",
        height: "85%"
      },
    },
  });

//Acqua Week Target
// ==================================================================
var acqua_week_target = new Keen.Query("sum", {
    eventCollection: "trackme_acqua",
    targetProperty: "acqua",
    timeframe: "this_1_week",
    timezone: "UTC"
  });

client.run(acqua_week_target, function(err, res){ // run the queries
  var expected = 7 * ACQUA_DAILY_EXPECTD;
  var result = res.result;
  var percent = Math.round(result/expected * 100); 
  console.log("result acqua taregt::" + result + ' ==' + percent);
  target_html = document.getElementById("acqua_week_target");
  target_html.innerHTML=percent+"%";
});


//Acqua Month
// ==================================================================
  var acqua_month = new Keen.Query("sum", {
      eventCollection: "trackme_acqua",
    interval: "monthly",
    targetProperty: "acqua",
    timeframe: "this_6_months",
    timezone: "UTC"
  });

client.draw(acqua_month, document.getElementById("acqua_month"), {
    // Custom configuration here
     chartType: "columnchart",
    title: " ",
    height: 120,
    width: "auto",
    vAxis: {maxValue: 50000},
    chartOptions: {
      chartArea: {
        width: "75%",
        height: "85%"
      },
    },
  });

//Acqua Month Target
// ==================================================================
var acqua_month_target = new Keen.Query("sum", {
    eventCollection: "trackme_acqua",
    targetProperty: "acqua",
    timeframe: "this_1_month",
    timezone: "UTC"
  });

client.run(acqua_month_target, function(err, res){ // run the queries
  var expected = 31 * ACQUA_DAILY_EXPECTD;
  var result = res.result;
  var percent = Math.round(result/expected * 100); 
  console.log("result acqua taregt::" + result + ' ==' + percent);
  target_html = document.getElementById("acqua_month_target");
  target_html.innerHTML=percent+"%";
});


//Passi Day
// ==================================================================
var passi_day = new Keen.Query("sum", {
    eventCollection: "trackme_steps",
    interval: "daily",
    targetProperty: "steps",
    timeframe: "this_30_days",
    timezone: "UTC"
  });

  client.draw(passi_day, document.getElementById("passi_day"), {
    // Custom configuration here
    chartType: "columnchart",
    title: " ",
    height: 120,
    width: "auto",
    //vAxis: {maxValue: 30000},
    chartOptions: {
      chartArea: {
        width: "75%",
        height: "85%"
      },
    },
  });

//Passi Day Target
// ==================================================================
var passi_day_target = new Keen.Query("sum", {
    eventCollection: "trackme_steps",
    targetProperty: "steps",
    timeframe: "this_1_days",
    timezone: "UTC"
  });

client.run(passi_day_target, function(err, res){ // run the queries
  var expected = PASSI_DAILY_EXPECTD;
  var result = res.result;
  var percent = Math.round(result/expected * 100); 
  console.log("result passi taregt::" + result + ' ==' + percent);
  target_html = document.getElementById("passi_day_target");
  target_html.innerHTML=percent+"%";
});

//Passi Week
// ==================================================================
  var passi_week = new Keen.Query("sum", {
    eventCollection: "trackme_steps",
    interval: "weekly",
    targetProperty: "steps",
    timeframe: "this_30_days",
    timezone: "UTC"
  });

client.draw(passi_week, document.getElementById("passi_week"), {
    // Custom configuration here
    chartType: "columnchart",
    title: " ",
    height: 120,
    width: "auto",
    //vAxis: {maxValue: 200000},
    chartOptions: {
      chartArea: {
        width: "75%",
        height: "85%"
      },
    },
  });


//Passi Week Target
// ==================================================================
var passi_week_target = new Keen.Query("sum", {
    eventCollection: "trackme_steps",
    targetProperty: "steps",
    timeframe: "this_1_week",
    timezone: "UTC"
  });

client.run(passi_week_target, function(err, res){ // run the queries
  var expected = 7 * PASSI_DAILY_EXPECTD;
  var result = res.result;
  var percent = Math.round(result/expected * 100); 
  console.log("result passi taregt::" + result + ' ==' + percent);
  target_html = document.getElementById("passi_week_target");
  target_html.innerHTML=percent+"%";
});

//Passi Month
// ==================================================================
  var passi_month = new Keen.Query("sum", {
    eventCollection: "trackme_steps",
    interval: "monthly",
    targetProperty: "steps",
    timeframe: "this_6_months",
    timezone: "UTC"
  });

client.draw(passi_month, document.getElementById("passi_month"), {
    // Custom configuration here
     chartType: "columnchart",
    title: " ",
    height: 120,
    width: "auto",
    //vAxis: {maxValue: 3000000},
    chartOptions: {
      chartArea: {
        width: "75%",
        height: "85%"
      },
    },
  });

//Passi Month Target
// ==================================================================
var passi_month_target = new Keen.Query("sum", {
    eventCollection: "trackme_steps",
    targetProperty: "steps",
    timeframe: "this_1_month",
    timezone: "UTC"
  });

client.run(passi_month_target, function(err, res){ // run the queries
  var expected = 31 * PASSI_DAILY_EXPECTD;
  var result = res.result;
  var percent = Math.round(result/expected * 100); 
  console.log("result passi taregt::" + result + ' ==' + percent);
  target_html = document.getElementById("passi_month_target");
  target_html.innerHTML=percent+"%";
});

  // cell title 3
  //==================================================================
  var peso_week = new Keen.Query("maximum", {
    eventCollection: "trackme_salute",
    timeframe: "this_12_months",
    targetProperty: "peso",
    interval: "weekly",
     maxAge: 100,
    filters: [{"property_name":"peso","operator":"gt","property_value":0}]
  });

  client.draw(peso_week, document.getElementById("peso_week"), {
    // Custom configuration here
    chartType: "areachart",
    title: " ",
    height: 223,
    width: "auto",
    vAxis: {maxValue: 106.3},
    chartOptions: {
      chartArea: {
        width: "85%",
        height: "85%"
      },
    },
  });

   var glicemia_month = new Keen.Query("maximum", {
    eventCollection: "trackme_salute",
    interval: "weekly",
    targetProperty: "glicemia",
    timeframe: "this_12_months",
    timezone: "UTC"
  });

    client.draw(glicemia_month, document.getElementById("glicemia_month"), {
    // Custom configuration here
    chartType: "areachart",
    title: " ",
    height: 223,
    width: "auto",
    vAxis: {maxValue: 106.3},
    chartOptions: {
      chartArea: {
        width: "85%",
        height: "85%"
      },
    },
  });


  // cell title 4
  //==================================================================
   var dieta_day =new Keen.Query("maximum", {
    eventCollection: "trackme_dieta",
    timeframe: "this_1_months",
    targetProperty: "punti_dieta",
     maxAge: 100,
    interval: "daily"
  });
  client.draw(dieta_day, document.getElementById("dieta_day"), {
    // Custom configuration here
    chartType: "columnchart",
    title: " ",
    height: 120,
    width: "auto",
    vAxis: {maxValue: 64},
    chartOptions: {
      chartArea: {
        width: "90%",
        height: "85%"
      },
    },
  });

 // cell title 5
  //==================================================================
  var dieta_week = new Keen.Query("sum", {
    eventCollection: "trackme_dieta",
    timeframe: "this_1_month",
    targetProperty: "punti_dieta",
     maxAge: 100,
    interval: "weekly"
  });
  client.draw(dieta_week, document.getElementById("dieta_week"), {
    // Custom configuration here
    chartType: "columnchart",
    title: " ",
    height: 120,
    width: "auto",
    chartOptions: {
      isStacked: false,
      chartArea: {
        width: "80%"
      },
    },
    legend: { position: 'none' },
  });

  // cell title 5
  //==================================================================
  var dieta_month = new Keen.Query("sum", {
    eventCollection: "trackme_dieta",
    timeframe: "this_1_year",
    targetProperty: "punti_dieta",
     maxAge: 100,
    interval: "monthly"
  });
  client.draw(dieta_month, document.getElementById("dieta_month"), {
    // Custom configuration here
    chartType: "columnchart",
    title: " ",
    height: 120,
    width: "auto",
    chartOptions: {
      isStacked: false,
      chartArea: {
        width: "80%"
      },
    },
    legend: { position: 'none' },
  });

  // Codeclubit
  //==================================================================
   var query06 = new Keen.Query("sum", {
    eventCollection: "trackme_codeclubit",
    timeframe: "this_2_months",
    targetProperty: "hit",
     maxAge: 100,
    interval: "weekly"
  });
  client.draw(query06, document.getElementById("chart06"), {
    // Custom configuration here
    chartType: "columnchart",
    title: " ",
    height: 120,
    width: "auto",
    //vAxis: {maxValue: 70},
    chartOptions: {
      chartArea: {
        width: "90%",
        height: "85%"
      },
    },
  });

  // cell title 7
  //==================================================================
   var query07 = new Keen.Query("sum", {
    eventCollection: "trackme_blogger",
    timeframe: "this_1_day",
    targetProperty: "hit",
    interval: "daily",
     maxAge: 100,
    groupBy: "post",
    timezone: "UTC"
  });
  client.draw(query07, document.getElementById("chart07"), {
    // custom configuration here
    chartType: "columnchart",
    title: " ",
    height: 240,
    width: "auto",
    //vAxis: {maxValue: 70},
    chartOptions: {
      chartArea: {
        width: "60%",
        height: "85%"
      },
    },
  });

  // // cell title 8
  // //==================================================================
     var query08 = new Keen.Query("sum", {
      eventCollection: "trackme_gas",
      timeframe: "this_2_years",
      maxAge: 100,
      targetProperty: "contatore",
      interval: "weekly",
      filters: [{"property_name":"contatore","operator":"gt","property_value":0}],
      timezone: "UTC"
    });

var chart08 = new Keen.Dataviz()
    .el(document.getElementById('chart08'))
    .chartType("columnchart")
    .colors(["#6ab975"])
    .title("").
    height(240)
    .prepare();

client.run(query08, function(err, res){ // run the queries
  var results = res.result;
  var clean_results = [];
  var data = [];

  j = 0;
  for(i=0; i< results.length; i++){
    if (results[i]. value > 0) {
      clean_results[j] = results[i];
      j++;
    }
  }

  for (i=1; i< clean_results.length; i++) {
    data[i-1] ={
      timeframe: clean_results[i]["timeframe"],
      value: clean_results[i].value - clean_results[i-1].value
    }
  }


  chart08
  .parseRawData({ result: data })
  .render();
});

  // // cell title 8new
  // //==================================================================
     var query08new = new Keen.Query("sum", {
      eventCollection: "trackme_gas_new",
      timeframe: "this_2_years",
      maxAge: 100,
      targetProperty: "contatore",
      interval: "weekly",
      filters: [{"property_name":"contatore","operator":"gt","property_value":0}],
      timezone: "UTC"
    });

var chart08new = new Keen.Dataviz()
    .el(document.getElementById('chart08new'))
    .chartType("columnchart")
    .colors(["#6ab975"])
    .title("").
    height(240)
    .prepare();

client.run(query08new, function(err, res){ // run the queries
  var results = res.result;
  var clean_results = [];
  var data = [];

  j = 0;
  for(i=0; i< results.length; i++){
    if (results[i]. value >= 0) {
      clean_results[j] = results[i];
      j++;
    }
  }

  for (i=1; i< clean_results.length; i++) {
    data[i-1] ={
      timeframe: clean_results[i]["timeframe"],
      value: clean_results[i].value - clean_results[i-1].value
    }
  }


  chart08new
  .parseRawData({ result: data })
  .render();
});


  // Codeclubit
  //==================================================================
  var query09 = new Keen.Query("sum", {
    eventCollection: "trackme_codeclubit",
    timeframe: "this_1_year",
    targetProperty: "hit",
     maxAge: 100,
    interval: "monthly",
    timezone: "UTC"
  });
  client.draw(query09, document.getElementById("chart09"), {
    // Custom configuration here
    chartType: "columnchart",
    title: " ",
    height: 120,
    width: "auto",
    //vAxis: {maxValue: 70},
    chartOptions: {
      chartArea: {
        width: "90%",
        height: "85%"
      },
    },
  });

  // Blogger posts
  //==================================================================
  var query10 = new Keen.Query("sum", {
    eventCollection: "trackme_blogger",
    timeframe: "this_2_year",
    targetProperty: "hit",
    maxAge: 100,
    interval: "monthly",
    timezone: "UTC"
  });

  client.draw(query10, document.getElementById("chart10"), {
    // Custom configuration here
     chartType: "columnchart",
    title: " ",
    height: 240,
    width: "auto",
    //vAxis: {maxValue: 70},
    chartOptions: {
      chartArea: {
        width: "95%",
        height: "85%"
      },
    },
  });


 var query13 = new Keen.Query("count", {
    eventCollection: "trackme_blogger",
    filters: [
    {
        "operator": "gt",
        "property_name": "post_id",
        "property_value": 100 
    }
],
    groupBy: [
    "post"
],
    timeframe: "this_2_years",
    timezone: "UTC"
  });

 client.draw(query13, document.getElementById("chart13"), {
    chartType: "barchart",
    title: " ",
    height: 240,
    width: "auto",
    //vAxis: {maxValue: 70},
    chartOptions: {
      chartArea: {
        width: "80%",
        height: "75%"
      },
    },
  });


  // cell title 11
  //=	=================================================================
 var query11a1 = new Keen.Query("maximum", {
  eventCollection: "trackme_elettricita",
  timeframe: "this_18_months",
  targetProperty: "A1",
  interval: "weekly",
   maxAge: 100,
  filters: [{"property_name":"A1","operator":"gt","property_value":0}],
  timezone: "UTC"
});

var query11a2 = new Keen.Query("maximum", {
  eventCollection: "trackme_elettricita",
  timeframe: "this_18_months",
  targetProperty: "A2",
  interval: "weekly",
   maxAge: 100,
  filters: [{"property_name":"A2","operator":"gt","property_value":0}],
  timezone: "UTC"
});

var query11a3 = new Keen.Query("maximum", {
  eventCollection: "trackme_elettricita",
  timeframe: "this_18_months",
  targetProperty: "A3",
  interval: "weekly",
   maxAge: 100,
  filters: [{"property_name":"A3","operator":"gt","property_value":0}],
  timezone: "UTC"
});

var chart11 = new Keen.Dataviz()
    .el(document.getElementById('chart11'))
    .chartType("columnchart")
    .colors(["#66aabb", "#6ab975", "#ff0000"])
    .title("").
    height(240)
    .prepare();

client.run([query11a1, query11a2, query11a3], function(err, res){ // run the queries
  var resultsA1 = res[0].result;
  var resultsA2 = res[1].result;
  var resultsA3 = res[2].result;
  var clean_resultsA1 = [];
  var clean_resultsA2 = [];
  var clean_resultsA3 = [];
  var clean_results_TOT = [];
  var data = [];
  var data_TOT = [];

  j = 0;
  for(i=0; i< resultsA1.length; i++){
    if (resultsA1[i]. value > 0) {
      clean_resultsA1[j] = resultsA1[i];
      j++;
    }
  }

  j = 0;
  for(i=0; i< resultsA2.length; i++){
    if (resultsA2[i]. value > 0) {
      clean_resultsA2[j] = resultsA2[i];
      j++;
    }
  }

  j = 0;
  for(i=0; i< resultsA3.length; i++){
    if (resultsA3[i]. value > 0) {
      clean_resultsA3[j] = resultsA3[i];
      j++;
    }
  }

  clean_results_TOT = clean_resultsA1;

  j = 0;
  for(i=0; i< clean_resultsA1.length; i++){
    clean_results_TOT[j].value = clean_resultsA1[i].value + clean_resultsA2[i].value + clean_resultsA3[i].value;
    j++;
  }


for (i=1; i< clean_resultsA1.length-1; i++) {
    data[i-1] ={
      timeframe: clean_resultsA1[i]["timeframe"],
      value: [
        { category: "A1", result: (clean_resultsA1[i].value - clean_resultsA1[i-1].value) + 0  },
        { category: "A2", result: (clean_resultsA2[i].value - clean_resultsA2[i-1].value) + 0 },
        { category: "A3", result: (clean_resultsA3[i].value - clean_resultsA3[i-1].value) + 0 },
      ]
    }
  }

for (i=1; i< clean_results_TOT.length; i++) {
    data_TOT[i-1] ={
      timeframe: clean_results_TOT[i]["timeframe"],
      value: [
        { category: "TOT", result: (clean_results_TOT[i].value - clean_results_TOT[i-1].value) + 0  },
      ]
    }
  }


  chart11
  .parseRawData({ result: data_TOT })
  .render();
});

// walvola Cucina
  //==================================================================
  // var query-walvola-cucina = new Keen.Query("average", {
  //   eventCollection: "walvola_voltage_Cucina",
  //   interval: "hourly",
  //   targetProperty: "voltage",
  //   timeframe: "this_7_days",
  //   timezone: "UTC"
  // });

  // client.draw(query-walvola-cucina, document.getElementById("chart-walvola-cucina"), {
  //   // Custom configuration here
  //    chartType: "columnchart",
  //   title: " ",
  //   height: 240,
  //   width: "auto",
  //   //vAxis: {maxValue: 70},
  //   chartOptions: {
  //     chartArea: {
  //       width: "95%",
  //       height: "85%"
  //     },
  //   },
  // });


// walvola cucina
  //==================================================================
  var query_w_cucina = new Keen.Query("average", {
    eventCollection: "walvola_voltage_Cucina",
    interval: "hourly",
    targetProperty: "voltage",
    timeframe: "this_7_days",
    timezone: "UTC"
  });

  client.draw(query_w_cucina, document.getElementById("chart-walvola-cucina"), {
    // Custom configuration here
    chartType: "linechart",
    title: " ",
    height: 240,
    width: "auto",
    vAxis: {maxValue: 2500, minValue: 2000, gridlines: {color: '#333', count: 8}},
    tooltip: {textStyle: {color: '#FF0000'}, showColorCode: true},
    chartOptions: {
      chartArea: {
        width: "85%",
        height: "85%"
      },
    },
  });

// walvola jasmine
  //==================================================================
  var query_w_jasmine = new Keen.Query("average", {
    eventCollection: "walvola_voltage_Jasmine",
    interval: "hourly",
    targetProperty: "voltage",
    timeframe: "this_7_days",
    timezone: "UTC"
  });

  client.draw(query_w_jasmine, document.getElementById("chart-walvola-jasmine"), {
    // Custom configuration here
    chartType: "linechart",
    title: " ",
    height: 240,
    width: "auto",
    vAxis: {maxValue: 2500, minValue: 2000, gridlines: {color: '#333', count: 8}},
    tooltip: {textStyle: {color: '#FF0000'}, showColorCode: true},
    chartOptions: {
      chartArea: {
        width: "85%",
        height: "85%"
      },
    },
  });

// walvola bagno rosa
  //==================================================================
  var query_w_brosa = new Keen.Query("average", {
    eventCollection: "walvola_voltage_Bagno Rosa",
    interval: "hourly",
    targetProperty: "voltage",
    timeframe: "this_7_days",
    timezone: "UTC"
  });

  client.draw(query_w_brosa, document.getElementById("chart-walvola-brosa"), {
    // Custom configuration here
    chartType: "linechart",
    title: " ",
    height: 240,
    width: "auto",
    vAxis: {maxValue: 2500, minValue: 2000, gridlines: {color: '#333', count: 8}},
    tooltip: {textStyle: {color: '#FF0000'}, showColorCode: true},
    chartOptions: {
      chartArea: {
        width: "85%",
        height: "85%"
      },
    },
  });

});



