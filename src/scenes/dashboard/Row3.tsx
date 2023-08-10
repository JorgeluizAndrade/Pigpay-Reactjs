import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";


const Row3 = () => {
  const { data: kpiData } = useGetKpisQuery();
  const { data: transactionData } = useGetTransactionsQuery();
  const { data: productData } = useGetProductsQuery();
  const { palette } = useTheme();
  const pieColors = [palette.primary[500], palette.primary[700]];

  const pieChartData = useMemo(()=>{
    if(kpiData){
        const totalExpense = kpiData[0].totalExpenses;
        return Object.entries(kpiData[0].expensesByCategory).map(([key, value])=>{
          return [
            {
              name:key,
              value:value
            },
            {
              key: `${key} of Total`,
              value: totalExpense - value
            }
          ]
        })
    }
  }, [kpiData])
  const productColums = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];
  const transactionColumn = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>),
    },
  ];
  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.tertiary[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[700]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[700]} !important`,
            },
            "& .MuiDataGrid-columnSeparetor": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={25}
            hideFooter={true}
            rows={productData || []}
            columns={productColums}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} transactions`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.tertiary[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[700]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[700]} !important`,
            },
            "& .MuiDataGrid-columnSeparetor": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={25}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumn}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="i"> 
        <BoxHeader 
        title="Expense Breakdown By Category" 
        sideText="+4%"
        icon={<ThumbUpOffAltIcon />}
        />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`} >
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map(( _, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h4">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
        <Typography variant="h5" pt="1rem" marginLeft="1rem">This growth reflects our commitment to enhancing efficiency and quality across these categories. 
        We will continue to monitor and optimize these areas to ensure sustainable progress.</Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
