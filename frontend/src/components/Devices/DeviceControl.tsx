import React, { useState } from 'react';

const DeviceControl: React.FC = () => {
  const [activeDevice, setActiveDevice] = useState<string | null>(null);
  const [deviceStatus, setDeviceStatus] = useState<'OFFLINE' | 'READY' | 'ACTIVE'>('OFFLINE');

  const devices = [
    {
      id: 'nrh-9000',
      name: 'NRH-9000 Neural Helmet',
      description: 'Full brain imaging and healing system',
      capabilities: ['Stroke Reversal', 'Neural Regeneration', 'Complete Brain Mapping'],
      status: deviceStatus
    },
    {
      id: 'qhb-100', 
      name: 'QHB-100 Quantum Headband',
      description: 'Lightweight brain treatment system',
      capabilities: ['Stroke Treatment', 'Neural Optimization', 'Continuous Monitoring'],
      status: deviceStatus
    }
  ];

  const activateDevice = async (deviceId: string) => {
    setActiveDevice(deviceId);
    setDeviceStatus('READY');
    
    // Device activation logic would go here
    console.log(`Activating device: ${deviceId}`);
  };

  return (
    <div className="device-control">
      <h2>Medical Device Control</h2>
      
      <div className="devices-grid">
        {devices.map((device) => (
          <div key={device.id} className="device-card">
            <h3>{device.name}</h3>
            <p>{device.description}</p>
            
            <div className="capabilities">
              {device.capabilities.map((capability, index) => (
                <span key={index} className="capability-tag">
                  {capability}
                </span>
              ))}
            </div>

            <button
              onClick={() => activateDevice(device.id)}
              disabled={activeDevice !== null}
              className="device-activation-btn"
            >
              {activeDevice === device.id ? 'DEVICE ACTIVE' : 'ACTIVATE DEVICE'}
            </button>

            <div className="device-status">
              Status: <span className={`status-${device.status.toLowerCase()}`}>
                {device.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceControl;