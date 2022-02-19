import { Row, Tag, Checkbox, Popconfirm, message, Modal, Select, Input, Col } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TodoSlice from '../TodoList/TodoSlice';
// import { toggleTodoStatus } from '../../redux/actions';

const priorityColorMapping = {
  High: 'red',
  Medium: 'blue',
  Low: 'gray',
};

export default function Todo({ id, name, prioriry, completed }) {
  const [checked, setChecked] = useState(completed);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [todoName, setTodoName] = useState(name)
  const [priority, setPriority] = useState(prioriry)

  const dispath = useDispatch()

  const toggleCheckbox = () => {
    setChecked(!checked);
    dispath(TodoSlice.actions.toggleTodoStatus(id))
    checked === false ? message.info(`Completed '${name}'`) : message.info(`Unfinished '${name}'`)
  };

  const handleDeleteTodo = () => {
    dispath(TodoSlice.actions.deleteTodo(id))
    message.success('Successful delete !!!')
  }

  const handleUpdateInputChange = (e) => {
    setTodoName(e.target.value)
  }

  const handleUpdatePriorityChange = (value) => {
    setPriority(value)
  }

  const showModal = () => {
    setVisible(true);
  };

  const handleUpdateTodo = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      dispath(TodoSlice.actions.updateTodo({
        id: id,
        name: todoName,
        priority: priority,
        completed: false
      }))
    }, 1000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Row
      justify='space-between'
    >
      <Checkbox checked={checked} onChange={toggleCheckbox} style={{
        ...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {})}}>
        {name}
      </Checkbox>
      <div>
        <a href="/#" style={{marginRight: '10px'}} onClick={showModal}>Update</a>
        <Modal 
          title={`Are you sure to Update '${name}' ?`}
          visible={visible}
          onOk={handleUpdateTodo}
          confirmLoading={confirmLoading}
          onCancel={handleCancel} 
        >
          <Row style={{ height: 'calc(100% - 40px)' }}>
            <Col span={24}>
              <Input.Group style={{ display: 'flex' }} compact>
                <Input value={todoName} onChange={handleUpdateInputChange} />
                <Select defaultValue="Medium" value={priority} onChange={handleUpdatePriorityChange}>
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
              </Input.Group>
            </Col>
          </Row>
        </Modal>
        {
          checked && 
          <Popconfirm
            title={`Are you sure to delete '${name}' ?`}
            onConfirm={handleDeleteTodo}
            okText="Yes"
            cancelText="No"
            
          >
            <a href="/#">Delete</a>
          </Popconfirm> 
        }
      </div>
      
      <Tag color={priorityColorMapping[prioriry]} style={{ margin: 0,
        ...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {}) }}>
        {prioriry}
      </Tag>
    </Row>
  );
}
