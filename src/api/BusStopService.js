export const setMockApiSuccessRate = rate => (mockApiSuccessRate = rate);

export const getMockApiSuccessRate = () => mockApiSuccessRate;

export const getAllStops = () => {
  randomlyFailWith("Unable to read database");

  return clone(stops);
};

export const getBusStopById = stopId => {
  const stop = getBusStop(stopId); //getBusStop using randomlyFailWith
  return clone(stop);
};

export const addDonation = donationObj => {
  let { amount, stopId, email, hidePersonelInfo, name } = donationObj;

  const stop = getBusStop(stopId); //getBusStop using randomlyFailWith

  if (!stop) {
    throw new Error("Stop with stop id " + stopId + " not found.");
  }

  stop.donationsRaisedInDollars += parseFloat(amount);

  donations.push({
    stopId,
    amount,
    date: new Date(),
    name,
    email,
    hidePersonelInfo
  });
};

export const getDonationHistory = stopId => {
  randomlyFailWith("Unable to read database");

  let donationHistoryList = donations
    .filter(d => d.stopId === parseInt(stopId))
    .map(d => {
      return {
        stopId: d.stopId,
        amount: d.amount,
        date: d.date,
        name: d.hidePersonelInfo ? d.name[0] + "*****" : d.name,
        email: d.hidePersonelInfo ? d.email[0] + "*****" : d.email
      };
    });

  return clone(donationHistoryList);
};

const getBusStop = stopId => {
  randomlyFailWith("Unable to connect to database");
  const stop = stops.find(function(s) {
    return s.stopId === parseInt(stopId);
  });

  if (!stop) {
    throw new Error("Stop with stop id " + stopId + " not found.");
  }
  return stop;
};

let mockApiSuccessRate = 80.0;

const donations = [];

const stops = [
  {
    stopId: 1,
    lat: 33.760262,
    lng: -84.384706,
    donationsRaisedInDollars: 0,
    name: "Hertz at Portman Blvd",
    donationTarget: 700.0
  },
  {
    stopId: 2,
    lat: 33.760138,
    lng: -84.388043,
    donationsRaisedInDollars: 0,
    name: "Peachtree Center Mall",
    donationTarget: 700.0
  },
  {
    stopId: 3,
    lat: 33.757355,
    lng: -84.386423,
    donationsRaisedInDollars: 0,
    name: "Georgia Pacific",
    donationTarget: 700.0
  },
  {
    stopId: 4,
    lat: 33.758648,
    lng: -84.382754,
    donationsRaisedInDollars: 0,
    name: "Sheraton Atlanta",
    donationTarget: 700.0
  },
  {
    stopId: 5,
    lat: 33.755365,
    lng: -84.384921,
    donationsRaisedInDollars: 0,
    name: "Loudermilk Center",
    donationTarget: 700.0
  },
  {
    stopId: 6,
    lat: 33.756887,
    lng: -84.389417,
    donationsRaisedInDollars: 0,
    name: "Rialto Arts Center",
    donationTarget: 700.0
  },
  {
    stopId: 7,
    lat: 33.759215,
    lng: -84.391719,
    donationsRaisedInDollars: 0,
    name: "Sky View Atlanta",
    donationTarget: 700.0
  },
  {
    stopId: 8,
    lat: 33.762046,
    lng: -84.391708,
    donationsRaisedInDollars: 0,
    name: "Centennial Park",
    donationTarget: 700.0
  },
  {
    stopId: 9,
    lat: 33.763004,
    lng: -84.387041,
    donationsRaisedInDollars: 0,
    name: "Suntrust Plaza",
    donationTarget: 700.0
  },
  {
    stopId: 10,
    lat: 33.754661,
    lng: -84.380101,
    donationsRaisedInDollars: 0,
    name: "Sweet Auburn Market",
    donationTarget: 700.0
  }
];

/**
 * returns nothing on success
 * on failure, throws Error
 */

// thanks to http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object

const clone = obj => {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type is not supported.");
};

const randomlyFailWith = errorMessage => {
  if (Math.random() * 100 > mockApiSuccessRate) {
    //80
    throw new Error(errorMessage);
  }
};
