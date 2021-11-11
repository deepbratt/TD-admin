import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Sizes from "../../utils/functions/Sizes";
import NoImg from "../../assets/icons/no-img.png";
import CarSliderStyles from "./styles";
import useImageOrientation from "../../utils/hooks/useImageOrientation";
interface CarSliderProps {
  dataArray: any;
}
const CarSlider = ({ dataArray }: CarSliderProps) => {
  const classes = CarSliderStyles();
  const {setImageOrientationAndSize} = useImageOrientation()
  const { mobile } = Sizes();

  const onImageLoad = (imgUrl:string, imageObject:HTMLImageElement) =>{
    const {height, width} = setImageOrientationAndSize(imgUrl)
    imageObject.style.height = height
    imageObject.style.width = width
  }
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
              <div className={classes.sliderImageWrapper}>
                <div style={{backgroundImage:`url(${item})`}} className={classes.blurBgImg}></div>
              <img
                key={`img-car-${index}`}
                style={{
                  position: 'relative',
                  borderRadius: '5px',
                }}
                src={item}
                onLoad={(e:any)=>onImageLoad(item, e.target)}
                alt=""
              />
              </div>
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
