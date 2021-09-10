import { Button, Grid, Typography } from '@material-ui/core';
import useAddEditCar from './useAddEditCar';
import addEditCarData from '../../utils/constants/language/en/addEditCarData';
import CustomStepper from '../../components/CustomStepper';
import Toast from '../../components/Toast';
import Loader from '../../components/Loader';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import InformationDialog from '../../components/InformationDialog';
import SecondaryLayout from '../../layout/SecondaryLayout';

const AddEditCar = () => {
  const {
    activeStep,
    handleBack,
    handleNext,
    ComponentContent,
    id,
    handleDeleteAd,
    formRef,
    toastOpen,
    toastMessage,
    toastType,
    setToastOpen,
    isLoading,
    deleteDialog,
    setDeleteDialog,
    lgMdSmPx,
    profileRedirect,
    phoneRequiredDialog,
    setPhoneRequiredDialog,
    helpComingDialog,
    setHelpComingDialog,
    assistanceDialog,
    needAssistance
  } = useAddEditCar();
  return (
    <SecondaryLayout>
    <div
      // style={{
      //   backgroundColor: "grey",
      //   padding: lgMdSmPx('50px', '0px')
      // }}
    >
      <Loader open={isLoading} />
      <Grid
        container
        style={{
          minHeight: '90vh',
          backgroundColor: 'white',
        }}
      >
        <Grid item xs={12}>
          <CustomStepper
            dataArray={addEditCarData.steps}
            activeStep={activeStep}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          spacing={3}
          style={{
            padding: lgMdSmPx('50px', '10px'),
            justifyContent: 'center'
          }}
          ref={formRef}
        >
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="h2">
              {addEditCarData.steps[activeStep]}
            </Typography>
            {id ? (
              <Button
                color="primary"
                variant="outlined"
                style={{ marginRight: '16px' }}
                onClick={() => setDeleteDialog(true)}
              >
                {addEditCarData.buttons.delete}
              </Button>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            {ComponentContent[activeStep]}
          </Grid>
          <Grid
            container
            item
            xs={12}
            style={{ display: 'flex', marginTop: '20px' }}
            justifyContent="center"
          >
            <Button
              color="secondary"
              variant="outlined"
              disabled={activeStep === 0}
              style={Object.assign(
                { marginRight: '16px' },
                activeStep === 0 ? { display: 'none' } : {}
              )}
              onClick={handleBack}
            >
              {addEditCarData.buttons.back}
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === addEditCarData.steps.length - 1
                ? addEditCarData.buttons.post
                : addEditCarData.buttons.next}
            </Button>
          </Grid>
        </Grid>
        <Toast
          open={toastOpen}
          onClose={() => setToastOpen(false)}
          type={toastType}
          message={toastMessage}
        />
        <ConfirmationDialog
          open={deleteDialog}
          title={addEditCarData.deleteDialogTitle}
          message={addEditCarData.deleteDialogMessage}
          rejectBtnLabel={addEditCarData.buttons.cancelDelete}
          confirmBtnLabel={addEditCarData.buttons.confirmDelete}
          handleConfirmation={handleDeleteAd}
          handleRejection={() => setDeleteDialog(false)}
        />
        <InformationDialog
          open={phoneRequiredDialog}
          setOpen={setPhoneRequiredDialog}
          title={addEditCarData.phoneRequiredTitle}
          message={addEditCarData.phoneRequiredMessage}
          actionBtnFunc={profileRedirect}
        />
        <ConfirmationDialog
          open={assistanceDialog}
          title={addEditCarData.needAssistanceTitle}
          message={addEditCarData.needAssistanceMessage}
          rejectBtnLabel={addEditCarData.buttons.needAssistanceReject}
          confirmBtnLabel={addEditCarData.buttons.needAssistanceOK}
          handleConfirmation={()=>needAssistance(true)}
          handleRejection={()=>needAssistance(false)}
        />
        <InformationDialog
          open={helpComingDialog}
          setOpen={setHelpComingDialog}
          title={addEditCarData.helpComingTitle}
          message={addEditCarData.helpComingMessage}
          actionBtnFunc={profileRedirect}
        />
      </Grid>
    </div>
    </SecondaryLayout>
  );
};

export default AddEditCar;
