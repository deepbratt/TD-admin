import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Sizes from "../../utils/functions/Sizes";
import NoImg from "../../assets/icons/no-img.png";
import CarSliderStyles from "./styles";
interface CarSliderProps {
  dataArray: any;
}
const CarSlider = ({ dataArray }: CarSliderProps) => {
  const classes = CarSliderStyles();
  const { mobile } = Sizes();
  return (
    <div>
      {/* <Grid className={classes.detail} item xs={12}> */}
        {dataArray.length !== 0 ? (
          <Carousel
            className={classes.carousel}
            autoPlay
            showStatus={false}
            interval={2400}
            showArrows={mobile ? false : true}
            infiniteLoop={true}
            transitionTime={500}
            showIndicators={false}
            showThumbs={true}
          >
            {dataArray.map((item: string, index: number) => (
              <img
                key={`img-car-${index}`}
                // width="10%"
                height="100%"
                src={item}
                alt=""
              />
            ))}
          </Carousel>
        ) : (
          <img
            // width="10%"
            height="100%"
            src={NoImg}
            alt=""
          />
        )}
      {/* </Grid> */}
    </div>
  );
}

export default CarSlider;
