import React, { useEffect, useState } from 'react';

// import cls from './index.module.less';
import { Modal } from 'antd';

import StoreClassifyTree from '@/components/CustomTreeComp';
import selfAppCtrl from '@/ts/controller/store/selfAppCtrl';
interface indexType {
  appid?: string; //props
}
const Index: React.FC<indexType> = ({ appid }) => {
  console.log('打印移动appid', appid);
  const [selectItem, setSelectItem] = useState('');
  const handleOk = () => {
    console.log('ok', selectItem, '当前操作的应用', selfAppCtrl.curProduct);
  };
  const handleClickItem = ({ checked }: { checked: string[] }) => {
    console.log('事实上', checked);
    setSelectItem(checked[1] || '');
    console.log('ok', selectItem);
  };
  return (
    <>
      <Modal title="移动应用" open={false} onOk={handleOk} onCancel={() => {}}>
        <StoreClassifyTree
          title={'目录'}
          checkable
          isDirectoryTree
          checkStrictly={true}
          onCheck={handleClickItem}
          checkedKeys={[selectItem]}
          autoExpandParent={true}
          treeData={selfAppCtrl.customMenu}
        />
      </Modal>
    </>
  );
};

export default Index;
