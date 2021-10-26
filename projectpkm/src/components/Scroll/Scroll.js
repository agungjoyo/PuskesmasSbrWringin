import React, { useState, useEffect } from "react";

import { IconButton } from "@material-ui/core";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { makeStyles } from "@material-ui/core/styles";

const useStylesScroll = makeStyles(() => ({
  toTop: {
    zIndex: 2,
    position: "fixed",
    bottom: "2vh",
    backgroundColor: "#FFFFFF",
    color: "black",
    boxShadow: "3px 3px 10px #9E9E9E",
    "&:hover, &:Mui-focusVisible": {
      transition: "0.3s",
      color: "#397BA6",
      backgroundColor: "#DCDCDC",
    },
    right: "2%",
  },
}));

const Scroll = ({ showBelow }) => {
  const classScroll = useStylesScroll();
  const [show, setShow] = useState(showBelow ? false : true);
  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };
  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    if (showBelow) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  });
  return (
    <div>
      {show && (
        <IconButton onClick={handleClick} className={classScroll.toTop}>
          <ExpandLessIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Scroll;
