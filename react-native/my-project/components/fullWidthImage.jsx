import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

export default function FullWidthImage({ imageUrl }) {
  if (!imageUrl) {
    imageUrl = 'https://example.com/your-image.jpg';
  }

  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    Image.getSize(imageUrl, (width, height) => {
      setImageDimensions({ width, height });
    });
  }, [imageUrl]);

  const screenWidth = Dimensions.get('window').width;
  const aspectRatio = imageDimensions.height > 0 ? imageDimensions.width / imageDimensions.height : 1;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { width: screenWidth * 0.9, aspectRatio }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
  },
});
