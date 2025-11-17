const { Service } = require('node-windows');

// Create service
const svc = new Service({
  name: 'MyNodeServer',
  description: 'My Node.js backend running as a Windows service',
  script: 'C:\\Users\\marii\\Desktop\\VERSION AUSECOURS\\SuiviProductionVF - Copie (2) - Copie\\Backend\\server.js'
});

// Log events
svc.on('install', () => {
  console.log('Service installed');
  svc.start();
  console.log('Service started');
});

svc.on('alreadyinstalled', () => {
  console.log('Service already installed');
});

svc.on('invalidinstallation', () => {
  console.log('Invalid installation');
});

svc.on('error', (err) => {
  console.log('Error:', err);
});

// Install service
console.log("Installing service...");
svc.install();
