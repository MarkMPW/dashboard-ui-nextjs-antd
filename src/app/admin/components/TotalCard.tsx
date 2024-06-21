'use client'

import React from 'react'

import { Card } from 'antd';
import UserOutlined from '@ant-design/icons'

const TotalCard = ({ title, totalNumber }: { title: string, totalNumber?: number }) => {
  return (
    <Card
      title={title}
    >
      <p className='text-7xl'>
        {totalNumber}
      </p>
    </Card>
  )
}

export default TotalCard
