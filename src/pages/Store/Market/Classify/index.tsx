import {
  AppstoreFilled,
  DatabaseFilled,
  FileTextFilled,
  FundFilled,
} from '@ant-design/icons';
import { Menu, Button, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import cls from './index.module.less';
import MarketClassifyTree from '@/components/CustomTreeComp';
import StoreSiderbar from '@/ts/controller/store/sidebar';
import StoreContent from '@/ts/controller/store/content';
import NewStoreModal from '@/components/NewStoreModal';
import DeleteCustomModal from '@/components/DeleteCustomModal';
import DetailDrawer from './DetailDrawer';
import type { MenuProps } from 'antd';

const MarketClassify: React.FC<any> = ({ history }) => {
  const [list, setList] = useState<any[]>([]);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false); // 创建商店
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false); // 删除商店
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false); // 基础详情

  const menu = ['删除商店', '基础详情', '用户管理'];
  const onOk = () => {
    setIsAddOpen(false);
    setIsDeleteOpen(false);
  };
  const onCancel = () => {
    setIsAddOpen(false);
    setIsDeleteOpen(false);
  };

  const onClose = () => {
    setIsDetailOpen(false);
  };
  useEffect(() => {
    StoreSiderbar.curPageType = 'market';
    StoreSiderbar.TreeCallBack = setList;
    StoreSiderbar.getTreeData();
  }, []);
  const [selectMenu, setSelectMenu] = useState<string>('');
  const items = [
    {
      label: '开放市场',
      key: 'openMarket',
      icon: <AppstoreFilled />,
      children: [
        {
          label: '应用市场',
          key: '/market/shop',
          icon: <AppstoreFilled />,
        }, // 菜单项务必填写 key
        {
          label: '文档共享库',
          key: '/market/docx',
          icon: <FileTextFilled />,
        },
        { label: '数据市场', key: '/market/data', icon: <FundFilled /> },
        { label: '公益仓', key: '/market/publicProperty', icon: <DatabaseFilled /> },
      ],
    },
  ];

  const handleChange = (path: string) => {
    setSelectMenu(path);
    history.push(path);
  };

  /**
   * @description: 树表头展示
   * @return {*}
   */
  const ClickBtn = (
    <>
      <Row>
        <Col>商店分类</Col>
      </Row>
      <Button
        type="link"
        onClick={() => {
          setIsAddOpen(true);
        }}>
        创建商店
      </Button>
      <Button type="link">加入商店</Button>
    </>
  );

  /*******
   * @desc: 点击目录 触发事件
   * @param {any} item
   * @return {*}
   */
  const handleTitleClick = (item: any) => {
    // 触发内容去变化
    StoreContent.changeMenu(item);
  };

  /**
   * @desc: 创建新目录
   * @param {any} item
   * @return {*}
   */
  const handleAddShop = (item: any) => {
    console.log('handleAddShop', item);
  };

  /*******
   * @desc: 目录更多操作 触发事件
   * @param {object} param1
   * @return {*}
   */
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    console.log('handleMenuClick55', key);
    switch (key) {
      case '删除商店':
        setIsDeleteOpen(true);
        break;
      case '基础详情':
        setIsDetailOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className={cls.container}>
      <div className={cls.subTitle}>常用分类</div>
      <Menu
        mode="inline"
        items={items}
        defaultOpenKeys={['openMarket']}
        onClick={({ key }) => handleChange(key)}
      />
      <MarketClassifyTree
        key={selectMenu}
        handleTitleClick={handleTitleClick}
        handleAddClick={handleAddShop}
        handleMenuClick={handleMenuClick}
        treeData={list}
        menu={menu}
        type="myshop"
        clickBtn={ClickBtn}
      />
      <NewStoreModal title="创建商店" open={isAddOpen} onOk={onOk} onCancel={onCancel} />
      <DeleteCustomModal
        title="提示"
        open={isDeleteOpen}
        onOk={onOk}
        onCancel={onCancel}
        content={selectMenu}
      />
      <DetailDrawer title={'神马商店'} open={isDetailOpen} onClose={onClose} />
    </div>
  );
};

export default MarketClassify;
