import style from './BodyReader.module.css';
import Prompt from './SidePrompt';
import Feedback from './Feedback';

function SideBar() {
  return (
    <div className={style['side-bar']}>
        <Feedback></Feedback>
        <Prompt></Prompt>
    </div>
  );
}

export default SideBar;
