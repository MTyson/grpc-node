const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf definition dynamically
const packageDefinition = protoLoader.loadSync('service.proto');
const { myservice } = grpc.loadPackageDefinition(packageDefinition);

// Implement the NumberSquarer service
const server = new grpc.Server();

function squareNumber(call, callback) {
  const number = call.request.value;
  const squaredValue = number * number;

  callback(null, { value: squaredValue });
}

server.addService(myservice.NumberSquarer.service, {
  SquareNumber: squareNumber,
});

// Start the gRPC server
const port = 50051;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(`Failed to bind gRPC server: ${err}`);
    return;
  }
  console.log(`gRPC server is listening on port ${port}`);
  server.start();
});

