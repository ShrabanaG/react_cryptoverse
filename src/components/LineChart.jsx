import moment from "moment";
import { format } from "date-fns";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { Chart as ChartJS, registerables } from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(...registerables);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  console.log("coinHistory", coinHistory);
  const timestamps = coinHistory?.map((point) => {
    const dateObject = new Date(point[0]);
    const formattedDate = format(dateObject, "dd/MM/yyyy");
    return formattedDate;
    // const formattedDate = moment(point[0]).format("MM/DD/YYYY");

    // return formattedDate;
  });

  console.log("timestamps", timestamps);

  const prices = coinHistory?.map((point) => point[1]);
  console.log("prices", prices);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Price in USD",
        data: prices,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        position: "bottom",
        time: {
          unit: "day",
          tooltipFormat: "dd/MM/yyyy",
          displayFormats: {
            day: "dd/MM/yyyy",
          },
          parser: "dd/MM/yyyy",
        },
        title: {
          display: true,
          text: "Timestamp",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      {coinHistory && <Line data={data} options={options} />}
    </>
  );
};

export default LineChart;
