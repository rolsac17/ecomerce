import { useAppDispatch, useAppSelector } from '@redux/app/hooks';
import { selectAuth, setAuthenticationSteps } from '@redux/states/Auth';
import { classNames } from '@utils/class-names';

const tabs = [
  { id: 0, name: 'ENTRAR' },
  { id: 1, name: 'REGISTRARSE' },
];

const TabsAuth = () => {
  const { authenticationSteps } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const onSetStepAuth = (id: number) => {
    dispatch(setAuthenticationSteps(id));
  };
  return (
    <div className="block mb-8">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => onSetStepAuth(tab.id)}
              className={classNames(
                tab.id === authenticationSteps
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm'
              )}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabsAuth;
