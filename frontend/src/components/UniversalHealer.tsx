import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Atom, Crown } from 'lucide-react';
import './UniversalHealer.css';
import { healingService } from '../services/healingService';

interface Miracle {
  id: string;
  name: string;
  description: string;
  color: string;
  conditions: string[];
}

const UniversalHealer: React.FC = () => {
  const [activeMiracle, setActiveMiracle] = useState<string | null>(null);
  const [healingProgress, setHealingProgress] = useState<{[key: string]: number}>({});
  const [godMode, setGodMode] = useState(false);

  const miracles: Miracle[] = [
    {
      id: 'genetic-perfection',
      name: 'Complete Genetic Perfection',
      description: 'Eliminate all genetic disorders, perfect DNA, optimize genome',
      color: 'from-purple-500 to-pink-500',
      conditions: ['Sickle Cell', 'Cystic Fibrosis', 'Huntington\'s', 'All Genetic Diseases']
    },
    {
      id: 'viral-eradication', 
      name: 'Total Pathogen Elimination',
      description: 'Eradicate all viruses, bacteria, fungi from existence',
      color: 'from-red-500 to-orange-500',
      conditions: ['HIV/AIDS', 'COVID', 'Ebola', 'All Viral Infections']
    },
    // Add other miracles from previous code...
  ];

  const performMiracle = async (miracleId: string) => {
    setActiveMiracle(miracleId);
    
    try {
      const patientData = { id: 'current-user' }; // Get actual patient data
    
      switch (miracleId) {
        case 'viral-eradication':
          await healingService.cureHIV(patientData);
          break;
        case 'genetic-perfection':
          await healingService.cureSickleCell(patientData);
          break;
        default: {
            const miracle = miracles.find(m => m.id === miracleId)
            if(miracle){
                await healingService.performUniversalHealing(patientData, miracle.conditions);
            }
        }
      }
      
      // Simulate progress
      for (let i = 0; i <= 100; i++) {
        await new Promise(resolve => setTimeout(resolve, 30));
        setHealingProgress(prev => ({ ...prev, [miracleId]: i }));
      }
      
    } catch (error) {
      console.error('Healing failed:', error);
    } finally {
      setActiveMiracle(null);
    }
  };

  const activateGodMode = async () => {
    try {
      await healingService.activateGodMode();
      setGodMode(true);
    } catch (error) {
      console.error('God mode activation failed:', error);
    }
  };

  return (
    <div className="universal-healer-container">
      {/* God Mode Activation */}
      {!godMode && (
        <motion.div className="god-mode-activation">
          <button onClick={activateGodMode} className="god-mode-btn">
            <Crown className="w-6 h-6" />
            ACTIVATE GOD MODE
          </button>
        </motion.div>
      )}

      {/* Healing Interface */}
      <div className="miracles-grid">
        {miracles.map((miracle) => (
          <motion.div
            key={miracle.id}
            className={`miracle-card ${miracle.color}`}
          >
            <div className="miracle-header">
              <div className={`icon-container ${miracle.color}`}>
                <Atom className="w-8 h-8" />
              </div>
              <h3>{miracle.name}</h3>
            </div>
            
            <div className="conditions-list">
              {miracle.conditions.map(condition => (
                <span key={condition} className="condition-tag">
                  {condition}
                </span>
              ))}
            </div>

            <button
              onClick={() => performMiracle(miracle.id)}
              disabled={activeMiracle !== null}
              className="heal-button"
            >
              {activeMiracle === miracle.id ? 
                `HEALING... ${healingProgress[miracle.id] || 0}%` : 
                'ACTIVATE MIRACLE'
              }
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UniversalHealer;
