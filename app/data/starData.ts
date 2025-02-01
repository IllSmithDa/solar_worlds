import sunImage from 'app/assets/stars/sun/sun_texture.jpg';
import mercuryImage from 'app/assets/planets/mercury/2k_mercury.jpg';
import venusImage from 'app/assets/planets/venus/2k_venus.jpg';
import earthImage from 'app/assets/planets/earth/earth_texture.jpg';
import marsImage from 'app/assets/planets/mars/2k_mars.jpg';
import jupiterImage from 'app/assets/planets/jupiter/2k_jupiter.jpg';
import saturnImage from 'app/assets/planets/saturn/2k_saturn.jpg';
import uranusImage from 'app/assets/planets/uranus/2k_uranus.jpg';
import neptuneImage from 'app/assets/planets/neptune/2k_neptune.jpg';
import saturnRingImage from 'app/assets/planets/saturn/2k_saturn_ring_alpha.png';
import earthMoonImage from 'app/assets/planets/earth/moons/moon/2k_moon.jpg'

export const solarData = [
  {
    name: 'Sun',
    distance: 0,
    texture: sunImage,
    size: 120,
    speed: 0,
    rotateSpeed: .001
  },
  {
    name: 'Mercury',
    distance: 300,
    texture: mercuryImage,
    size: 11,
    speed: 1.1,
    rotateSpeed: .008
  },
  {
    name: 'Venus',
    distance: 450,
    texture: venusImage,
    size: 12,
    speed: .8,
    rotateSpeed: .007
  },
  {
    name: 'Earth',
    distance: 600,
    texture: earthImage,
    size: 13,
    speed: .7,
    rotateSpeed: .005,
    moons: [
      {
        name: 'Moon',
        distance: 50,
        speed: .8,
        rotateSpeed: .003,
        size: 4,
        texture: earthMoonImage,
      }
    ]
  },
  {
    name: 'Mars',
    distance: 750,
    texture: marsImage,
    size: 14,
    speed: .6,
    rotateSpeed: .004
  },
  {
    name: 'Jupiter',
    distance: 1500,
    texture: jupiterImage,
    size: 32,
    speed: .3,
    rotateSpeed: .003
  },
  {
    mame: 'Saturn',
    distance: 1800,
    texture: saturnImage,
    size: 26,
    speed: .2,
    rotateSpeed: .003,
    ring: {
      direction: 'horizontal',
      texture: saturnRingImage,
      innerRadius: 40,
      outerRadius: 60
    }
  },
  {
    mame: 'Uranus',
    distance: 2100,
    texture: uranusImage,
    size: 22,
    speed: .15,
    rotateSpeed: .003
  },
  {
    mame: 'Neptune',
    distance: 2400,
    texture: neptuneImage,
    size: 22,
    speed: .08,
    rotateSpeed: .003
  }
]

export const asteroidBelt = {
  inner: 900,
  outer: 1100,
}

export const asteroidBeltOuter = {
  inner: 3000,
  outer: 3100,
}