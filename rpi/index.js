let deepstream = require('deepstream.io-client-js');
let client = deepstream('52.192.206.13:6020');

client.login();
client.event.subscribe('esdc/bath/test', data => {
    console.log('sub: data', data);
})
