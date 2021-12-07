import React from "react";

export default function DayListItem(props) {
  const { name, selected, spots, setDay } = props;


  return (
    <li onClick={() => setDay(props.name)}>
      <h2 className="text--regular" selected={selected}>{name}</h2> 
      <h3 className="text--light">{spots} spots remaining</h3>
    </li>
  );
}