import {SoundError} from '../Interfaces';

const Sound = require('react-native-sound');

const displayError = (name: string, error: SoundError) => {
  if (error) {
    console.log(name, error?.message);
  }
};
const zenBuddhistTempleBellFileName = 'zen_buddhist_temple.wav';
const zenBuddhistTempleBell = new Sound(
  zenBuddhistTempleBellFileName,
  Sound.MAIN_BUNDLE,
  (error: SoundError) => displayError(zenBuddhistTempleBellFileName, error),
); // https://soundbible.com/1491-Zen-Buddhist-Temple-Bell.html

const templeBellBiggerFileName = 'temple_bell_bigger.wav';
const templeBellBigger = new Sound(
  templeBellBiggerFileName,
  Sound.MAIN_BUNDLE,
  (error: SoundError) => displayError(templeBellBiggerFileName, error),
); // https://soundbible.com/1474-Temple-Bell-Bigger.html

const templeBellHugeFileName = 'temple_bell_huge.wav';
const templeBellHuge = new Sound(
  templeBellHugeFileName,
  Sound.MAIN_BUNDLE,
  (error: SoundError) => displayError(templeBellHugeFileName, error),
); // https://soundbible.com/1506-Temple-Bell-Huge.html

export const playSound = (name: string) => {
  if (name === 'zenBuddhistTempleBell') {
    zenBuddhistTempleBell.play();
  } else if (name === 'templeBellBigger') {
    templeBellBigger.play();
  } else if (name === 'templeBellHuge') {
    templeBellHuge.play();
  }
};

export const getSound = (name: string) => {
  if (name === 'zenBuddhistTempleBell') {
    return zenBuddhistTempleBell;
  } else if (name === 'templeBellBigger') {
    return templeBellBigger;
  } else if (name === 'templeBellHuge') {
    return templeBellHuge;
  }
  return null;
};
