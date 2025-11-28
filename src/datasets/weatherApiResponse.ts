import type { Dataset } from "./types";

const weatherApiResponse: Dataset = {
  name: "weather-api-response",
  label: "Weather API Bulk Response",
  description: "A dataset containing an array of nested uniform objects.",
  analysis: "TOON suffers compared to JSON, while TRON greatly leads over JSON!",
  source: 'The JSON example under the "bulk response" section found at https://www.weatherapi.com/docs/ (weather api documentation).',
  dateRetrieved: "2025-11-25",
  data: {
    "bulk": [
      {
        "query": {
          "custom_id": "my-id-1",
          "q": "53,-0.12",
          "location": {
            "name": "Boston",
            "region": "Lincolnshire",
            "country": "United Kingdom",
            "lat": 53.0,
            "lon": -0.12,
            "tz_id": "Europe/London",
            "localtime_epoch": 1673620218,
            "localtime": "2023-01-13 14:30"
          },
          "current": {
            "last_updated_epoch": 1673620200,
            "last_updated": "2023-01-13 14:30",
            "temp_c": 8.7,
            "temp_f": 47.7,
            "is_day": 1,
            "condition": {
              "text": "Partly cloudy",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
              "code": 1003
            },
            "wind_mph": 24.2,
            "wind_kph": 38.9,
            "wind_degree": 260,
            "wind_dir": "W",
            "pressure_mb": 1005.0,
            "pressure_in": 29.68,
            "precip_mm": 0.0,
            "precip_in": 0.0,
            "humidity": 74,
            "cloud": 75,
            "feelslike_c": 4.4,
            "feelslike_f": 39.9,
            "vis_km": 10.0,
            "vis_miles": 6.0,
            "uv": 2.0,
            "gust_mph": 33.1,
            "gust_kph": 53.3
          }
        }
      },
      {
        "query": {
          "custom_id": "any-internal-id",
          "q": "London",
          "location": {
            "name": "London",
            "region": "City of London, Greater London",
            "country": "United Kingdom",
            "lat": 51.52,
            "lon": -0.11,
            "tz_id": "Europe/London",
            "localtime_epoch": 1673620218,
            "localtime": "2023-01-13 14:30"
          },
          "current": {
            "last_updated_epoch": 1673620200,
            "last_updated": "2023-01-13 14:30",
            "temp_c": 11.0,
            "temp_f": 51.8,
            "is_day": 1,
            "condition": {
              "text": "Partly cloudy",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
              "code": 1003
            },
            "wind_mph": 23.0,
            "wind_kph": 37.1,
            "wind_degree": 270,
            "wind_dir": "W",
            "pressure_mb": 1010.0,
            "pressure_in": 29.83,
            "precip_mm": 0.0,
            "precip_in": 0.0,
            "humidity": 58,
            "cloud": 75,
            "feelslike_c": 8.1,
            "feelslike_f": 46.5,
            "vis_km": 10.0,
            "vis_miles": 6.0,
            "uv": 2.0,
            "gust_mph": 22.4,
            "gust_kph": 36.0
          }
        }
      },
      {
        "query": {
          "custom_id": "us-zipcode-id-765",
          "q": "90201",
          "location": {
            "name": "Bell",
            "region": "California",
            "country": "USA",
            "lat": 33.97,
            "lon": -118.17,
            "tz_id": "America/Los_Angeles",
            "localtime_epoch": 1673620220,
            "localtime": "2023-01-13 6:30"
          },
          "current": {
            "last_updated_epoch": 1673620200,
            "last_updated": "2023-01-13 06:30",
            "temp_c": 10.0,
            "temp_f": 50.0,
            "is_day": 0,
            "condition": {
              "text": "Clear",
              "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
              "code": 1000
            },
            "wind_mph": 2.2,
            "wind_kph": 3.6,
            "wind_degree": 10,
            "wind_dir": "N",
            "pressure_mb": 1020.0,
            "pressure_in": 30.13,
            "precip_mm": 0.0,
            "precip_in": 0.0,
            "humidity": 74,
            "cloud": 0,
            "feelslike_c": 10.3,
            "feelslike_f": 50.5,
            "vis_km": 16.0,
            "vis_miles": 9.0,
            "uv": 1.0,
            "gust_mph": 3.6,
            "gust_kph": 5.8
          }
        }
      }
    ]
  }
}

export default weatherApiResponse;
