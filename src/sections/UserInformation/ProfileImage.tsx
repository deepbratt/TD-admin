import { Avatar, IconButton } from "@material-ui/core";
import { Edit, RestoreTwoTone, Save } from "@material-ui/icons";
import Profile from "../../assets/icons/profile.png";

interface ProfileImageProps {
  formData: any;
  handleChange: (event: any) => void;
  handleReset: () => void;
  handleSubmit: () => void;
}

const ProfileImage = ({
  formData,
  handleChange,
  handleReset,
  handleSubmit,
}: ProfileImageProps) => {
  const imageRender = () => {
    if (formData.image && typeof formData.image === "string") {
      return formData.image;
    } else if (formData.image && typeof formData.image !== "string") {
      return URL.createObjectURL(formData.image);
    } else {
      return Profile;
    }
  };
  return (
    <div style={{ width: "200px", position: "relative" }}>
      {/* {imageRender()} */}
      <Avatar
        src={imageRender()}
        style={{ width: "100%", height: "auto", marginTop: "10px" }}
        alt=""
      />
      <IconButton
        style={{
          position: "absolute",
          top: 0,
          right: "0",
          cursor: "pointer",
        }}
        title="Upload New"
      >
        <input
          name="image"
          type="file"
          onChange={handleChange}
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            cursor: "pointer",
            opacity: 0,
          }}
        />
        <Edit />
      </IconButton>

      {formData.image && typeof formData.image !== "string" ? (
        <>
          <IconButton
            style={{
              position: "absolute",
              top: "50%",
              right: "-40px",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            title="Save"
            onClick={() => handleSubmit()}
          >
            <Save />
          </IconButton>
          <IconButton
            style={{
              position: "absolute",
              bottom: 0,
              right: "-10px",
              cursor: "pointer",
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

export default ProfileImage;
