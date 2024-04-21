import style from './BodyReader.module.css';
import Webcam from "react-webcam"

function Camera() {
  return (
    <div className={style['camera-box']}>
        <div className={style['webcam']}>
            <Webcam/>
        </div>
    </div>
  );
}

export default Camera;