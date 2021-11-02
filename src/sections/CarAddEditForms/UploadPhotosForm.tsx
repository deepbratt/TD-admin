import {
  Button,
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

interface IUploadPhotosFormProps {
  images: any;
  // setImages: React.Dispatch<React.SetStateAction<any[]>>,
  updateImagesState: (img: any) => void;
  requireError: any;
}

const UploadPhotosForm = ({
  images,
  updateImagesState,
  requireError,
}: IUploadPhotosFormProps) => {
  const classes = useStyles();
  const [openInfoModel, setOpenInfoModel] = useState(false)
  const [infoMessage, setInfoMessage] = useState<string | any>('');
  const [infoTitle, setInfoTitle] = useState("")
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
    setInfoTitle('Error!');
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
        ''
      );
    setInfoMessage(errorText);
    setOpenInfoModel(sizeError || arrayLengthError);
    if (!arrayLengthError) {
      updateImagesState(temp);
    }
    e.target.value = null;
  };

  const removePhoto = (index: number) => {
    let temp = [...images];
    temp.splice(index, 1);
    updateImagesState(temp);
  };
  
  return (
    <Grid container>
      {requireError}
      <Grid item xs={12} className={classes.itemContainer}>
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
          <div>
            {images.map((image: any, index: number) =>
              typeof image === "string" ? (
                <img
                  src={image}
                  alt="car"
                  className={classes.imgStyle}
                  onClick={() => removePhoto(index)}
                  key={"img1"+index}
                />
              ) : image && typeof image !== "string" ? (
                <img
                  src={URL.createObjectURL(image)}
                  className={classes.imgStyle}
                  alt="car"
                  onClick={() => removePhoto(index)}
                  key={"img1"+index}
                />
              ) : (
                ""
              )
            )}
          </div>
        )}
        {images.length < 20 && <div className={classes.buttonWrapper}>
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
        </div>}
      </Grid>
      <InformationDialog message={infoMessage} title={infoTitle} open={openInfoModel} setOpen={()=>setOpenInfoModel(false)} />
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
    imgStyle: {
      cursor: "pointer",
      width: "200px",
      marginLeft:"5px"
    },
  })
);
