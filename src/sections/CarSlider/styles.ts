import { makeStyles } from "@material-ui/core";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});
const CarSliderStyles = makeStyles(() => ({
  carousel: {
    // paddingTop: "70px",
    width: "100%",
    maxWidth: "600px",
    "& .carousel .slider-wrapper.axis-horizontal .slider": {
      alignItems: "center",
    },
    "& .carousel .slide img": {
      width: "100%",
      height: "auto",
    },
    "& .carousel carousel-slider": {
      width: "20%",
    },
    "& .carousel-root makeStyles-carousel-270": {
      width: "20%",
    },
    "& .carousel.carousel-slider .control-arrow": {
      background: "white",
      height: "13%",
      top: "180px",
      borderRadius: "50px",
      padding: "5px 15px 5px 15px",
      opacity: "10",
      "&:hover": {
        background: "white",
      },
      [breakpoints.only("md")]: {
        top: "250px",
      },
      [breakpoints.only("sm")]: {
        top: "260px",
        height: "10%",
      },
      [breakpoints.down("xs")]: {
        top: "120px",
        height: "20%",
      },
    },
    "& .carousel .thumb,.carousel .thumb.selected, .carousel .thumb:hover": {
      border: "none",
    },
    "& .carousel .thumbs-wrapper ul ": {
      padding: "0px",
      margin: "0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .carousel .thumbs-wrapper": {
      marginTop: "10px",
      marginBottom: "0px",
    },
    "& .carousel .thumbs-wrapper ul li": {
      borderRadius: "15px",
    },
    "& .carousel .thumbs-wrapper .thumbs .thumb img": {
      height:"75px !important",
      width:"100% !important"
    },
    "&  .carousel .control-prev.control-arrow:before": {
      color: "black",
      borderRight: "8px solid black",
    },
    "&  .carousel .control-next.control-arrow:before": {
      color: "black",
      borderLeft: "8px solid black",
    },
  },
  sliderImageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    height: '600px',
    position:"relative",
    width:"100%",
  },
  blurBgImg:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'blur(8px)'
  },
}));

export default CarSliderStyles;
