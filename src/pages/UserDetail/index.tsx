import { Grid } from "@material-ui/core";
import { useParams } from "react-router";
import CustomDivider from "../../components/CustomDivider";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import SecondaryLayout from "../../layout/SecondaryLayout";
import PageHeader from "../../sections/PageHeader";
import PasswordSection from "../../sections/UserInformation/PasswordSection";
import ProfileImage from "../../sections/UserInformation/ProfileImage";
import UserInformation from "../../sections/UserInformation/UserInformation";
import Advertisements from "../advertisements";
import useUserDetail from "./useUserDetail";

const UserDetail = () => {
  const {
    formData,
    handleChange,
    handlePhoneInputChange,
    isLoading,
    setToastOpen,
    toastMessage,
    toastType,
    toastOpen,
    resetPasswordInformation,
    resetUserInformation,
    resetImage,
    updateImage,
    updateUser,
    updatePassword,
  } = useUserDetail();
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <SecondaryLayout>
        <Grid container>
          <PageHeader heading={"User Detail"} />
          <CustomDivider />
          <Grid
            item
            xs={12}
            style={{ display: "flex" }}
            justifyContent="center"
          >
            <ProfileImage
              formData={formData}
              handleChange={handleChange}
              handleReset={resetImage}
              handleSubmit={updateImage}
            />
          </Grid>
          <Grid item container spacing={1} xs={12}>
            <Grid item xs={12}>
              <PageHeader heading={"User Information"} />
            </Grid>
            <Grid item xs={12}>
              <UserInformation
                formData={formData}
                handleChange={handleChange}
                handlePhoneInputChange={handlePhoneInputChange}
                handleReset={resetUserInformation}
                handleSubmit={updateUser}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={1}>
            <Grid item xs={12}>
              <PageHeader heading={"Password Settings"} />
            </Grid>
            <Grid item xs={12}>
              <PasswordSection
                formData={formData}
                handleChange={handleChange}
                handleReset={resetPasswordInformation}
                handleSubmit={updatePassword}
              />
            </Grid>
          </Grid>
        </Grid>
        <Loader open={isLoading} isBackdrop={true} />
        <Toast
          onClose={() => setToastOpen(false)}
          open={toastOpen}
          message={toastMessage}
          type={toastType}
        />
      </SecondaryLayout>
      <Advertisements createdBy={id} />
    </>
  );
};

export default UserDetail;
