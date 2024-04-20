import style from './BodyReader.module.css';
import PromptBar from './PromptBar';

function SidePrompt() {
  return (
    <div className={style['side-prompt']}>
        <PromptBar></PromptBar>
    </div>
  );
}

export default SidePrompt;
