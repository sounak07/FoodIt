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
      <p>
        Current Price: <strong>{props.totPrice.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          added={() => props.addIngre(ctrl.type)}
          removed={() => props.removeIngre(ctrl.type)}
          key={ctrl.label}
          label={ctrl.label}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        onClick={props.showM}
        disabled={!props.purchase}
        className={classes.OrderButton}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
