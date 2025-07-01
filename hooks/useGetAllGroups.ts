import { useEffect, useState } from 'react';
import { getGroups } from '../services/groups';

const useGetAllGroups = (userId: string) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getGroups(userId).then((data: any) => {
      const publicGroups = data.filter((group: any) => group.admin !== userId);
      setGroups(publicGroups);
    });
  }, [userId]);

  return groups;
};

export default useGetAllGroups;
