import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const buildControls = props => {
  const controls = [
    { label: "Salad", type: "salad" },
    { label: "Cheese", type: "cheese" },
    { label: "Becon", type: "becon" },
    { label: "Meat", type: "meat" }
  ];

  return (
    <div className={classes.BuildControls}>
      {controls.map(ctrl => (
        <BuildControl
          clicked={() => props.click(ctrl.type)}
          key={ctrl.label}
          label={ctrl.label}
        />
      ))}
    </div>
  );
};

export default buildControls;
