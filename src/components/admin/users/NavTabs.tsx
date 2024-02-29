import { Spinner } from '@common/Spinner';
import { useGetUsers } from '@hooks/useGetUsers';
import InformationUser from '@pages/admin/users/components/InformationUser';
import { useAppSelector } from '@redux/app/hooks';
import { selectAuth } from '@redux/states/Auth';
import endPoints from '@services/api';
import { classNames } from '@utils/class-names';
import React, { FC, useEffect, useState } from 'react';
import getSessionStorage from 'utils/get-session-storage';
import { TableClientUser } from './TableClientUser';
import { TableSellerUser } from './TableSellerUser';
import { TableUserAdmin } from './TableUserAdmin';
import { TableWarehouseUser } from './TableWarehouseUser';

const tabs = [
  {
    type: 'ADMINISTRATOR',
    name: 'Administrador',
  },
  {
    type: 'WAREHOUSE_USER',
    name: 'Almacenes',
  },
  {
    type: 'SELLER_USER',
    name: 'Vendedor',
  },
  {
    type: 'CLIENT_USER',
    name: 'Clientes',
  },
];

export const NavTabs = ({
  setAdmin,
  setOpen,
  setUserss,
  userss,
  setActive,
  setType,
  setOpenDesc,
  type,
  setShow,
  setMessage,
  tableRef,
}: {
  setAdmin: any;
  setOpen: any;
  setUserss: any;
  userss: any;
  setActive: any;
  setType: any;
  setOpenDesc: any;
  type: any;
  setShow: any;
  setMessage: any;
  tableRef: any;
}) => {
  const [selectType, setSelectType] = useState(tabs[0].type);
  const [statusU, setStatusU] = useState('ACTIVE');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAppSelector(selectAuth);

  useEffect(() => {
    getUsuarios(statusU);
  }, []);

  useEffect(() => {
    if (selectType === 'ADMINISTRATOR') {
      setAdmin(true);
    } else {
      setAdmin(false);
    }

    setStatusU('ACTIVE');

    getUsuarios(statusU);
    setType(selectType);
  }, [selectType]);

  const getUsuarios = (status: any) => {
    let statuss: string = status;
    let offset: number = 0;
    let limit: number = 100;
    let type: string = selectType;
    setIsLoading(true);
    if (user !== null) {
      fetch(endPoints.users.getUsers(type, statuss, offset, limit), {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          setIsLoading(false);
          if (dat.content) {
            setUserss(dat.content);
          } else {
            setUserss([]);
          }
        });
    }
  };

  const changeStatus = (status: any, id: any) => {
    if (user !== null) {
      fetch(endPoints.users.changeStatus(id, status), {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + user.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dat) => {
          if (dat) {
            getUsuarios(statusU);
            setMessage('El estado del usuario ha sido cambiado exitosamente!');
            setShow(true);
          }
        });
    }
  };

  return (
    <div>
      <div className="block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                onClick={() => {
                  setSelectType(tab.type);
                }}
                key={tab.name}
                className={classNames(
                  tab.type === selectType
                    ? 'border-cblue-500 text-cblue-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                )}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto  py-4 px-2">
        <select
          onChange={(e) => {
            getUsuarios(e.target.value);
            setStatusU(e.target.value);
          }}
          value={statusU}
          className="appearance-none block  border px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300  w-64 mx-8 focus:ring-sky-600 focus:border-sky-600"
        >
          <option selected value="ACTIVE">
            Activos
          </option>
          <option value="LOCKED">Bloqueados</option>
        </select>
        {isLoading && <Spinner />}
        {selectType === 'ADMINISTRATOR' && (
          <TableUserAdmin
            tableRef={tableRef}
            changeStatus={changeStatus}
            setOpen={setOpen}
            statusU={statusU}
            getUsuarios={getUsuarios}
            setActive={setActive}
            userss={userss}
            setUserss={setUserss}
            setOpenDesc={undefined}
          />
        )}
        {selectType === 'WAREHOUSE_USER' && (
          <TableWarehouseUser
            userss={userss}
            tableRef={tableRef}
            setOpenDesc={setOpenDesc}
            setUserss={setUserss}
            setActive={setActive}
            changeStatus={changeStatus}
          />
        )}
        {selectType === 'SELLER_USER' && (
          <TableSellerUser
            setUserss={setUserss}
            tableRef={tableRef}
            setOpenDesc={setOpenDesc}
            setOpen={setOpen}
            changeStatus={changeStatus}
            setActive={setActive}
            userss={userss}
            type={undefined}
          />
        )}
        {selectType === 'CLIENT_USER' && (
          <TableClientUser
            setUserss={setUserss}
            setOpenDesc={setOpenDesc}
            tableRef={tableRef}
            setOpen={setOpen}
            changeStatus={changeStatus}
            setActive={setActive}
            userss={userss}
            type={undefined}
          />
        )}
      </div>
    </div>
  );
};
