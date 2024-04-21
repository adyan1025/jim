import React, { useRef, useEffect, useState } from 'react';
import style from './BodyReader.module.css';
import Webcam from "react-webcam"
import * as posenet from "@tensorflow-models/posenet"
import { drawKeypoints, drawSkeleton } from './utilities';

function Camera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [prevPosition, setPrevPosition] = useState(null);
  let i = 0;

  useEffect(() => {
    let intervalId;
    const runPosenet = async () => {
      const net = await posenet.load({
        inputResolution:{width:100, height:100},
        scale:0.5
      })
      intervalId = setInterval(()=>{
        detect(net)
      }, 700);
    }

    const detect = async(net) => {
      if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState===4) {
        const video = webcamRef.current.video
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        const pose = await net.estimateSinglePose(video);
        // console.log(pose);

        
        if (prevPosition && pose.keypoints[6].score > 0.8) {
          const currentShoulderPosition = pose.keypoints[6].position;
          const dx = currentShoulderPosition.x - prevPosition.x;
          const dy = currentShoulderPosition.y - prevPosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 10) {
            i++;
            if (i>=30) {
              i=0;
              console.log("YOU'RE GOATED");
            }
          }
        }

        drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
        setPrevPosition(pose.keypoints[6].position);
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

    return () => {
      clearInterval(intervalId);
    };
  }, [prevPosition]);

  return (
    <div className={style['camera-box']}>
        <div className={style['webcam']}>
            <Webcam ref={webcamRef} style={{
              borderRadius: "20px",
              position: "fixed",
              textAlign: "center",
              zIndex: 9,
              width: 640,
              height: 480,
            }}/>
            <canvas ref={canvasRef} style={{
              position: "fixed",
              textAlign: "center",
              zIndex: 9,
              width: 640,
              height: 480,
            }}></canvas>
        </div>
    </div>
  );
}

export default Camera;
