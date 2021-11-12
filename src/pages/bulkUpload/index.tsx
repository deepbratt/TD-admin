import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Grid, Typography, IconButton, Tooltip, Link } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { addFormData, deleteData, getData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import {
  DOWNLOAD_TEMPLATE,
  MANAGE_BULK_UPLOAD,
  BULK_UPLOAD_ADS,
} from "../../utils/constants/language/en/buttonLabels";
import Toast from "../../components/Toast";
import BulkUploadHistoryTable from "../../sections/BulkAdsTable";
import { CancelOutlined } from "@material-ui/icons";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import CustomButton from "../../components/CustomButton";

export interface IBulkUploadHistoryTableRow {
  _id: string;
  createdAt: string;
  createdBy: {
    firstName: string;
    lastName: string;
    _id: string;
  };
  csvFile: string | undefined;
  totalAdsCount: number | null;
  successAdsCount: number | null;
  faliedAdsCount: number | null;
  userId: string;
  status: string;
  updatedAt: string;
}

const BulkUpload: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ADS, CARS, BULK_ADS, BULK_ADS_STATS } = API_ENDPOINTS;
  const [open, setOpen] = useState(false);
  const [bulkUploadHistory, setBulkUploadHistory] =
    useState<IBulkUploadHistoryTableRow[]>();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [keywords, setKeywords] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleCapture = ({ target }: any) => {
    setSelectedFile(target.files[0]);
    target.value = null;
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchInputChange = (e: any) => {
    if (e.key === "Enter") {
      setKeywords(e.target.value);
    }
  };

  const handleAlertClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const getAdsViewsLogs = async () => {
    setIsLoading(true);
    let params = "?";
    params = params + "limit=" + rowsPerPage;
    params = params + "&page=" + page;
    if (keywords !== "") {
      params = params + "&keyword=" + keywords;
    }
    if (id) {
      params = "";
      params = "/" + id;
    }
    await getData(ADS + CARS + BULK_ADS_STATS + params)
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        if (response && response.data && response.data.status === "success") {
          setBulkUploadHistory(response.data.data.result);
          setTotalCount(response.data.totalCount);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error", error);
      });
  };

  const uploadFile = async () => {
    setIsLoading(true);
    let params = "?";
    if (selectedFile && id) {
      params = "";
      params = "/" + id;
      var formData = new FormData();
      formData.append("csvFile", selectedFile);
      await addFormData(ADS + CARS + BULK_ADS + params, formData)
        .then((response) => {
          setIsLoading(false);
          console.log("response", response);
          if (response && response.data && response.data.status === "success") {
            setResponseMessage({
              status: "success",
              message: response.data.message,
            });
            setAlertOpen(true);
            setSelectedFile(null);
          } else {
            setAlertOpen(true);
            setResponseMessage({
              status: "Error",
              message: response.response.data.message,
            });
          }
          getAdsViewsLogs();
        })
        .catch((error) => {
          setIsLoading(false);
          setAlertOpen(true);
          setResponseMessage({
            status: "Error",
            message: error.message,
          });
        });
    }
  };

  useEffect(() => {
    getAdsViewsLogs();
  }, [page, rowsPerPage, keywords, open]);

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid
        item
        container
        xs={12}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={4}>
          <Typography variant="h3">{MANAGE_BULK_UPLOAD}</Typography>
        </Grid>
        <Grid
          item
          container
          justifyContent="flex-end"
          alignItems="center"
          xs={12}
          md={8}
          spacing={1}
        >
          <Grid item>
            <Link
              style={{ textDecoration: "none" }}
              href="https://dev-carokta-bulk-uploads.s3.ap-south-1.amazonaws.com/bulkUploadsTemplate.csv"
            >
              <CustomButton endIcon={<GetAppRoundedIcon />} color="secondary">
                {DOWNLOAD_TEMPLATE}
              </CustomButton>
            </Link>
          </Grid>
          <Grid item>
            <CustomButton
              endIcon={<PublishRoundedIcon />}
              disabled={!selectedFile || !id}
              color="secondary"
              onClick={() => uploadFile()}
            >
              {BULK_UPLOAD_ADS}
            </CustomButton>
          </Grid>
        </Grid>
        <Grid
          style={{ marginTop: "10px" }}
          xs={12}
          container
          justifyContent="flex-end"
          alignItems="center"
        >
          <label>
            {selectedFile ? selectedFile.name : "Select a file to upload"}
          </label>
          <input
            accept=".xlsx, .xls, .csv"
            name="file"
            style={{ display: "none" }}
            id="input-file"
            type="file"
            onChange={handleCapture}
          />
          <Tooltip title="Select File">
            <label htmlFor="input-file">
              <IconButton
                color="primary"
                aria-label="upload file"
                component="span"
              >
                <FileCopyIcon fontSize="large" />
              </IconButton>
            </label>
          </Tooltip>
          {selectedFile && (
            <Tooltip title="Remove File">
              <IconButton
                color="primary"
                aria-label="Remove file"
                component="span"
                onClick={() => setSelectedFile(null)}
              >
                <CancelOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <BulkUploadHistoryTable
          data={bulkUploadHistory}
          loading={isLoading}
          count={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          keywords={keywords}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSearchInputChange={handleSearchInputChange}
        />
      </Grid>
      {responseMessage.status !== "" && (
        <Toast
          open={alertOpen}
          onClose={handleAlertClose}
          type={responseMessage.status}
          message={responseMessage.message}
        />
      )}
    </Grid>
  );
};

export default BulkUpload;
