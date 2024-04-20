import { ShoppingCartOutlined, UsergroupAddOutlined, AppstoreOutlined, CreditCardOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import { Container, Navbar } from "react-bootstrap";
// import { Bar } from 'react-chartjs-2';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Legend, Cell } from 'recharts';
import "./Dashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

function Dashboard() {
  const [categoryCount, setCategoryCount] = useState();
  const [saleCount, setSaleCount] = useState();
  const [productCount, setProductCount] = useState();
  const { user } = useAuthContext();
  const [productData, setProductData] = useState([])
  const [salesData, setSalesData] = useState([])
  const[customerCount, setCustomerCount] = useState();
  // const salesData = [
  //   { name: 'Remaining Quantity',  soldQuantity: 75 },
  //   { name: 'Sold Quantity', soldQuantity: 150 },

  // ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF4D4F'];
  const colorIndex = [
    { name: 'Remaining Quantity', color: '#1890ff' },
    { name: 'Sold Quantity', color: '#f5222d' },
  ];

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getallcategories', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      console.log(response.data);
      setCategoryCount(response.data.length); // Set the category count
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getallcustomers', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      console.log(response.data[0]);
      setCustomerCount(response.data.length) // Set the product count
    } catch (error) {
      console.log(error);
    }
  }

  


  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getallproducts', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      console.log(response.data[0]);
      const piProdData = response.data.map(item => ({
        name: item.name,
        quantity : item.quantity
      }))
      setProductData(piProdData)
      setProductCount(response.data.length); // Set the product count
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getallsales', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      console.log(response.data);
      let temp = {}
      response.data.forEach(element => {
        temp[element.product.name] = (temp[element.product.name] ?? 0) + Number(element.quantity)
      });
      console.log(temp)
      setSalesData(Object.keys(temp).map((key)=>{
        return {name: key, soldQuantity:temp[key]}
      }))
      setSaleCount(response.data.reduce((total, item)=>{
        return total+item.quantity
      },0)); // Set the sales count
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories(); // Fetch categories and update the count on component mount
    fetchProducts();
    fetchSales();
    fetchCustomers();
  }, []);


  return (
    <div>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <UsergroupAddOutlined style={{
              color: "#52c41a",
              backgroundColor: "rgba(0,255,0,0,0.5)",
              borderRadius: 20,
              fontSize: 46,
              padding: 12,
              height: 40,
              width: 200,

            }}
            />} title={"Total Customers"} value={customerCount} />
        <DashboardCard
          icon={<AppstoreOutlined style={{
            color: "#f5222d",
            backgroundColor: "rgba(0,255,0,0,0.5)",
            borderRadius: 20,
            fontSize: 46,
            padding: 12,
            height: 20,
            width: 200

          }} />} title={"Total Categories"} value={categoryCount} />
        <DashboardCard
          icon={<ShoppingCartOutlined style={{
            color: "#1890ff",
            backgroundColor: "rgba(0,255,0,0,0.5)",
            borderRadius: 20,
            fontSize: 46,
            padding: 12,
            height: 40,
            width: 200

          }} />} title={"Total Products"} value={productCount} />
        <DashboardCard icon={<CreditCardOutlined style={{
          color: "#8c8c8c",
          backgroundColor: "rgba(0,255,0,0,0.5)",
          borderRadius: 20,
          fontSize: 46,
          padding: 12,
          height: 40,
          width: 200

        }} />} title={"Total sales"} value={saleCount} />
      </Space>
      <Navbar style={{ background: '#AFD3E2' }}>
        <Container>
          <b>Welcome to Mero Inventory</b>
        </Container>
      </Navbar>
      <div className="graph">
        <div>
          <Typography.Title level={4}>Sales Report</Typography.Title>
          <ResponsiveContainer width="76%" height={325}>
            <BarChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {/* <Bar dataKey="remainingQuantity" fill="#1890ff" name="Remaining Quantity" /> */}
              <Bar dataKey="soldQuantity" fill="#1890ff" name="Sold Quantity" />
             
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <Typography.Title level={4}>Product Report</Typography.Title>
          <Card style={{ margin: '5px', border: '1px solid black', borderRadius: 8, width: 600 }}>
            <PieChart width={375} height={250}>
              <Pie
                dataKey="quantity"
                data={productData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={(entry) => entry.name}
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </div>
      </div>
    </div>

  );
}




function DashboardCard({ title, value, icon }) {
  return (
    // <Card>
    //   <Space direction="horizontal">
    //     {icon}
    //     <Statistic title={title} value={value}/>
    //   </Space>
    // </Card>
    <Card style={{ margin: '14px', border: '1px solid black', borderRadius: 8 }}>
      <Space direction="horizontal">
        {/* <div style={{ backgroundColor: 'rgba(0, 255, 0, 0.5)', borderRadius: 20 }}> */}
        {icon}
        {/* </div> */}
        <Statistic title={title} value={value} />
        {/* <Bar data={data} options={{}} /> */}
        {/* <Statistic title={<Typography.Text style={{ fontSize: 18 }}>{title}</Typography.Text>} value={<Typography.Text style={{ fontSize: 24 }}>{value}</Typography.Text>} /> */}
      </Space>
    </Card>
  );
}

export default Dashboard;







