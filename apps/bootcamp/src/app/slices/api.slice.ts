import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	tagTypes: ['Task'],
	endpoints: builder => ({
		getTasks: builder.query({
			query: (id: number | string) => `/project/${id}/tasks`,
			providesTags: ['Task'],
		}),
		addTask: builder.mutation({
			query: (newTask: {
				done: boolean
				title: string
				project_id: number
			}) => ({
				url: '/task',
				method: 'POST',
				body: newTask,
			}),
			invalidatesTags: ['Task'],
		}),
		deleteTask: builder.mutation({
			query: (id: number) => ({
				url: `/task/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Task'],
		}),
	}),
})

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation } =
	apiSlice
