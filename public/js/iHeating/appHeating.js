
//========== globals =========
var appHeating; //main application
var mqtt; //mqtt client
var $$ = Dom7;

var this_js_script = $$('script[src*=appHeating]'); // or better regexp to get the file name..
var mqtt_uname = this_js_script[0].attributes["mqtt_uname"].nodeValue;
var mqtt_passwd = this_js_script[0].attributes["mqtt_passwd"].nodeValue;
var mqtt_server = this_js_script[0].attributes["mqtt_server"].nodeValue;
var broadcast_dst = this_js_script[0].attributes["broadcast_dst"].nodeValue;
var walvola_topic = this_js_script[0].attributes["walvola_topic"].nodeValue;
var controller_topic = this_js_script[0].attributes["controller_topic"].nodeValue;

var querying_walvola_status = false;

//========= constants =========
const MQTT_UNAME = mqtt_uname;
const MQTT_PASSW = mqtt_passwd;
const PUBNUB_BROADCAST_WALVOLA_DST = broadcast_dst; //broadcast walvla address.
const MQTT_WALVOLAS_TOPIC = walvola_topic;
const MQTT_CONTROLLERS_TOPIC = controller_topic + "+";


const APPID = Math.floor(Math.random()*1000).toString();//"app1234";
const CMD_GET_STATUS = "GET_STATUS";
const CMD_SET_STATUS = "SET_STATUS";
const TYPE_REQUEST = "REQUEST";
const TYPE_REPLY = "REPLY";


//========= objects =========
var mqtt_message = function (data) {
    return { 
            src: data.src,
            dst: data.dst,
            type: TYPE_REQUEST,
            cmd: data.cmd,
            value: data.value
    }
}

var mqtt_transition_message = function (data) {
    return { 
            time: data.time,
            src: data.src,
            dst: data.dst,
            label: data.label,
            type: TYPE_REPLY,
            cmd: data.cmd,
            value: {"voltage":data.volt, "state":"TRANSITION"}
    }
}


//========= main =========
init_F7(); //initialize F7 application
appHeating.init(); //start F7 application
init_mqtt(); //initialize pubnub communication
//========= support functions =========

function init_F7() {    
    console.log("inizializing F7 app");
    // Initialize Framework7 app
    appHeating = new Framework7({
        init: false //Disable App's automatica initialization
    });

    //Add main view
    var mainView = appHeating.addView('.view-main', {
        dynamicNavbar: true
    });

    appHeating.onPageInit('index', function (page) {  
        console.log("page init");
        empty_walvole_list();
        console.log("Getting status of Walvola(s)");
    });
    console.log("F7 app initialized");
}

function empty_walvole_list() {
    console.log("emptying list");
    $$('#list-walvole').html('');
    console.log("list empty");
}

function init_mqtt() {
    console.log("initializing MQTT");

    mqtt = new Paho.MQTT.Client(mqtt_server, 37780, APPID);
    
    mqtt.onConnectionLost = function (responseObject) {
        console.log("Connection Lost: "+responseObject.errorMessage);
    }
    
    mqtt.onMessageArrived = function (message) {
        console.log("Message Arrived: "+message.destinationName);
        console.log(typeof(message));
        console.log("Message Arrived: "+message.payloadString);
        console.log("CALLING MQTT_PROCESS_MEX");
        mqtt_process_mex(message.payloadString);
    }

    function onConnect() {
        console.log("onConnect");
        mqtt.subscribe(MQTT_CONTROLLERS_TOPIC);
        console.log("MQTT subscribed to " + MQTT_CONTROLLERS_TOPIC);
        console.log("mqtt initialized");
    }

    function onFailure(invocationContext, errorCode, errorMessage) {
        console.log("Error = " + errorMessage + "[" + errorCode + "]");
    }

    mqtt.connect({
        useSSL: true,
        userName: MQTT_UNAME,
        password: MQTT_PASSW,
        onSuccess: onConnect,
        onFailure: onFailure,
    });
}

