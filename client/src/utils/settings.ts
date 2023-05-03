import { getGridStringOperators } from '@mui/x-data-grid'

export const columns = [
	{
		field: 'name',
		headerName: 'Name',
		width: 200,
		filterOperators: getGridStringOperators().filter(
			operator => operator.value === 'contains'
		),
	},
	{
		field: 'rotation_period',
		headerName: 'Rotation Period',
		width: 200,
		filterOperators: getGridStringOperators().filter(
			operator => operator.value === 'contains'
		),
	},
	{
		field: 'orbital_period',
		headerName: 'Orbital Period',
		width: 100,
		filterOperators: getGridStringOperators().filter(
			operator => operator.value === 'contains'
		),
	},
	{
		field: 'diameter',
		headerName: 'Diameter',
		flex: 1,
		filterOperators: getGridStringOperators().filter(
			operator => operator.value === 'contains'
		),
	},
	{
		field: 'climate',
		headerName: 'Climate',
		flex: 1,
		filterOperators: getGridStringOperators().filter(
			operator => operator.value === 'contains'
		),
	},
	{
		field: 'gravity',
		headerName: 'Gravity',
		flex: 1,
		filterOperators: getGridStringOperators().filter(
			operator => operator.value === 'contains'
		),
	},
	{
		field: 'terrain',
		headerName: 'Terrain',
		flex: 1,
		filterOperators: getGridStringOperators().filter(
			operator => operator.value === 'contains'
		),
	},
	{
		field: 'surface_water',
		headerName: 'Surface Water',
		flex: 1,
		filterOperators: getGridStringOperators().filter(
			operator => operator.value === 'contains'
		),
	},
	{
		field: 'population',
		headerName: 'Population',
		flex: 1,
		filterOperators: getGridStringOperators().filter(
			operator => operator.value === 'contains'
		),
	},
]
