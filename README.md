# Weather App

This is a simple weather app built using React Native with Expo. The app fetches weather data from OpenWeather API and displays the current weather and forecasts. You can run this app with Expo Go on your mobile device.

## Prerequisites

Before starting, make sure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Expo CLI**: You can install it globally by running the command:

  ```bash
  npm install -g expo-cli
  ```

- **Expo Go App**: Available on both the [App Store](https://apps.apple.com/us/app/expo-go/id982107779) (iOS) and [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US) (Android).

- **OpenWeather API Key**: Sign up at [OpenWeather](https://openweathermap.org/) and get an API key to fetch weather data.

## Getting Started

### 1. Clone the Repository

Start by cloning this repository to your local machine:

```bash
git git@github.com:noe4400/weatherAPP.git
cd weatherAPP
```

### 2. Install Dependencies

Install the required dependencies by running:

```bash
npm install
```

This will install all the dependencies defined in `package.json`.

### 3. Configure the env variables

You need to add a .env file that includes the following

```js
EXPO_PUBLIC_PLACES_URL= #here goes the api for searching places
EXPO_PUBLIC_API_KEY= #api key from openweathermap
EXPO_PUBLIC_WEATHER_API_URL= #openweathermap api base url ie https://api.openweathermap.org/data/3.0/onecall
```

### 4. Run the App with Expo Go

Now that everything is set up, you can run the app with Expo Go. Run the following command:

```bash
npm run start
```

This will start the development server and display a QR code in your terminal. You can scan this QR code using the **Expo Go** app on your mobile device to run the app instantly.

Alternatively, you can press `w` to open the app in a web browser or press `a` to open it in an Android simulator (if set up).

### 5. App Features

- Shows the forecast for the upcoming days.
- Uses the **OpenWeather API** to fetch weather data.
