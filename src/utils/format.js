// Formato de Tiempo (segundos a hora)
export const formatTime = (time) => {
  const sec_num = parseInt(time, 10);
  const hour = `0${Math.floor(sec_num / 3600)}`;
  let minute = '';
  let second = '';

  if ((Math.floor((sec_num - (hour * 3600)) / 60)) >= 10) {
    minute = Math.floor((sec_num - (hour * 3600)) / 60);
  } else {
    minute = `0${Math.floor((sec_num - (hour * 3600)) / 60)}`
  }

  if ((sec_num - (hour * 3600) - (minute * 60)) >= 10) {
    second = sec_num - (hour * 3600) - (minute * 60);
  } else {
    second = `0${sec_num - (hour * 3600) - (minute * 60)}`
  }

  return `${hour}:${minute}:${second}`;
}
