import { useEffect, useState } from 'react';
import { getData } from '../../../utils/API/APIs';
import { API_ENDPOINTS } from '../../../utils/API/endpoints';

const useCarInformationForm = (formData: any, setFormData: React.Dispatch<any>) => {
  const [carMakes, setCarMakes] = useState<Array<any>>([]);
  const [carMakesList, setCarMakesList] = useState<Array<string>>([]);
  const [carModels, setCarModels] = useState<Array<any>>([]);
  const [carModelsList, setCarModelsList] = useState<Array<string>>([]);
  const [carVersions, setCarVersions] = useState<Array<any>>([]);
  const [carVersionsList, setCarVersionsList] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [toastOpen, setToastOpen] = useState(false);

  const handleTextChange = (event:any)=>{
    setFormData({name:event.target.name, value:event.target.value})
  }

  const fetchMakes = () => {
    setIsLoading(true);
    getData(
      API_ENDPOINTS.ADS + API_ENDPOINTS.CARS + API_ENDPOINTS.CAR_MAKES
    ).then((response) => {
      setIsLoading(false);
      if (response && response.data && response.data.status === 'success') {
        setCarMakes(response.data.data.result);
        let makeList = response.data.data.result.map((make:any)=>make.name)
        setCarMakesList(makeList)
      } else {
        setToastMessage(response.message);
        setToastType('error');
        setToastOpen(true);
      }
    });
  };
  const fetchModels = (makeId: any) => {
    setIsLoading(true);
    getData(
      API_ENDPOINTS.ADS +
        API_ENDPOINTS.CARS +
        API_ENDPOINTS.MAKE_MODELS +
        makeId
    ).then((response) => {
      setIsLoading(false);
      if (response && response.data && response.data.status === 'success') {
        setCarModels(response.data.data.result);
        let modelList = response.data.data.result.map((model:any)=>model.name)
        setCarModelsList(modelList)
      } else {
        setToastMessage(response.message);
        setToastType('error');
        setToastOpen(true);
      }
    });
  };
  const fetchVersions = (modelId: any) => {
    setIsLoading(true);
    getData(
      API_ENDPOINTS.ADS +
        API_ENDPOINTS.CARS +
        API_ENDPOINTS.MODEL_VERSIONS +
        modelId
    ).then((response) => {
      setIsLoading(false);
      if (response && response.data && response.data.status === 'success') {
        setCarVersions(response.data.data.result);
        let versionList = response.data.data.result.map((versions:any)=>versions.name)
        setCarVersionsList(versionList)
      } else {
        setToastMessage(response.message);
        setToastType('error');
        setToastOpen(true);
      }
    });
  };

  useEffect(() => {
    fetchMakes();
  }, []);

  useEffect(() => {
    if (formData.carMake && carMakes.length > 0) {
      let make = carMakes.filter((make) => make.name === formData.carMake);
      if (make.length > 0) {
        fetchModels(make[0].make_id);
      }
    }
  }, [formData.carMake, carMakes]);

  useEffect(() => {
    if (formData.carModel && carModels.length > 0) {
      let model = carModels.filter(
        (models) => models.name === formData.carModel
      );
      if (model.length > 0) {
        fetchVersions(model[0].model_id);
      }
    }
  }, [formData.carModel, carModels]);


  useEffect(() => {
    if (formData.modelVersion) {
      let version = carVersions.filter(
        (version) => version.name === formData.modelVersion
      );
      if (version.length > 0) {
        setFormData({name: "engineCapacity", value: version[0].capacity ? version[0].capacity : ""})
        setFormData({name: "engineType", value: version[0].fuel_type ? version[0].fuel_type : ""})
        setFormData({name: "transmission", value: version[0].transmission_type ? version[0].transmission_type : ""})
          
      }
    }
  }, [formData.modelVersion]);

  return {
    toastMessage,
    toastOpen,
    toastType,
    isLoading,
    carMakesList,
    carModelsList,
    carVersionsList,
    handleTextChange
  };
};

export default useCarInformationForm;
