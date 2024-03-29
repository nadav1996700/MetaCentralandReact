import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Land(props) {
  const navigate = useNavigate();

  const getIntoLand = () => {
    navigate("/main/landData", {
      state: { user: props.user, land: props.land },
    });
  };
  const Landdata = props.land;
  const isParkOrRoad = Landdata.isPark || Landdata.isRoad;
  const [classes, setClasses] = useState("background_dark_blue");
  useEffect(() => {
    if (props.user.email === Landdata.ownerEmail) {
      setClasses("land-box background_red");
    } else if (Landdata.isRoad) {
      setClasses("land-box background_grey unClickable");
    } else if (Landdata.isPark) {
      setClasses("land-box background_green unClickable");
    } else if (!Landdata.can_be_sale) {
      setClasses("land-box background_dark_blue");
    } else if (Landdata.can_be_sale) {
      setClasses("land-box background_light_blue");
    }
  }, []);

  return (
    <div
      className={classes}
      onClick={!isParkOrRoad ? getIntoLand : undefined}
    ></div>
  );
}

export default Land;
