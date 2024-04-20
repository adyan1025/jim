import style from './BodyReader.module.css';
import Camera from './Camera';
import SideBar from './SideBar';
import BottomBar from './BottomBar';

function BodyReader() {
  return (
    <div className={style.BodyReader}>
        <div className={style['inside-container']}>
          <div className={style['left']}>
            <Camera></Camera>
            <BottomBar></BottomBar>
          </div>
          <div className={style['right']}>
            <SideBar></SideBar>
          </div>
        </div>
    </div>
  );
}

export default BodyReader;
