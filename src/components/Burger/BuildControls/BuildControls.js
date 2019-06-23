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
          added={() => props.addIngre(ctrl.type)}
          removed={() => props.removeIngre(ctrl.type)}
          key={ctrl.label}
          label={ctrl.label}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
    </div>
  );
};

export default buildControls;
