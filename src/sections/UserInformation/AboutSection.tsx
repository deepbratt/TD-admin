import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

interface IAboutSectionProps {
    formData: any;
    handleChange: (event: any) => void;
    handleReset: () => void;
    handleSubmit: () => void;
  }

const AboutSection: React.FC<IAboutSectionProps> = ({
  formData,
  handleChange,
  handleReset,
  handleSubmit,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          name="about"
          onChange={handleChange}
          value={formData.about}
          label={"About"}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          rows={4}
          name="description"
          onChange={handleChange}
          value={formData.description}
          label={"Description"}
          required
          fullWidth
        />
      </Grid>
      <Grid
        item
        container
        xs={12}
        justifyContent="flex-end"
        alignItems="flex-start"
      >
        <Button
          variant="contained"
          color="default"
          onClick={() => handleReset()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleSubmit()}
          style={{ marginLeft: "10px" }}
        >
          Update
        </Button>
      </Grid>
    </Grid>
  );
};

export default AboutSection
