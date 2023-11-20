import React, { useState } from 'react';
import '../styles/CropImage.css';
import Cropper from 'react-easy-crop';
import { saveAs } from 'file-saver';
import useUpdatePict from '../hooks/useUpdatePict';
import noImage from '../images/no-image.jpg';

const CropImage = ({ changePict }) => {
  const { updatePicture, isLoading } = useUpdatePict();

  const [image, setImage] = useState(noImage);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState({});
  const [limit, setLimit] = useState(false);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSave = () => {
    if (image && croppedArea) {
      const oriImage = new Image();
      oriImage.src = image;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      oriImage.addEventListener('load', async () => {
        canvas.width = 200;
        canvas.height = 200;

        ctx.drawImage(oriImage, croppedArea.x, croppedArea.y, croppedArea.width, croppedArea.height, 0, 0, 200, 200);
        // saveAs(canvas.toDataURL('image/jpeg'), 'cropped-image.jpg');
        await updatePicture(canvas.toDataURL('image/jpeg'));
        changePict(false);
      });
    }
  };

  return (
    <>
      <div id="cropImage">
        <div className="container">
          <div className="crop-container">
            <Cropper image={image} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />
          </div>
          <div className="editor">
            <div className="select-image">
              <label htmlFor="uploadBtn">Select image...</label>
              <input
                id="uploadBtn"
                type="file"
                placeholder="No file selected..."
                accept={['.jpg', '.jpeg']}
                onChange={(e) => {
                  setLimit(false);
                  if (e.target.files[0].size > 5000000) {
                    return setLimit(true);
                  }

                  console.log(e.target.files[0]);

                  const fileReader = new FileReader();
                  fileReader.readAsDataURL(e.target.files[0]);
                  fileReader.onloadend = () => {
                    setImage(fileReader.result);
                  };
                }}
              />
            </div>
            {limit && <p className="error-msg">Your file must be lower than 10 MB</p>}
            <div className="zoom-slider">
              <p>Zoom:</p>
              <input type="range" value={zoom} min={1} max={3} step={0.1} onChange={(e) => setZoom(e.target.value)} />
            </div>

            <div className="action-buttons">
              <button className="cancel-btn btn" onClick={() => changePict(false)}>
                Cancel
              </button>
              <button className="save-btn btn" onClick={onSave} disabled={image === noImage || limit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="loading-screen">
          <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#ffffff,secondary:#ffffff"></lord-icon>
        </div>
      )}
    </>
  );
};

export default CropImage;
