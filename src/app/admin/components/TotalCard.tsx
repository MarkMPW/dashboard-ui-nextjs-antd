'use client'

import React from 'react'

import { Card } from 'antd';

interface CardPropsType {
  icon: React.ReactNode
  title: string
  totalNumber: number
}

const TotalCard: React.FC<CardPropsType> = ({ icon, title, totalNumber }) => {
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
