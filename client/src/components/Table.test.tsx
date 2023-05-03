import { cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { columns } from '../utils/settings'
import { DataGrid } from '@mui/x-data-grid'

describe('DataGrid component', () => {
	beforeEach(() => {
		cleanup()
	})
	afterEach(() => {
		cleanup()
	})
	const data = [
		{
			name: 'Tatooine',
			rotation_period: '23',
			orbital_period: '304',
			diameter: '10465',
			climate: 'arid',
			gravity: '1 standard',
			terrain: 'desert',
			surface_water: '1',
			population: '200000',
			residents: [
				'https://swapi.dev/api/people/1/',
				'https://swapi.dev/api/people/2/',
				'https://swapi.dev/api/people/4/',
				'https://swapi.dev/api/people/6/',
				'https://swapi.dev/api/people/7/',
				'https://swapi.dev/api/people/8/',
				'https://swapi.dev/api/people/9/',
				'https://swapi.dev/api/people/11/',
				'https://swapi.dev/api/people/43/',
				'https://swapi.dev/api/people/62/',
			],
			films: [
				'https://swapi.dev/api/films/1/',
				'https://swapi.dev/api/films/3/',
				'https://swapi.dev/api/films/4/',
				'https://swapi.dev/api/films/5/',
				'https://swapi.dev/api/films/6/',
			],
			created: '2014-12-09T13:50:49.641000Z',
			edited: '2014-12-20T20:58:18.411000Z',
			url: 'https://swapi.dev/api/planets/1/',
		},
	]
	const paginationModel = {
		isLoading: false,
		data,
		total: 1,
		queryParams: {
			page: 1,
			pageSize: 10,
			searchProp: '',
			searchValue: '',
			sortField: '',
			sortOrder: null,
		},
	}
	const onPaginationModelChange = vi.fn()
	const onFilterModelChange = vi.fn()
	const onSortModelChange = vi.fn()

	test('should have the correct number of table cols and rows', async () => {
		const { findByRole, getByRole } = render(
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
				onPaginationModelChange={onPaginationModelChange}
				onFilterModelChange={onFilterModelChange}
				onSortModelChange={onSortModelChange}
				columns={columns}
			/>
		)

		expect(await findByRole('grid')).toBeVisible()
		expect(await getByRole('grid')).toHaveAttribute('aria-colcount', '9')
		expect(await getByRole('grid')).toHaveAttribute('aria-rowcount', '2') // plus 1 for the header row
	})
})
