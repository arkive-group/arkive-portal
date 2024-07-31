'use client';

import { useState, useCallback } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

type StatsGridProps = {
  data: any[];
  columns: any[];
};
// ----------------------------------------------------------------------

export default function StatsGrid({ data, columns }: StatsGridProps) {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: false,
  });

  const handleChangeColumnVisibilityModel = useCallback((newModel: any) => {
    setColumnVisibilityModel(newModel);
  }, []);

  const hiddenFields = ['id'];

  const getTogglableColumns = () =>
    columns.filter((column) => !hiddenFields.includes(column.field)).map((column) => column.field);

  return (
    <DataGrid
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[10, 20, 50]}
      rowHeight={75}
      columnHeaderHeight={60}
      rows={data}
      columns={columns}
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={handleChangeColumnVisibilityModel}
      //   slots={{
      //     toolbar: GridToolbar,
      //   }}
      density="compact"
      disableDensitySelector
      disableRowSelectionOnClick
      //   slotProps={{
      //     columnsPanel: {
      //       getTogglableColumns,
      //     },
      //   }}
    />
  );
}
