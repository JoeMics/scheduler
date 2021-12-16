import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  /* props
   * days: Array of day objects
   * value: Boolean, currently selected element. ex "Monday"
   * onChange: Function to change value
   */
  const { days, value, onChange } = props;

  const dayListItems = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === value}
        setDay={onChange}
      />
    );
  });

  return <ul>{dayListItems}</ul>;
};

export default DayList;
