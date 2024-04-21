import style from './BodyReader.module.css';

function Message(props) {
  return (
    <div className={style['message-container']}>
      <div className={style['message']}>
        {props.message}
      </div>
    </div>
  );
}

export default Message;
