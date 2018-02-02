export const BACK_SCENES = "login";

// ============ USING ENTITY FRAMEWORK SERVICES =================

// ============ SERVICE IMAGE UPLOAD ENTITY ID ==================

export const USER_ENTITY_ID = 5;

// ============ SERVICE USER ENTITY ID ==================

export const IMAGE_ENTITY_TYPE_ID = 8;

// ======================================================

// ---------------Date Time Formatting  ------------------

export const TIME_ZONE = -1 * new Date().getTimezoneOffset() / 60;
export const DATE_FORMAT = "MMMM DD YYYY";
export const DATE_FORMAT_DAY = "MMMM DD YY, HH:mm";
export const TIME_ONLY_FORMAT = "hh:mm A";
export const TIME_FORMAT_24_HOUR = "HH:mm";
export const SERVER_DATE_FORMAT = "YYYY-MM-DD HH:mm";
// ---------------------------------

export const MILES_LIMIT = 10;
export const COLLAPSIBLE_LIMIT = 50;
export const MIN_RADIUS = 10;
export const MAX_RADIUS = 100;
export const Pagination_LIMIT = 10;

// =========== CHAT DURATION SETTING ======= //

export const CHAT_DURATION = 30;

// =========== MAP SETTINGS ============= //

export const DISTANCE_UNIT = "Km";
export const PIN_RADIUS_IN_METER = 2000;
export const MILES_DIFFERENCE = MILES_LIMIT / 4;
export const APP_URL = "";
export const GOOGLE_URL = "https://maps.google.com/maps";
export const GOOGLE_ADDRESS_URL =
  "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
export const GOOGLE_API_KEY = "AIzaSyBY42wGL_XfHp-TmxJdK45z9qVrfilns68";
export const GOOGLE_ADDRESS_URl_END = `&sensor=false&key=${GOOGLE_API_KEY}`;

export const LATITUDE_DELTA = 0.0059397161733585335;
export const LONGITUDE_DELTA = 0.005845874547958374;

// Map default padding Constant
// --------------------------------------------

export const DEFAULT_MAP_PADDING = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100
};

// --------------------------------------------

// Map Styling Constant
// --------------------------------------------

export const mapStyle = [
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    stylers: [
      {
        hue: "#00aaff"
      },
      {
        saturation: -100
      },
      {
        gamma: 2.15
      },
      {
        lightness: 12
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      },
      {
        lightness: 24
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        lightness: 57
      }
    ]
  }
];

// --------------------------------------------

// location service constants
// --------------------------------------------

export const LOCATION_TIME_OUT = 10000;
export const LOCATION_MAX_AGE = 1000;
export const LOCATION_DISTANCE_FILTER = 10;
export const LOCATION_HIGH_ACCURACY = false;

// --------------------------------------------

// location service for tracking
export const TRACKER_LOCATION_TIME_OUT = 10000;
export const TRACKER_LOCATION_MAX_AGE = 500;
export const TRACKER_LOCATION_DISTANCE_FILTER = 0;
export const TRACKER_LOCATION_HIGH_ACCURACY = true;
