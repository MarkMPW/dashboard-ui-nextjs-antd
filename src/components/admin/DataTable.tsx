import { Table } from 'antd'
import React from 'react'
import { ColumnGroupType, ColumnType } from 'antd/es/table';

interface TablePropsType<T> {
  columns: (ColumnGroupType<T> | ColumnType<T>)[]
  dataSource: T[]
}

const DataTable = <T extends { id: React.Key }>({ columns, dataSource }: TablePropsType<T>) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      pagination={{ defaultPageSize: 5 }}
    />
  );
};

export default DataTable
