import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4003/api/v1',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getTopItems: builder.query({
      query: () => '/dashboard/top-items',
      transformResponse: (response) => response.data,
    }),
    getDashboardStats: builder.query({
      query: () => '/dashboard/stats',
      transformResponse: (response) => response.data,
    }),
    getOrdersByHour: builder.query({
      query: () => '/dashboard/orders-by-hour',
      transformResponse: (response) => response.data,
    }),
    getOrdersTrend: builder.query({
      query: () => '/dashboard/orders-trend',
      transformResponse: (response) => response.data,
    })
  }),
});

export const {
  useGetTopItemsQuery,
  useGetDashboardStatsQuery,
  useGetOrdersByHourQuery,
  useGetOrdersTrendQuery
} = dashboardApi;
