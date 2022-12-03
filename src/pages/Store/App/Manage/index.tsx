import { Card, Dropdown, Tag, Tooltip } from 'antd';
import React from 'react';
import cls from './index.module.less';
import {
  CheckCircleOutlined,
  EditOutlined,
  EllipsisOutlined,
  SendOutlined,
  TwitterOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { IconFont } from '@/components/IconFont';
import Appimg from '@/assets/img/appLogo.png';

import { useHistory } from 'react-router-dom';
import SelfAppCtrl from '@/ts/controller/store/selfAppCtrl';

const StoreAppInfo: React.FC = () => {
  const history = useHistory();
  const RenderBaseInfo = (
    <ul className={`${cls['base-info']} flex flex-direction-col`}>
      <li className={`${cls['con']} flex `}>
        <div className={cls['con-title']}>{SelfAppCtrl.curProduct?._prod.name}</div>
        <EditOutlined
          className={cls['con-name-edit-btn']}
          style={{ fontSize: '1.5em' }}
        />
      </li>
      <li className={`${cls['con']} flex flex-direction-col`}>
        <span className={cls['con-label']}>应用图标</span>
        <img className={cls['con-img']} src={Appimg} alt="" />
      </li>
      <li className={`${cls['con']} flex `}>
        <div className={cls['con-info']}>
          <span className={cls['con-label']}>应用曾用名</span>
          <Tooltip title="prompt text">
            <div className={cls['con-name']}> {SelfAppCtrl.curProduct?._prod.name}</div>
          </Tooltip>
        </div>
        <div className={cls['con-info']}>
          <span className={cls['con-label']}>应用描述</span>
          <Tooltip title={''}>
            <div className={cls['con-name']}>{SelfAppCtrl.curProduct?._prod.remark}</div>
          </Tooltip>
        </div>
      </li>
      <li className={`${cls['con']} ${cls['endBox']} flex `}>
        <p style={{ marginRight: '14px' }}>
          创建人：<span>{SelfAppCtrl.curProduct?._prod.createUser}</span>
        </p>
        <p>
          创建时间：<span>{SelfAppCtrl.curProduct?._prod.createTime}</span>
        </p>
      </li>
    </ul>
  );
  console.log('SelfAppCtrl.curProduct', SelfAppCtrl.curProduct);

  const renderManageInfo = () => {
    return (
      <ul className={cls['manage-info']}>
        <li className={`${cls['con']} flex `}>
          <div className={cls['con-name']}>后台设置</div>
          <span className={cls['blue-txt']}>
            打开应用管理后台
            <SendOutlined className={cls['blue-txt-icon']} rotate={-45} />
          </span>
        </li>
        <li className={`${cls['con']} flex `}>
          <div className={cls['con-name']}>应用分配</div>
          <span className={cls['blue-txt']}>编辑</span>
        </li>
        <li className={`${cls['con']} flex `}>
          <div className={cls['con-name']}></div>
          <div className={cls['user-show']}>
            {userCard({
              userList: [{ name: '测试1' }, { name: '测试2' }, { name: '测试3' }],
              roleName: '应用角色1',
            })}
            {userCard({ roleName: '应用角色33' })}
          </div>
        </li>
      </ul>
    );
  };

  const userCard = (userInfo: any) => {
    const { userList = [], roleName = '应用角色' } = userInfo;
    console.log('菜市场', userList);

    return (
      <ul className={`${cls['user-card']} flex flex-direction-col`}>
        <li className={cls['card-title']}>
          <UserOutlined className={cls['card-title-icon']} />
          {roleName}
        </li>
        <li className={cls['card-con']}>
          {userList.length > 0 ? (
            userList.map((item: any, index: number) => {
              return (
                <Tag
                  icon={<CheckCircleOutlined />}
                  className={cls['user-tags']}
                  color="success"
                  key={index}>
                  {item.name}
                </Tag>
              );
            })
          ) : (
            <Tag icon={<TwitterOutlined />} className={cls['user-tags']} key={'22'}>
              未分配
            </Tag>
          )}
        </li>
      </ul>
    );
  };
  return (
    <div className={`pages-wrap flex flex-direction-col ${cls['pages-wrap']}`}>
      <Card
        className="base-info-wrap"
        title={
          <IconFont
            type="icon-jiantou-left"
            className={cls.RouterBackBtn}
            onClick={() => {
              history.goBack();
            }}
          />
        }
        extra={
          <Dropdown menu={{ items: [{ key: 'del', label: '删除' }] }} placement="bottom">
            <EllipsisOutlined
              style={{ fontSize: '20px', marginLeft: '10px', cursor: 'pointer' }}
              rotate={90}
            />
          </Dropdown>
        }>
        {RenderBaseInfo}
      </Card>
      <Card className="manage-info-wrap" title={'应用管理'}>
        {renderManageInfo()}
      </Card>
    </div>
  );
};

export default StoreAppInfo;
