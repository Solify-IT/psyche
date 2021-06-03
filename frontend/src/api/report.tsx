import server from '../utils/server';

export default async function getReport(startDate: Date, endDate: Date) {
  const result = await server.post('/report', { startDate, endDate });
  return result.data;
}