function mqtt_send_mex(dst, command, value) {
    console.log("sending mqtt message")
    mqtt_mex_obj = mqtt_message({src: APPID, dst: dst, cmd: command, value: value});
    console.log(mqtt_mex_obj);
    mqtt_mex_json =JSON.stringify(mqtt_mex_obj); 
    console.log(mqtt_mex_json);

    message = new Paho.MQTT.Message(mqtt_mex_json);
    message.destinationName = MQTT_WALVOLAS_TOPIC + dst;
    message.retained = true;
    mqtt.send(message);

    console.log("mqtt message sent");
}

 
function mqtt_send_transition_mex(walvola, time, dst, label, v) {
    console.log("sending mqtt TRANSITION message")
    // mqtt_mex_obj = mqtt_transition_message({time: time, src: APPID, dst: dst, label: label, cmd: CMD_SET_STATUS});
    mqtt_mex_obj = mqtt_transition_message({time: time, src: walvola, dst: "allcontollers", label: label, cmd: "SET_STATUS", volt: v});

    console.log(mqtt_mex_obj);
    mqtt_mex_json =JSON.stringify(mqtt_mex_obj); 
    console.log(mqtt_mex_json);

    message = new Paho.MQTT.Message(mqtt_mex_json);
    message.destinationName = MQTT_CONTROLLERS_TOPIC + walvola;
    message.retained = true;
    mqtt.send(message);

    console.log("mqtt TRANSITION message sent");
}

function mqtt_process_mex(mex){
    console.log(mex);
    console.log(typeof mex);
    console.log(mex.length);
    
    var mqtt_mex = JSON.parse(mex); 
    
    console.log(mqtt_mex);
    console.log(mqtt_mex.time);
    console.log(mqtt_mex.src);
    console.log(mqtt_mex.dst);
    console.log(mqtt_mex.label);
    console.log(mqtt_mex.type);
    console.log(mqtt_mex.cmd);
    console.log(mqtt_mex.value);

    
    if (typeof mqtt_mex.time !== 'undefined') {
        console.log("---------------------");
        console.log("time is VALID");
        current_time = Date.now();
        month = parseInt(mqtt_mex.time.substring(5,7));
	console.log("received message in month: ");
        console.log(month);
        console.log("x3");
        if (month > 3 &&  month < 11) {
	    timeout = 4650000;
	} else {
	    timeout = 1050000; 
        }
        mex_time = new Date(mqtt_mex.time.substring(0,4),mqtt_mex.time.substring(5,7) - 1, mqtt_mex.time.substring(8,10), mqtt_mex.time.substring(12,14), mqtt_mex.time.substring(15,17), mqtt_mex.time.substring(18,20), 0).getTime();
        console.log(current_time);
        console.log(mex_time);
        console.log("---------------------");
        console.log(current_time - mex_time);
        
        if ((current_time - mex_time) < timeout) {
            console.log("messagio aggiornato");
            if (mqtt_mex.src == APPID)
                console.log("discarding mqtt mesaage as sent by myself");
            else {
                console.log("processing mqtt message");
                if (mqtt_mex.type == TYPE_REPLY && mqtt_mex.cmd == CMD_GET_STATUS) {
                    console.log("received STATUS replay message from walvola: " + mqtt_mex.src + " value = " + mqtt_mex.value.voltage);
                    add_update_walvola(mqtt_mex);
                    add_hook(mqtt_mex);
                    querying_walvola_status = false;
                    appHeating.hidePreloader();
                    console.log("mqtt message processed");
                }
                if (mqtt_mex.type == TYPE_REPLY && mqtt_mex.cmd == CMD_SET_STATUS) {
                    console.log("received STATUS replay message from walvola: " + mqtt_mex.src + " value = " + mqtt_mex.value);
                    add_update_walvola(mqtt_mex);
                    console.log("mqtt message processed");
                }
            }
        }
        else { console.log("Discarding message as too old2");}
    }
}

