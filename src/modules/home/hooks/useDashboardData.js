import { useState, useEffect } from 'react';
import dashboardData from '../../../dataDashboardfake.json';

export function useDashboardData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Simula carregamento assíncrono
      setTimeout(() => {
        setData(dashboardData.dashboard);
        setLoading(false);
      }, 100);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
}