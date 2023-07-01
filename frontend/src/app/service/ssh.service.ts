import { Injectable } from '@angular/core';
import { Client } from 'ssh2';

@Injectable({
  providedIn: 'root'
})
export class SSHService {
  private sshClient: Client;

  constructor() {
    // Create a new SSH client instance
    this.sshClient = new Client();
  }

  establishSSHConnection() {
    // Define the SSH connection options
    const sshConfig = {
      host: 'blog-backend-service.onrender.com',
      port: 22, // SSH port (default is 22)
      username: 'kareem',
      privateKey: require('fs').readFileSync('C:/Users/karee/.ssh/id_rsa'),
    };

    // Establish the SSH connection
    this.sshClient.on('ready', () => {
      console.log('SSH connection established');

      // Now you can execute commands or perform other operations on the render backend

      // Example: Execute a command on the render backend
      this.sshClient.exec('ls -l', (err, stream) => {
        if (err) throw err;

        // Handle the command output
        stream.on('data', (data: any) => {
          console.log(`Command output: ${data}`);
        });

        // Close the SSH connection when the command execution is finished
        stream.on('close', (code: any, signal: any) => {
          console.log(`Command execution finished with code ${code}`);
          this.sshClient.end();
        });
      });
    });

    // Handle SSH connection errors
    this.sshClient.on('error', (err) => {
      console.error('Error establishing SSH connection:', err);
    });

    // Connect to the render backend
    this.sshClient.connect(sshConfig);
  }
}
