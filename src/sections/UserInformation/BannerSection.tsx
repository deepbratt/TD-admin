import { IconButton, makeStyles } from "@material-ui/core";
import { Edit, RestoreTwoTone, Save } from "@material-ui/icons";
import BannerImage from "../../assets/bannerImage.jpg";

interface BannerProps {
  formData: any;
  handleChange: (event: any) => void;
  handleReset: () => void;
  handleSubmit: () => void;
}

const BannerSectionStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    minWidth: "100%",
    minHeight: "350px",
    maxHeight: "350px",
    color: "#fff",
    marginBottom: "50px",
  },
  image: {
    width: "100%",
    maxHeight: "350px",
  },
  icon: {
    color: "#fff",
    position: "absolute",
    top: "5%",
    right: "2%",
    cursor: "pointer",
    backgroundColor: "grey",
    "&:hover": {
      color: "grey",
      backgroundColor: "white",
    },
  },
  input: {
    position: "absolute",
    height: "100%",
    width: "100%",
    cursor: "pointer",
    opacity: 0,
  },
}));

const BannerSection = ({
  formData,
  handleChange,
  handleReset,
  handleSubmit,
}: BannerProps) => {
  const { container, image, icon, input } = BannerSectionStyles();
  const imageRender = () => {
    if (formData.bannerImage && typeof formData.bannerImage === "string") {
      return formData.bannerImage;
    } else if (
      formData.bannerImage &&
      typeof formData.bannerImage !== "string"
    ) {
      return URL.createObjectURL(formData.bannerImage);
    } else {
      return BannerImage;
    }
  };

  return (
    <div className={container}>
      {/* {imageRender()} */}
      <img className={image} src={imageRender()} alt="" />
      <IconButton color="inherit" className={icon} title="Upload Banner Image">
        <input
          accept="image/*"
          name="bannerImage"
          type="file"
          onChange={handleChange}
          className={input}
        />
        <Edit />
      </IconButton>

      {formData.bannerImage && typeof formData.bannerImage !== "string" ? (
        <>
          <IconButton
            className={icon}
            style={{
              top: "25%",
            }}
            title="Save Changes"
            onClick={() => handleSubmit()}
          >
            <Save />
          </IconButton>
          <IconButton
            className={icon}
            style={{
              top: "45%",
            }}
            title="Restore"
            onClick={() => handleReset()}
          >
            <RestoreTwoTone />
          </IconButton>
        </>
      ) : null}
    </div>
  );
};

export default BannerSection;
