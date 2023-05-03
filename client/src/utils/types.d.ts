import { GridSortDirection } from '@mui/x-data-grid'

export interface IApi {
	count?: number
	next?: string | null
	previous?: string | null
	results?: IPlanet[]
}

export interface IPlanet {
	name: string
	rotation_period: string
	orbital_period: string
	diameter: string
	climate: string
	gravity: string
	terrain: string
	surface_water: string
	population: string
}

export interface IQueryParams {
	page: number
	pageSize: number
	searchProp: string
	searchValue: string
	sortField: string
	sortOrder: GridSortDirection
}

export interface IPaginationModel {
	isLoading: boolean
	data: IPlanet[]
	total: number
	queryParams: IQueryParams
}
