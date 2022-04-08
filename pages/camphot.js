import React from "react";
import Axios from "axios";
import Webcam from "react-webcam";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const videoConstraints = {
  width: 256,
  height: 144,
  facingMode: "user"
};

const mailerCarrier = () => {
  const mailer = useSelector((state) => state.mailer);
  return { mailer };
};

export default function WebcamCapture({ Component, pageProps }) {
  const webcamRef = React.useRef(null);
  const { mailer } = mailerCarrier();
  const router = useRouter();

  const capture = () => {
    router.reload();
    let imageSrc = webcamRef.current.getScreenshot();
    putimg(imageSrc);
  };

  const putimg = async (imageSrc) => {
    await Axios.post("/api/putimg", {
      payload: { mailer, imageSrc }
    });
  };

  return (
    <>
      <Webcam
        audio={false}
        height={144}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={256}
        videoConstraints={videoConstraints}
      />
      <p></p>
      <button onClick={capture}>Capture photo</button>
    </>
  );
}
