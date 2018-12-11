import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Table} from 'antd';
import '../Styles/TableStyle.css';
import WrappedAddressForm from './addressForm';

class AddressForm extends Component {
  state={
    selectedRowKeys:[1],
  };
  
render()
{
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Address Line 1', dataIndex: 'address1', key: 'address1' },
    { title: 'Address Line 2', dataIndex: 'address2', key: 'address2' },
    { title: 'City/Town', dataIndex: 'city_town', key: 'city_town' },
    { title: 'State', dataIndex: 'state', key: 'state' },
    { title: 'Pincode', dataIndex: 'pincode', key: 'pincode' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:;">Delete</a>
    },
  ];
    const {selectedRowKeys} = this.state;
    const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                if(selectedRows.length!==0){
                if(selectedRows[0].key !== undefined){
                  this.setState({selectedRowKeys})
                    console.log(selectedRows[0].key);
                }
                }
            },
                type: "radio"
        };

  
  const data = [
    {
      key:1, name:'Hello', address1:'Random address line1', address2:'Random address line2', city_town:'Random city', state:'Random state', pincode:123456, phone:9876543210
    },
    {
      key:2, name:'NewHello', address1:'123 Random address line1', address2:'123 Random address line2', city_town:'123 Random city', state:'123 Random state', pincode:143456, phone:9876452310
    },
  ];
  return(
  <Table
    rowSelection={rowSelection}
    columns={columns}
//    expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
    expandedRowRender={record => <WrappedAddressForm record={record} />}
    dataSource={data}
    scroll={{ x: 1300 }}
    showHeader={false}
  />
  );
  }
}

export default AddressForm;

//Reference
//--Row selection--
//https://stackoverflow.com/questions/51703354/how-to-add-a-radiobutton-to-select-a-row-with-ant-design-table
//https://github.com/ant-design/ant-design/issues/9846
//https://github.com/ant-design/ant-design/blob/master/components/table/demo/row-selection-custom.md