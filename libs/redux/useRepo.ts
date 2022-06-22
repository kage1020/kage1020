import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { switchRepo } from './repoSlice';
import { useSelector } from './store';

const useRepo = (): [number, Function] => {
  const repo = useSelector((state) => state.repo.repo);
  const dispatch = useDispatch();
  const handler = useCallback(
    (n: number) => dispatch(switchRepo(n)),
    [dispatch]
  );

  return [ repo, handler ]
}

export default useRepo;
