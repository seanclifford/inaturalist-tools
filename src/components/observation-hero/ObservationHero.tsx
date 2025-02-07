import React from 'react';
import getPhotoUrl from '../../inaturalist/photo-urls';
import { Anchor, Avatar, Center, Group, Image, Paper, Stack, Text } from '@mantine/core';

interface ObservationHeroProps {
  observation?: Observation;
  site: Site;
}

const ObservationHero: React.FC<ObservationHeroProps> = ({ observation, site }) => {
    if (!observation) {
        return <span>loading</span>;
    }
  const { id, photos, user, taxon,  } = observation;
  const firstPhotoUrl = photos.length > 0 ? getPhotoUrl(photos[0], "medium") : null;

  const url = new URL(site.url);
  url.pathname = `/observations/${id}`;

  return (
    <Paper w={300} radius='md' shadow='sm' withBorder>
      <Center h={300} bg='lightgrey'>
        <Image src={firstPhotoUrl} w='auto' maw={300} mah={300}/>
      </Center>
      <Stack p="xs">
        <Group gap='0'>
          {taxon && !taxon.preferred_common_name ? (
            <Text size='lg' fs='italic'>{taxon?.name}</Text>
          ) : (
            <>
              <Text size='lg'>{taxon?.preferred_common_name ?? "Unknown"}</Text>
              <Text size='md' fs='italic' hidden={!taxon}>{'(' + taxon?.name + ')'}</Text>
            </>
          )}
                    
        </Group>
        <Group gap='xs'>
          <Avatar src={user.icon} alt={user.login} bd='darkgrey solid thin'/>
          <Text>{user.login}</Text>
        </Group>
        <Anchor href={url.toString()} target='_blank' rel='noreferrer'>See it on {site.name}</Anchor>
      </Stack>
    </Paper>
  );
};

export default ObservationHero;