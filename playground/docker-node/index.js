const fs = require('fs');
const Docker = require('dockerode');
const remoteDocker = new Docker();
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
});


remoteDocker.listContainers((err, containers) => {
    if (err) {
        console.log('err', err);
        return;
    }
    containers.forEach((info) => {
        console.log('docker container', info);
        const container = remoteDocker.getContainer(info.Id);
        container.exec({
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ["cat", "hello.txt"],
            //Cmd: ["/bin/sh", "-c", 'cat > hello.txt'],
        }, (err, exec) => {
            exec.start({hijack: true, stdin:true }, (err, stream) => {
                //fs.createReadStream('./hello.txt').pipe(stream);

                rl.on('line', function(line){
                    stream.write(line);
                    //line.pipe(stream);
                });
                remoteDocker.modem.demuxStream(stream, process.stdout, process.stderr);
            });
        });
    });
});


