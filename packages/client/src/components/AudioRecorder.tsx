import { useMessages } from "@/store/messages";
import { GraphicEq as GraphicEqIcon, Mic as MicIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Fragment, useRef, useState } from "react";

export const download = async (blob: Blob) => {
  try {
    const a = document.createElement("a");
    a.style.display = "none";

    const blobURL = window.URL.createObjectURL(blob);
    a.href = blobURL;
    a.download = "audio.mp4";

    a.click();

    window.URL.revokeObjectURL(blobURL);
  } catch (error) {
    console.error("Error:", error);
  }
};

const AudioRecorder = () => {
  const { sendAudioMessage } = useMessages();

  const [permission, setPermission] = useState(false);

  const mediaRecorder = useRef<MediaRecorder>(null as any);

  const [recordingStatus, setRecordingStatus] = useState("inactive");

  const [stream, setStream] = useState<MediaStream>(undefined as any);

  const [audio, setAudio] = useState<string>("");

  const [audioChunks, setAudioChunks] = useState<any[]>([]);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        setPermission(true);
        setStream(mediaStream);
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream);

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    const localAudioChunks: any[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (!event.data?.size) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mediaRecorder.current.mimeType });
      sendAudioMessage(audioBlob);

      setAudioChunks([]);
    };
  };

  return (
    <Fragment>
      <div className="audio-controls">
        {!permission ? (
          <IconButton onClick={getMicrophonePermission}>
            <MicIcon />
          </IconButton>
        ) : null}
        {permission && recordingStatus === "inactive" ? (
          <IconButton onClick={startRecording}>
            <MicIcon />
          </IconButton>
        ) : null}
        {recordingStatus === "recording" ? (
          <IconButton onClick={stopRecording}>
            <GraphicEqIcon />
          </IconButton>
        ) : null}
      </div>
    </Fragment>
  );
};

export default AudioRecorder;
