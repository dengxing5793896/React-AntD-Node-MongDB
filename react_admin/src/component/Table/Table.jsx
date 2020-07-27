import React from 'react'
import { Table, Input, InputNumber, Popconfirm, Form, message, Divider, Button } from 'antd';
import PubSub from 'pubsub-js'
import axios from '../../api/axios/axios'
import { Redirect } from 'react-router-dom'
const data = []
const EditableContext = React.createContext();

class EditableCell extends React.Component {

  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `请输入 ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };

  render() {

    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {


  constructor(props) {
    super(props);
    this.state = { loading: true, data: [], editingKey: '', category: true, allSub: [] };
    this.columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        width: '80%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey, category, allSub } = this.state;
          const editable = this.isEditing(record);
          let res = allSub.find(item => {
            return item.parentId === record.key
          })
          if (res) {
            return editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      onClick={() => this.save(form, record.key)}
                      style={{ marginRight: 8 }}
                    >
                      保存
                    </a>
                  )
                  }
                </EditableContext.Consumer>
                <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.key)}>
                  <a>取消</a>
                </Popconfirm>
              </span>
            ) : (
                <span>
                  <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                    修改
                  </a>
                  <Divider type="vertical" />
                  <a onClick={() => { this.getSubCategory(record.key) }}>查看子分类</a>
                </span>
              );
          } else {
            return editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      onClick={() => this.save(form, record.key)}
                      style={{ marginRight: 8 }}
                    >
                      保存
                    </a>
                  )
                  }
                </EditableContext.Consumer>
                <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.key)}>
                  <a>取消</a>
                </Popconfirm>
              </span>
            ) : (
                <span>
                  <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                    修改
                  </a>
                  <Divider type="vertical" />
                  <Popconfirm title="确定删除吗?" onConfirm={() => this.delete(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
          }
        }
      }
    ]
  }

  componentWillMount() {
    this.setState({
      data,
      loading: true
    })
    this.getAllSub()
    this.pubsub_token = PubSub.subscribe("data", (msg, datas) => {
      let { data, getCategory } = datas
      this.getCategory = getCategory
      this.setState({
        data,
        loading: false
      })
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.pubsub_token)
  }

  componentWillReceiveProps(props) {
    let { category } = props
    this.setState({
      category
    })
  }

  getAllSub = async () => {
    let res = await axios.get('/category/getAllSub')
    if (res.status === 0) {
      this.setState({
        allSub: res.data
      })
    } else {
      message.error('获取数据失败')
    }
  }

  getSubCategory = async (key) => {
    this.setState({
      loading: true
    })
    let res = await axios.post('/category/getSubCategory', { pId: key })
    this.setState({
      data: res,
      loading: false,
      category: false
    })
  }

  goCategory =  () => {
    this.getAllSub()
    this.setState({
      data:[]
    },()=>{
    this.getCategory()
    })
  }
  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields(async (error, row) => {
      if (!error) {
        this.setState({
          loading: true
        })

        let resDate = await axios.post('/category/update', { _id: key, category: row.name })
        if (resDate.status === 0) {
          if (this.state.category) {
            this.getCategory()
          } else {
            this.getSubCategory(resDate.parentId)
          }
          this.setState({
            loading: false,
          })
          this.setState({ editingKey: '' })
          message.success(resDate.message)
        } else {
          message.error(resDate.message)
        }
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  async delete(key) {
    this.setState({
      loading: true
    })
    let res = await axios.post('/category/delete', { _id: key })
    if (res.status === 0) {
      if (this.state.category) {
        this.getCategory()
      } else {
        this.getSubCategory(res.parentId)
      }
      this.setState({
        loading: false
      })
      message.success(res.message)
    } else {
      this.setState({
        loading: false
      })
      message.error(res.message)
    }

  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    if (this.state.category) {
      return (

        <EditableContext.Provider value={this.props.form}>
          <Table
            components={components}
            bordered
            dataSource={this.state.data}
            columns={columns}
            rowClassName="editable-row"
            pagination={{
              onChange: this.cancel,
            }}
            loading={this.state.loading}
          />
        </EditableContext.Provider>
      );
    } else {
      return (

        <EditableContext.Provider value={this.props.form}>
          <Button type='danger' style={{ marginBottom: '10px' }} onClick={this.goCategory}>返回</Button>
          <Table
            getCateState={this.getCateState}
            components={components}
            bordered
            dataSource={this.state.data}
            columns={columns}
            rowClassName="editable-row"
            pagination={{
              onChange: this.cancel,
            }}
            loading={this.state.loading}
          />
        </EditableContext.Provider>
      );
    }

  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable
