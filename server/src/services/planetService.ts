import type QueryString from 'qs'
import { type IPlanet, type IApi } from '../utils/types.d'
import { API_URL } from '../utils/constants'
import { compare } from '../utils/helpers'

const getAllData = async (): Promise<IApi> => {
	const pagesId = [...Array(6).keys()]
	const promises = pagesId.map(async pageId => {
		const url = `${API_URL}/?format=json&page=${pageId + 1}`
		return await fetch(url)
	})
	const allPromises = await Promise.all(promises)
	let results: IPlanet[] = []
	for (const promise of allPromises) {
		const data = (await promise.json()) as IApi
		results = [...results, ...(data.results ?? [])]
	}
	return { count: results.length, results }
}

const getPlanetsSorted = (
	data: IApi,
	sort: keyof IPlanet,
	order = 'asc'
): IApi => {
	const results = data.results?.sort((a, b) => compare(a[sort], b[sort], order))
	return { count: results?.length, results }
}

const getPlanetsPaginated = (data: IApi, page = '1', pageSize = '10'): IApi => {
	const pageNumber = parseInt(page)
	const pageSizeNumber = parseInt(pageSize)
	const start = (pageNumber - 1) * pageSizeNumber
	const end = start + pageSizeNumber
	const results = data.results?.slice(start, end)
	return { ...data, results }
}

const getPlanetsFiltered = (data: IApi, props: string | undefined): IApi => {
	const arrProps = props?.split(',') ?? []
	const results =
		arrProps.length > 0
			? (data.results?.map(planet =>
					Object.fromEntries(
						Object.entries(planet).filter(([key, _value]) =>
							arrProps.includes(key as keyof IPlanet)
						)
					)
			  ) as IPlanet[])
			: data.results
	return { count: results?.length, results }
}

const getPlanetsSearched = (
	data: IApi,
	searchProp: keyof IPlanet,
	searchValue = ''
): IApi => {
	const results = data.results?.filter(planet =>
		planet[searchProp].toLowerCase().includes(searchValue.toLowerCase())
	)
	return { count: results?.length, results }
}

export const getPlanets = async (
	queryParams: QueryString.ParsedQs
): Promise<IApi> => {
	const {
		page,
		pageSize,
		searchProp,
		searchValue,
		sortField,
		sortOrder,
		props,
	} = queryParams
	const arrQueryParams = Object.keys(queryParams)
	let results = await getAllData()
	arrQueryParams.forEach(value => {
		if (value === 'searchProp') {
			results = getPlanetsSearched(
				results,
				searchProp as keyof IPlanet,
				searchValue as string
			)
		}
		if (value === 'sortField') {
			results = getPlanetsSorted(
				results,
				sortField as keyof IPlanet,
				sortOrder as string
			)
		}
		if (value === 'props') {
			results = getPlanetsFiltered(results, props as string)
		}
	})
	if (page !== undefined) {
		results = getPlanetsPaginated(results, page as string, pageSize as string)
	}
	if (arrQueryParams.length === 0) {
		results = getPlanetsPaginated(results, page as string, pageSize as string)
	}
	return results
}
