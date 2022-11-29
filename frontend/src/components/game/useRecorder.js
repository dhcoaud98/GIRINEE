import { useEffect, useState } from "react";
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = e => {
      const blobDataInWebaFormat = e.data
      // const blobDataInWavFormat = new File([blobDataInWebaFormat], 'recordfile.wav', {type: 'audio'})
      // const blobDataInWavFormat = new File([blobDataInWebaFormat], 'record.wav', { 'type' : 'audio/webm; codecs=opus' })
      setAudioURL(blobDataInWebaFormat);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return [audioURL, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
  await register(await connect());

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream, { mimeType: 'audio/wav' });
}
export default useRecorder;
