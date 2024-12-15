import React, { useState } from 'react';
import { View, Button} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function YoutubeScreen({navigation, route}) {
  const [playing, setPlaying] = useState(false);
  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };
  const videoId = route.params ?? 'Nx9E6QK3-jI';

    return (
      <View>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={videoId}
        />
        <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} />
        <Button
          title="Home"
          onPress={() => {
            return navigation.navigate('Home');
          }}/>
      </View>
  );
}
