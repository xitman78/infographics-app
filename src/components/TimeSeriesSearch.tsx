import React, { useState } from "react";
import { Input, Icon } from "antd";
import * as sdk from "@cognite/sdk";
import { Timeseries } from "@cognite/sdk";
import TimeSerieItem from "./TimeSerieItem";

interface TimeSeriesSearch {
  onTimeSerieSelected: (timeserie: Timeseries) => void;
}

const TimeSeriesSearch: React.FC<TimeSeriesSearch> = ({
  onTimeSerieSelected
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Timeseries[]>([]);

  function searchTimeSeries() {
    sdk.TimeSeries.search({ query: searchText, limit: 10 }).then(res => {
      console.log("-----TimeSeries", res);
      setSearchResults(res.items);
    });
  }

  return (
    <>
      <div style={{ marginBottom: 16, padding: 10 }}>
        <Input
          addonAfter={<Icon type="search" />}
          defaultValue=""
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
          onPressEnter={searchTimeSeries}
        />
      </div>
      <div style={{ padding: 10 }}>
        {searchResults.map(ts => (
          <TimeSerieItem
            key={ts.id}
            item={ts}
            onTimeSerieSelected={onTimeSerieSelected}
          />
        ))}
      </div>
    </>
  );
};

export default TimeSeriesSearch;
