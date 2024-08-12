import { useNavigationState } from '@react-navigation/native';

const useCurrentRoute = () => {
  const routeName = useNavigationState(state => state?.routes[state.index]?.name);
  return routeName;
};

export default useCurrentRoute;
