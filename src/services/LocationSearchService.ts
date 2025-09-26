export interface Location {
  name: string;
  country: string;
  region?: string;
  latitude: number;
  longitude: number;
  id: string;
}

export interface SearchService {
  searchLocations(query: string): Promise<Location[]>;
}

export class WeatherAPISearchService implements SearchService {
  private readonly baseUrl = 'https://api.weatherapi.com/v1';
  private readonly apiKey = '725bd54f9a1b458884f85421252509'; // Same key as main service

  async searchLocations(query: string): Promise<Location[]> {
    if (!query || query.trim().length < 2) {
      return [];
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/search.json?key=${this.apiKey}&q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Search API error:', response.status, errorText);
        if (response.status === 401) {
          throw new Error('API key unauthorized. Please check your WeatherAPI key.');
        }
        throw new Error(`Search failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.error('Unexpected API response:', data);
        return [];
      }
      
      return data.map((location: any) => ({
        id: `${location.lat}-${location.lon}`,
        name: location.name,
        country: location.country,
        region: location.region || '',
        latitude: location.lat,
        longitude: location.lon
      }));
    } catch (error) {
      console.error('Location search error:', error);
      throw error; // Re-throw to allow UI to handle the error
    }
  }
}

// Simple fallback locations for when API fails
const FALLBACK_LOCATIONS: Location[] = [
  { id: '1', name: 'London', country: 'United Kingdom', region: 'England', latitude: 51.5074, longitude: -0.1278 },
  { id: '2', name: 'Paris', country: 'France', region: 'Île-de-France', latitude: 48.8566, longitude: 2.3522 },
  { id: '3', name: 'Berlin', country: 'Germany', region: 'Berlin', latitude: 52.5200, longitude: 13.4050 },
  { id: '4', name: 'Madrid', country: 'Spain', region: 'Madrid', latitude: 40.4168, longitude: -3.7038 },
  { id: '5', name: 'Rome', country: 'Italy', region: 'Lazio', latitude: 41.9028, longitude: 12.4964 },
  { id: '6', name: 'Amsterdam', country: 'Netherlands', region: 'North Holland', latitude: 52.3676, longitude: 4.9041 },
  { id: '7', name: 'Vienna', country: 'Austria', region: 'Vienna', latitude: 48.2082, longitude: 16.3738 },
  { id: '8', name: 'Prague', country: 'Czech Republic', region: 'Prague', latitude: 50.0755, longitude: 14.4378 },
  { id: '9', name: 'Stockholm', country: 'Sweden', region: 'Stockholm', latitude: 59.3293, longitude: 18.0686 },
  { id: '10', name: 'Copenhagen', country: 'Denmark', region: 'Capital Region', latitude: 55.6761, longitude: 12.5683 },
];

export class LocationSearchService {
  private static instance: LocationSearchService;
  private searchService: SearchService;

  private constructor() {
    this.searchService = new WeatherAPISearchService();
  }

  static getInstance(): LocationSearchService {
    if (!LocationSearchService.instance) {
      LocationSearchService.instance = new LocationSearchService();
    }
    return LocationSearchService.instance;
  }

  async searchLocations(query: string): Promise<Location[]> {
    if (!query || query.trim().length < 2) {
      return [];
    }

    try {
      // Try to use the API first
      const apiResults = await this.searchService.searchLocations(query);
      if (apiResults.length > 0) {
        return apiResults;
      }
    } catch (error) {
      console.warn('API search failed, using fallback:', error);
    }

    // Fallback to local search
    const lowerQuery = query.toLowerCase().trim();
    return FALLBACK_LOCATIONS.filter(location => 
      location.name.toLowerCase().includes(lowerQuery) ||
      location.country.toLowerCase().includes(lowerQuery) ||
      (location.region && location.region.toLowerCase().includes(lowerQuery))
    );
  }

  // Store recent searches
  private recentSearches: Location[] = [];

  addToRecentSearches(location: Location) {
    // Remove if already exists
    this.recentSearches = this.recentSearches.filter(
      item => item.id !== location.id
    );
    
    // Add to beginning
    this.recentSearches.unshift(location);
    
    // Keep only last 10
    this.recentSearches = this.recentSearches.slice(0, 10);
  }

  getRecentSearches(): Location[] {
    return this.recentSearches;
  }

  clearRecentSearches() {
    this.recentSearches = [];
  }
}