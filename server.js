//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan');

var basicAuth = require('express-basic-auth')    

Object.assign=require('object-assign')

var options = {extensions: ['html', 'appcache']}

app.engine('html', require('ejs').renderFile);
app.engine('appcache', require('ejs').renderFile);
app.use(morgan('combined'))
app.use(express.static('public', options));

var user = process.env.USER
var pwd = process.env.PASSWD
var projid = process.env.PROJECTID
var readKey = process.env.READKEY 

var mqtt_uname = process.env.MQTT_UNAME
var mqtt_passwd = process.env.MQTT_PASSWD
var mqtt_server = process.env.MQTT_SERVER 
var broadcast_dst = process.env.BROADCAST_DST
var walvola_topic = process.env.WALVOLA_TOPIC
var controller_topic = process.env.CONTROLLER_TOPIC
var test = process.env.MQTTUNAME

app.use(basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    realm: 'jkfhnweqsdl'
}))

function myAuthorizer(username, password) {
    return username == user && password == pwd
}

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/dashboard', function (req, res) {
  res.render('trackmi/dashboard.html', { pid : projid, readk: readKey});
});

app.get('/iTracker', function (req, res) {
  res.render('iTracker/appTracker.html', { pid : projid, readk: readKey});
});

app.get('/appTracker.appcache', function (req, res) {
  res.render('iTracker/appTracker.appcache');
});


app.get('/iTracker/acquaForm.html', function (req, res) {
  res.render('iTracker/acquaForm.html', { pid : projid, readk: readKey});
});

app.get('/iTracker/saluteForm.html', function (req, res) {
  res.render('iTracker/saluteForm.html', { pid : projid, readk: readKey});
});

app.get('/iTracker/gasForm.html', function (req, res) {
  res.render('iTracker/gasForm.html', { pid : projid, readk: readKey});
});

app.get('/iTracker/elettricitaForm.html', function (req, res) {
  res.render('iTracker/elettricitaForm.html', { pid : projid, readk: readKey});
});

app.get('/iTracker/stepsForm.html', function (req, res) {
  res.render('iTracker/stepsForm.html', { pid : projid, readk: readKey});
});

app.get('/iHeating', function (req, res) {
  res.render('iHeating/appHeating.html', {mqtt_uname : mqtt_uname, mqtt_passwd : mqtt_passwd, mqtt_server : mqtt_server, broadcast_dst : broadcast_dst, walvola_topic : walvola_topic, controller_topic : controller_topic, mqttuname : mqttuname});
});

app.get('/appHeating.appcache', function (req, res) {
  res.render('iHeating/appHeating.appcache');
});


// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
