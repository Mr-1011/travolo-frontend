
import React from 'react';

type PrivacyLevelProps = {
  level: 'minimal' | 'low' | 'medium' | 'high' | 'highest';
};

const PrivacyLevel = ({ level }: PrivacyLevelProps) => {
  const getPrivacyText = () => {
    switch (level) {
      case 'minimal':
        return 'Minimal Privacy Intrusion';
      case 'low':
        return 'Low Privacy Intrusion';
      case 'medium':
        return 'Medium Privacy Intrusion';
      case 'high':
        return 'High Privacy Intrusion';
      case 'highest':
        return 'Highest Privacy Intrusion';
      default:
        return 'Unknown Privacy Level';
    }
  };

  const getPrivacyClass = () => {
    switch (level) {
      case 'minimal':
        return 'privacy-minimal';
      case 'low':
        return 'privacy-low';
      case 'medium':
        return 'privacy-medium';
      case 'high':
        return 'privacy-high';
      case 'highest':
        return 'privacy-highest';
      default:
        return '';
    }
  };
  
  const getPrivacyIcon = () => {
    switch (level) {
      case 'minimal':
        return '🟢';
      case 'low':
        return '🔵';
      case 'medium':
        return '🟡';
      case 'high':
        return '🟠';
      case 'highest':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className={`privacy-indicator ${getPrivacyClass()}`}>
      <span className="mr-1">{getPrivacyIcon()}</span>
      {getPrivacyText()}
    </div>
  );
};

export default PrivacyLevel;
