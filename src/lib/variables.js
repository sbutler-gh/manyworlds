import { dev } from "$app/env";

let variables;

if (dev) {
    variables = {
        endpointPath: './endpoints/'
      };
}
else {
variables = {
    endpointPath: '/api/'
    };
}

export default variables;

// let variables = {
//     endpointPath: './functions/'
//   };