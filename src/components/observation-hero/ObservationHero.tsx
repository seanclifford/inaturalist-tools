import React from 'react';
import getPhotoUrl from '../../inaturalist/photo-urls';
import { Anchor, Avatar, Center, Group, Image, Paper, Stack, Text, Box } from '@mantine/core';
import { SquareArrowOutUpRight } from 'lucide-react';
import { Carousel } from '@mantine/carousel';

interface ObservationHeroProps {
  observation?: Observation;
  site: Site;
}

const ObservationHero: React.FC<ObservationHeroProps> = ({ observation, site }) => {
    if (!observation) {
        return <span>loading</span>;
    }
  const { id, photos, user, taxon,  } = observation;

  const url = new URL(site.url);
  url.pathname = `/observations/${id}`;

  return (
    <Paper w='50vh' radius='md' shadow='sm' withBorder>
      <Box style={{position: 'relative'}} >
        <Center h='50vh' style={{overflow: 'hidden'}}>
          <Carousel h='50vh' orientation='vertical' align='start' withIndicators={photos.length>1} withControls={photos.length>1}>
            {photos.map(photo => (
              <Carousel.Slide key={photo.id}>
                <Center h='50vh'>
                  <Image src={getPhotoUrl(photo, "medium")} style={{height: '50vh', width:'50vh'}}/>
                </Center>
              </Carousel.Slide>
            ))}
          </Carousel>
          
        </Center>
        <Box style={{position: 'absolute', left:'0', top:'0', height:'100%', width:'100%', background: 'linear-gradient(0deg, rgba(0,0,0,0.3), rgba(0,0,0,0))'}}/>
        <Box style={{position: 'absolute', left:'10px', bottom:'10px', color:'white'}}>
          {taxon && !taxon.preferred_common_name ? (
              <Text size='lg'  fs='italic'>{taxon?.name}</Text>
            ) : (
              <>
                <Text size='lg'>{taxon?.preferred_common_name ?? "Unknown"}</Text>
                <Text size='md' fs='italic' hidden={!taxon}>{' (' + taxon?.name + ')'}</Text>
              </>
            )}
          </Box>
          
      </Box>
      <Stack p="xs">
        
        <Group gap='xs'>
          <Avatar src={user.icon} alt={user.login} bd='darkgrey solid thin'/>
          <Text>{user.login}</Text>
          <Anchor ml='auto' href={url.toString()} target='_blank' rel='noreferrer' aria-label={`See it on ${site.name}`}>
            <SquareArrowOutUpRight/>
          </Anchor>
        </Group>
      </Stack>
    </Paper>
  );
};

export default ObservationHero;