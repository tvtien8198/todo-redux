import { Row, Tag, Checkbox, Popconfirm, message } from 'antd';
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

  return (
    <Row
      justify='space-between'
    >
      <Checkbox checked={checked} onChange={toggleCheckbox} style={{
        ...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {})}}>
        {name}
      </Checkbox>
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
      <Tag color={priorityColorMapping[prioriry]} style={{ margin: 0,
        ...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {}) }}>
        {prioriry}
      </Tag>
    </Row>
  );
}
