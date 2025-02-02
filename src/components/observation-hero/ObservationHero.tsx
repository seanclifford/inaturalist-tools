import React from 'react';

interface ObservationHeroProps {
  observation?: Observation;
  site: Site;
}

const ObservationHero: React.FC<ObservationHeroProps> = ({ observation, site }) => {
    if (!observation) {
        return <span>loading</span>;
    }
  const { id, photos, description, observed_on, user, taxon,  } = observation;
  const firstPhoto = photos.length > 0 ? photos[0] : { url: '' };

  const url = new URL(site.url);
  url.pathname = `/observations/${id}`;

  return (
    <div style={{ position: 'relative', textAlign: 'center', color: 'white', width: '20vw' }}>
      <img src={firstPhoto.url} alt="Observation" style={{ width: '100%' }} />
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <h2>{taxon?.name ?? description}</h2>
        <p>{new Date(observed_on).toLocaleDateString()}</p>
        <p>{user.name} ({user.login})</p>
      </div>
      <a href={url.toString()} target='_blank' rel='noreferrer'>See it on {site.name}</a>
    </div>
  );
};

export default ObservationHero;