import React, { useEffect, useState } from "react";

function Land(props) {
  const data = props.data;
  const [classes, setClasses] = useState("background_dark_blue");
  useEffect(() => {
    if (data.owner === "owner") {
      setClasses("land-box background_red");
    } else if (data.isRoad) {
      setClasses("land-box background_grey");
    } else if (data.isPark) {
      setClasses("land-box background_green");
    } else if (!data.can_be_sale) {
      setClasses("land-box background_dark_blue");
    } else if (data.can_be_sale) {
      setClasses("land-box background_light_blue");
    }
  }, []);

  return (
    <div className={classes}>
      {data.id}
      {/*{data.id && data.can_be_sale ? data.price + "$" : ""}*/}
    </div>
  );
}

export default Land;
