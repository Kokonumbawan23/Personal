import hapi from '@hapi/hapi';
import route from './route.js';

const init = async () =>{
    const server = hapi.server({
        'host' : 'localhost',
        'port' : '5000',
        'routes': {
            cors: {
              origin: ['*'],
            },
          },
    });

    server.route(route);

    await server.start();
    console.log(`server berjalan di ${server.info.uri}`)

}

init();