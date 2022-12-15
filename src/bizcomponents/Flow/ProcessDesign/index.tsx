import React, { useRef, useEffect } from 'react';
import cls from './index.module.less';
import LayoutPreview from '@/bizcomponents/Flow/Layout/LayoutPreview';
import FormProcessDesign from '@/bizcomponents/Flow/Layout/FormProcessDesign';
import DefaultProps, { useAppwfConfig } from '@/bizcomponents/Flow/flow';

// import { EventContext } from '../const';
type ProcessDesignProps = {
  [key: string]: any;
  conditionData: { name: string; fields: string; labels: [{}] };
  editorValue: string | null | undefined;
  designData: any;
};
/**
 * 空节点
 * @returns
 */
const ProcessDesign: React.FC<ProcessDesignProps> = ({
  conditionData,
  editorValue,
  designData,
}) => {
  const activeSelect = 'processDesign';
  const previewRef: any = useRef();
  const setDesign = useAppwfConfig((state: any) => state.setDesign);

  useEffect(() => {
    startDesign();
  }, [designData]);

  const defaultDesign = {
    name: '新建流程',
    code: 'code',
    remark: '',
    fields: '',
    resource: {
      nodeId: 'ROOT',
      parentId: null,
      type: 'ROOT',
      name: '发起人',
      children: {
        nodeId: 'node_590719745693',
        parentId: 'ROOT',
        props: {},
        type: 'CONDITIONS',
        name: '条件分支',
      },
    },
  };

  const startDesign = async () => {
    let tempDesign;
    // console.log('传进来的条件conditionData', conditionData);
    // console.log('传进来的编辑数据', JSON.parse(editorValue || '{}'));
    // console.log('正在进行操作的designData', designData);
    /** 这里走编辑的逻辑 */
    if (editorValue && editorValue !== '{}') {
      tempDesign = designData || JSON.parse(editorValue);
      /**如果操作过基本信息 */
      if (conditionData?.labels) {
        // 编辑了之后值没有变
        tempDesign.remark = JSON.stringify(conditionData?.labels);
        tempDesign.fields = conditionData?.fields;
        tempDesign.name = conditionData.name;
        DefaultProps.setFormFields(conditionData?.labels);
        /**没操作过 */
      } else {
        DefaultProps.setFormFields(JSON.parse(tempDesign?.remark));
      }
    } else {
      if (!designData) {
        DefaultProps.setFormFields(conditionData?.labels);
        defaultDesign.remark = JSON.stringify(conditionData?.labels);
        defaultDesign.name = conditionData?.name;
        defaultDesign.fields = conditionData?.fields;
        tempDesign = JSON.parse(JSON.stringify(defaultDesign));
      } else {
        DefaultProps.setFormFields(conditionData?.labels);
        designData.remark = JSON.stringify(conditionData?.labels);
        designData.fields = conditionData?.fields;
        designData.name = conditionData?.name;
        tempDesign = designData;
      }
    }
    // setOldDesign(tempDesign);
    setDesign(tempDesign);
  };

  return (
    <>
      <div className={cls['container']}>
        <div className={cls['layout-body']}>
          {activeSelect === 'processDesign' && (
            <div style={{ height: 'calc(100vh - 250px )', overflowY: 'auto' }}>
              <FormProcessDesign />
            </div>
          )}
        </div>
        <LayoutPreview ref={previewRef} />
      </div>
    </>
  );
};

export default ProcessDesign;
