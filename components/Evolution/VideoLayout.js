import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import useWindowDimensions from "hooks/useWindowDimensions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    margin: "0 auto",
    backgroundColor: "#000"
  },
  center: {
    margin: "0 auto",
    position: "relative"
  }
}));

const Video = ({ children }) => {
  const classes = useStyles();
  const { width, height } = useWindowDimensions();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (height / width > 0.5625) {
      // Portrait
      const newHeight = (width * 9) / 16;
      const dims = {
        width: `${width}px`,
        height: `${Math.floor(newHeight)}px`
      };
      setDimensions(dims);
    } else {
      // Landscape
      const newWidth = (height * 16) / 9;
      const dims = {
        width: `${Math.floor(newWidth)}px`,
        height: `${height}px`
      };
      setDimensions(dims);
    }
  }, [width, height]);

  return (
    <div className={classes.root}>
      <div className={classes.center} style={dimensions}>
        {children}
      </div>
    </div>
  );
};

Video.propTypes = {
  children: PropTypes.any
};

export default Video;