import { Layout, Card, Statistic, List, Typography, Spin, Tag} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react'
import { fakeFetchCrypto, fetchAssets } from '../../../api.js'
import CryptoContext from '../../../context/crypto-context.jsx'
import { cryptoAssets } from '../../../data.js'

import {percentDifference, capitalizeFirstLetter} from '../../../utils.js'

import styles from './AppSider.module.css'

const AppSider = () => {
	const {loading, assets, crypto} = useContext(CryptoContext)
	

	
	return (
		<Layout.Sider width='25%' className={styles.sider}>
			{assets.map((asset) => (
				<Card key={asset.id} className={styles.card}>
				<Statistic
          title={capitalizeFirstLetter(asset.id)}
          value={asset.totalAmount}
          precision={2}
          valueStyle={{
            color: asset.grow ? '#3f8600' : '#cf1322',
          }}
          prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="$"
        />
				<List
					size='small'
      dataSource={[
	      { title: 'Total Profit', value: asset.totalProfit, withTag: true},
	      { title: 'Asset Amount', value: asset.amount, isPlain: true},
	      // { title: 'Difference', value: asset.growPercent},
      ]}
      renderItem={(item) => (
        <List.Item>
          <span>{item.title}</span>
	        <span>
		        {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
	          {item.isPlain && item.value}
	          {!item.isPlain && <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
	        </span>
        </List.Item>
      )}
    />
			</Card>
			))}
		</Layout.Sider>
	)
}

export default AppSider
