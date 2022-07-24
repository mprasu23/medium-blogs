// Do npm i protobufjs before running the file

const protobuf = require('protobufjs');
const tryCatch = (promise) => promise.then((d) => [undefined, d]).catch((e) => [e, undefined]);

async function main() {
  const [err, protobufRoot] = await tryCatch(protobuf.load('./employee.proto'));
  if (err) {
    console.error(err);
    return;
  }

  const myPackage = protobufRoot.lookupType('myPackage.Employee');
  const payload = {
    serialNumber: 1,
    firstName: 'Prasanth',
    age: 25,
  };

  //protobuf js
  const isErr = myPackage.verify(payload);
  if (isErr) {
    console.error('The message schema is invalid');
    return;
  }

  const encodedMessage = myPackage.encode(payload).finish();
  console.log(encodedMessage); // <Buffer 08 01 12 08 50 72 61 73 61 6e 74 68 18 19>

  const decodedMessage = myPackage.decode(encodedMessage);
  console.log(decodedMessage); // Employee { serialNumber: 1, firstName: 'Prasanth', age: 25 }
}

main();
