import {
  Button,
  IconButton,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import UploadPicIcon from "../../assets/icons/uploadPicIcon.png";
import InformationDialog from "../../components/InformationDialog";
import addEditCarData from "../../utils/constants/language/en/addEditCarData";
import CancelRounded from "@material-ui/icons/CancelRounded";
import { useTheme } from "@material-ui/core/styles";
import { addFormData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";

interface IUploadPhotosFormProps {
  images: any;
  // setImages: React.Dispatch<React.SetStateAction<any[]>>,
  updateImagesState: (img: any) => void;
  requireError: any;
  formData: any;
  setIsLoading: any;
  setFormData: any;
}

const UploadPhotosForm = ({
  images,
  updateImagesState,
  requireError,
  formData,
  setIsLoading,
  setFormData,
}: IUploadPhotosFormProps) => {
  const classes = useStyles();
  const themes = useTheme();
  const [openInfoModel, setOpenInfoModel] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | any>("");
  const [infoTitle, setInfoTitle] = useState("");

  const uploadImage = (e: any) => {
    let oneMb = 1024 * 1024;
    let temp = [...images];
    let imageFiles = e.target.files;
    let sizeError = false;
    let arrayLengthError = false;
    for (let i = 0; i < imageFiles.length; i++) {
      let imageSize = imageFiles[i].size;
      if (imageSize > 5 * oneMb) {
        sizeError = true;
        break;
      } else {
        if (temp.length > 19) {
          arrayLengthError = true;
          break;
        }
        temp.push(imageFiles[i]);
      }
    }
    // setSrcImg(e.target.files[0]);
    // setOpenCropModal(true);
    setInfoTitle("Error!");
    let errorText =
      sizeError && arrayLengthError ? (
        <div>
          <span>{addEditCarData.imageArrayLength}</span>
          <br />
          <span>{addEditCarData.infoText}</span>
        </div>
      ) : sizeError ? (
        addEditCarData.infoText
      ) : arrayLengthError ? (
        addEditCarData.imageArrayLength
      ) : (
        ""
      );
    setInfoMessage(errorText);
    setOpenInfoModel(sizeError || arrayLengthError);
    if (!sizeError && !arrayLengthError) {
      setIsLoading(true);
      let imageUploadPromises: any[] = [];
      for (let i = 0; i < imageFiles.length; i++) {
        let fd: FormData = new FormData();
        fd.append('image', imageFiles[i]);
        imageUploadPromises.push(addFormData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS_IMAGES}`, fd));
      }
      Promise.all(imageUploadPromises).then(responses => {
        let imagesArray: any[] = [...images];
        responses.forEach(response => {
          response.data.data.result.images.map((image: any) => imagesArray.push(image));
        })
        updateImagesState(imagesArray);
      }).then(() => setIsLoading(false));
    }
    e.target.value = null;
  };

  const selectImage = async (img: any) => {
    setFormData({ name: "selectedImage", value: img });
  };

  const removePhoto = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    let temp = [...images];
    if (temp[index] === formData.selectedImage) {
      setFormData({ name: "selectedImage", value: "" });
    }
    temp.splice(index, 1);
    updateImagesState(temp);
  };

  return (
    <Grid container>
      {/* {requireError} */}
      <Grid item xs={12} className={classes.itemContainer}>
        <Typography
          variant="body1"
          // color={
          //   requireError && !formData.selectedImage ? "error" : "secondary"
          // }
        >
          {addEditCarData.selectedImageText}
        </Typography>
        {images.length < 1 ? (
          <>
            <img src={UploadPicIcon} alt="car" />
            {requireError ? (
              <Typography variant="body1" color="error">
                {addEditCarData.requiredImageText}
              </Typography>
            ) : null}
          </>
        ) : (
          <div className={classes.imagesRoot}>
            {images.map((image: any, index: number) =>
              image && typeof image === 'object' && image.location ? (
                <div
                  className={classes.imageRoot}
                  onClick={() => selectImage(image)}
                  style={{
                    border:
                      formData.selectedImage === image
                        ? `5px solid ${themes.palette.primary.main}`
                        : "0px",
                    cursor: "pointer",
                  }}
                >
                  <IconButton
                    size="small"
                    className={classes.closeIcon}
                    onClick={(e) => removePhoto(index, e)}
                  >
                    <CancelRounded fontSize="small" />
                  </IconButton>
                  <img
                    src={image.location}
                    alt="car"
                    className={classes.imgStyle}
                    key={"img1" + index}
                  />
                </div>             
              ) : (
                ""
              )
            )}
          </div>
        )}
        {images.length < 20 && (
          <div className={classes.buttonWrapper}>
            <Button variant="contained" className={classes.imgUploadBtn}>
              {addEditCarData.buttons.addPhoto}
              <input
                name="image"
                type="file"
                multiple
                onChange={uploadImage}
                className={classes.hiddenInputFile}
              />
            </Button>
            <Typography variant="body1" className={classes.infoText}>
              {addEditCarData.infoText}
            </Typography>
          </div>
        )}
      </Grid>
      <InformationDialog
        message={infoMessage}
        title={infoTitle}
        open={openInfoModel}
        setOpen={() => setOpenInfoModel(false)}
      />
    </Grid>
  );
};

export default UploadPhotosForm;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemContainer: {
      width: "100%",
      minHeight: "50vh",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      border: "2px dashed #2F80ED",
      flexDirection: "column",
    },
    buttonWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "right",
      width: "50%",
      textAlign: "right",
    },
    infoText: {
      // float:"right"
    },
    errorText: {
      // float:"right"
    },
    imgUploadBtn: {
      position: "relative",
    },
    hiddenInputFile: {
      position: "absolute",
      height: "100%",
      width: "100%",
      cursor: "pointer",
      opacity: 0,
    },
    imagesRoot: {
      display: "flex",
      maxWidth: "800px",
      flexWrap: "wrap",
      margin: "15px 0",
    },
    imageRoot: {
      margin: "5px",
      position: "relative",
      width: "100%",
      height: "250px",
      maxWidth: "250px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      backgroundColor: theme.palette.common.black,
    },
    closeIcon: {
      position: "absolute",
      right: "5%",
      top: "5%",
      color: "white",
    },
    imgStyle: {
      flexShrink: 0,
      maxWidth: "100%",
      maxHidth: "100%",
    },
  })
);
