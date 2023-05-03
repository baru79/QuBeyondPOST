import { useCallback, useEffect, useState } from 'react'
import { API_URL } from '../utils/constants'
import { columns } from '../utils/settings'
import { IPaginationModel } from '../utils/types.d'
import { getData } from '../utils/service'

export function useTable() {
	const [paginationModel, setPaginationModel] = useState<IPaginationModel>({
		isLoading: false,
		data: [],
		total: 0,
		queryParams: {
			page: 1,
			pageSize: 10,
			searchProp: '',
			searchValue: '',
			sortField: '',
			sortOrder: null,
		},
	})

	const getQueryParams = useCallback((): string => {
		let queryParams = '?'
		Object.entries(paginationModel.queryParams).forEach(
			([key, value], index) => {
				if (value !== '' && value !== null) {
					const param = `${key}=${value as string}`
					queryParams += index > 0 ? `&${param}` : param
				}
			}
		)
		return queryParams
	}, [paginationModel.queryParams])

	useEffect(() => {
		const getApiData = async () => {
			setPaginationModel(old => ({ ...old, isLoading: true }))
			const url = `${API_URL}${getQueryParams()}`
			const json = await getData(url)
			setPaginationModel(old => ({
				...old,
				isLoading: false,
				data: json.results,
				total: json.count,
			}))
		}
		getApiData().catch(err => console.error(err))
	}, [getQueryParams])

	return { paginationModel, setPaginationModel, columns }
}
