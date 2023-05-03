import { DataGrid } from '@mui/x-data-grid'
import { useTable } from '../hooks/useTable'

export function Table() {
	const { paginationModel, setPaginationModel, columns } = useTable()
	return (
		<DataGrid
			sortingMode='server'
			className='dataGrid'
			autoHeight
			rows={paginationModel?.data}
			rowCount={paginationModel?.total}
			loading={paginationModel.isLoading}
			getRowId={row => row.name}
			pageSizeOptions={[10, 15, 20, 30]}
			pagination
			paginationMode='server'
			paginationModel={{
				page: paginationModel.queryParams.page - 1,
				pageSize: paginationModel.queryParams.pageSize,
			}}
			onPaginationModelChange={newPage => {
				setPaginationModel(old => {
					const newPaginationModel = {
						...old,
						queryParams: {
							...old.queryParams,
							page: newPage.page + 1,
							pageSize: newPage.pageSize,
						},
					}
					return newPaginationModel
				})
			}}
			onFilterModelChange={({ items }) => {
				setPaginationModel(old => {
					const newFilterModel = {
						...old,
						queryParams: {
							...old.queryParams,
							searchProp: items[0]?.field ?? '',
							searchValue: items[0]?.value ?? '',
						},
					}
					return newFilterModel
				})
			}}
			onSortModelChange={sortModel => {
				if (sortModel != null && sortModel.length > 0) {
					const { field, sort } = sortModel[0]
					setPaginationModel(old => {
						const newSortModel = {
							...old,
							queryParams: {
								...old.queryParams,
								sortField: field,
								sortOrder: sort,
							},
						}
						return newSortModel
					})
				} else {
					setPaginationModel(old => {
						const newSortModel = {
							...old,
							queryParams: {
								...old.queryParams,
								sortField: '',
								sortOrder: null,
							},
						}
						return newSortModel
					})
				}
			}}
			columns={columns}
		/>
	)
}
