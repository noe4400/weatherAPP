import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { List, MD3Colors, ProgressBar, Searchbar } from 'react-native-paper';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import ScreenBg from '@/components/ScreenBg';
import { router } from 'expo-router';
import useSearchPlaces from '@/hooks';

const search = () => {
  const { searchQuery, handleSearchChange, places, isLoading, cleanSearchHandler } =
    useSearchPlaces();

  return (
    <ScreenBg source={require('@/assets/images/search-bg.png')}>
      <SafeAreaView style={{ paddingHorizontal: 30 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 20,
            color: 'white',
          }}
        >
          Find out the weather in any city!
        </Text>
        <Searchbar
          placeholder="Enter a city"
          onClearIconPress={cleanSearchHandler}
          value={searchQuery}
          onChangeText={handleSearchChange}
          style={{
            width: '100%',
            marginHorizontal: 'auto',
            marginVertical: 20,
            backgroundColor: 'black',
          }}
        />
        <ProgressBar indeterminate color={MD3Colors.secondary90} visible={isLoading} />
        <FlatList
          data={places}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: '/weather',
                  params: { lat: item.lat, long: item.long },
                })
              }
            >
              <List.Item title={item.city_name} description={`${item.state}- ${item.country} `} />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </ScreenBg>
  );
};

export default search;
