import { useEffect, useState } from 'react';

// material-ui
import { Grid, Box } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import Calender from './Calender';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Box>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <EarningCard isLoading={isLoading} label="Total Sales" value="401" />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <TotalOrderLineChartCard isLoading={isLoading} label="Total Purchase" value="564" />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <EarningCard isLoading={isLoading} label="Documents" value="845" />
            </Grid>

            {/* </Grid> */}

            {/* <Grid container spacing={gridSpacing} mt={5} > */}
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <TotalOrderLineChartCard isLoading={isLoading} label="Total Receivable" value="987" />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <EarningCard isLoading={isLoading} label="Total Payable" value="789" />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <TotalOrderLineChartCard isLoading={isLoading} label="News" value="123" />
            </Grid>
            <Grid item xs={2.7}>
              <Calender />
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

// ----------------------- Old Code -----------------------

// import { useEffect, useState } from 'react';

// // material-ui
// import { Grid } from '@mui/material';

// // project imports
// import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
// import { gridSpacing } from 'store/constant';

// // ==============================|| DEFAULT DASHBOARD ||============================== //

// const Dashboard = () => {
//   const [isLoading, setLoading] = useState(true);
//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   return (
//     <Grid container spacing={gridSpacing}>
//       <Grid item xs={12}>
//         <Grid container spacing={gridSpacing}>
//           <Grid item lg={4} md={6} sm={6} xs={12}>
//             <EarningCard isLoading={isLoading} />
//           </Grid>
//           <Grid item lg={4} md={6} sm={6} xs={12}>
//             <TotalOrderLineChartCard isLoading={isLoading} />
//           </Grid>
//           <Grid item lg={4} md={12} sm={12} xs={12}>
//             <Grid container spacing={gridSpacing}>
//               <Grid item sm={6} xs={12} md={6} lg={12}>
//                 <TotalIncomeDarkCard isLoading={isLoading} />
//               </Grid>
//               <Grid item sm={6} xs={12} md={6} lg={12}>
//                 <TotalIncomeLightCard isLoading={isLoading} />
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={12}>
//         <Grid container spacing={gridSpacing}>
//           <Grid item xs={12} md={8}>
//             <TotalGrowthBarChart isLoading={isLoading} />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <PopularCard isLoading={isLoading} />
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default Dashboard;
