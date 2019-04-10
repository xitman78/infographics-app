import React, { useState } from "react";
import styled from "styled-components";
import * as sdk from "@cognite/sdk";
import { Timeseries } from "@cognite/sdk";

const TimeSerieContainer = styled.div`
  border: 1px solid #aaa;
  border-radius: 2px;
  background-color: #ddd;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const TimeSerieName = styled.div`
  font-size: 0.8em;
  text-overflow: ellipsis;
`;

const TimeSerieDescription = styled.div`
  font-size: 1em;
  text-overflow: ellipsis;
`;

interface TimeSerieItemProps {
  item: Timeseries;
  onTimeSerieSelected: (ts: Timeseries) => void;
}

const TimeSerieItem: React.FC<TimeSerieItemProps> = ({
  item,
  onTimeSerieSelected
}) => {
  return (
    <TimeSerieContainer onClick={() => onTimeSerieSelected(item)}>
      <TimeSerieName>{item.name}</TimeSerieName>
      <TimeSerieDescription>{item.description}</TimeSerieDescription>
    </TimeSerieContainer>
  );
};

export default TimeSerieItem;
