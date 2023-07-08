import React, { useState, useEffect } from 'react';
import {Form, Input, Modal, Select, Table, message, DatePicker} from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from 'moment';
import Analytics from '../components/Analytics';



const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]); 
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState(null);

  //table data
  const columns = [
    {
      title:'Date',
      dataIndex:'date',
      render: (text) => 
      <span>
         {moment(text).format('DD/MM/YYYY')}
      </span>,
    },
    {
      title:'Amount',
      dataIndex:'amount',
    },
    {
      title:'Type',
      dataIndex:'type',
    },
    {
      title:'Category',
      dataIndex:'category',
    },
    {
      title:'Reference',
      dataIndex:'reference',
    },
    {
      title:'Description',
      dataIndex:'description',
    },
    {
      title:'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined className="mx-2" onClick={() => {
            setEditable(record);
            setShowModal(true);
          }}/>
          <DeleteOutlined className="mx-2" onClick={() => {handleDelete(record)}} />
        </div>
      )
    },
  ];

  
  //useEffect Hook
  useEffect(() => {
    //get all transactions
  const getAllTransactions = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        const res = await axios.post('/api/v1/transactions/get-transaction', {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setLoading(false);
        setAllTransaction(res.data);
        console.log(res.data);

    } catch (error) {
       console.log(error);
       message.error('Fetch Issue with Transaction.');
    }
  };
    getAllTransactions();
  }, [frequency, selectedDate, type] );

  //delete Transaction
  const handleDelete = async (record) => {
       try {
        setLoading(true);
        await axios.post('/api/v1/transactions/delete-transaction', {transactionId: record._id})
        setLoading(false);
        message.success('Transaction Deleted Successfully.');
       } catch (error) {
        setLoading(false);
        console.log(error);
        message.error('Unable to delete.')
       }
  } 
  
  //form Handelling
  const handleSubmit = async (values) => {
     try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      if(editable){
        await axios.post('/api/v1/transactions/edit-transaction', {
          payload:{
            ...values,
            userId: user._id
          },
          transactionId: editable._id
        });
        setLoading(false);
        message.success('Transaction Updated Successfully.')
      }else{
        await axios.post('/api/v1/transactions/add-transaction', {...values, userid:user._id});
        setLoading(false);
        message.success('Transaction Added Successfully.')
      }
      setShowModal(false);
      setEditable(null);
     } catch (error) {
       setLoading(false);
       message.error('Failed to add transaction.');
     }
  }

  return (
    <Layout>
         {loading && <Spinner />}
        <div className='filters'>
            <div>
              <h6>Select Frequency</h6>
              <Select value={frequency} onChange={(values) =>setFrequency(values) } >
                <Select.Option value="7">Last 1 Week</Select.Option>
                <Select.Option value="30">Last 1 Month</Select.Option>
                <Select.Option value="365">Last 1 Year</Select.Option>
                <Select.Option value="custom">Custom</Select.Option>
              </Select>

              { 
              frequency === 'custom' && <RangePicker  
              value={selectedDate} 
              onChange={ (values) => setSelectedDate(values)}
              />}
            </div>

            <div>
              <h6>Select Type</h6>
              <Select value={type} onChange={(values) =>setType(values) } >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="income">INCOME</Select.Option>
                <Select.Option value="expense">EXPENSE</Select.Option>
              </Select>
            </div>

            <div className="switch-icons">
                  <UnorderedListOutlined 
                  className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} 
                  onClick={() => setViewData('table')}/>

                  <AreaChartOutlined 
                  className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`}   
                  onClick={() => setViewData('analytics')} />
            </div>

            <div>
              <button className='btn btn-primary' 
              onClick={ () => setShowModal(true) } 
              >
                Add New
              </button>
            </div>
        </div>

        <div className='contents'>

            {viewData === 'table'
             ? 
            <Table  columns={columns} dataSource={allTransaction} />
             : 
             <Analytics allTransaction={allTransaction} />
             }
            
        </div>

          <Modal title={editable ? 'Edit Transaction' : 'Add Transaction'}
          open={showModal} 
          onCancel={() => setShowModal(false)}
          footer={false}
          >
            <Form className="insideformstyling" layout="verical"  onFinish={handleSubmit} initialValues={editable}>
                <Form.Item label="Amount" name="amount" required>
                 <Input type="number" className='insideinputstylingcss' /> 
                </Form.Item>

                <Form.Item label="Type" name="type" required>
                 <Select className='insideinputstylingcss'>
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                 </Select>
                </Form.Item>

                <Form.Item label="Category" name="category" required>
                 <Select className='insideinputstylingcss'>
                  <Select.Option value="salary">Salary</Select.Option>
                  <Select.Option value="business">Business</Select.Option>
                  <Select.Option value="digitalMarketing">Digital Marketing</Select.Option>
                  <Select.Option value="socialMedia">Social Media</Select.Option>
                  <Select.Option value="trading">Trading</Select.Option>
                  <Select.Option value="freelancing">Freelancing</Select.Option>
                  <Select.Option value="projects">Projects</Select.Option>
                  <Select.Option value="tip">Tip</Select.Option>
                  <Select.Option value="food">Food</Select.Option>
                  <Select.Option value="movie">Movie</Select.Option>
                  <Select.Option value="bills">Bills</Select.Option>
                  <Select.Option value="medicals">Medicals</Select.Option>
                  <Select.Option value="shopping">Shopping</Select.Option>
                  <Select.Option value="grocery">Grocery</Select.Option>
                  <Select.Option value="houseRent">House Rent</Select.Option>
                  <Select.Option value="educationFee">Education Fee</Select.Option>
                  <Select.Option value="tax">TAX</Select.Option>
                  <Select.Option value="others">Others</Select.Option>
                 </Select>
                </Form.Item>

                <Form.Item label="Date" name="date" required>
                  <Input type="date" className='insideinputstylingcss' />
                </Form.Item>

                <Form.Item label="Reference" name="reference" >
                  <Input type="text" className='insideinputstylingcss' />
                </Form.Item>

                <Form.Item label="Description" name="description" required >
                  <Input type="text" className='insideinputstylingcss' />
                </Form.Item>

                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    {" "}
                    SAVE
                    </button>
                </div>

            </Form>
          </Modal> 
    </Layout>
  )
}

export default HomePage