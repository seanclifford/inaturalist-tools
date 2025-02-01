import React from 'react';

interface ObservationHeroProps {
  observation?: Observation;
}

const ObservationHero: React.FC<ObservationHeroProps> = ({ observation }) => {
    if (!observation) {
        return <span>loading</span>;
    }
  const { photos, description, observed_on, user } = observation;
  const firstPhoto = photos[0];

  return (
    <div style={{ position: 'relative', textAlign: 'center', color: 'white' }}>
      <img src={firstPhoto.url} alt="Observation" style={{ width: '100%' }} />
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <h2>{description}</h2>
        <p>{new Date(observed_on).toLocaleDateString()}</p>
        <p>{user.name} ({user.login})</p>
      </div>
    </div>
  );
};

export default ObservationHero;