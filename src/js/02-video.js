import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

const onPlay = function (data) {
  const playedTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', playedTime);
};

const savePletedTime = localStorage.getItem('videoplayer-current-time');

player.on('timeupdate', throttle(onPlay, 1000));
if (savePletedTime) {
  player.setCurrentTime(savePletedTime);
}
