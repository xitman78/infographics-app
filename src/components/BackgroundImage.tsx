import React, {ChangeEvent} from "react";

interface BackgroundImageProps {

}

interface BackgroundImageState {
  imageData: any;
}

class BackgroundImage extends React.Component<BackgroundImageProps, BackgroundImageState> {

  imageRef = React.createRef();

  constructor(props: BackgroundImageProps) {
    super(props);
    this.state = {
      imageData: null,
    };
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    // console.log("event", event.target.files);
    if (event.target && event.target.files && event.target.files.length) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        // @ts-ignore
        this.imageRef.current.src = event.target.result!;
      };

      reader.readAsDataURL(selectedFile);
    }

  }

  render() {
    return <div>
      <input type="file" onChange={this.handleFileChange} />
      {/* @ts-ignore */}
      <img ref={this.imageRef}/>
    </div>;
  }
}

export default BackgroundImage;
