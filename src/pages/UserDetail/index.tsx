import { useState } from "react";
import { useParams } from "react-router";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import SecondaryLayout from "../../layout/SecondaryLayout";
import PageHeader from "../../sections/PageHeader";
import PasswordSection from "../../sections/UserInformation/PasswordSection";
import ProfileImage from "../../sections/UserInformation/ProfileImage";
import UserInformation from "../../sections/UserInformation/UserInformation";
import Advertisements from "../advertisements";
import useUserDetail from "./useUserDetail";

// UTILS
import { v4 as uuidv4 } from "uuid";
import {
  USER_DETAILS,
  USER_INFORMATION,
  PASSWORD_SETTINGS,
  ABOUT,
} from "../../utils/constants/language/en/buttonLabels";
import AboutSection from "../../sections/UserInformation/AboutSection";
import BannerSection from "../../sections/UserInformation/BannerSection";

// Tabs PROPS
function tabsProps(index: number) {
  return {
    id: `user-details-page-sections-tab-${index}`,
    "aria-controls": `user-details-page-sections-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// TabPanel
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-details-page-sections-tabpanel-${index}`}
      aria-labelledby={`user-details-page-sections-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

const UserDetail = () => {
  const [tabValue, setTabValue] = useState(0);

  // to change the current selected tab
  const handleTabValueChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setTabValue(newValue);
  };

  const {
    formData,
    handleChange,
    handleImageChange,
    handlePhoneInputChange,
    isLoading,
    setToastOpen,
    toastMessage,
    toastType,
    toastOpen,
    resetUserAboutInformation,
    resetBannerImage,
    resetPasswordInformation,
    resetUserInformation,
    resetImage,
    updateImage,
    updateUser,
    updatePassword,
    updateAboutInfo,
    updateBannerImage,
  } = useUserDetail();
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <SecondaryLayout>
        <PageHeader component="h1" heading={USER_DETAILS} />
        <Grid container justifyContent="center">
          <Grid item container xs={12}>
            <Tabs
              value={tabValue}
              onChange={handleTabValueChange}
              indicatorColor="primary"
              orientation="horizontal"
              textColor="primary"
              variant="standard"
              aria-label="user details page sections tab"
            >
              {[USER_INFORMATION, PASSWORD_SETTINGS, ABOUT].map(
                (tabLabel: string, index: number) => (
                  <Tab key={uuidv4()} label={tabLabel} {...tabsProps(index)} />
                )
              )}
            </Tabs>
          </Grid>
          <TabPanel value={tabValue} index={0}>
            <Grid container justifyContent="center">
              <Grid style={{ margin: "30px 0" }} container item xs={12}>
                <Grid item xs={12} container justifyContent="center">
                  <BannerSection
                    formData={formData}
                    handleChange={handleImageChange}
                    handleReset={resetBannerImage}
                    handleSubmit={updateBannerImage}
                  />
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                  <ProfileImage
                    formData={formData}
                    handleChange={handleImageChange}
                    handleReset={resetImage}
                    handleSubmit={updateImage}
                  />
                </Grid>
                <Grid item container spacing={1} xs={12}>
                  <Grid item xs={12}>
                    <PageHeader heading={USER_INFORMATION} />
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
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Grid
              style={{ margin: "30px 0" }}
              container
              justifyContent="center"
            >
              <Grid container item xs={12} lg={8}>
                <Grid item xs={12}>
                  <PageHeader heading={PASSWORD_SETTINGS} />
                </Grid>
                <Grid item container justifyContent="center" xs={12}>
                  <PasswordSection
                    formData={formData}
                    handleChange={handleChange}
                    handleReset={resetPasswordInformation}
                    handleSubmit={updatePassword}
                  />
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Grid
              style={{ margin: "30px 0" }}
              container
              justifyContent="center"
            >
              <Grid container item xs={12} lg={8}>
                <Grid item xs={12}>
                  <PageHeader heading={ABOUT} />
                </Grid>
                <Grid item container justifyContent="center" xs={12}>
                  <AboutSection
                    formData={formData}
                    handleChange={handleChange}
                    handleReset={resetUserAboutInformation}
                    handleSubmit={updateAboutInfo}
                  />
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
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
