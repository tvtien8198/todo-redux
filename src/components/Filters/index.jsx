import { Col, Row, Input, Typography, Radio, Select, Tag } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FilterSlice from './FilterSlice';
// import { priorityFilterChange, searchFilterChange } from '../../redux/actions';

const { Search } = Input;

export default function Filters() {
  const todoStorage = JSON.parse(localStorage.getItem('TodoApp')).filters

  const [searchText, setSearchText] = useState(todoStorage ? todoStorage.search : '')
  const [filterStatus, setFilterStatus] = useState(todoStorage ? todoStorage.status : 'All')
  const [filterPriorities, setFilterPriorities] = useState(todoStorage ? todoStorage.priorities : [])

  const dispatch = useDispatch()
  console.log(todoStorage)
  const hanleSearchTextChange = (e) => {
    const text = e.target.value
    setSearchText(text)
    dispatch(FilterSlice.actions.searchFilterChange(text))
  }

  const handleFilterStatusChange = e => {
    const status = e.target.value
    setFilterStatus(status)
    dispatch(FilterSlice.actions.statusFilterChange(status))
  }

  const hanlePriorityChange = value => {
    setFilterPriorities(value)
    dispatch(FilterSlice.actions.prioritiesFilterChange(value))
  }

  return (
    <Row justify='center'>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search placeholder='input search text' value={searchText} onChange={hanleSearchTextChange} />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value={filterStatus} onChange={handleFilterStatusChange}>
          <Radio value='All'>All</Radio>
          <Radio value='Completed'>Completed</Radio>
          <Radio value='Todo'>To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode='multiple'
          allowClear
          placeholder='Please select'
          style={{ width: '100%' }}
          value={filterPriorities}
          onChange={hanlePriorityChange}
        >
          <Select.Option value='High' label='High'>
            <Tag color='red'>High</Tag>
          </Select.Option>
          <Select.Option value='Medium' label='Medium'>
            <Tag color='blue'>Medium</Tag>
          </Select.Option>
          <Select.Option value='Low' label='Low'>
            <Tag color='gray'>Low</Tag>
          </Select.Option>
        </Select>
      </Col>
    </Row>
  );
}
