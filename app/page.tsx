"use client"

import { Button, Tooltip, Tree, Descriptions, Col, Divider, Row, Space ,FloatButton } from 'antd';
import type { TreeDataNode } from 'antd';
import {
  DownOutlined,
  RadiusBottomleftOutlined,
} from '@ant-design/icons';

const { DirectoryTree } = Tree;

type TreeDataNodeExtend = TreeDataNode & {
  level?: number;
  id?: string;
};

import treeData from "./tree_data.json"
import { useState } from 'react';
// const treeData: TreeDataNode[] = 
const colors = [
  'pink',
  'red',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];
let colorIndex = 0;

const defaultExpandedKeys: any = [];
function traverseTree(node: TreeDataNodeExtend[],): void {
  node.forEach((item) => {
    if (item.level === 2) {
      item.icon = <RadiusBottomleftOutlined />
    }
    if (item.level === 0 || item.level === 1) {
      defaultExpandedKeys.push(item.key)
    }
    if (item.children && item.children?.length > 0) {
      traverseTree(item.children);
    }
  });
}

traverseTree(treeData)


export default function Home() {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  return (
    <main className="flex min-h-screen flex-col items-left p-4 sm:p-24">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
        <Col className="gutter-row font-bold mb-10" sm={10} xs={24}>
          <div className="text-4xl text-black-400">arxiv</div>
          <div className="text-5xl text-gray-400/75">Category Taxonomy</div>
        </Col>
        <Col className="gutter-row mb-10" sm={14}  xs={24}>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 my-2">Classification guide</h2>
            <div className="space-y-4">
 
                <h3 className="text-xl mb-10">Group Name</h3>

              <div className="flex">
                <div className="w-1/3">
                  <p className="font-medium mb-1">ARCHIVE NAME (ARCHIVE ID)</p>
                  <p className="text-sm text-gray-600">
                    omitted if group consists of a single archive with the same name as the group
                  </p>
                </div>
                <div className="w-1/3 border-t border-gray-300 my-0">
                  <p className="text-lg mb-0 text-black-1000 font-bold">Category Name (Category ID)</p>
                </div>
                <div className="w-1/3 border-t border-gray-300 my-0">
                  <p className="text-sm text-gray-600">Category description if available</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Space className='mb-10'>
        <Button type="primary" onClick={() => {setExpandedKeys(defaultExpandedKeys)}} >
        expand
        </Button>
        <Button onClick={() => {setExpandedKeys([])}}>
          fold
        </Button>
      </Space>
      <DirectoryTree
        className='h-full bg-inherit'
        showLine
        showIcon={false}
        selectable={false}
        autoExpandParent={false}
        expandedKeys={expandedKeys}
        // defaultExpandedKeys={defaultExpandedKeys}
        switcherIcon={<DownOutlined />}
        treeData={treeData}
        titleRender={(data) => {
          // const color=colors[colorIndex++ % colors.length];
          const color = "volcano"

          if (data.level === 0) {
            return (
              <div>
                <Button type="link"><span className="text-sm text-gray-400/75">Group:</span><span className="text-3xl text-blue-500">{data.title}</span></Button>
              </div>
            )
          } else if (data.level === 1) {
            return (
              <div>
                <Button type="link">
                  <span className="text-sm text-gray-400/75">Archive:</span>
                  <span className="text-2xl text-slate-500 hover:text-blue-600">{data.title}</span>
                  {(data as any).id !== data.title ? <span className="text-sm">({(data as any).id})</span> : <></>}
                  <Tooltip title="category count" color="blue" placement="right" className="text-sm text-slate-500/75 hover:text-blue-600">({data.children.length})</Tooltip>
                </Button>
              </div>
            )
          } else {
            return (
              <>
                <Descriptions title={data.title} column={{sm:3, xs:1}} className='bg-slate-200 drop-shadow-lg '>
                  <Descriptions.Item label="ID" span={1}>{(data as any).id}</Descriptions.Item>
                  <Descriptions.Item label="Title"  span={1}>{data.title}</Descriptions.Item>
                  <Descriptions.Item label="Type"  span={1}>Category</Descriptions.Item>
                  <Descriptions.Item label="Description" span={3}>{(data as any).description}</Descriptions.Item>
                </Descriptions>
                <Divider className="mb-0" />
              </>
            );
          }

        }}
        onExpand={(expandedKeys) => {
          setExpandedKeys(expandedKeys as any);
          console.log(expandedKeys)
        }}
      />
      <FloatButton.BackTop />
    </main>
  );
}
