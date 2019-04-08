import React, { ChangeEvent } from "react";
import { Icon } from 'antd';

interface BackgroundImageProps {

}

interface BackgroundImageState {
  imageLoaded: boolean;
}

class BackgroundImage extends React.Component<BackgroundImageProps, BackgroundImageState> {

  imageRef = React.createRef<HTMLImageElement>();
  inputRef = React.createRef<HTMLInputElement>();

  constructor(props: BackgroundImageProps) {
    super(props);
    this.state = {
      imageLoaded: false,
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleUploadIconClick = this.handleUploadIconClick.bind(this);
  }

  handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target && event.target.files && event.target.files.length) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (this.imageRef && this.imageRef.current) {
          this.imageRef.current.src = reader.result as string;
          this.setState({ imageLoaded: true });
        }
      };

      reader.readAsDataURL(selectedFile);
    }

  }

  handleUploadIconClick() {
    if (this.inputRef.current) {
      this.inputRef.current.click();
    }
  }

  render() {
    return (
      <div>
        {
          !this.state.imageLoaded && <>
            <input type="file" ref={this.inputRef} onChange={this.handleFileChange} style={{ display: 'none' }} />
            <Icon type="upload" style={{ fontSize: '20px' }} onClick={this.handleUploadIconClick} />
          </>
        }
        <img ref={this.imageRef} style={{ width: '100%', display: this.state.imageLoaded ? 'block' : 'node' }} />
      </div>
    );
  }
}

export default BackgroundImage;
