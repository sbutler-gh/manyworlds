import { dev } from "$app/env";

let variables;

if (dev) {
    variables = {
        endpointPath: './functions/endpoints/'
      };
}
else {
variables = {
    endpointPath: '/'
    };
}

export default variables;

// let variables = {
//     endpointPath: './functions/'
//   };