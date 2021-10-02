import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import InfoCards from "../../components/InfoCards";
import SoldOutStatsCard from "../../components/InfoCards/SoldOutStatsCard";
import Advertisements from "../advertisements";
import MostViewedCard from "../../components/InfoCards/MostViewedCard";
import { getData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import GroupRounded from "@material-ui/icons/GroupRounded";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DriveEtaRoundedIcon from "@material-ui/icons/DriveEtaRounded";
import MoneyIcon from "@material-ui/icons/Money";

export interface IStats {
  today?: number;
  monthly: number;
  total: number;
}
export interface IMostViewedStats {
  percentage: number;
  views: number;
  make: string;
}
export interface ISoldOutStats {
  total: {
    totalCars: number;
    totalSold: number;
    percentage: number;
  };
  monthly: {
    totalCars: number;
    totalSoldThisMonth: number;
    percentage: number;
  };
}
export interface ISoldOuOnPlatformStats {
  total: {
    totalCars: number;
    totalSoldByPlatform: number;
    percentage: number;
  };
  monthly: {
    totalCars: number;
    totalSoldByPlatformThisMonth: number;
    percentage: number;
  };
}

const Home = () => {
  const {
    ADS,
    CARS,
    OWNERS_STATS,
    CARS_STATS,
    MOST_VIEWED,
    CARS_SOLD_STATS,
    CARS_SOLD_ON_PLATFORM_STATS,
  } = API_ENDPOINTS;
  const [carOwnersStats, setCarOwnersStats] = useState<IStats>({
    today: 0,
    monthly: 0,
    total: 0,
  });
  const [carListingStats, setCarListingStats] = useState<IStats>({
    today: 0,
    monthly: 0,
    total: 0,
  });
  const [carSoldStats, setCarsSoldStats] = useState<ISoldOutStats>({
    monthly: {
      totalCars: 0,
      totalSoldThisMonth: 0,
      percentage: 100,
    },
    total: {
      totalCars: 0,
      totalSold: 0,
      percentage: 100,
    },
  });
  const [carSoldOnTezDealzStats, setCarSoldOnTezDealzStats] =
    useState<ISoldOuOnPlatformStats>({
      monthly: {
        totalCars: 0,
        totalSoldByPlatformThisMonth: 0,
        percentage: 100,
      },
      total: {
        totalCars: 0,
        totalSoldByPlatform: 0,
        percentage: 100,
      },
    });
  const [mostViewd, setMostViewed] = useState<IMostViewedStats[]>([
    {
      percentage: 90,
      views: 0,
      make: "Honda",
    },
  ]);

  const getOwnersStats = async () => {
    await getData(ADS + CARS + OWNERS_STATS)
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          setCarOwnersStats(response.data.data.result);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const getCarsListingStats = async () => {
    await getData(ADS + CARS + CARS_STATS)
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          setCarListingStats(response.data.data.result);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const getCarsSoldOutStats = async () => {
    await getData(ADS + CARS + CARS_SOLD_STATS)
      .then((response) => {
        console.log("response", response);
        if (response && response.data && response.data.status === "success") {
          setCarsSoldStats(response.data.data.result);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const getCarsSoldOutOnTezDealzStats = async () => {
    await getData(ADS + CARS + CARS_SOLD_ON_PLATFORM_STATS)
      .then((response) => {
        console.log("response", response);
        if (response && response.data && response.data.status === "success") {
          setCarSoldOnTezDealzStats(response.data.data.result);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const getMostViewedCars = async () => {
    await getData(ADS + CARS + MOST_VIEWED)
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          setMostViewed(response.data.data.result);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    getOwnersStats();
    getCarsListingStats();
    getCarsSoldOutStats();
    getMostViewedCars();
    getCarsSoldOutOnTezDealzStats();
  }, []);

  let carsInfoCardProps = {
    header: "Total Cars",
    icon: <DriveEtaRoundedIcon style={{ fontSize: "50px" }} />,
    data: carListingStats,
  };

  let ownersInfoCardProps = {
    header: "Total Owner",
    icon: <GroupRounded style={{ fontSize: "50px" }} />,
    data: carOwnersStats,
  };

  let carsSoldOutCardProps = {
    header: "Total No. of Sold Car",
    icon: <AttachMoneyIcon style={{ fontSize: "50px" }} />,
    data: {
      monthly: {
        percentage: carSoldStats.monthly.percentage,
        totalSoldThisMonth: carSoldStats.monthly.totalSoldThisMonth,
        totalCars: carSoldStats.monthly.totalCars,
      },
      total: {
        percentage: carSoldStats.total.percentage,
        totalSold: carSoldStats.total.totalSold,
        totalCars: carSoldStats.total.totalCars,
      },
    },
  };

  let carsSoldOutOnTezDealzProps = {
    header: "Total No. Of Sold Car On Tezdeals",
    icon: <MoneyIcon style={{ fontSize: "50px" }} />,
    data: {
      monthly: {
        percentage: carSoldOnTezDealzStats.monthly.percentage,
        totalSoldThisMonth:
          carSoldOnTezDealzStats.monthly.totalSoldByPlatformThisMonth,
        totalCars: carSoldOnTezDealzStats.monthly.totalCars,
      },
      total: {
        percentage: carSoldOnTezDealzStats.total.percentage,
        totalSold: carSoldOnTezDealzStats.total.totalSoldByPlatform,
        totalCars: carSoldOnTezDealzStats.total.totalCars,
      },
    },
  };

  let mostViewedCars = {
    header: "Most Viewed Cars",
    data: mostViewd,
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item container xs={12} lg={10} spacing={3}>
        <Grid item xs={12} sm={6}>
          <InfoCards {...carsInfoCardProps} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InfoCards {...ownersInfoCardProps} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SoldOutStatsCard {...carsSoldOutCardProps} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SoldOutStatsCard {...carsSoldOutOnTezDealzProps} />
        </Grid>
        <Grid item xs={12}>
          <MostViewedCard {...mostViewedCars} />
        </Grid>
        <Grid item xs={12}>
          <Advertisements />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
