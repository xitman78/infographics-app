import React, {ChangeEvent} from "react";

interface BackgroundImageProps {

}

interface BackgroundImageState {
  imageData: any;
}

class BackgroundImage extends React.Component<BackgroundImageProps, BackgroundImageState> {

  imageRef = React.createRef<HTMLImageElement>();

  constructor(props: BackgroundImageProps) {
    super(props);
    this.state = {
      imageData: null,
    };
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target && event.target.files && event.target.files.length) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (this.imageRef && this.imageRef.current) {
          this.imageRef.current.src = reader.result as string;
        }
      };

      reader.readAsDataURL(selectedFile);
    }

  }

  render() {
    return (
      <div>
       <input type="file" onChange={this.handleFileChange} />
        <img ref={this.imageRef} />
      </div>
      );
  }
}

export default BackgroundImage;
