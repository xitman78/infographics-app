import React, { ChangeEvent } from "react";
import { Icon } from "antd";
import styled from "styled-components";
import { SensorOverlay } from "@cognite/gearbox";

const IconContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Image = styled.img<{ isLoaded: boolean }>`
  width: 100%;
  align-self: flex-start;
  display: ${({ isLoaded }) => (isLoaded ? "block" : "none")};
`;

const FileInput = styled.input`
  display: none;
`;

interface BackgroundImageProps {
  timeserieIds: number[];
  colorsMap: { [k: string]: string };
}

interface BackgroundImageState {
  imageLoaded: boolean;
}

class BackgroundImage extends React.Component<
  BackgroundImageProps,
  BackgroundImageState
> {
  imageRef = React.createRef<HTMLImageElement>();
  inputRef = React.createRef<HTMLInputElement>();

  constructor(props: BackgroundImageProps) {
    super(props);
    this.state = {
      imageLoaded: false
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
      <>
        {!this.state.imageLoaded && (
          <IconContainer>
            <FileInput
              type="file"
              accept="image/*"
              ref={this.inputRef}
              onChange={this.handleFileChange}
            />
            <Icon
              type="upload"
              style={{ fontSize: "40px" }}
              onClick={this.handleUploadIconClick}
            />
          </IconContainer>
        )}
        <SensorOverlay
          timeserieIds={this.props.timeserieIds}
          colorMap={this.props.colorsMap}
        >
          <Image ref={this.imageRef} isLoaded={this.state.imageLoaded} />
        </SensorOverlay>
        )}
      </>
    );
  }
}

export default BackgroundImage;
