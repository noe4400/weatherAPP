// src/hooks/useSearchPlaces.ts
import { useState, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { Place } from '@/types';

const useSearchPlaces = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchApiUrl = process.env.EXPO_PUBLIC_PLACES_URL;

  const searchPlaces = async (value: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Place[]>(`${searchApiUrl}?q=${value}`);
      const filterCities = data.filter((r) => r.result_type === 'city');
      setPlaces(filterCities);
    } catch (err) {
      setPlaces([]);
    } finally {
      setIsLoading(false);
    }
  };

  const throttledSearch = useCallback(
    debounce((query: string) => {
      searchPlaces(query);
    }, 500),
    [],
  );

  const handleSearchChange = (text: string) => {
    if (!text) return cleanSearchHandler();
    setSearchQuery(text);
    throttledSearch(text);
  };

  const cleanSearchHandler = () => {
    setPlaces([]);
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    places,
    isLoading,
    handleSearchChange,
    cleanSearchHandler,
  };
};

export default useSearchPlaces;
