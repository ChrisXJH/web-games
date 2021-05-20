import type { IOptions, RecursivePartial } from 'tsparticles';

const particlesOptions: RecursivePartial<IOptions> = {
  background: {
    color: {
      value: '#fff'
    },
    position: '50% 50%',
    repeat: 'no-repeat',
    size: 'cover'
  },
  fullScreen: {
    enable: true,
    zIndex: 1
  },
  particles: {
    number: {
      value: 50
    },
    shape: {
      type: 'circle'
    },
    color: {
      value: 'random'
    },
    lineLinked: {
      enable: false
    },
    opacity: {
      value: 0.3
    },
    rotate: {
      value: 0,
      random: true,
      direction: 'counter-clockwise',
      animation: {
        enable: true,
        speed: 15,
        sync: false
      }
    },
    size: {
      value: 10,
      random: {
        enable: true,
        minimumValue: 5
      }
    },
    move: {
      enable: true,
      speed: 1,
      random: false,
      outMode: 'bounce'
    }
  },
};

export default particlesOptions;
