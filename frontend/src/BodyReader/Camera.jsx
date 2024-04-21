import React, {useRef} from 'react';
import style from './BodyReader.module.css';
import Webcam from "react-webcam"
import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
import { drawKeypoints, drawSkeleton } from './utilities';

function Camera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution:{width:500, height:500},
      scale:0.5
    })
    setInterval(()=>{
      detect(net)
    }, 100);
  }

  const detect = async(net) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState===4) {
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await net.estimateSinglePose(video);
      console.log(pose);
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose['keypoints'], 0.5, ctx);
    drawSkeleton(pose['keypoints'], 0.5, ctx);
  }

  runPosenet();

  return (
    <div className={style['camera-box']}>
        <div className={style['webcam']}>
            <Webcam ref={webcamRef} style={{
            borderRadius: "20px",
            position: "fixed",
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
            }}/>
            <canvas ref={canvasRef} style={{
            position: "fixed",
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,}}></canvas>
        </div>
    </div>
  );
}

export default Camera;