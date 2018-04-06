let deepstream = require('deepstream.io-client-js');

var client = deepstream('52.192.206.13:6020');
//var client = deepstream('13.56.190.2:6020');
client.login();
client.event.subscribe('esdc/bath/test', data => {
    console.log('sub: data', data);
})
