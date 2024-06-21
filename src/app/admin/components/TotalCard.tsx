'use client'

import React from 'react'

import { Card } from 'antd';

const TotalCard = ({ icon, title, totalNumber }: { icon: React.ReactNode, title: string, totalNumber?: number }) => {
  return (
    <Card
      title={
        <span>
          {icon} {title}
        </span>
      }
    >
      <p className='text-7xl'>
        {totalNumber}
      </p>
    </Card>
  )
}

export default TotalCard
