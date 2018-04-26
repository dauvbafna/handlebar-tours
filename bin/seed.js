'use strict';
const mongoose = require('mongoose');

const Tour = require('../models/tour');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/moto-tours', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
})
  .then(() => {
    return deleteTourCollections();
  })
  .then(() => {
    const nepalRoute = [
      {coordinates: [27.7090319, 85.2911132]},
      {coordinates: [28.2298558, 83.8865779]},
      {coordinates: [28.6378237, 83.5971574]},
      {coordinates: [28.8009381, 83.7770043]},
      {coordinates: [28.4918295, 83.579959]},
      {coordinates: [28.208408, 84.3177056]},
      {coordinates: [27.7090319, 85.2911132]}];

    const nepalDays = [
      {
        title: 'DAY 1: ARRIVAL IN KATHMANDU',
        daySummary: `You will arrive in Kathmandu at the Tribhuvan International Airport (KTM) 
        and you will meet the airport representative. From there, you will be transferred to a 
        selected hotel in Kathmandu.`
      },
      {
        title: 'DAY 2: KATHMANDU TO POKHARA',
        daySummary: `You will enjoy an early morning ride to Pokhara. You will be on the road 
        for about six hours.`
      },
      {
        title: 'DAY 3: POKHARA TO KALOPANI',
        daySummary: `You will ride to Kalopani on 65 kilometers of blacktopped roads and 45 
        kilometers of dirt roads. You will experience amazing mountain views.`
      },
      {
        title: 'DAY 4: KALOPANI TO MUKTINATH',
        daySummary: `You will ride to Muktinath, at 3800 meters high and make a stop for lunch 
        at Jomsom, at 2680 meters. You will enjoy amazing scenery and landscapes.`
      },
      {
        title: 'DAY 5: MUKTINATH TO MARPHA TO TATOPANI',
        daySummary: `You will explore Marpha for the first half of the day. After lunch, you 
        will ride to Tatopani and enjoy the natural hot springs.`
      },
      {
        title: 'DAY 6: TATOPANI TO POKHARA',
        daySummary: `You will ride back to Pokhara.`
      },
      {
        title: 'DAY 7: POKHARA TO KATHMANDU',
        daySummary: `You will end your tour with a ride back to Kathmandu.`
      }
    ];

    return createNewTour(
      'Nepal Tour: 7 Days',
      `Come and enjoy the most thrilling motorbike tour through the scenic and lovely countryside of Nepal. 
      Ride the popular Annapurna trekking trail and discover the hundred of years old monasteries, caves, 
      local tribes, and scenic beauties, including the world’s deepest gorge of the Kali Gandaki River. 
      Experience the adventure of Nepal and make memories for a lifetime!`,
      nepalRoute,
      nepalDays
    );
  })
  .then(() => {
    const europeRoute = [
      {coordinates: [45.6942366, 5.8684471]},
      {coordinates: [46.2480398, 6.7486877]},
      {coordinates: [46.7402635, 7.6031855]},
      {coordinates: [46.7427513, 8.7730751]},
      {coordinates: [46.5293741, 10.4444522]},
      {coordinates: [46.0240991, 9.213247]},
      {coordinates: [45.7438747, 7.298168]},
      {coordinates: [45.9322165, 6.7888765]},
      {coordinates: [45.4105389, 6.3339831]},
      {coordinates: [45.6942366, 5.8684471]}];

    const europeDays = [
      {
        title: 'DAY 1: ARRIVAL IN AIX-LES-BAINS, FRANCE',
        daySummary: `Upon arrival in Aix, you will have a meet and greet and some time for 
        relaxation. You will have a briefing and you will be served with a welcome cocktail. 
        You can visit the town, take a walk to the nearby lake, wander in the old streets and 
        shaded parks, and delight yourself in the hot pool.`
      },
      {
        title: 'DAY 2: AIX-LES-BAINS - CHÂTEL',
        daySummary: `From the authentic Aravis Massif to the tiny village of Châtel, you will 
        enjoy the ride on the twisty Alpine roads between lakes and rivers, forests and high 
        mountain pastures.`
      },
      {
        title: 'DAY 3: CHÂTEL - THUN, SWITZERLAND',
        daySummary: `It will be a wonderful day exploring the most idyllic Swiss landscapes 
        you have ever dreamed of. There are cows grazing in verdant Alpine pastures, cozy 
        chalets, and fir forests with snow-capped summits in the background, the perfect Alpine 
        cliché! The day will end in Thun with its castle and crystal-clear lake.`
      },
      {
        title: 'DAY 4: REST DAY IN THUN, SWITZERLAND',
        daySummary: `You can enjoy the rest day by exploring the surroundings. You can visit 
        Thun Old Town and its castle from the 12th Century, cruise the crystal-clear lakes of 
        Thun and Brienz on-board a steamboat, or simply relax by the lakeside with your toes in 
        the water and your head looking up at the mountains.`
      },
      {
        title: 'DAY 5: THUN - DISENTIS',
        daySummary: `You will ride along the Thun and Brienz lakes before realizing every 
        biker’s dream of riding through snow walls in a series of mountain passes higher than 
        2,000 meters, including the famous Gotthard Pass and its world-famous Tremola Road.`
      },
      {
        title: 'DAY 6: DISENTIS - STELVIO PASS, ITALY',
        daySummary: `You will have the ride of a lifetime with another series of valleys and 
        mountain passes which will lead you to the worldwide famous Stelvio Pass. Overcome its 
        48 hairpin turns by motorbike to reach the Italian border at a height of 2,758 meters.`
      },
      {
        title: 'DAY 7: STELVIO PASS, ITALY - MENAGGIO',
        daySummary: `On day seven, you will zigzag between Italy and Switzerland and ride 
        through the famous town of Saint Moritz to finally reach the superb region of the 
        Italian Great Lakes. By night, treat yourself to delicious Italian cuisine on one of the 
        numerous terraces of the gorgeous town of Menaggio on Lake Como's shore.`
      },
      {
        title: 'DAY 8: REST DAY IN MENAGGIO',
        daySummary: `Take it easy and enjoy your rest day, walking through the narrow streets 
        of Menaggio. You can jump onboard a boat to the charming town of Bellagio or eat in a 
        lakeside restaurant before heading further on to the historic town of Varenna. Walk 
        through its picturesque streets and if you are courageous enough, you can climb up to 
        the Castle of Vezio for a breathtaking view over the lake and the surroundings.`
      },
      {
        title: 'DAY 9: MENAGGIO - AOSTA',
        daySummary: `You will have a great start of the day, riding along Lake Lugano 
        and then the superb Lake Maggiore sitting between Italy and Switzerland. You will 
        follow the road through the Aosta Valley and its picturesque castles and vineyards, 
        heading to the nice city of Aosta and its Roman ruins.You can get to enjoy Italian 
        cuisine, wine from the valley, and a great night surrounded by the highest Alpine peaks.`
      },
      {
        title: 'DAY 10: AOSTA - CHAMONIX, FRANCE',
        daySummary: `A 130-kilometer ride will be enough to take you from Italy back to France 
        through Switzerland via the mythical Great Saint Bernard Pass which is 2,469 meters 
        above sea level. The road will provide you numerous view-points over the Mont-Blanc 
        Massif and its countless summits and glaciers.`
      },
      {
        title: 'DAY 11: CHAMONIX - SAINT FRANÇOIS-LONGCHAMP',
        daySummary: `From Chamonix to the gorgeous Vanoise Massif, you will enjoy the motorcycle 
        ride through Beaufortain and its breath-taking Cormet de Roselend.`
      },
      {
        title: 'DAY 12: SAINT FRANÇOIS-LONGCHAMP - AIX-LES-BAINS',
        daySummary: `It will be a great way to end the tour by going down to Grenoble, the French 
        Alps’ Capital, through the breathtaking Glandon Pass. You will cross the gorgeous Chartreuse 
        Massif and look back to find the Bourget Lake’s turquoise waters. You will finally reach 
        Aix-les-Bains for a farewell dinner. What a trip!`
      },
      {
        title: 'DAY 13: DEPARTURE FROM AIX-LES-BAINS',
        daySummary: `You will have breakfast and you will be transferred to your onward destination.
        All good things must come to an end. Until next time!`
      }
    ];

    return createNewTour(
      'Grand Alps Tour: 13 Days',
      `Take the ride of a lifetime from the Mont-Blanc Massif to the Stelvio Pass, all the way through The Alps 
      by motorcycle. Realize every biker’s dream by riding the gorgeous alpine roads through France, Switzerland, 
      and Italy. Cross verdant valleys, high-mountain pastures, and then ride through the snow walls of the highest 
      mountain passes.`,
      europeRoute,
      europeDays
    );
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
    mongoose.disconnect();
  });

function createNewTour (tripName, tripDescription, tripRoutes, tripDays) {
  const name = tripName;
  const description = tripDescription;
  const routes = tripRoutes;
  // const riders = tripRiders;
  const days = tripDays;

  const tour = new Tour({
    name,
    description,
    routes,
    // riders,
    days
  });
  return tour.save();
}

function deleteTourCollections () {
  return Tour.remove();
}
