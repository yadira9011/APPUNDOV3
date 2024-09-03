import { useNavigationState } from '@react-navigation/native';

const useCurrentRoute = () => {
  const routeName = useNavigationState(state => state?.routes[state.index]?.name);
  console.log("routeName..."+routeName)
  return routeName;
};

export default useCurrentRoute;
