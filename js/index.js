/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
//  function createCORSRequest(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {
//     // XHR for Chrome/Firefox/Opera/Safari.
//     xhr.open(method, url, true);
// } else if (typeof XDomainRequest != "undefined") {
//     // XDomainRequest for IE.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);
// } else {
//     // CORS not supported.
//     xhr = null;
// }
// return xhr;
// }
// // Make the actual CORS request.
// function makeCorsRequest(meth, url) {
//   var jsonData = null;
//   var xhr = createCORSRequest(meth, url);
//   var apikey= '6211b992197b7e3d7c93bd9b2ce77fc65827a16fe32e94bee034b9018d1c5c59';
//   var device = 'defaultDevice@jincepgeorge.jincepgeorge';
//   if (!xhr) {
//     alert('CORS not supported');
//     return;
// }
// xhr.setRequestHeader('Host', 'api.carriots.com');
// xhr.setRequestHeader('carriots.apiKey', apikey);
// xhr.setRequestHeader('Accept', 'application/json');
// xhr.setRequestHeader('User-Agent', 'Carriots-client');
// xhr.setRequestHeader('Content-Type', 'application/json');
//   // Response handlers.
//   xhr.onload = function() {
//     var text = xhr.responseText;
//     decodeJson(text);
//     //console.log(text);
// };
// xhr.onerror = function() {
//     alert('There was an error making the request.');
// };
// xhr.send(jsonData);
// }
// // Decode the JSON 
// function decodeJson(text){
//   obj = JSON.parse(text);
//   //Actual report
//   var now=new Date(obj.result[0].at*1000);
//   now=now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
//   var nowTemp=Math.round(obj.result[0].data.temp);
//   var nowWind=Math.round(obj.result[0].data.wind);
//   var nowHumidity=Math.round(obj.result[0].data.hum);
//   //var nowWindDir=obj.result[0].data.wind_dir;
//   $( "#last_update" ).html("Last Update: "+now);
//   var evoTemp=nowTemp-(obj.result[1].data.temp);
//   if(evoTemp<0) { 
//     var textTemp='<span class="badge badge-orange"><i class="fa fa-arrow-down"></i> '+Math.round(evoTemp)+'</span>';
// } else {
//     var textTemp='<span class="badge badge-green"><i class="fa fa-arrow-up"></i> '+Math.round(evoTemp)+'</span>';
// }
// var evoWind=nowWind-(obj.result[1].data.wind);
// if(evoWind<0) { 
//     var textWind='<span class="badge badge-orange"><i class="fa fa-arrow-down"></i> '+Math.round(evoWind)+'</span>';
// } else {
//     var textWind='<span class="badge badge-green"><i class="fa fa-arrow-up"></i> '+Math.round(evoWind)+'</span>';
// }
// var evoHumidity=nowHumidity-(obj.result[1].data.hum);
// if(evoHumidity<0) { 
//     var textHumidity='<span class="badge badge-orange"><i class="fa fa-arrow-down"></i> '+Math.round(evoHumidity)+'</span>';
// } else {
//     var textHumidity='<span class="badge badge-green"><i class="fa fa-arrow-up"></i> '+Math.round(evoHumidity)+'</span>';
// }
// $( "#nowTemp" ).html('<strong>'+nowTemp+'</strong> &ordm;C '+textTemp); $( "#nowTemp" ).css("background", "none");
// $( "#nowWind" ).html('<strong>'+nowWind+'</strong> Km/H '+textWind);  $( "#nowWind" ).css("background", "none");
// $( "#nowHumidity" ).html('<strong>'+nowHumidity+'</strong> % '+textHumidity);  $( "#nowHumidity" ).css("background", "none");
// }
angular.module("app", ["chart.js", "AWSDynamoService"]).controller("LineCtrl", function($scope, AWSDynamoService) {

    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };

    // $scope.createCORSRequest = function (method, url) {
    //  var xhr = new XMLHttpRequest();
    //  if ("withCredentials" in xhr) {
    //         // XHR for Chrome/Firefox/Opera/Safari.
    //         xhr.open(method, url, true);
    //     } else if (typeof XDomainRequest != "undefined") {
    //         // XDomainRequest for IE.
    //         xhr = new XDomainRequest();
    //         xhr.open(method, url);
    //     } else {
    //         // CORS not supported.
    //         xhr = null;
    //     }
    //     return xhr;
    // };

    // $scope.makeCorsRequest = function (meth, url) {
    //      var jsonData = null;
    //      var xhr = $scope.createCORSRequest(meth, url);
    //      var apikey= '6211b992197b7e3d7c93bd9b2ce77fc65827a16fe32e94bee034b9018d1c5c59';
    //      var device = 'defaultDevice@jincepgeorge.jincepgeorge';

    //      if (!xhr) {
    //         alert('CORS not supported');
    //         return;
    //     }

    //     xhr.setRequestHeader('Host', 'api.carriots.com');
    //     xhr.setRequestHeader('carriots.apiKey', apikey);
    //     xhr.setRequestHeader('Accept', 'application/json');
    //     xhr.setRequestHeader('User-Agent', 'Carriots-client');
    //     xhr.setRequestHeader('Content-Type', 'application/json');

    //           // Response handlers.
    //           xhr.onload = function() {
    //             var text = xhr.responseText;
    //             $scope.decodeJson(text);
    //             //console.log(text);
    //         };

    //         xhr.onerror = function() {
    //             alert('There was an error making the request.');
    //         };

    //         xhr.send(jsonData);
    // };

    $scope.decodeJson = function(text) {
        //obj = JSON.parse(text);
        obj = text;


        //Actual report
        var now = new Date(obj.result[0].at * 1000);
        now = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
        var nowTemp = Math.round(obj.result[0].data.temp);
        var nowWind = Math.round(obj.result[0].data.wind);
        var nowHumidity = Math.round(obj.result[0].data.hum);
        //var nowWindDir=obj.result[0].data.wind_dir;
        $("#last_update").html("Last Update: " + now);
        var evoTemp = nowTemp - (obj.result[1].data.temp);
        if (evoTemp < 0) {
            var textTemp = '<span class="badge badge-orange"><i class="fa fa-arrow-down"></i> ' + Math.round(evoTemp) + '</span>';
        } else {
            var textTemp = '<span class="badge badge-green"><i class="fa fa-arrow-up"></i> ' + Math.round(evoTemp) + '</span>';
        }
        var evoWind = nowWind - (obj.result[1].data.wind);
        if (evoWind < 0) {
            var textWind = '<span class="badge badge-orange"><i class="fa fa-arrow-down"></i> ' + Math.round(evoWind) + '</span>';
        } else {
            var textWind = '<span class="badge badge-green"><i class="fa fa-arrow-up"></i> ' + Math.round(evoWind) + '</span>';
        }
        var evoHumidity = nowHumidity - (obj.result[1].data.hum);
        if (evoHumidity < 0) {
            var textHumidity = '<span class="badge badge-orange"><i class="fa fa-arrow-down"></i> ' + Math.round(evoHumidity) + '</span>';
        } else {
            var textHumidity = '<span class="badge badge-green"><i class="fa fa-arrow-up"></i> ' + Math.round(evoHumidity) + '</span>';
        }

        $("#nowTemp").html('<strong>' + nowTemp + '</strong> &ordm;C ' + textTemp);
        $("#nowTemp").css("background", "none");
        $("#nowWind").html('<strong>' + nowWind + '</strong>V ' + textWind);
        $("#nowWind").css("background", "none");
        $("#nowHumidity").html('<strong>' + nowHumidity + '</strong>RPM ' + textHumidity);
        $("#nowHumidity").css("background", "none");

        var temperatureArray = [];
        var humidityArray = [];
        var windArray = [];
        var labelArray = [];
        //  var angularArray=[];

        for (var i = 0; i < 10; i++) {
            temperatureArray.push(Math.round(obj.result[i].data.temp));
            humidityArray.push(Math.round(obj.result[i].data.hum));
            windArray.push(Math.round(obj.result[i].data.wind));
            time = new Date(obj.result[i].at * 1000);
            datetext = time.toTimeString().split(' ')[0];
            // dformat = [time.getMonth()+1,
            //  time.getDate(),
            //  time.getFullYear()].join('/')+' '+
            // [time.getHours(),
            //  time.getMinutes(),
            //  time.getSeconds()].join(':');
            labelArray.push(datetext);
        }
        //  angularArray.length=0;
        //angular.copy(graphData,angularArray);

        //$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.tempLabels = labelArray;
        $scope.humLabels = labelArray;
        $scope.windLabels = labelArray;

        $scope.tempSeries = ['Temperature', ];
        $scope.tempColor = ['#ffe600', ];
        $scope.humColor = ['#c0c0c0', ];
        $scope.windColor = ['#808080', ];

        $scope.humSeries = ['Humidity', ];
        $scope.windSeries = ['Wind'];

        // $scope.graphData=angularArray;
        $scope.tempData = [
            temperatureArray,

        ];
        $scope.humData = [
            humidityArray,

        ];
        $scope.windData = [
            windArray,

        ];

        // $scope.loadGraph(angularArray);



    };
    $scope.decodeDynamoDbData = function(text) {

        //obj = JSON.parse(text);
        obj = text;

        var length = obj['Items'].length;
        console.log("length of items: " + length);
        if (length > 0) {
            //Actual report
            var now = new Date(obj['Items'][0].timestamp.S * 1);
            now = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
           // var nowTemp = Math.round(obj['Items'][0].Payload.M.state.M.desired.M.state.M.desired.M.temperature.N);
           // var nowfanspeed = Math.round(obj['Items'][0].Payload.M.state.M.desired.M.fan_speed.N);
            //var nowacvoltage = Math.round(obj['Items'][0].Payload.M.state.M.desired.M.ac_voltage.N);
            var nowPiTemp = Math.round(obj['Items'][0].Payload.M.state.M.desired.M.pi_temperature.N);
                                                                   var nowPiTotalMemory = Math.round(obj['Items'][0].Payload.M.state.M.desired.M.total_memory.N);
                                                                   var nowPimemoryUsed = Math.round(obj['Items'][0].Payload.M.state.M.desired.M.memory_used.N);
                                                                   
            var nowClimateTemp = Math.round(obj['Items'][0].Payload.M.state.M.desired.M.real_temperature.N);
            var nowClimateHum = Math.round(obj['Items'][0].Payload.M.state.M.desired.M.real_humidity.N);
            var nowPimemoryFree = Math.round(obj['Items'][0].Payload.M.state.M.desired.M.memory_free.N);
            var nowPimemoryUsage = Math.round(obj['Items'][0].Payload.M.state.M.desired.M.memory_usage.N);
            var nowPicpuUsage = Math.round(obj['Items'][0].Payload.M.state.M.desired.M.cpu_usage.N);

            //var nowWindDir=obj.result[0].data.wind_dir;
            $("#last_update").html("Last Update: " + now);

            var evoPiTemp = nowPiTemp - (obj['Items'][1].Payload.M.state.M.desired.M.pi_temperature.N);
            if (evoPiTemp < 0) {
                if (evoPiTemp > 100) {
                    var textPiTemp = '<span class="badge badge-red"><i class="fa fa-arrow-down"></i> ' + Math.round(evoPiTemp) + '</span>';
                } else
                    var textPiTemp = '<span class="badge badge-orange"><i class="fa fa-arrow-down"></i> ' + Math.round(evoPiTemp) + '</span>';
            } else {
                if (nowPiTemp > 100) {
                    var textPiTemp = '<span class="badge badge-red"><i class="fa fa-arrow-up"></i> ' + Math.round(evoPiTemp) + '</span>';
                } else
                    var textPiTemp = '<span class="badge badge-green"><i class="fa fa-arrow-up"></i> ' + Math.round(evoPiTemp) + '</span>';
            }
            var evoClimateTemp = nowClimateTemp - (obj['Items'][1].Payload.M.state.M.desired.M.real_temperature.N);
            if (evoClimateTemp < 0) {
                if (evoClimateTemp > 100) {
                    var textClimateTemp = '<span class="badge badge-red"><i class="fa fa-arrow-down"></i> ' + Math.round(evoClimateTemp) + '</span>';
                } else
                    var textClimateTemp = '<span class="badge badge-orange"><i class="fa fa-arrow-down"></i> ' + Math.round(evoClimateTemp) + '</span>';
            } else {
                if (evoClimateTemp > 100) {
                    var textClimateTemp = '<span class="badge badge-red"><i class="fa fa-arrow-up"></i> ' + Math.round(evoClimateTemp) + '</span>';
                } else
                    var textClimateTemp = '<span class="badge badge-green"><i class="fa fa-arrow-up"></i> ' + Math.round(evoClimateTemp) + '</span>';
            }
            var evoClimateHum = nowClimateHum - (obj['Items'][1].Payload.M.state.M.desired.M.real_humidity.N);

            if (evoClimateHum < 0) {
                if (evoClimateHum > 100) {
                    var textClimateHum = '<span class="badge badge-red"><i class="fa fa-arrow-down"></i> ' + Math.round(evoClimateHum) + '</span>';
                } else
                    var textClimateHum = '<span class="badge badge-orange"><i class="fa fa-arrow-down"></i> ' + Math.round(evoClimateHum) + '</span>';
            } else {
                if (evoClimateHum > 100) {
                    var textClimateHum = '<span class="badge badge-red"><i class="fa fa-arrow-up"></i> ' + Math.round(evoClimateHum) + '</span>';
                } else
                    var textClimateHum = '<span class="badge badge-green"><i class="fa fa-arrow-up"></i> ' + Math.round(evoClimateHum) + '</span>';
            }
            var evoPiMemoryUsed = nowPimemoryUsed - (obj['Items'][1].Payload.M.state.M.desired.M.memory_used.N);

            if (evoPiMemoryUsed < 0) {
                if (evoPiMemoryUsed > 250) {
                    var textPiMemoryUsed = '<span class="badge badge-red"><i class="fa fa-arrow-down"></i> ' + Math.round(evoPiMemoryUsed) + '</span>';
                } else
                    var textPiMemoryUsed = '<span class="badge badge-orange"><i class="fa fa-arrow-down"></i> ' + Math.round(evoPiMemoryUsed) + '</span>';
            } else {
                if (evoPiMemoryUsed > 250) {
                    var textPiMemoryUsed = '<span class="badge badge-red"><i class="fa fa-arrow-up"></i> ' + Math.round(evoPiMemoryUsed) + '</span>';
                } else
                    var textPiMemoryUsed = '<span class="badge badge-green"><i class="fa fa-arrow-up"></i> ' + Math.round(evoPiMemoryUsed) + '</span>';
            }

            var acPower = ((obj['Items'][0].Payload.M.state.M.desired.M.ac_power.N == 0) ? " OFF" : " ON");
            var acFanStatus = ((obj['Items'][0].Payload.M.state.M.desired.M.fan_status.N == 0) ? " OFF" : " ON");
            var swingStatus = ((obj['Items'][0].Payload.M.state.M.desired.M.swing_status.N == 0) ? " OFF" : " ON");

            //$("#nowTemp").html('<strong>' + nowTemp + '</strong> &ordm;C ' + textPiTemp);
            //$("#nowTemp").css("background", "none");
            $("#nowPiTemp").html('<strong>' + nowPiTemp + '</strong> &ordm;C ' + textPiTemp);
            $("#nowPiTemp").css("background", "none");
            $("#nowClimateTemp").html('<strong>' + nowClimateTemp + '</strong> &ordm;C '+ textClimateTemp);
            $("#nowClimateTemp").css("background", "none");
            $("#nowClimateHum").html('<strong>' + nowClimateHum + '</strong> %' + textClimateHum);
            $("#nowClimateHum").css("background", "none");
            //$("#nowPiMemoryFree").html('<strong>' + nowPimemoryFree + '</strong> Mb ');
            //$("#nowPiMemoryFree").css("background", "none");
            $("#nowPiMemoryUsage").html('<strong>' + nowPimemoryUsage + '</strong> % ' );
            $("#nowPiMemoryUsage").css("background", "none");
            $("#nowPiCpuUsage").html('<strong>' + nowPicpuUsage + '</strong> % ' );
            $("#nowPiCpuUsage").css("background", "none");
            // $( "#nowWind" ).html('<strong>'+nowacvoltage+'</strong>V '+textAcvoltage);  $( "#nowWind" ).css("background", "none");
            // $( "#nowHumidity" ).html('<strong>'+nowfanspeed+'</strong>RPM '+texFanSpeed);  $( "#nowHumidity" ).css("background", "none");
           $( "#nowAcPower" ).html('<strong>'+acPower+'</strong>');  $( "#nowAcPower" ).css("background", "none");
            $( "#nowAcFanStatus" ).html('<strong>'+acFanStatus+'</strong>');  $( "#nowAcFanStatus" ).css("background", "none");
             $( "#nowSwingStatus" ).html('<strong>'+swingStatus+'</strong>');  $( "#nowSwingStatus" ).css("background", "none");


            var temperatureArray = [];
            var piTemperatureArray = [];
            var climateTempArray = [];
            var climateHumArray = [];
            var fanSpeedArray = [];
            var labelArray = [];
            var acVoltageArray = [];


            for (var i = 0; i < length; i++) {
                piTemperatureArray.push(Math.round(obj['Items'][i].Payload.M.state.M.desired.M.pi_temperature.N));
                //temperatureArray.push(Math.round(obj['Items'][i].Payload.M.state.M.desired.M.temperature.N));
                //fanSpeedArray.push(Math.round(obj['Items'][i].Payload.M.state.M.desired.M.fan_speed.N));
                //acVoltageArray.push(Math.round(obj['Items'][i].Payload.M.state.M.desired.M.ac_voltage.N));
                climateTempArray.push(Math.round(obj['Items'][i].Payload.M.state.M.desired.M.real_temperature.N));
                climateHumArray.push(Math.round(obj['Items'][i].Payload.M.state.M.desired.M.real_humidity.N));

                time = new Date(obj['Items'][i].timestamp.S * 1);
                datetext = time.toTimeString().split(' ')[0];
                // dformat = [time.getMonth()+1,
                //  time.getDate(),
                //  time.getFullYear()].join('/')+' '+
                // [time.getHours(),
                //  time.getMinutes(),
                //  time.getSeconds()].join(':');
                labelArray.push(datetext);
            }
            //  angularArray.length=0;
            //angular.copy(graphData,angularArray);

            //$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            $scope.tempLabels = labelArray;
            $scope.humLabels = labelArray;
            $scope.windLabels = labelArray;
            $scope.piTempLabels = labelArray;

            $scope.piTempSeries = ['Pi Temperature'];
            $scope.tempSeries = ['Real Temperature', ];
            $scope.tempColor = ['#ffe600', ];
            $scope.humColor = ['#c0c0c0', ];
            $scope.windColor = ['#808080', ];
            $scope.piTempColor = ['#ffe600', ];

            $scope.humSeries = ['Real Humidity', ];
            $scope.windSeries = ['Ac Voltage'];
            console.log("Testing update");
            console.log("Testing update");


            // $scope.graphData=angularArray;
            $scope.tempData = [
                climateTempArray,

            ];
            $scope.humData = [
                climateHumArray,

            ];
           
            $scope.piTempData = [
                piTemperatureArray,

            ];
            $scope.$apply();
        }

        // $scope.loadGraph(angularArray);



    };
    $scope.refreshClick = function(points, evt) {
        // $( "#nowTemp" ).css("background", "img/loaders/ajax-loader.gif").html("");
        // $( "#nowWind" ).css("background", "../img/loaders/ajax-loader.gif").html("");
        // $( "#nowHumidity" ).css("background", "../img/loaders/ajax-loader.gif").html("");
        $scope.loadData();
    };

    //$scope.makeCorsRequest("GET", "http://api.carriots.com/devices/defaultDevice@jincepgeorge.jincepgeorge/streams/?sort=at&order=-1");
    //$scope.loadGraph();

    var offline = 0;


    $scope.loadData = function() {

        temperature = Math.floor((Math.random() * 20) + 5);
        fanspeed = Math.floor((Math.random() * 50) + 10);
        acvoltage = Math.floor((Math.random() * 60) + 40);
        var dummyResponse = {
            "total_documents": 1055,
            "result": [{
                "_id": "56ebeb4d5c5d75b423fd8ea4",
                "_t": "str",
                "at": 1458301773,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": fanspeed,
                    "wind": acvoltage,
                    "temp": temperature
                },
                "id_developer": "3b623519d7a199b49a0587f6593d3e4a4e8a93a2bbfefc62765c0dd005118813@jincepgeorge.jincepgeorge",
                "created_at": 1458301773,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebeb425c5d75a720fd8f62",
                "_t": "str",
                "at": 1458301762,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 55.464463030584,
                    "wind": 49.004928307727,
                    "temp": 15.992975526115
                },
                "id_developer": "41125c46589ba575e03e7983183f9cbf2207938090acccc47d262e794c1c0556@jincepgeorge.jincepgeorge",
                "created_at": 1458301762,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebeb375c5d75c91dfd8fe8",
                "_t": "str",
                "at": 1458301751,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 53.94102358215,
                    "wind": 44.002444368252,
                    "temp": 19.438361174498
                },
                "id_developer": "9962fb1cace93e22c0bd36b2eecd5a49824891fe95f8a1c4449be9662a528730@jincepgeorge.jincepgeorge",
                "created_at": 1458301751,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebeb2d5c5d75f61efd8fd1",
                "_t": "str",
                "at": 1458301741,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 56.771444106455,
                    "wind": 49.099028973214,
                    "temp": 19.37713267515
                },
                "id_developer": "2ef049a8e5ab3b53d858f4720f31df3fe325baabcd1d00ced5ef4bed8e16522c@jincepgeorge.jincepgeorge",
                "created_at": 1458301741,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebeb225c5d75361dfd903d",
                "_t": "str",
                "at": 1458301730,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 55.407902387556,
                    "wind": 48.643098353718,
                    "temp": 18.812165015393
                },
                "id_developer": "d224352bc06413a432751b378ce56c74f5e238014701daf4234523e4729eb6d9@jincepgeorge.jincepgeorge",
                "created_at": 1458301730,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebeb185c5d75351dfd9049",
                "_t": "str",
                "at": 1458301720,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 55.216873511112,
                    "wind": 41.718082012237,
                    "temp": 15.549468661731
                },
                "id_developer": "dbb0378d9093a5b1e21b5d10e55ceeb47675a7a63aa69bb9d0e7732b87fe64ce@jincepgeorge.jincepgeorge",
                "created_at": 1458301720,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebeb0d5c5d75361dfd9039",
                "_t": "str",
                "at": 1458301709,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 57.018228930638,
                    "wind": 46.221086834756,
                    "temp": 18.918501005831
                },
                "id_developer": "4969dd3e87a9b7f7d59b6b9bc64c4808327d1b76a08cda7de682461cde44c259@jincepgeorge.jincepgeorge",
                "created_at": 1458301709,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebeb025c5d754c21fd8f3b",
                "_t": "str",
                "at": 1458301698,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 53.914038364791,
                    "wind": 42.172644403909,
                    "temp": 12.580749374037
                },
                "id_developer": "58e32d2c6f5fe344bbfce83e1c03b5ae93b85b7532d7d02c374eaa96fbf7e596@jincepgeorge.jincepgeorge",
                "created_at": 1458301698,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebeaf85c5d75f822fd8eca",
                "_t": "str",
                "at": 1458301688,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 51.840394466177,
                    "wind": 45.727534200669,
                    "temp": 14.08057394002
                },
                "id_developer": "60af0072bb9e837a4872c4e455c0866512dbe4482a73c6e18b9dc0f269f848d2@jincepgeorge.jincepgeorge",
                "created_at": 1458301688,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebeaed5c5d75c91dfd8fe1",
                "_t": "str",
                "at": 1458301677,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 54.211905002727,
                    "wind": 42.532639233932,
                    "temp": 19.537365402462
                },
                "id_developer": "446124b603a2a753c778b70fb51f2e9292042f0004ba69b58fbfdf4d896512fc@jincepgeorge.jincepgeorge",
                "created_at": 1458301677,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebeae35c5d75361dfd9034",
                "_t": "str",
                "at": 1458301666,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 53.836969492142,
                    "wind": 41.956176787339,
                    "temp": 12.359173718793
                },
                "id_developer": "9d51c75d52ff6ec65fc263ad66c367f8a154191c0b3253662488743f62a1f980@jincepgeorge.jincepgeorge",
                "created_at": 1458301667,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebead85c5d75f61efd8fc1",
                "_t": "str",
                "at": 1458301656,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 57.528167777792,
                    "wind": 42.921520891799,
                    "temp": 15.551323763125
                },
                "id_developer": "1fb1632968ab6d155aecb3dd4f0a24f1ecd3aa38f68caa6cd45360d6dc8bab1e@jincepgeorge.jincepgeorge",
                "created_at": 1458301656,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebeacd5c5d75b623fd8e81",
                "_t": "str",
                "at": 1458301645,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 52.291738390403,
                    "wind": 42.577216428788,
                    "temp": 18.19895218149
                },
                "id_developer": "3c4d3727fbcebb0823329ee63afea5559e6dcf3bb7bfb3c9a60a1695e8316e8d@jincepgeorge.jincepgeorge",
                "created_at": 1458301645,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebeac35c5d75351dfd903e",
                "_t": "str",
                "at": 1458301635,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 57.831287267117,
                    "wind": 41.789763485726,
                    "temp": 15.521165435599
                },
                "id_developer": "37f3679d9d9d2708748c3a5982a2ca05bf41b27ca29677c92f76e8680ebda59e@jincepgeorge.jincepgeorge",
                "created_at": 1458301635,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebeab85c5d75351dfd903c",
                "_t": "str",
                "at": 1458301624,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 59.202907846455,
                    "wind": 46.26414648343,
                    "temp": 19.569126388012
                },
                "id_developer": "7edd0404a2401ba1250cd14328a8759d84d12e85a63173d8a301d0bc8537233f@jincepgeorge.jincepgeorge",
                "created_at": 1458301624,
                "owner": "jincepgeorge"
            }, {
                "_id": "56ebeaad5c5d75351dfd903a",
                "_t": "str",
                "at": 1458301613,
                "device": "defaultDevice@jincepgeorge.jincepgeorge",
                "protocol": "v2",
                "data": {
                    "hum": 55.477572677481,
                    "wind": 48.710148106,
                    "temp": 16.397565026961
                },
                "id_developer": "5c9cb8e99bd097aa9e0cddba4d13dcb74cde5ac3790f91565f577dbbcbb7e7f2@jincepgeorge.jincepgeorge",
                "created_at": 1458301613,
                "owner": "jincepgeorge"
            }]
        };

        $scope.region = 'ap-northeast-1'; // Region
        $scope.identitypoolId = 'ap-northeast-1:8529e120-1f0a-4433-b93d-23f805195444';
        $scope.tableName = 'ACmonitoring';

        if (offline) {
            $scope.decodeJson(dummyResponse);
        } else {

            AWSDynamoService.invokeDynamoDb($scope.region, $scope.identitypoolId, $scope.tableName, function(response) {
                $scope.decodeDynamoDbData(response);

            })
        }

    };
    $scope.switchOff = function() {
        // $scope.powerOffUrl = 'http://172.16.7.47:3001/';

        // AWSDynamoService.switchOffAc($scope.powerOffUrl, function(response) {
        //         console.log('switchOff Called' + response);

        //     },
        //     function(error) {
        //         console.log('Error in switchOff :' + error);

        //     });
$("#myModal").show();

    };
     $scope.shutdown = function() {
         send("shutdown","shutdown");

    };
      $scope.reboot = function() {
        send("reboot","reboot");

    };
                                                                   
                                                                   $scope.controLlights = function(mode) {
                                                                   if(mode===1)
                                                                   send("ON","lights");
                                                                   else
                                                                   send("OFF","lights");
                                                                   
                                                                   };
                                                                  

    $scope.loadData();
    setInterval(function() {
    $scope.loadData();

    }, 10000);

    //  $scope.data= graphData;

});



    var data = {
      messages: []
    };

    new Vue({
      el: '#chat',
      data: data
    });

 

    function SigV4Utils(){}

    SigV4Utils.sign = function(key, msg) {
      var hash = CryptoJS.HmacSHA256(msg, key);
      return hash.toString(CryptoJS.enc.Hex);
    };

    SigV4Utils.sha256 = function(msg) {
      var hash = CryptoJS.SHA256(msg);
      return hash.toString(CryptoJS.enc.Hex);
    };

    SigV4Utils.getSignatureKey = function(key, dateStamp, regionName, serviceName) {
      var kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key);
      var kRegion = CryptoJS.HmacSHA256(regionName, kDate);
      var kService = CryptoJS.HmacSHA256(serviceName, kRegion);
      var kSigning = CryptoJS.HmacSHA256('aws4_request', kService);
      return kSigning;
    };

    function createEndpoint(regionName, awsIotEndpoint, accessKey, secretKey) {
      var time = moment.utc();
      var dateStamp = time.format('YYYYMMDD');
      var amzdate = dateStamp + 'T' + time.format('HHmmss') + 'Z';
      var service = 'iotdevicegateway';
      var region = regionName;
      var secretKey = secretKey;
      var accessKey = accessKey;
      var algorithm = 'AWS4-HMAC-SHA256';
      var method = 'GET';
      var canonicalUri = '/mqtt';
    var host = awsIotEndpoint;
      var credentialScope = dateStamp + '/' + region + '/' + service + '/' + 'aws4_request';
      var canonicalQuerystring = 'X-Amz-Algorithm=AWS4-HMAC-SHA256';
      canonicalQuerystring += '&X-Amz-Credential=' + encodeURIComponent(accessKey + '/' + credentialScope);
      canonicalQuerystring += '&X-Amz-Date=' + amzdate;
      canonicalQuerystring += '&X-Amz-SignedHeaders=host';

      var canonicalHeaders = 'host:' + host + '\n';
      var payloadHash = SigV4Utils.sha256('');
      var canonicalRequest = method + '\n' + canonicalUri + '\n' + canonicalQuerystring + '\n' + canonicalHeaders + '\nhost\n' + payloadHash;

      var stringToSign = algorithm + '\n' +  amzdate + '\n' +  credentialScope + '\n' +  SigV4Utils.sha256(canonicalRequest);
      var signingKey = SigV4Utils.getSignatureKey(secretKey, dateStamp, region, service);
      var signature = SigV4Utils.sign(signingKey, stringToSign);

      canonicalQuerystring += '&X-Amz-Signature=' + signature;
      return 'wss://' + host + canonicalUri + '?' + canonicalQuerystring;
    }

    var endpoint = createEndpoint(
        'ap-northeast-1',                                           // Your Region
        'a3jafhwxkos1kw.iot.ap-northeast-1.amazonaws.com', // Require 'lowercamelcase'!!
        'AKIAIMHEIXIH23TNSOVQ',                                    // your Access Key ID
        'TSTnmfy9+yWac8GucUkcMOOP4hyH7Rh/X0D1S0BV');         // Secret Access Key
    var clientId = Math.random().toString(36).substring(7);
    var client = new Paho.MQTT.Client(endpoint, clientId);
    var connectOptions = {
      useSSL: false,
      timeout: 0,
      mqttVersion: 4,
      onSuccess: subscribe
    };
    client.connect(connectOptions);
    client.onMessageArrived = onMessage;
    client.onConnectionLost = function(e) { 
        
    client.disconnect();
    client.connect(connectOptions);
      console.log(e)
       console.log("Reconnect")

       };

    function subscribe() {
      client.subscribe("reboot");
      client.subscribe("shutdown");
    client.subscribe("lights");
    client.subscribe("acpower");
        client.subscribe("swingstatus");
        client.subscribe("fanstatus");
        
      console.log("subscribed");
    }

    function send(content,dest) {
      var message = new Paho.MQTT.Message(content);
      message.destinationName = dest;
      client.send(message);
      console.log("sent");
    }

    function onMessage(message) {
      data.messages.push(message.payloadString);
        if(message.payloadString=='acpoweron'){
            $( "#nowAcPower" ).html('<strong>ON</strong>');  $( "#nowAcPower" ).css("background", "none");

        }
        else if(message.payloadString=='acpoweroff'){
            $( "#nowAcPower" ).html('<strong>OFF</strong>');  $( "#nowAcPower" ).css("background", "none");
            
        }
        else if(message.payloadString=='swingon'){
            $( "#nowSwingStatus" ).html('<strong>ON</strong>');  $( "#nowSwingStatus" ).css("background", "none");
            
        }
        else if(message.payloadString=='swingoff'){
            $( "#nowSwingStatus" ).html('<strong>OFF</strong>');  $( "#nowSwingStatus" ).css("background", "none");
            
        }


      console.log("message received: " + message.payloadString);
    }
   document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    // Now safe to use device APIs
    alert('test');
    
    var push = PushNotification.init({
                                     android: {
                                     senderID: "12345679"
                                     },
                                     ios: {
                                     alert: "true",
                                     badge: "true",
                                     sound: "true"
                                     },
                                     windows: {}
                                     });
    
    push.on('registration', function(data) {
            
            console.log(data.registrationId)
            });
    
    push.on('notification', function(data) {
            console.log( data.message);
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
            });
    
    push.on('error', function(e) {
            console.log(e.message);
            });

}
$(function() {

$('.btn-toggle').click(function() {
                       $(this).find('.btn').toggleClass('active');
                       
                       if ($(this).find('.btn-primary').size()>0) {
                       $(this).find('.btn').toggleClass('btn-primary');
                       }
                       if ($(this).find('.btn-danger').size()>0) {
                       $(this).find('.btn').toggleClass('btn-danger');
                       }
                       if ($(this).find('.btn-success').size()>0) {
                       $(this).find('.btn').toggleClass('btn-success');
                       }
                       if ($(this).find('.btn-info').size()>0) {
                       $(this).find('.btn').toggleClass('btn-info');
                       }
                       
                       $(this).find('.btn').toggleClass('btn-default');
                       
                       });
  
  });