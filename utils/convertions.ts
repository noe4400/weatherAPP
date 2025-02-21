export const converUnixDateToLocal = (date: number) => {
  return new Date(date * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getCardStyle = (weatherCode: number | undefined) => {
  if (weatherCode === undefined) {
    return {
      backgroundColor: '#fff',
      textColor: '#000',
      assetImage: require('@/assets/images/sunny.png'),
    };
  }

  if (weatherCode === 800) {
    return {
      backgroundColor: '#FAE2BD',
      textColor: '#EFAA82',
      assetImage: require('@/assets/images/sunny.png'),
    };
  } else if (weatherCode >= 200 && weatherCode <= 600) {
    return {
      backgroundColor: '#615273',
      textColor: '#C2B8FF',
      assetImage: require('@/assets/images/rainy.png'),
    };
  } else if (weatherCode >= 800) {
    return {
      backgroundColor: '#91B4C6',
      textColor: '#CAD7DF',
      assetImage: require('@/assets/images/cloudy.png'),
    };
  } else {
    return {
      backgroundColor: '#fff',
      textColor: '#000',
      assetImage: require('@/assets/images/sunny.png'),
    };
  }
};
