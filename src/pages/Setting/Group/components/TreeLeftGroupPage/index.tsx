import { Button } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import React, { useState, useEffect } from 'react';
import cls from './index.module.less';
import { schema } from '@/ts/base';
import { IGroup } from '@/ts/core/target/itarget';
import useCtrlUpdate from '@/hooks/useCtrlUpdate';
import userCtrl from '@/ts/controller/setting/userCtrl';
import { getUuid } from '@/utils/tools';
import MarketClassifyTree from '@/components/CustomTreeComp';
import { PlusOutlined } from '@ant-design/icons';
import service from '../../service';
import Group from '@/ts/core/target/group';
import { deepClone } from '@/ts/base/common';
type CreateGroupPropsType = {
  currentKey: string;
  setCurrent: (current: schema.XTarget | undefined) => void;
  handleMenuClick: (key: string, item: any) => void; // 点击操作触发的事件
  [key: string]: any;
};

const Creategroup: React.FC<CreateGroupPropsType> = ({ handleMenuClick, setCurrent }) => {
  const [key] = useCtrlUpdate(userCtrl);
  const [treeData, setTreeData] = useState<any[]>([]);

  useEffect(() => {
    if (userCtrl.isCompanySpace) {
      initData(false);
    }
  }, [key]);

  const initData = async (reload: boolean) => {
    const data = await userCtrl?.company?.getJoinedGroups(reload);
    // 虚拟的ROOT节点， 作为树的根节点
    let visualGroup = new Group(deepClone(userCtrl?.company?.target));
    // 创建的集团， 加入的集团
    if (data?.length) {
      visualGroup.subGroup = data;
      service.setRoot(visualGroup);
      setCurrent(data[0].target);
      const tree = data.map((n: any) => {
        return createTeeDom(n);
      });
      setTreeData(tree);
    } else {
      visualGroup.subGroup = [];
      service.setRoot(visualGroup);
      setCurrent(undefined);
      setTreeData([]);
    }
  };
  /** 创建节点 */
  const createTeeDom = (n: IGroup) => {
    const { target } = n;
    return {
      key: target.id + getUuid(),
      title: target.name,
      icon: target.avatar,
      // children: [],
      isLeaf: false,
      target: n,
    };
  };

  const updateTreeData = (list: any[], key: React.Key, children: any[]): any[] =>
    list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
          isLeaf: children.length == 0,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });

  const loadDept = async ({ key, children, target }: any) => {
    if (children) {
      return;
    }
    const deptChild: any[] = await target.getSubGroups(false);

    setTreeData((origin) =>
      updateTreeData(
        origin,
        key,
        deptChild.map((n) => createTeeDom(n)),
      ),
    );
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info: any) => {
    selectedKeys;
    if (info.selected) {
      setCurrent(info.node.target.target);
    }
  };

  const menu = ['新增集团'];

  return (
    <div>
      <div className={cls.topMes}>
        <Button
          className={cls.creatgroup}
          type="text"
          icon={<PlusOutlined className={cls.addIcon} />}
          onClick={() => handleMenuClick('new', {})}
        />

        <MarketClassifyTree
          className={cls['docTree']}
          id={key}
          showIcon
          searchable
          handleMenuClick={handleMenuClick}
          treeData={treeData}
          title={'集团管理'}
          menu={menu}
          loadData={loadDept}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
};

export default Creategroup;
