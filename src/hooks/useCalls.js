import { useEffect, useState } from 'react';
import callService from '../../../../services/callService';

export default function useCalls() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadCalls = async () => {
    try {
      setLoading(true);

      const data = await callService.getActive();

      setCalls(data);
    } catch (error) {
      console.error('Failed to load calls', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalls();
  }, []);

  const filteredCalls = calls.filter(call =>
    call.title.toLowerCase().includes(search.toLowerCase()) ||
    call.description.toLowerCase().includes(search.toLowerCase())
  );

  return {
    loading,
    calls: filteredCalls,
    search,
    setSearch,
    refresh: loadCalls,
  };
}