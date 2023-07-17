const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf definition dynamically
const packageDefinition = protoLoader.loadSync('service.proto');
const { myservice } = grpc.loadPackageDefinition(packageDefinition);

// Create a gRPC client
const client = new myservice.NumberSquarer('localhost:50051', grpc.credentials.createInsecure());

// Read the number from the command line argument
const number = parseInt(process.argv[2]);

// Create the request message
const request = { value: number };

// Make the gRPC unary RPC call
client.SquareNumber(request, (err, response) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }
  console.log(`Squared number: ${response.value}`);
});