function add_update_walvola(mqtt_mex) { 
    console.log("ADD_UPDATED_WALVOLA");
    console.log(mqtt_mex);
    var bg_state_class;
    var html = `<li class="swipeout" id="#WALVOLA_ID#-swipeout">
                    <div class="swipeout-content item-content">
                      <div class="item-inner">
                        <div class="item-title col1" id="#WALVOLA_ID#-label">#WALVOLA_LABEL#</div>
                        <div class="item-after col2"><span class="badge" id="#WALVOLA_ID#-time">#WALVOLA_TIME#</span></div>
                        <div class="item-after col3"><span class="badge" id="#WALVOLA_ID#-volt">#WALVOLA_VOLT#</span></div>
                        <div class="item-after col4" id="#WALVOLA_ID#-state"><span id="#WALVOLA_ID#-badge" class="badge #WALVOLA_STATE_CLASS#">#WALVOLA_STATE#</span></div>
                      </div>
                    </div>
                    <div class="swipeout-actions-right">
                      <a href="#" class="bg-green #WALVOLA_ID#_ACTON_ON">ON</a>
                      <a href="#" class="bg-red #WALVOLA_ID#_ACTON_OFF">OFF</a>
                    </div>
                  </li>`;
    //console.log(html);
    html = html.replace(/#WALVOLA_LABEL#/g, mqtt_mex.label);
    html = html.replace(/#WALVOLA_ID#/g, mqtt_mex.src);
    html = html.replace(/#WALVOLA_VOLT#/g, mqtt_mex.value.voltage);
    html = html.replace(/#WALVOLA_TIME#/g, mqtt_mex.time.substring(12,20).split('-').join(':'));
    html = html.replace(/#WALVOLA_STATE#/g, mqtt_mex.value.state);
    if (mqtt_mex.value.state == "ON")
        bg_state_class = "bg-green"
    else if (mqtt_mex.value.state == "OFF")
        bg_state_class = "bg-red"
    html = html.replace("#WALVOLA_STATE_CLASS#", bg_state_class);

    if ($$('#' + mqtt_mex.src + '-swipeout').length == 0) {
        console.log("walvola not existing.");
        $$('#list-walvole').append(html);
    }
    else if ($$('#' + mqtt_mex.src + '-swipeout').length == 1) {
        console.log("walvola already existing");
        $$('#' + mqtt_mex.src + '-swipeout').html(html);
    }
}

function add_hook(mqtt_mex) {
    console.log("adding hook for walvolva");
    $$('#list-walvole').on('click', 'a.' + mqtt_mex.src + '_ACTON_ON.bg-green', function() {walvola_set_state(mqtt_mex.src, "ON");});
    $$('#list-walvole').on('click', 'a.' + mqtt_mex.src + '_ACTON_OFF.bg-red', function() {walvola_set_state(mqtt_mex.src, "OFF");});
    console.log("hook added");
} 

function walvola_set_state(walvola, state) {
    console.log("setting state= " + state + " of walvola= " + walvola);
    mqtt_send_mex(walvola, CMD_SET_STATUS, state);

    currentTime = new Date();
    yy = currentTime.getFullYear();
    mm = currentTime.getMonth() + 1;
    if (mm < 10)
        mm = "0" + mm;
    dd = currentTime.getDate();
    if (dd < 10)
        dd = "0" + dd;
    tt = $$('#' + walvola + '-time')[0].innerHTML.split(':').join('-');
    
    label = $$('#' + walvola + '-label')[0].innerHTML;
    v = $$('#' + walvola + '-volt')[0].innerHTML;

    console.log("setting state= TRANSITON of walvola= " + walvola);
    mqtt_send_transition_mex(walvola, yy+"-"+mm+"-"+dd+"--"+tt, "allcontollers", label, v);
    
console.log("walvola state set");
}
